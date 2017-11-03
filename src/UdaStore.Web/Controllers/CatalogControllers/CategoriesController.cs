using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Module.Catalog.Services;
using UdaStore.Module.Core.Models;
using UdaStore.Infrastructure;
using UdaStore.Module.Core.Services;
using AutoMapper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.Internal;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("/api/categories")]
    public class CategoriesController : Controller
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly ICategoryService _categoryService;
        private readonly IMediaService _mediaService;
        private readonly IMapper _mapper;

        private readonly PhotoSettings photoSettings;

        public CategoriesController(IRepository<Category> categoryRepository,
        ICategoryService categoryService, IMediaService mediaService,
         IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            photoSettings = options.Value;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _categoryService = categoryService;
            _mediaService = mediaService;
        }

        [HttpGet("data")]
        public IActionResult Get()
        {
            var gridData = _categoryService.GetAllCategoryCustom();
            return Json(gridData);
        }

        public IActionResult GetAll()
        {
            var categories = _categoryService.GetAll();
            return Json(categories);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var category = _categoryRepository.Query().Include(x => x.ThumbnailImage).FirstOrDefault(x => x.Id == id);
            if (category == null) return new NotFoundResult();
            var resource = _mapper.Map<Category, CategoryResource>(category);
            resource.ThumbnailImageUrl = _mediaService.GetThumbnailUrl(category.ThumbnailImage);

            return Json(resource);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CategoryResource model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var category = _mapper.Map<CategoryResource, Category>(model);

            _categoryService.Create(category);

            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CategoryResource model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var category = _categoryRepository.Query().FirstOrDefault(x => x.Id == id);
            if (category == null) return new NotFoundResult();

            _mapper.Map<CategoryResource, Category>(model, category);

            _categoryService.Update(category);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var category = _categoryRepository.Query().Include(x => x.Children).FirstOrDefault(x => x.Id == id);
            if (category == null) return new NotFoundResult();
            if (category.Children.Any(x => !x.IsDeleted))
                return BadRequest(new { Error = "Please make sure this category contains no children" });

            _categoryService.Delete(category);

            return Ok(true);
        }
       
        [HttpPost("{id}/photo")]
        public IActionResult SaveFile(long id, IFormFile file)
        {
            if (file == null) return BadRequest("Null file");

            if (file.Length == 0) return BadRequest("Empty file");

            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");

            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");
            
            var category = _categoryRepository.Query()
            .Include(c => c.ThumbnailImage)
            .SingleOrDefault(x => x.Id == id);

            if(category == null) return NotFound("Data not found.");

            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            _mediaService.SaveMedia(file.OpenReadStream(), fileName, file.ContentType);

            if (category.ThumbnailImage != null)
            {
                 _mediaService.DeleteMedia(category.ThumbnailImage.FileName);
                category.ThumbnailImage.FileName = fileName;
                category.ThumbnailImage.FileSize = (int)file.Length;
            }
            else
                category.ThumbnailImage = new Media { FileName = fileName, MediaType = MediaType.Image, FileSize = (int)file.Length };
            _categoryService.Update(category);
            return Json(fileName);
        }
    }
}