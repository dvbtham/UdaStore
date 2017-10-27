using UdaStore.Infrastructure.Data;
using UdaStore.Infrastructure.Models;
using UdaStore.Module.Core.Persistence;

namespace UdaStore.Module.Core.Data
{
    public class Repository<T> : RepositoryWithTypedId<T, long>, IRepository<T>
       where T : class, IEntityWithTypedId<long>
    {
        public Repository(UdaStoreDbContext context) : base(context)
        {
        }
    }
}
