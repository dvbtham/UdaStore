using System.Collections.Generic;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.ViewModel;

namespace UdaStore.Module.Catalog.Services
{
    public interface ICategoryService
    {
         IList<CategoryListItem> GetAllCategoryCustom();

         IList<Category> GetAll();

        void Create(Category category);

        void Update(Category category);

        void Delete(Category category);
    }
}