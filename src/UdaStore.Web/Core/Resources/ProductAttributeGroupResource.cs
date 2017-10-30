using System.ComponentModel.DataAnnotations;

namespace UdaStore.Web.Core.Resources
{
    public class ProductAttributeGroupResource
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}