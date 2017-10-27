using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UdaStore.Infrastructure;
using UdaStore.Module.Catalog.Services;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Persistence;
using UdaStore.WebApp.Extensions;

namespace UdaStore.WebApp
{
    public class Startup
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private static readonly IList<ModuleInfo> Modules = new List<ModuleInfo>();
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _hostingEnvironment = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            GlobalConfiguration.WebRootPath = _hostingEnvironment.WebRootPath;
            GlobalConfiguration.ContentRootPath = _hostingEnvironment.ContentRootPath;
            services.LoadInstalledModules(Modules, _hostingEnvironment);

            services.AddDbContext<UdaStoreDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddSingleton<IConfiguration>(Configuration);

            //services.AddScoped<IBrandService, BrandService>();

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<UdaStoreDbContext>()
                .AddDefaultTokenProviders();

            services.AddCustomizedMvc(GlobalConfiguration.Modules);

            services.AddMvc();

            return services.Build(Configuration, _hostingEnvironment);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapSpaFallbackRoute(
                //    name: "spa-fallback",
                //    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
