using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Resources;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("/api/product-templates")]
    public class ProductTemplatesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IRepository<ProductTemplate> _productTemplateRepository;
        private readonly IRepository<ProductAttribute> _productAttributeRepository;
        private readonly IProductTemplateProductAttributeRepository _productTemplateProductAttributeRepository;

        public ProductTemplatesController(
            IMapper mapper,
            IRepository<ProductTemplate> productTemplateRepository, 
            IRepository<ProductAttribute> productAttributeRepository, 
            IProductTemplateProductAttributeRepository productTemplateProductAttributeRepository)
        {
            _mapper = mapper;
            _productTemplateRepository = productTemplateRepository;
            _productAttributeRepository = productAttributeRepository;
            _productTemplateProductAttributeRepository = productTemplateProductAttributeRepository;
        }

        public IActionResult Get()
        {
            var productTemplates = _productTemplateRepository
                .Query()
                .Select(x => new
                {
                    x.Id,
                    x.Name
                });

            return Json(productTemplates);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var productTemplate = _productTemplateRepository
                .Query()
                .Include(x => x.ProductAttributes).ThenInclude(x => x.ProductAttribute).ThenInclude(x => x.Group)
                .FirstOrDefault(x => x.Id == id);
            var model = new ProductTemplateSaveResource
            {
                Id = productTemplate.Id,
                Name = productTemplate.Name,
                Attributes = productTemplate.ProductAttributes.Select(
                    x => new ProductAttributeResource()
                    {
                        Id = x.ProductAttributeId,
                        Name = x.ProductAttribute.Name,
                        GroupName = x.ProductAttribute.Group.Name
                    }).ToList()
            };

            return Json(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductTemplateSaveResource model)
        {
            if (!ModelState.IsValid)
                return new BadRequestObjectResult(ModelState);

            var productTemplate = new ProductTemplate
            {
                Name = model.Name
            };

            foreach (var attributeVm in model.Attributes)
            {
                productTemplate.AddAttribute(attributeVm.Id);
            }

            _productTemplateRepository.Add(productTemplate);
            _productAttributeRepository.SaveChange();

            return Ok(_mapper.Map<ProductTemplate, ProductTemplateResource>(productTemplate));
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] ProductTemplateSaveResource model)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var productTemplate = _productTemplateRepository
                .Query()
                .Include(x => x.ProductAttributes)
                .FirstOrDefault(x => x.Id == id);

            if (productTemplate == null) return new NotFoundObjectResult(ModelState);

            productTemplate.Name = model.Name;

            foreach (var attribute in model.Attributes)
            {
                if (productTemplate.ProductAttributes.Any(x => x.ProductAttributeId == attribute.Id))
                {
                    continue;
                }

                productTemplate.AddAttribute(attribute.Id);
            }

            var deletedAttributes = productTemplate.ProductAttributes.Where(attr => !model.Attributes.Select(x => x.Id).Contains(attr.ProductAttributeId));

            foreach (var deletedAttribute in deletedAttributes)
            {
                deletedAttribute.ProductTemplate = null;
                _productTemplateProductAttributeRepository.Remove(deletedAttribute);
            }

            _productAttributeRepository.SaveChange();

            return Ok(_mapper.Map<ProductTemplate, ProductTemplateResource>(productTemplate));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var productTemplate = _productTemplateRepository.Query().FirstOrDefault(x => x.Id == id);
            if (productTemplate == null)
            {
                return new NotFoundResult();
            }

            _productTemplateRepository.Remove(productTemplate);
            _productAttributeRepository.SaveChange();
            return Json(true);
        }
    }
}