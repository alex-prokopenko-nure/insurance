using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceAPI.Models.Settings;
using InsuranceAPI.Services;
using InsuranceAPI.Services.Abstractions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InsuranceAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Configuration.Bind(ApplicationSettings.Instance);

            services
                .AddSingleton(ApplicationSettings.Instance)
                .AddScoped<IInsuranceService, InsuranceService>()
                .AddCors()
                .AddOpenApiDocument()
                .AddControllers();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(builder =>
                builder
                  .SetIsOriginAllowed(isOriginAllowed: _ => true)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());

            app.UseOpenApi()
               .UseSwaggerUi3()
               .UseReDoc();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
