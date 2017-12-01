using AutoMapper;
using UdaStore.Module.Catalog.Models;
using UdaStore.Infrastructure;
using UdaStore.Module.Catalog.Resources;
using UdaStore.Module.Cms.Models;
using UdaStore.Module.Cms.Resources;

namespace UdaStore.Web.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            DomainToResource();
            ResourceToDomain();
        }

        private void DomainToResource()
        {
            CreateMap<Category, CategoryResource>()
                .ForMember(c => c.Id, opt => opt.MapFrom(cr => cr.Id))
                .ForMember(c => c.Name, opt => opt.MapFrom(cr => cr.Name))
                .ForMember(c => c.SeoTitle, opt => opt.MapFrom(cr => cr.Name.ToUrlFriendly()))
                .ForMember(c => c.Description, opt => opt.MapFrom(cr => cr.Description))
                .ForMember(c => c.ParentId, opt => opt.MapFrom(cr => cr.ParentId))
                .ForMember(c => c.PinToMenu, opt => opt.MapFrom(cr => cr.PinToMenu))
                .ForMember(c => c.DisplayOrder, opt => opt.MapFrom(cr => cr.DisplayOrder))
                .ForMember(c => c.ThumbnailImage, opt => opt.Ignore())
                .ForMember(c => c.IsPublished, opt => opt.MapFrom(cr => cr.IsPublished));

            CreateMap<Brand, BrandResource>();
            CreateMap<ProductAttributeGroup, ProductAttributeGroupResource>();
            CreateMap<ProductTemplate, ProductTemplateResource>();
            CreateMap<Page, PageResource>();

        }
        private void ResourceToDomain()
        {
            CreateMap<CategoryResource, Category>()
               .ForMember(c => c.Id, opt => opt.Ignore())
               .ForMember(c => c.Name, opt => opt.MapFrom(cr => cr.Name))
               .ForMember(c => c.SeoTitle, opt => opt.MapFrom(cr => cr.Name.ToUrlFriendly()))
               .ForMember(c => c.Description, opt => opt.MapFrom(cr => cr.Description))
               .ForMember(c => c.ParentId, opt => opt.MapFrom(cr => cr.ParentId))
               .ForMember(c => c.PinToMenu, opt => opt.MapFrom(cr => cr.PinToMenu))
               .ForMember(c => c.DisplayOrder, opt => opt.MapFrom(cr => cr.DisplayOrder))
               .ForMember(c => c.IsPublished, opt => opt.MapFrom(cr => cr.IsPublished))
               .ForMember(c => c.ThumbnailImage, opt => opt.Ignore())
               ;

            CreateMap<PageResource, Page>()
            .ForMember(p => p.Id, opt => opt.Ignore());
            
            CreateMap<BrandResource, Brand>()
                .ForMember(b => b.SeoTitle, opt => opt.MapFrom(br => br.Name.ToUrlFriendly()));
        }
    }
}
