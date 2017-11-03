using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using UdaStore.Module.Catalog.ViewModel;

namespace UdaStore.Module.Catalog.Resources
{
    public class ProductSaveResource
    {
        public ProductVm Product { get; set; }

        public IFormFile ThumbnailImage { get; set; }

        public IList<IFormFile> ProductImages { get; set; } = new List<IFormFile>();

        public IList<IFormFile> ProductDocuments { get; set; } = new List<IFormFile>();
    }
}