using UdaStore.Module.Catalog.Models;

namespace UdaStore.Module.Catalog.Services
{
    public interface IProductService
    {
        void Create(Product product);

        void Update(Product product);

        void Delete(Product product);
    }
}