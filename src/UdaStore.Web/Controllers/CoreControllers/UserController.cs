using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Data;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Resources;
using UdaStore.Web.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("/api/users")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IRepository<User> _userRepository;
        private readonly JwtBearerAppsetting _appSettings;
        public UserController(UserManager<User> manager, IMapper mapper,
        IRepository<User> userRepository, IOptions<JwtBearerAppsetting> appSettings)
        {
            _userRepository = userRepository;
            _userManager = manager;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        public IActionResult List()
        {
            var users = _userRepository.Query()
                .Include(x => x.Roles).ThenInclude(r => r.Role)
                .Where(x => !x.IsDeleted);
            var gridData = users.Select(u => new
            {
                Id = u.Id,
                Email = u.Email,
                FullName = u.FullName,
                CreatedOn = u.CreatedOn,
                Roles = string.Join(", ", u.Roles.Select(x => x.Role.Name))
            });
            return Ok(gridData);
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Get(long id)
        {
            var user = _userRepository.Query().Include(x => x.Roles).FirstOrDefault(x => x.Id == id);

            var model = new UserSaveResource
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                VendorId = user.VendorId,
                RoleIds = user.Roles.Select(x => x.RoleId).ToList()
            };

            return Json(model);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] UserSaveResource model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FullName = model.FullName,
                    PhoneNumber = model.PhoneNumber,
                    VendorId = model.VendorId
                };

                foreach (var roleId in model.RoleIds)
                {
                    var userRole = new UserRole
                    {
                        RoleId = roleId
                    };

                    user.Roles.Add(userRole);
                    userRole.User = user;
                }

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return Ok(user);
                }

                AddErrors(result);
            }

            return new BadRequestObjectResult(ModelState);
        }

        [AllowAnonymous]
        [HttpPost("token")]
        public async Task<IActionResult> Authenticate([FromBody]LoginResource loginResource)
        {
            var user = await _userManager.FindByNameAsync(loginResource.Username);

            if (user == null)
                return Unauthorized();
            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Count(x => x.ToLower() == UdaStore.Web.Common.Constants.ADMIN_ROLE || x.ToLower() == UdaStore.Web.Common.Constants.VENDOR_ROLE) == 0)
                return Unauthorized();

            if (!await _userManager.CheckPasswordAsync(user, loginResource.Password))
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var resource = _mapper.Map(user, loginResource);
            resource.Roles = roles;
            return Ok(new
            {
                Fullname = resource.Fullname,
                Token = tokenString,
                Roles = resource.Roles
            });
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Put(long id, [FromBody] UserSaveResource model)
        {
            if (ModelState.IsValid)
            {
                var user = _userRepository.Query().Include(x => x.Roles).FirstOrDefault(x => x.Id == id);
                user.Email = model.Email;
                user.UserName = model.Email;
                user.FullName = model.FullName;
                user.PhoneNumber = model.PhoneNumber;
                user.VendorId = model.VendorId;
                AddOrDeleteRoles(model, user);

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(user);
                }

                AddErrors(result);
            }

            return new BadRequestObjectResult(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Delete(long id)
        {
            var user = _userRepository.Query().FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return new NotFoundResult();
            }

            user.IsDeleted = true;
            _userRepository.SaveChange();
            return Json(true);
        }

        private void AddOrDeleteRoles(UserSaveResource model, User user)
        {
            foreach (var roleId in model.RoleIds)
            {
                if (user.Roles.Any(x => x.RoleId == roleId))
                {
                    continue;
                }

                var userRole = new UserRole
                {
                    RoleId = roleId,
                    User = user
                };
                user.Roles.Add(userRole);
            }

            var deletedUserRoles =
                user.Roles.Where(userRole => !model.RoleIds.Contains(userRole.RoleId))
                    .ToList();

            foreach (var deletedUserRole in deletedUserRoles)
            {
                deletedUserRole.User = null;
                user.Roles.Remove(deletedUserRole);
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
    }
}