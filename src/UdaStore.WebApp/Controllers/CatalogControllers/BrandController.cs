using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Services;
using UdaStore.Module.Catalog.ViewModels;

namespace UdaStore.WebApp.Controllers.CatalogControllers
{
    [Route("api/brands")]
    public class BrandController : Controller
    {
        private readonly IRepository<Brand> _repository;
        private readonly IBrandService _brandService;

        public BrandController(IRepository<Brand> repository, IBrandService brandService)
        {
            _repository = repository;
            _brandService = brandService;
        }
        public IActionResult GetBrands()
        {
            var brands = _repository.Query().Where(x => !x.IsDeleted).ToList();
            return Json(brands);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BrandForm body)
        {
            if(!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var brand = new Brand
            {
                Name = body.Name,
                SeoTitle = body.Name.ToUrlFriendly(),
                IsPublished = body.IsPublished
            };
            _brandService.Create(brand);

            return Ok(brand);
        }
    }
}