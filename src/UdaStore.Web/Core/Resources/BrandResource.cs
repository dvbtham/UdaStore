using System.ComponentModel.DataAnnotations;
using UdaStore.Infrastructure;
namespace UdaStore.Web.Core.Resources
{
    public class BrandResource
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Tên nhãn hiệu là bắt buộc.")]
        [StringLength(256, ErrorMessage = "Chỉ nhập 256 ký tự")]
        public string Name { get; set; }

        public string SeoTitle { get; set; }

        public string Description { get; set; }

        public bool IsPublished { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        public BrandResource()
        {
            SeoTitle = Name.ToUrlFriendly();
        }
    }
}
