using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Cms.Resources;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Services;

namespace UdaStore.Web.Controllers.CmsControllers
{
    [Route("api/carousel-widgets")]
    public class CarouselWidgetController : Controller
    {
        private readonly IRepository<WidgetInstance> _widgetInstanceRepository;
        private readonly IMediaService _mediaService;

        public CarouselWidgetController(IRepository<WidgetInstance> widgetInstanceRepository, IMediaService mediaService)
        {
            _widgetInstanceRepository = widgetInstanceRepository;
            _mediaService = mediaService;
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var widgetInstance = _widgetInstanceRepository.Query().FirstOrDefault(x => x.Id == id);
            var model = new CarouselWidgetResource
            {
                Id = widgetInstance.Id,
                Name = widgetInstance.Name,
                WidgetZoneId = widgetInstance.WidgetZoneId,
                PublishStart = widgetInstance.PublishStart,
                PublishEnd = widgetInstance.PublishEnd,
                Items = JsonConvert.DeserializeObject<IList<CarouselWidgetItemResource>>(widgetInstance.Data)
            };

            foreach (var item in model.Items)
            {
                item.ImageUrl = _mediaService.GetMediaUrl(item.Image);
            }

            return Json(model);
        }

        [HttpPost]
        public IActionResult Post(IFormCollection formCollection)
        {
            var model = ToCarouselWidgetResourceModel(formCollection);
            if (ModelState.IsValid)
            {
                foreach (var item in model.Items)
                {
                    item.Image = SaveFile(item.UploadImage);
                }

                var widgetInstance = new WidgetInstance
                {
                    Name = model.Name,
                    WidgetId = 1,
                    WidgetZoneId = model.WidgetZoneId,
                    PublishStart = model.PublishStart,
                    PublishEnd = model.PublishEnd,
                    Data = JsonConvert.SerializeObject(model.Items)
                };

                _widgetInstanceRepository.Add(widgetInstance);
                _widgetInstanceRepository.SaveChange();
                return Ok(widgetInstance);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, IFormCollection formCollection)
        {
            var model = ToCarouselWidgetResourceModel(formCollection);
            
            foreach (var item in model.Items)
            {
                if (item.UploadImage != null)
                {
                    if (!string.IsNullOrWhiteSpace(item.Image))
                    {
                        _mediaService.DeleteMedia(item.Image);
                    }
                    item.Image = SaveFile(item.UploadImage);
                }
            }

            if (ModelState.IsValid)
            {
                var widgetInstance = _widgetInstanceRepository.Query().FirstOrDefault(x => x.Id == id);
                widgetInstance.Name = model.Name;
                widgetInstance.PublishStart = model.PublishStart;
                widgetInstance.PublishEnd = model.PublishEnd;
                widgetInstance.WidgetZoneId = model.WidgetZoneId;
                widgetInstance.Data = JsonConvert.SerializeObject(model.Items);

                _widgetInstanceRepository.SaveChange();
                return Ok(widgetInstance);
            }

            return new BadRequestObjectResult(ModelState);
        }

        private CarouselWidgetResource ToCarouselWidgetResourceModel(IFormCollection formCollection)
        {
            DateTimeOffset publishStart;
            DateTimeOffset publishEnd;
            var model = new CarouselWidgetResource();
            model.Name = formCollection["name"];
            model.WidgetZoneId = int.Parse(formCollection["widgetZoneId"]);
           
            if (DateTimeOffset.TryParse(formCollection["publishStart"], out publishStart))
            {
                model.PublishStart = publishStart;
            }

            if (DateTimeOffset.TryParse(formCollection["publishEnd"], out publishEnd))
            {
                model.PublishEnd = publishEnd;
            }

            int numberOfItems = int.Parse(formCollection["numberOfItems"]);
            for (var i = 0; i < numberOfItems; i++)
            {
                var item = new CarouselWidgetItemResource();
                item.Caption = formCollection[$"items[{i}][caption]"];
                item.TargetUrl = formCollection[$"items[{i}][targetUrl]"];
                item.Image = formCollection[$"items[{i}][image]"];
                item.UploadImage = formCollection.Files[$"items[{i}][uploadImage]"];
                model.Items.Add(item);
            }

            return model;
        }

        private string SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            _mediaService.SaveMedia(file.OpenReadStream(), fileName, file.ContentType);
            return fileName;
        }
    }
}