using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Module.Catalog.Services;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("api/brands")]
    public class BrandsController : Controller
    {
        private readonly IRepository<Brand> _repository;
        private readonly IBrandService _brandService;
        private readonly IMapper _mapper;

        public BrandsController(IRepository<Brand> repository,
            IBrandService brandService, IMapper mapper)
        {
            _repository = repository;
            _brandService = brandService;
            _mapper = mapper;
        }
        public IActionResult GetBrands()
        {
            var brands = _repository.Query().Where(x => !x.IsDeleted).ToList();
            var result = _mapper.Map<List<Brand>, List<BrandResource>>(brands);
            return Json(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BrandResource resource)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var brand = new Brand
            {
                Name = resource.Name,
                Description = resource.Description,
                SeoTitle = resource.Name.ToUrlFriendly(),
                IsPublished = resource.IsPublished
            };
            _brandService.Create(brand);

            return Ok(brand);
        }

        [HttpGet("{id}")]
        public IActionResult GetBrand(long id)
        {
            var brand = _repository.Query().SingleOrDefault(x => x.Id == id);
            if (brand == null) return NotFound("Data no found");

            return Ok(_mapper.Map<Brand, BrandResource>(brand));
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] BrandResource body)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var brand = _repository.Query().SingleOrDefault(x => x.Id == id);
            if (brand == null) return NotFound("Data no found");

            var model = _mapper.Map<BrandResource, Brand>(body, brand);

            _brandService.Update(model);

            return Ok(model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var brand = _repository.Query().FirstOrDefault(x => x.Id == id);
            if (brand == null) return NotFound("Data no found");

            _brandService.Delete(brand);
            return Json(true);
        }
    }
}