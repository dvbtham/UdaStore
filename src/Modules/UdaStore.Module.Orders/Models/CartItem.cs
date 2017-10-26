using System;
using UdaStore.Infrastructure.Models;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Core.Models;

namespace UdaStore.Module.Orders.Models
{
    public class CartItem : EntityBase
    {
        public DateTimeOffset CreatedOn { get; set; }

        public long UserId { get; set; }

        public virtual User User { get; set; }

        public long ProductId { get; set; }

        public virtual Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
