using AutoMapper;
using UdaStore.Module.Catalog.Models;
using UdaStore.Infrastructure;
using UdaStore.Module.Catalog.Resources;

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
            CreateMap<Brand, BrandResource>();
            CreateMap<ProductAttributeGroup, ProductAttributeGroupResource>();
            CreateMap<ProductTemplate, ProductTemplateResource>();
        }
        private void ResourceToDomain()
        {
            CreateMap<BrandResource, Brand>()
                .ForMember(b => b.SeoTitle, opt => opt.MapFrom(br => br.Name.ToUrlFriendly()));
        }
    }
}
