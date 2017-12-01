using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CoreControllers
{
    [Route("api/widget-instances")]
    public class WidgetInstanceController : Controller
    {
        private readonly IRepository<WidgetInstance> _widgetInstanceRepository;
        private readonly IRepository<Widget> _widgetRespository;

        public WidgetInstanceController(IRepository<WidgetInstance> widgetInstanceRepository, IRepository<Widget> widgetRespository)
        {
            _widgetInstanceRepository = widgetInstanceRepository;
            _widgetRespository = widgetRespository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var widgetInstances = _widgetInstanceRepository.Query()
                .Include(x => x.Widget)
                .Include(x => x.WidgetZone)
                .Select(x => new
                {
                    Id = x.Id,
                    Name = x.Name,
                    WidgetType = x.Widget.Name,
                    WidgetZone = x.WidgetZone.Name,
                    CreatedOn = x.CreatedOn,
                    EditUrl = x.Widget.EditUrl,
                    PublishStart = x.PublishStart,
                    PublishEnd = x.PublishEnd
                }).ToList();

            return Json(widgetInstances);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var widgetInstance = _widgetInstanceRepository.Query().FirstOrDefault(x => x.Id == id);
            if (widgetInstance == null)
            {
                return NotFound();
            }

            _widgetInstanceRepository.Remove(widgetInstance);
            _widgetInstanceRepository.SaveChange();

            return Ok();
        }
    }
}