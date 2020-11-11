using Duende.IdentityServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory
{
    public class InMemoryApiResources : IRepository<ApiResource>
    {
        private readonly IEnumerable<ApiResource> store = new List<ApiResource>
        {
            new ApiResource
            {
                Name = "api1",
                DisplayName = "API #1",
                Description = "Allow the application to access API #1 on your behalf",
                Scopes = new List<string> {"api1.read", "api1.write"},
                ApiSecrets = new List<Secret> 
                {
                    new Secret("ScopeSecret".Sha256())
                },
                UserClaims = new List<string> {"role"}
            }
        };

        public IEnumerable<ApiResource> Get()
        {
            return store;
        }
    }
}
