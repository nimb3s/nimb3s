using Duende.IdentityServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory
{
    public class InMemoryIdentityResources : IRepository<IdentityResource>
    {
        public readonly IEnumerable<IdentityResource> store = new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Email(),
            new IdentityResource
            {
                Name = "role",
                UserClaims = new List<string>{ "" }
            }
        };

        public IEnumerable<IdentityResource> Get()
        {
            return store;
        }
    }
}
