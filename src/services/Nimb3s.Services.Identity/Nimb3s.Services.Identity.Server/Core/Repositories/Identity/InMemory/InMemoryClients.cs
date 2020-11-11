using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using Microsoft.AspNetCore.DataProtection.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory
{
    public interface IRepository<T>
    {
        IEnumerable<T> Get();
    }

    public class InMemoryClients : IRepository<Client>
    {
        private readonly IEnumerable<Client> store = new List<Client>
        {
            new Client
            {
                ClientId = "oauthClient",
                ClientName = "Example client application using client credentials",
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = new List<Secret> {new Secret("SuperSecretPassword".Sha256())}, // change me!
                AllowedScopes = new List<string> {"api1.read"}
            }
        };

        public IEnumerable<Client> Get()
        {
            return store;
        }
    }
}
