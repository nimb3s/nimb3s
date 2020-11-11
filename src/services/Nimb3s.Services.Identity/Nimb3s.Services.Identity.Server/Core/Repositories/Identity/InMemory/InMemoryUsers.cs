using Duende.IdentityServer.Test;
using IdentityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Nimb3s.Services.Identity.Server.Core.Repositories.Identity.InMemory
{
    public class InMemoryUsers
    {
        private readonly IEnumerable<TestUser> store = new List<TestUser>
        {
            new TestUser 
            {
                SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                Username = "scott",
                Password = "password",
                Claims = new List<Claim> 
                {
                    new Claim(JwtClaimTypes.Email, "scott@scottbrady91.com"),
                    new Claim(JwtClaimTypes.Role, "admin")
                }
            }
        };

        public IEnumerable<TestUser> Get()
        {
            return store;
        }
    }
}
