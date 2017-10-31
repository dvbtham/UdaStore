using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Catalog.Resources
{
    public class ProductTemplateSaveResource
    {
         public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        public IList<ProductAttributeResource> Attributes { get; set; } = new List<ProductAttributeResource>();
    }
}