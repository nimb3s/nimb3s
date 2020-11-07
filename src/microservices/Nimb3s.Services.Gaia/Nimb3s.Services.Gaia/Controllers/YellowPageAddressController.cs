using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nimb3s.Services.Gaia.Controllers
{
    [ODataRoutePrefix("YellowPageAddress")]
    public class YellowPageAddressController : ODataController
    {
        private GaiaContext ctx;

        public YellowPageAddressController(GaiaContext ctx)
        {
            this.ctx = ctx;
        }

        [EnableQuery(PageSize = 10)]
        [ODataRoute]
        public IQueryable<YellowPageAddress> Get()

        {
            return ctx.YellowPageAddress.AsQueryable();
        }

        [ODataRoute("{id}")]
        public async Task<YellowPageAddress> Get([FromODataUri] int id)
        {
            return await ctx.YellowPageAddress.FindAsync(id);
        }
    }
}
