using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Cms.Resources;
using UdaStore.Module.Core.Models;

namespace UdaStore.Web.Controllers.CmsControllers
{
    [Route("/api/html-widgets")]
    public class HtmlWidgetController : Controller
    {
        private readonly IRepository<WidgetInstance> _widgetInstanceRepository;

        public HtmlWidgetController(IRepository<WidgetInstance> widgetInstanceRepository)
        {
            _widgetInstanceRepository = widgetInstanceRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var widget = _widgetInstanceRepository.Query().FirstOrDefault(x => x.Id == id);
            var model = new HtmlWidgetResource
            {
                Id = widget.Id,
                Name = widget.Name,
                WidgetZoneId = widget.WidgetZoneId,
                HtmlContent = widget.HtmlData,
                PublishStart = widget.PublishStart,
                PublishEnd = widget.PublishEnd
            };

            return Json(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] HtmlWidgetResource model)
        {
            if (ModelState.IsValid)
            {
                var widgetInstance = new WidgetInstance
                {
                    Name = model.Name,
                    WidgetId = 2,
                    WidgetZoneId = model.WidgetZoneId,
                    HtmlData = model.HtmlContent,
                    PublishStart = model.PublishStart,
                    PublishEnd = model.PublishEnd
                };

                _widgetInstanceRepository.Add(widgetInstance);
                _widgetInstanceRepository.SaveChange();
                return Ok(widgetInstance);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] HtmlWidgetResource model)
        {
            if (ModelState.IsValid)
            {
                var widgetInstance = _widgetInstanceRepository.Query().FirstOrDefault(x => x.Id == id);
                widgetInstance.Name = model.Name;
                widgetInstance.WidgetZoneId = model.WidgetZoneId;
                widgetInstance.HtmlData = model.HtmlContent;
                widgetInstance.PublishStart = model.PublishStart;
                widgetInstance.PublishEnd = model.PublishEnd;

                _widgetInstanceRepository.SaveChange();
                return Ok(widgetInstance);
            }

            return new BadRequestObjectResult(ModelState);
        }
    }
}