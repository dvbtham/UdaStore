using System.Collections.Generic;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Localization.Models
{
    public class Culture : EntityBase
    {
        public string Name { get; set; }

        public IList<Resource> Resources { get; set; }
    }
}
