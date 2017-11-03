using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Persistence;

namespace UdaStore.Module.Core.Extensions
{
    public class UdaRoleStore: RoleStore<Role, UdaStoreDbContext, long, UserRole, IdentityRoleClaim<long>>
    {
        public UdaRoleStore(UdaStoreDbContext context) : base(context)
        {
        }
    }
}