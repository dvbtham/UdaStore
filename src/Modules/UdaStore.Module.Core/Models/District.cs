﻿using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Core.Models
{
    public class District : EntityBase
    {
        public long StateOrProvinceId { get; set; }

        public virtual StateOrProvince StateOrProvince { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public string Location { get; set; }
    }
}
