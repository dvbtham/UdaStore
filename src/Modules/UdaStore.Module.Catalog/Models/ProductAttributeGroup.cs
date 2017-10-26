using System.Collections.Generic;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Catalog.Models
{
    public class ProductAttributeGroup : EntityBase
    {
        public string Name { get; set; }

        public virtual IList<ProductAttribute> Attributes { get; set; } = new List<ProductAttribute>();
    }
}
