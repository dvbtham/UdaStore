using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Catalog.ViewModels
{
    public class BrandForm
    {
        public BrandForm()
        {
            IsPublished = true;
        }

        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsPublished { get; set; }
    }
}
