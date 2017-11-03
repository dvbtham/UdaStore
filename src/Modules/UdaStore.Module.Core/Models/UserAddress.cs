﻿using System;
using SimplCommerce.Module.Core.Models;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Core.Models
{
    public class UserAddress : EntityBase
    {
        public long UserId { get; set; }

        public User User { get; set; }

        public long AddressId { get; set; }

        public Address Address { get; set; }

        public AddressType AddressType { get; set; }

        public DateTimeOffset? LastUsedOn { get; set; }
    }
}
