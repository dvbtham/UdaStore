using System.Collections.Generic;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Catalog.Models
{
    public class ProductAttribute : EntityBase
    {
        public string Name { get; set; }

        public long GroupId { get; set; }

        public virtual ProductAttributeGroup Group { get; set; }

        public virtual IList<ProductTemplateProductAttribute> ProductTemplates { get; protected set; } = new List<ProductTemplateProductAttribute>();
    }
}
