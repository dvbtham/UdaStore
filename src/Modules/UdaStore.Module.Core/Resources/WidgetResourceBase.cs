using System;
using System.ComponentModel.DataAnnotations;

namespace UdaStore.Module.Core.Resources
{
    public class WidgetResourceBase
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        public long WidgetZoneId { get; set; }

        public DateTimeOffset? PublishStart { get; set; }

        public DateTimeOffset? PublishEnd { get; set; }
    }
}