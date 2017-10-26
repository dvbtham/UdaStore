using System.ComponentModel.DataAnnotations;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Catalog.Models
{
    public class Brand : EntityBase
    {
        public string Name { get; set; }

        public string SeoTitle { get; set; }

        [StringLength(5000)]
        public string Description { get; set; }

        public bool IsPublished { get; set; }

        public bool IsDeleted { get; set; }
    }
}
