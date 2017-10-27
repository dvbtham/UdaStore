using UdaStore.Module.Catalog.Models;

namespace UdaStore.Module.Catalog.Services
{
    public interface IBrandService
    {
        void Create(Brand brand);

        void Update(Brand brand);

        void Delete(long id);

        void Delete(Brand brand);
    }
}
