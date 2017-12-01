using UdaStore.Module.Cms.Models;

namespace UdaStore.Module.Cms.Services
{
    public interface IPageService
    {
         void Create(Page page);

        void Update(Page page);

        void Delete(Page page);
    }
}