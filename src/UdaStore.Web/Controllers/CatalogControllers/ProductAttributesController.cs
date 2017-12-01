using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Web.Controllers.CoreControllers;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("/api/product-attributes")]
    public class ProductAttributesController : AuthController
    {
        private readonly IRepository<ProductAttribute> _productAttrRepository;

        public ProductAttributesController(IRepository<ProductAttribute> productAttrRepository)
        {
            _productAttrRepository = productAttrRepository;
        }

        public IActionResult List()
        {
            var attributes = _productAttrRepository
                .Query()
                .Include(x => x.Group)
                .Select(x => new
                {
                    Id = x.Id,
                    Name = x.Name,
                    GroupName = x.Group.Name
                });

            return Json(attributes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var productAttribute = _productAttrRepository.Query().FirstOrDefault(x => x.Id == id);
            var model = new ProductAttributeSaveResource
            {
                Id = productAttribute.Id,
                Name = productAttribute.Name,
                GroupId = productAttribute.GroupId
            };

            return Json(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductAttributeSaveResource model)
        {
            if (ModelState.IsValid)
            {
                var productAttribute = new ProductAttribute
                {
                    Name = model.Name,
                    GroupId = model.GroupId
                };

                _productAttrRepository.Add(productAttribute);
                _productAttrRepository.SaveChange();

                return Ok(productAttribute);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ProductAttributeSaveResource model)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var productAttribute = _productAttrRepository.Query().FirstOrDefault(x => x.Id == id);

            if (productAttribute == null) return NotFound("Data not found.");

            productAttribute.Name = model.Name;
            productAttribute.GroupId = model.GroupId;

            _productAttrRepository.SaveChange();

            return Ok(productAttribute);

        }
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var productAttribute = _productAttrRepository.Query().FirstOrDefault(x => x.Id == id);
            if (productAttribute == null) return new NotFoundResult();

            _productAttrRepository.Remove(productAttribute);
            return Json(true);
        }
    }
}