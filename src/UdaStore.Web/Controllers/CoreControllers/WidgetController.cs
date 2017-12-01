using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("/api/widgets")]
    public class WidgetController : AuthController
    {
        private readonly IRepository<Widget> _widgetRespository;

        public WidgetController(IRepository<Widget> widgetRespository)
        {
            _widgetRespository = widgetRespository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var widgets = _widgetRespository.Query().Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                CreateUrl = x.CreateUrl
            }).ToList();

            return Json(widgets);
        }
    }
}