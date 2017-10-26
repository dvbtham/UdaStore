using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Catalog.Models
{
    public class ProductOptionValue : EntityBase
    {
        public long OptionId { get; set; }

        public virtual ProductOption Option { get; set; }

        public long ProductId { get; set; }

        public Product Product { get; set; }

        public string Value { get; set; }

        public int SortIndex { get; set; }
    }
}
