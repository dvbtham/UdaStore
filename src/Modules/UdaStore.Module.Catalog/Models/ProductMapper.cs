using System.Linq;
using UdaStore.Infrastructure;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Module.Core.Models;

namespace UdaStore.Module.Catalog.Models
{
    public static class ProductMapper
    {
        public static void Modify(this Product product, ProductSaveResource resource, User currentUser, bool isUpdated = false)
        {
            product.Name = resource.Product.Name;
            product.SeoTitle = resource.Product.Name.ToUrlFriendly();
            product.ShortDescription = resource.Product.ShortDescription;
            product.Description = resource.Product.Description;
            product.Specification = resource.Product.Specification;
            product.Price = resource.Product.Price;
            product.OldPrice = resource.Product.OldPrice;
            product.SpecialPrice = resource.Product.SpecialPrice;
            product.SpecialPriceStart = resource.Product.SpecialPriceStart;
            product.SpecialPriceEnd = resource.Product.SpecialPriceEnd;
            product.IsPublished = resource.Product.IsPublished;
            product.IsFeatured = resource.Product.IsFeatured;
            product.IsCallForPricing = resource.Product.IsCallForPricing;
            product.IsAllowToOrder = resource.Product.IsAllowToOrder;
            product.BrandId = resource.Product.BrandId;
            product.StockQuantity = resource.Product.StockQuantity;
            product.HasOptions = resource.Product.Variations.Any() ? true : false;
           
            if (!isUpdated)
            {
                product.IsVisibleIndividually = true;
                product.CreatedBy = currentUser;
            }
            else
                product.UpdatedBy = currentUser;

        }
    }
}