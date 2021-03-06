using System.Collections.Generic;
using System.Linq;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Catalog.Models;
using UdaStore.Module.Catalog.ViewModel;
using UdaStore.Module.Core.Services;

namespace UdaStore.Module.Catalog.Services
{
    public class CategoryService : ICategoryService
    {
        private const long CategoryEntityTypeId = 1;

        private readonly IRepository<Category> _categoryRepository;
        private readonly IEntityService _entityService;

        public CategoryService(IRepository<Category> categoryRepository, IEntityService entityService)
        {
            _categoryRepository = categoryRepository;
            _entityService = entityService;
        }

        public IList<Category> GetAll()
        {
            return _categoryRepository.Query().OrderByDescending(x => x.Id).ToList();
        }

        public IList<CategoryListItem> GetAllCategoryCustom()
        {
            var categories = _categoryRepository.Query().Where(x => !x.IsDeleted).ToList();
            var categoriesList = new List<CategoryListItem>();
            foreach (var category in categories)
            {
                var categoryListItem = new CategoryListItem
                {
                    Id = category.Id,
                    IsPublished = category.IsPublished,
                    Name = category.Name
                };

                var parentCategory = category.Parent;
                while (parentCategory != null)
                {
                    categoryListItem.Name = $"{parentCategory.Name} >> {categoryListItem.Name}";
                    parentCategory = parentCategory.Parent;
                }

                categoriesList.Add(categoryListItem);
            }

            return categoriesList.OrderBy(x => x.Name).ToList();
        }

        public void Create(Category category)
        {
            using (var transaction = _categoryRepository.BeginTransaction())
            {
                category.SeoTitle = _entityService.ToSafeSlug(category.SeoTitle, category.Id, CategoryEntityTypeId);
                _categoryRepository.Add(category);
                _categoryRepository.SaveChange();

                _entityService.Add(category.Name, category.SeoTitle, category.Id, CategoryEntityTypeId);
                _categoryRepository.SaveChange();

                transaction.Commit();
            }
        }

        public void Update(Category category)
        {
            category.SeoTitle = _entityService.ToSafeSlug(category.SeoTitle, category.Id, CategoryEntityTypeId);
            _entityService.Update(category.Name, category.SeoTitle, category.Id, CategoryEntityTypeId);
            _categoryRepository.SaveChange();
        }

        public void Delete(Category category)
        {
            _categoryRepository.Remove(category);
            _categoryRepository.SaveChange();
        }
    }
}