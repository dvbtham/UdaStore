using Microsoft.Extensions.DependencyInjection;

namespace UdaStore.Infrastructure
{
    public interface IModuleInitializer
    {
        void Init(IServiceCollection serviceCollection);
    }
}
