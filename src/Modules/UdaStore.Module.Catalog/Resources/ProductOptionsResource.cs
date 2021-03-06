using System.Collections.Generic;

namespace UdaStore.Module.Catalog.Resources
{
    public class ProductOptionsResource
    {
         public long Id { get; set; }

        public string Name { get; set; }

        public IList<string> Values { get; set; } = new List<string>();
    }
}