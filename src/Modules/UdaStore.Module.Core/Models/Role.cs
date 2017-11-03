using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Core.Models
{
    public class Role : IdentityRole<long>, IEntityWithTypedId<long>
    {
         public IList<UserRole> Users { get; set; } = new List<UserRole>();
    }
}