using AutoMapper;
using UdaStore.Module.Catalog.Models;
using UdaStore.Web.Core.Resources;
using UdaStore.Infrastructure;

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
        }
        private void ResourceToDomain()
        {
            CreateMap<BrandResource, Brand>()
                .ForMember(b => b.SeoTitle, opt => opt.MapFrom(br => br.Name.ToUrlFriendly()));
        }
    }
}
