using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Stores;
using Duende.IdentityServer.Test;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory;

namespace Nimb3s.Services.Identity.Server
{
    /*https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4*/
    public class Startup
    {
        public const string AppS3BucketKey = "AppS3Bucket";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors(o => o.AddPolicy("LaxedPolicy", b =>
            {
                b.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
            }));

            // Add S3 to the ASP.NET Core dependency injection framework.


            services.AddAWSService<Amazon.S3.IAmazonS3>();

            var pemData = Regex.Replace(Regex.Replace(Constants.CERT, @"\s+", string.Empty), @"-+[^-]+-+", string.Empty);
            var pemBytes = Convert.FromBase64String(pemData);

            services.AddIdentityServer()
                .AddInMemoryClients(new InMemoryClients().Get())
                .AddInMemoryIdentityResources(new InMemoryIdentityResources().Get())
                .AddInMemoryApiResources(new InMemoryApiResources().Get())
                .AddInMemoryApiScopes(new InMemoryApiScopes().Get())
                .AddTestUsers(new InMemoryUsers().Get().ToList())
                .AddSigningCredential(new X509Certificate2(pemBytes, "password1", X509KeyStorageFlags.Exportable));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors("LaxedPolicy");

            app.UseRouting();
            app.UseIdentityServer();

            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
