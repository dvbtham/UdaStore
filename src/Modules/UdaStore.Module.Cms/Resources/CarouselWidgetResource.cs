using System.Collections.Generic;
using UdaStore.Module.Core.Resources;

namespace UdaStore.Module.Cms.Resources
{
    public class CarouselWidgetResource : WidgetResourceBase
    {
         public IList<CarouselWidgetItemResource> Items = new List<CarouselWidgetItemResource>();
    }
}