using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Cms.Models;
using UdaStore.Module.Cms.Resources;
using UdaStore.Module.Cms.Services;

namespace UdaStore.Web.Controllers.CmsControllers
{
    [Route("api/pages")]
    public class PageController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Page> _pageRepository;
        private readonly IPageService _pageService;

        public PageController(IMapper mapper, IRepository<Page> pageRepository, IPageService pageService)
        {
            _mapper = mapper;
            _pageRepository = pageRepository;
            _pageService = pageService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var pageList = _pageRepository.Query().Where(x => !x.IsDeleted).ToList();

            return Json(pageList);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var page = _pageRepository.Query().FirstOrDefault(x => x.Id == id);
            var resource = new PageResource();

            _mapper.Map(page, resource);

            return Json(resource);
        }

        [HttpPost]
        public IActionResult Post([FromBody] PageResource resource)
        {
            if (ModelState.IsValid)
            {
                var page = new Page();

                _mapper.Map(resource, page);

                _pageService.Create(page);

                return Ok(page);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] PageResource resource)
        {
            if (ModelState.IsValid)
            {
                var page = _pageRepository.Query().FirstOrDefault(x => x.Id == id);
                _mapper.Map(resource, page);
                page.UpdatedOn = DateTimeOffset.Now;

                _pageService.Update(page);

                return Ok(page);
            }

            return new BadRequestObjectResult(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var page = _pageRepository.Query().FirstOrDefault(x => x.Id == id);
            if (page == null)
            {
                return new NotFoundResult();
            }

            _pageService.Delete(page);

            return Ok();
        }
    }
}