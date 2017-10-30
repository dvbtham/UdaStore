using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Web.Core.Resources;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("/api/product-attribute-group")]
    public class ProductAttributeGroupController : Controller
    {
        private IRepository<ProductAttributeGroup> _productAttrGroupRepository;
        private readonly IMapper _mapper;

        public ProductAttributeGroupController(
            IMapper mapper,
            IRepository<ProductAttributeGroup> productAttrGroupRepository)
        {
            _mapper = mapper;
            _productAttrGroupRepository = productAttrGroupRepository;
        }

        public IActionResult GetAll()
        {
            var attributeGroups = _productAttrGroupRepository
                .Query().ToList();
            var result = _mapper.Map<List<ProductAttributeGroup>, List<ProductAttributeGroupResource>>(attributeGroups);
            return Json(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var productAttributeGroup = _productAttrGroupRepository.Query().FirstOrDefault(x => x.Id == id);

            if (productAttributeGroup == null) return NotFound("Data not found");

            var model = new ProductAttributeGroupResource
            {
                Id = productAttributeGroup.Id,
                Name = productAttributeGroup.Name
            };

            return Json(model);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ProductAttributeGroupResource model)
        {
            if (ModelState.IsValid)
            {
                var productAttributeGroup = new ProductAttributeGroup
                {
                    Name = model.Name
                };

                _productAttrGroupRepository.Add(productAttributeGroup);
                _productAttrGroupRepository.SaveChange();

                return Ok(productAttributeGroup);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] ProductAttributeGroupResource model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var productAttributeGroup = _productAttrGroupRepository.Query().FirstOrDefault(x => x.Id == id);

            if (productAttributeGroup == null) return NotFound("Data not found");

            productAttributeGroup.Name = model.Name;

            _productAttrGroupRepository.SaveChange();

            return Ok(productAttributeGroup);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var productAttributeGroup = _productAttrGroupRepository.Query().FirstOrDefault(x => x.Id == id);
            if (productAttributeGroup == null) return NotFound("Data not found");

            _productAttrGroupRepository.Remove(productAttributeGroup);
            return Json(true);
        }
    }
}