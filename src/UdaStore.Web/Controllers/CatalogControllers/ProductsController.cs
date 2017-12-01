using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.Services;
using UdaStore.Module.Core.Data;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Services;
using UdaStore.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;
using System.Net.Http.Headers;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Module.Catalog.ViewModel;
using UdaStore.Infrastructure.Web.SmartTable;
using Microsoft.Extensions.Options;
using UdaStore.Module.Core.Extensions;
using System.Net.Http;
using UdaStore.Web.Controllers.CoreControllers;

namespace UdaStore.Web.Controllers.CatalogControllers
{
    [Route("api/products")]
    public class ProductsController : AuthController
    {
        private readonly IMediaService _mediaService;
        private readonly IRepository<ProductAttributeValue> _productAttributeValueRepository;
        private readonly IWorkContext _workContext;
        private readonly IRepository<ProductCategory> _productCategoryRepository;
        private readonly IRepository<ProductLink> _productLinkRepository;
        private readonly IRepository<ProductOptionValue> _productOptionValueRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IProductService _productService;
        private readonly FileSettings fileSettings;

        public ProductsController(
            IRepository<Product> productRepository,
            IMediaService mediaService,
            IProductService productService,
            IRepository<ProductLink> productLinkRepository,
            IRepository<ProductCategory> productCategoryRepository,
            IRepository<ProductOptionValue> productOptionValueRepository,
            IRepository<ProductAttributeValue> productAttributeValueRepository,
            IWorkContext workContext, IOptionsSnapshot<FileSettings> options)
        {
            _productRepository = productRepository;
            _mediaService = mediaService;
            _productService = productService;
            _productLinkRepository = productLinkRepository;
            _productCategoryRepository = productCategoryRepository;
            _productOptionValueRepository = productOptionValueRepository;
            _productAttributeValueRepository = productAttributeValueRepository;
            _workContext = workContext;
            fileSettings = options.Value;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var product = _productRepository.Query()
                .Include(x => x.ThumbnailImage)
                .Include(x => x.Medias).ThenInclude(m => m.Media)
                .Include(x => x.ProductLinks).ThenInclude(p => p.LinkedProduct)
                .Include(x => x.OptionValues).ThenInclude(o => o.Option)
                .Include(x => x.AttributeValues).ThenInclude(a => a.Attribute).ThenInclude(g => g.Group)
                .Include(x => x.Categories)
                .FirstOrDefault(x => x.Id == id);
            var currentUser = await _workContext.GetCurrentUser();
            if (!User.IsInRole("admin") && product.VendorId != currentUser.VendorId)
            {
                return new BadRequestObjectResult(new { error = "You don't have permission to manage this product" });
            }

            var productVm = new ProductVm
            {
                Id = product.Id,
                Name = product.Name,
                ShortDescription = product.ShortDescription,
                Description = product.Description,
                Specification = product.Specification,
                OldPrice = product.OldPrice,
                Price = product.Price,
                SpecialPrice = product.SpecialPrice,
                SpecialPriceStart = product.SpecialPriceStart,
                SpecialPriceEnd = product.SpecialPriceEnd,
                IsFeatured = product.IsFeatured,
                IsPublished = product.IsPublished,
                IsCallForPricing = product.IsCallForPricing,
                IsAllowToOrder = product.IsAllowToOrder,
                IsOutOfStock = product.StockQuantity == 0,
                CategoryIds = product.Categories.Select(x => x.CategoryId).ToList(),
                ThumbnailImageUrl = _mediaService.GetThumbnailUrl(product.ThumbnailImage),
                BrandId = product.BrandId,
                StockQuantity = product.StockQuantity ?? 0
            };

            foreach (var productMedia in product.Medias.Where(x => x.Media.MediaType == MediaType.Image))
            {
                productVm.ProductImages.Add(new ProductMediaVm
                {
                    Id = productMedia.Id,
                    MediaUrl = _mediaService.GetThumbnailUrl(productMedia.Media)
                });
            }

            foreach (var productMedia in product.Medias.Where(x => x.Media.MediaType == MediaType.File))
            {
                productVm.ProductDocuments.Add(new ProductMediaVm
                {
                    Id = productMedia.Id,
                    Caption = productMedia.Media.Caption,
                    MediaUrl = _mediaService.GetMediaUrl(productMedia.Media)
                });
            }

            productVm.Options = product.OptionValues.OrderBy(x => x.SortIndex).Select(x =>
                new ProductOptionsResource
                {
                    Id = x.OptionId,
                    Name = x.Option.Name,
                    Values = JsonConvert.DeserializeObject<IList<string>>(x.Value)
                }).ToList();

            foreach (var variation in product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Super).Select(x => x.LinkedProduct).Where(x => !x.IsDeleted).OrderBy(x => x.Id))
            {
                productVm.Variations.Add(new ProductVariationVm
                {
                    Id = variation.Id,
                    Name = variation.Name,
                    Price = variation.Price,
                    OldPrice = variation.OldPrice,
                    NormalizedName = variation.NormalizedName,
                    OptionCombinations = variation.OptionCombinations.Select(x => new ProductOptionCombinationVm
                    {
                        OptionId = x.OptionId,
                        OptionName = x.Option.Name,
                        Value = x.Value,
                        SortIndex = x.SortIndex
                    }).OrderBy(x => x.SortIndex).ToList()
                });
            }

