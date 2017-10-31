using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Catalog.Resources
{
    public class ProductAttributeResource
    {
       public long Id { get; set; }

        public long AttributeValueId { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }

        public string GroupName { get; set; }
    }
}