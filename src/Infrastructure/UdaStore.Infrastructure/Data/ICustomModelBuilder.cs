using Microsoft.EntityFrameworkCore;

namespace UdaStore.Infrastructure.Data
{
    public interface ICustomModelBuilder
    {
        void Build(ModelBuilder modelBuilder);
    }
}
