using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using UdaStore.Infrastructure;
using UdaStore.Module.Core.Extensions;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Persistence;
using UdaStore.Web.Extensions;

namespace UdaStore.Web
{
    public class Startup
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfiguration _configuration;

        private static readonly IList<ModuleInfo> Modules = new List<ModuleInfo>();
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            _configuration = configuration;
            _hostingEnvironment = env;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            GlobalConfiguration.WebRootPath = _hostingEnvironment.WebRootPath;
            GlobalConfiguration.ContentRootPath = _hostingEnvironment.ContentRootPath;
            services.LoadInstalledModules(_hostingEnvironment.ContentRootPath);

            services.AddCustomizedDataStore(_configuration);
            services.AddCustomizedIdentity();

            services.AddSingleton<IConfiguration>(_configuration);
            services.AddScoped<SignInManager<User>, UdaSignInManager<User>>();
            services.AddScoped<IWorkContext, WorkContext>();

            services.Configure<PhotoSettings>(_configuration.GetSection("PhotoSettings"));
            services.Configure<FileSettings>(_configuration.GetSection("FileSettings"));

            services.AddAutoMapper();

            services.AddCustomizedMvc(GlobalConfiguration.Modules);

            services.AddMvc();

            return services.Build(_configuration, _hostingEnvironment);
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

            app.UseCustomizedStaticFiles(env);
            app.UseCustomizedIdentity();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