            foreach (var relatedProduct in product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Relation).Select(x => x.LinkedProduct).Where(x => !x.IsDeleted).OrderBy(x => x.Id))
            {
                productVm.RelatedProducts.Add(new RelatedProductVm
                {
                    Id = relatedProduct.Id,
                    Name = relatedProduct.Name
                });
            }

            productVm.Attributes = product.AttributeValues.Select(x => new ProductAttributeResource
            {
                AttributeValueId = x.Id,
                Id = x.AttributeId,
                Name = x.Attribute.Name,
                GroupName = x.Attribute.Group.Name,
                Value = x.Value
            }).ToList();

            return Json(productVm);
        }

        public async Task<IActionResult> List()
        {
            var query = _productRepository.Query().Where(x => !x.IsDeleted);
            var currentUser = await _workContext.GetCurrentUser();
            if (!User.IsInRole("admin"))
            {
                query = query.Where(x => x.VendorId == currentUser.VendorId);
            }

            var gridData = query.Select(
                x => new ProductListItem
                {
                    Id = x.Id,
                    Name = x.Name,
                    HasOptions = x.HasOptions,
                    IsVisibleIndividually = x.IsVisibleIndividually,
                    IsFeatured = x.IsFeatured,
                    IsAllowToOrder = x.IsAllowToOrder,
                    IsCallForPricing = x.IsCallForPricing,
                    StockQuantity = x.StockQuantity,
                    CreatedOn = x.CreatedOn,
                    IsPublished = x.IsPublished
                });
            return Json(gridData);
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile file)
        {
            var json = HttpContext.Request.Form["resource"];

            json = json.ToString();

            if (string.IsNullOrEmpty(json)) return BadRequest("Null data");
            var resource = JsonConvert.DeserializeObject<ProductSaveResource>(json);
            resource.ThumbnailImage = file;
            if (!ModelState.IsValid || resource == null)
            {
                return new BadRequestObjectResult(ModelState);
            }
            var currentUser = await _workContext.GetCurrentUser();

            var product = new Product();
            product.Modify(resource, currentUser);

            if (!User.IsInRole("admin"))
            {
                product.VendorId = currentUser.VendorId;
            }

            if (resource.Product.IsOutOfStock)
            {
                product.StockQuantity = 0;
            }
            else
            {
                product.StockQuantity = null;
            }

            ApplyProductOptionValue(resource, product);
            ApplyProductAttributeValue(resource, product);
            ApplyProductCategory(resource, product);

            SaveProductMedias(resource, product);

            MapProductVariationVmToProduct(resource, product);
            MapProductRelationVmToProduct(resource, product);

            _productService.Create(product);

            return Ok(resource);
        }

        private void ApplyProductAttributeValue(ProductSaveResource resource, Product product)
        {
            foreach (var attribute in resource.Product.Attributes)
            {
                var attributeValue = new ProductAttributeValue
                {
                    AttributeId = attribute.Id,
                    Value = attribute.Value
                };

                product.AddAttributeValue(attributeValue);
            }
        }

        private void ApplyProductCategory(ProductSaveResource resource, Product product)
        {
            foreach (var categoryId in resource.Product.CategoryIds)
            {
                var productCategory = new ProductCategory
                {
                    CategoryId = categoryId
                };
                product.AddCategory(productCategory);
            }
        }

        private void ApplyProductOptionValue(ProductSaveResource resource, Product product)
        {
            var optionIndex = 0;
            foreach (var option in resource.Product.Options)
            {
                product.AddOptionValue(new ProductOptionValue
                {
                    OptionId = option.Id,
                    Value = JsonConvert.SerializeObject(option.Values),
                    SortIndex = optionIndex
                });

                optionIndex++;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, IFormFile file)
        {
            var json = HttpContext.Request.Form["resource"];
            if (string.IsNullOrEmpty(json)) return BadRequest("Null data");
            var resource = JsonConvert.DeserializeObject<ProductSaveResource>(json.ToString());

            if (resource == null) return BadRequest("Resource null");

            resource.ThumbnailImage = file;

            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var product = _productRepository.Query()
                .Include(x => x.ThumbnailImage)
                .Include(x => x.Medias).ThenInclude(m => m.Media)
                .Include(x => x.ProductLinks).ThenInclude(x => x.LinkedProduct)
                .Include(x => x.OptionValues).ThenInclude(o => o.Option)
                .Include(x => x.AttributeValues).ThenInclude(a => a.Attribute).ThenInclude(g => g.Group)
                .Include(x => x.Categories)
                .FirstOrDefault(x => x.Id == id);

            var currentUser = await _workContext.GetCurrentUser();
            if (!User.IsInRole("admin") && product.VendorId != currentUser.VendorId)
            {
                return new BadRequestObjectResult(new { error = "You don't have permission to manage this product" });
            }
            
            product.Modify(resource, currentUser, isUpdated: true);

            if (resource.Product.IsOutOfStock)
            {
                product.StockQuantity = 0;
            }

            SaveProductMedias(resource, product);

            foreach (var productMediaId in resource.Product.DeletedMediaIds)
            {
                var productMedia = product.Medias.First(x => x.Id == productMediaId);
                _mediaService.DeleteMedia(productMedia.Media);
                product.RemoveMedia(productMedia);
            }

            AddOrDeleteProductOption(resource, product);
            AddOrDeleteProductAttribute(resource, product);
            AddOrDeleteCategories(resource, product);
            AddOrDeleteProductVariation(resource, product);
            AddOrDeleteProductRelation(resource, product);

            MapProductVariationVmToProduct(resource, product);
            MapProductRelationVmToProduct(resource, product);

            _productService.Update(product);

            return Ok(resource);
        }

        [HttpGet("{id}/idOnly")]
        public async Task<IActionResult> UpdateById(long id)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            var product = _productRepository.Query()
                        .Include(x => x.ThumbnailImage)
                        .Include(x => x.Medias).ThenInclude(m => m.Media)
                        .Include(x => x.ProductLinks).ThenInclude(x => x.LinkedProduct)
                        .Include(x => x.OptionValues).ThenInclude(o => o.Option)
                        .Include(x => x.AttributeValues).ThenInclude(a => a.Attribute).ThenInclude(g => g.Group)
                        .Include(x => x.Categories)
                        .FirstOrDefault(x => x.Id == id);

            var currentUser = await _workContext.GetCurrentUser();
            if (!User.IsInRole("admin") && product.VendorId != currentUser.VendorId)
            {
                return new BadRequestObjectResult(new { error = "You don't have permission to manage this product" });
            }

            product.IsPublished = !product.IsPublished;

            _productService.Update(product);

            return Ok();
        }
       

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var product = _productRepository.Query().FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            var currentUser = await _workContext.GetCurrentUser();
            if (!User.IsInRole("admin") && product.VendorId != currentUser.VendorId)
            {
                return new BadRequestObjectResult(new { error = "You don't have permission to manage this product" });
            }

            _productService.Delete(product);

            return Ok(product);
        }

        private static void MapProductVariationVmToProduct(ProductSaveResource model, Product product)
        {
            foreach (var variationVm in model.Product.Variations)
            {
                var productLink = new ProductLink
                {
                    LinkType = ProductLinkType.Super,
                    Product = product,
                    LinkedProduct = product.Clone()
                };

                productLink.LinkedProduct.Name = variationVm.Name;
                productLink.LinkedProduct.SeoTitle = variationVm.Name.ToUrlFriendly();
                productLink.LinkedProduct.Price = variationVm.Price;
                productLink.LinkedProduct.OldPrice = variationVm.OldPrice;
                productLink.LinkedProduct.NormalizedName = variationVm.NormalizedName;
                productLink.LinkedProduct.HasOptions = false;
                productLink.LinkedProduct.IsVisibleIndividually = false;

                foreach (var combinationVm in variationVm.OptionCombinations)
                {
                    productLink.LinkedProduct.AddOptionCombination(new ProductOptionCombination
                    {
                        OptionId = combinationVm.OptionId,
                        Value = combinationVm.Value,
                        SortIndex = combinationVm.SortIndex
                    });
                }

                productLink.LinkedProduct.ThumbnailImage = product.ThumbnailImage;

                product.AddProductLinks(productLink);
            }
        }

        private static void MapProductRelationVmToProduct(ProductSaveResource model, Product product)
        {
            foreach (var relationVm in model.Product.RelatedProducts)
            {
                var productLink = new ProductLink
                {
                    LinkType = ProductLinkType.Relation,
                    Product = product,
                    LinkedProductId = relationVm.Id
                };

                product.AddProductLinks(productLink);
            }
        }

        private void AddOrDeleteCategories(ProductSaveResource model, Product product)
        {
            foreach (var categoryId in model.Product.CategoryIds)
            {
                if (product.Categories.Any(x => x.CategoryId == categoryId))
                {
                    continue;
                }

                var productCategory = new ProductCategory
                {
                    CategoryId = categoryId
                };
                product.AddCategory(productCategory);
            }

            var deletedProductCategories =
                product.Categories.Where(productCategory => !model.Product.CategoryIds.Contains(productCategory.CategoryId))
                    .ToList();

            foreach (var deletedProductCategory in deletedProductCategories)
            {
                deletedProductCategory.Product = null;
                product.Categories.Remove(deletedProductCategory);
                _productCategoryRepository.Remove(deletedProductCategory);
            }
        }

        private void AddOrDeleteProductOption(ProductSaveResource model, Product product)
        {
            var optionIndex = 0;
            foreach (var optionVm in model.Product.Options)
            {
                var optionValue = product.OptionValues.FirstOrDefault(x => x.OptionId == optionVm.Id);
                if (optionValue == null)
                {
                    product.AddOptionValue(new ProductOptionValue
                    {
                        OptionId = optionVm.Id,
                        Value = JsonConvert.SerializeObject(optionVm.Values),
                        SortIndex = optionIndex
                    });
                }
                else
                {
                    optionValue.Value = JsonConvert.SerializeObject(optionVm.Values);
                    optionValue.SortIndex = optionIndex;
                }

                optionIndex++;
            }

            var deletedProductOptionValues = product.OptionValues.Where(x => model.Product.Options.All(vm => vm.Id != x.OptionId)).ToList();

            foreach (var productOptionValue in deletedProductOptionValues)
            {
                product.OptionValues.Remove(productOptionValue);
                _productOptionValueRepository.Remove(productOptionValue);
            }
        }

        private void AddOrDeleteProductVariation(ProductSaveResource model, Product product)
        {
            foreach (var productVariationVm in model.Product.Variations)
            {
                var productLink = product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Super).FirstOrDefault(x => x.LinkedProduct.Name == productVariationVm.Name);
                if (productLink == null)
                {
                    productLink = new ProductLink
                    {
                        LinkType = ProductLinkType.Super,
                        Product = product,
                        LinkedProduct = product.Clone()
                    };

                    productLink.LinkedProduct.Name = productVariationVm.Name;
                    productLink.LinkedProduct.SeoTitle = StringHelper.ToUrlFriendly(productVariationVm.Name);
                    productLink.LinkedProduct.Price = productVariationVm.Price;
                    productLink.LinkedProduct.OldPrice = productVariationVm.OldPrice;
                    productLink.LinkedProduct.NormalizedName = productVariationVm.NormalizedName;
                    productLink.LinkedProduct.HasOptions = false;
                    productLink.LinkedProduct.IsVisibleIndividually = false;

                    foreach (var combinationVm in productVariationVm.OptionCombinations)
                    {
                        productLink.LinkedProduct.AddOptionCombination(new ProductOptionCombination
                        {
                            OptionId = combinationVm.OptionId,
                            Value = combinationVm.Value,
                            SortIndex = combinationVm.SortIndex
                        });
                    }

                    product.AddProductLinks(productLink);
                }
                else
                {
                    productLink.LinkedProduct.Price = productVariationVm.Price;
                    productLink.LinkedProduct.OldPrice = productVariationVm.OldPrice;
                    productLink.LinkedProduct.IsDeleted = false;
                }
            }

            foreach (var productLink in product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Super))
            {
                if (model.Product.Variations.All(x => x.Name != productLink.LinkedProduct.Name))
                {
                    _productLinkRepository.Remove(productLink);
                    productLink.LinkedProduct.IsDeleted = true;
                }
            }
        }

        // Due to some issue with EF Core, we have to use _productLinkRepository in this case.
        private void AddOrDeleteProductRelation(ProductSaveResource model, Product product)
        {
            foreach (var productRelationVm in model.Product.RelatedProducts)
            {
                var productLink = product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Relation).FirstOrDefault(x => x.LinkedProductId == productRelationVm.Id);
                if (productLink == null)
                {
                    productLink = new ProductLink
                    {
                        LinkType = ProductLinkType.Relation,
                        Product = product,
                        LinkedProductId = productRelationVm.Id,
                    };

                    _productLinkRepository.Add(productLink);
                }
            }

            foreach (var productLink in product.ProductLinks.Where(x => x.LinkType == ProductLinkType.Relation))
            {
                if (model.Product.RelatedProducts.All(x => x.Id != productLink.LinkedProductId))
                {
                    _productLinkRepository.Remove(productLink);
                }
            }
        }

        private void AddOrDeleteProductAttribute(ProductSaveResource model, Product product)
        {
            foreach (var ProductAttributeResource in model.Product.Attributes)
            {
                var productAttrValue =
                    product.AttributeValues.FirstOrDefault(x => x.AttributeId == ProductAttributeResource.Id);
                if (productAttrValue == null)
                {
                    productAttrValue = new ProductAttributeValue
                    {
                        AttributeId = ProductAttributeResource.Id,
                        Value = ProductAttributeResource.Value
                    };
                    product.AddAttributeValue(productAttrValue);
                }
                else
                {
                    productAttrValue.Value = ProductAttributeResource.Value;
                }
            }

            var deletedAttrValues =
                product.AttributeValues.Where(attrValue => model.Product.Attributes.All(x => x.Id != attrValue.AttributeId))
                    .ToList();

            foreach (var deletedAttrValue in deletedAttrValues)
            {
                deletedAttrValue.Product = null;
                product.AttributeValues.Remove(deletedAttrValue);
                _productAttributeValueRepository.Remove(deletedAttrValue);
            }
        }

        private void SaveProductMedias(ProductSaveResource resource, Product product)
        {
            if (resource.ThumbnailImage != null)
            {
                var fileName = SaveFile(resource.ThumbnailImage);
                if (product.ThumbnailImage != null)
                {
                    product.ThumbnailImage.FileName = fileName;
                }
                else
                {
                    product.ThumbnailImage = new Media { FileName = fileName };
                }
            }
            // Currently model binder cannot map the collection of file productImages[0], productImages[1]
            foreach (var file in Request.Form.Files)
            {
                if (file.ContentDisposition.Contains("productImages"))
                {
                    resource.ProductImages.Add(file);
                }
                else if (file.ContentDisposition.Contains("productDocuments"))
                {
                    resource.ProductDocuments.Add(file);
                }
            }

            foreach (var file in resource.ProductImages)
            {
                var fileName = SaveFile(file);
                var productMedia = new ProductMedia
                {
                    Product = product,
                    Media = new Media { FileName = fileName, MediaType = MediaType.Image }
                };
                product.AddMedia(productMedia);
            }

            foreach (var file in resource.ProductDocuments)
            {
                var fileName = SaveFile(file);
                var productMedia = new ProductMedia
                {
                    Product = product,
                    Media = new Media { FileName = fileName, MediaType = MediaType.File, Caption = file.FileName }
                };
                product.AddMedia(productMedia);
            }
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