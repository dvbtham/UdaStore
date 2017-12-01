using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("/api/widget-zones")]
    public class WigetZoneController : AuthController
    {
        private readonly IRepository<WidgetZone> _widgetZoneRespository;

        public WigetZoneController(IRepository<WidgetZone> widgetZoneRespository)
        {
            _widgetZoneRespository = widgetZoneRespository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var widgetZones = _widgetZoneRespository.Query().Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToList();

            return Json(widgetZones);
        }
    }
}