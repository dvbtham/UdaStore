using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Catalog.Resources
{
    public class ProductAttributeGroupResource
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}