using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("/api/appsetting")]
    public class AppSettingController : AuthController
    {
        private readonly IRepository<AppSetting> _appSettingRepository;
        private readonly IConfigurationRoot _configurationRoot;

        public AppSettingController(IRepository<AppSetting> appSettingRepository, IConfiguration configurationRoot)
        {
            _appSettingRepository = appSettingRepository;
            _configurationRoot = (IConfigurationRoot)configurationRoot;
        }

        public IActionResult Get()
        {
            var settings = _appSettingRepository.Query().ToList();
            return Json(settings);
        }

        [HttpPut]
        public IActionResult Put([FromBody] IList<AppSetting> model)
        {
            if (ModelState.IsValid)
            {
                var settings = _appSettingRepository.Query().ToList();
                foreach(var item in settings)
                {
                    var vm = model.FirstOrDefault(x => x.Key == item.Key);
                    if (vm != null)
                    {
                        item.Value = vm.Value;
                    }
                }

                _appSettingRepository.SaveChange();
                _configurationRoot.Reload();

                return Ok(model);
            }
            return new BadRequestObjectResult(ModelState);
        }
    }
}