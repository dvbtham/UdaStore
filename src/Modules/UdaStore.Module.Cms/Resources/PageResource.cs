using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Cms.Resources
{
    public class PageResource
    {
        public PageResource()
        {
            IsPublished = true;
        }

        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string SeoTitle { get; set; }

        [Required]
        public string Body { get; set; }

        public bool IsPublished { get; set; }
    }
}