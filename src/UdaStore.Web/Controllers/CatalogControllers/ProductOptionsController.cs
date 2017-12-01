using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Web.Controllers.CoreControllers;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("/api/product-options")]
    public class ProductOptionsController : AuthController
    {
        private readonly IRepository<ProductOption> _productOptionRepository;

        public ProductOptionsController(IRepository<ProductOption> productOptionRepository)
        {
            _productOptionRepository = productOptionRepository;
        }

        public IActionResult Get()
        {
            var options = _productOptionRepository.Query().ToList();
            return Json(options);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var productOption = _productOptionRepository.Query().FirstOrDefault(x => x.Id == id);
            var model = new ProductOptionsResource
            {
                Id = productOption.Id,
                Name = productOption.Name
            };

            return Json(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductOptionsResource model)
        {
            if (ModelState.IsValid)
            {
                var productOption = new ProductOption
                {
                    Name = model.Name
                };

                _productOptionRepository.Add(productOption);
                _productOptionRepository.SaveChange();

                return Ok(productOption);
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ProductOptionsResource model)
        {
            if (ModelState.IsValid)
            {
                var productOption = _productOptionRepository.Query().FirstOrDefault(x => x.Id == id);
                
                if(productOption == null) return NotFound("Data not found.");
                
                productOption.Name = model.Name;

                _productOptionRepository.SaveChange();

                return Ok(productOption);
            }

            return new BadRequestObjectResult(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var productOption = _productOptionRepository.Query().FirstOrDefault(x => x.Id == id);
            if (productOption == null) return NotFound("Data not found.");

            _productOptionRepository.Remove(productOption);
            return Json(true);
        }
    }
}