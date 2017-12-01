using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("/api/roles")]
    public class RolesController : AuthController
    {
        private readonly IRepository<Role> _roleRepository;

        public RolesController(IRepository<Role> roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public IActionResult Get()
        {
            var roles = _roleRepository.Query().Select(x => new
            {
                Id = x.Id,
                Name = x.Name
            });

            return Json(roles);
        }
    }
}