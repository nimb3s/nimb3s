using Duende.IdentityServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory
{
    public class InMemoryApiScopes
    {
        private readonly IEnumerable<ApiScope> store = new List<ApiScope>
        {
            new ApiScope("api1.read", "Read Access to API #1"),
            new ApiScope("api1.write", "Write Access to API #1")
        };

        public IEnumerable<ApiScope> Get()
        {
            return store;
        }
    }
}
