using System;
using System.IO;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UdaStore.Module.Core.Persistence;
using UdaStore.Web.Extensions;

namespace UdaStore.Web
{
    public class MigrationUdaStoreDbContextFactory : IDesignTimeDbContextFactory<UdaStoreDbContext>
    {
        public UdaStoreDbContext CreateDbContext(string[] args)
        {
            var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var contentRootPath = Directory.GetCurrentDirectory();

            var builder = new ConfigurationBuilder()
                            .SetBasePath(contentRootPath)
                            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                            .AddJsonFile($"appsettings.{environmentName}.json", true);

            builder.AddEnvironmentVariables();
            var _configuration = builder.Build();

            //setup DI
            var containerBuilder = new ContainerBuilder();
            IServiceCollection services = new ServiceCollection();

            services.LoadInstalledModules(contentRootPath);
            services.AddCustomizedDataStore(_configuration);
            containerBuilder.Populate(services);
            var _serviceProvider = containerBuilder.Build().Resolve<IServiceProvider>();

            return _serviceProvider.GetRequiredService<UdaStoreDbContext>();
        }
    }
}