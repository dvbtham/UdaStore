using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Persistence;

namespace UdaStore.Module.Core.Extensions
{
     public class UdaUserStore : UserStore<User, Role, UdaStoreDbContext, long, IdentityUserClaim<long>, UserRole,
        IdentityUserLogin<long>,IdentityUserToken<long>, IdentityRoleClaim<long>>
    {
        public UdaUserStore(UdaStoreDbContext context, IdentityErrorDescriber describer) : base(context, describer)
        {
        }
    }
}