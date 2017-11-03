using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Core.Resources
{
    public class UserSaveResource
    {
        public long Id { get; set; }

        [Required]
        public string FullName { get; set; }

        public long? VendorId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public IList<long> RoleIds { get; set; } = new List<long>();
    }
}