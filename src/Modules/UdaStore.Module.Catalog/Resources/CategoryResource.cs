using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace UdaStore.Module.Catalog.Resources
{
    public class CategoryResource
    {
        public CategoryResource()
        {
            IsPublished = true;
        }

        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public string SeoTitle { get; set; }

        public int DisplayOrder { get; set; }

        public bool PinToMenu { get; set; } = false;
        
        public string Description { get; set; }

        public long? ParentId { get; set; }

        public bool IsPublished { get; set; }

        public IFormFile ThumbnailImage { get; set; }

        public string ThumbnailImageUrl { get; set; }
    }

}