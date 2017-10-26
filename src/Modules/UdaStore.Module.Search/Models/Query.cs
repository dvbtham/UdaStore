using System;
using UdaStore.Infrastructure.Models;

namespace UdaStore.Module.Search.Models
{
    public class Query : EntityBase
    {
        public string QueryText { get; set; }

        public int ResultsCount { get; set; }

        public DateTimeOffset CreatedOn { get; set; }
    }
}
