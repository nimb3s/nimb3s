using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nimb3s.Services.Gaia.Middleware
{
    public class SuperBasaicIdentityMiddleware
    {
        private readonly RequestDelegate next;

        public SuperBasaicIdentityMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            await this.next(httpContext);
        }
    }
}
