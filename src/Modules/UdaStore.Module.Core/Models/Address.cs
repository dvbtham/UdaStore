using System.Collections.Generic;
using System.Collections.ObjectModel;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Core.Models
{
    public class Address : EntityBase
    {
        public string ContactName { get; set; }

        public string Phone { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public long DistrictId { get; set; }

        public virtual District District { get; set; }

        public long StateOrProvinceId { get; set; }

        public virtual StateOrProvince StateOrProvince { get; set; }

        public long CountryId { get; set; }

        public virtual Country Country { get; set; }

        public ICollection<UserAddress> UserAddresses { get; set; }

        public Address()
        {
            UserAddresses = new Collection<UserAddress>();
        }
    }
}
