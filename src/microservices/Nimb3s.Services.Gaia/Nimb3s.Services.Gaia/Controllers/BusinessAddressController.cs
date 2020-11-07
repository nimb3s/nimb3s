using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nimb3s.Services.Gaia.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Nimb3s.Services.Gaia.Controllers
{
    [ODataRoutePrefix("BusinessAddress")]
    public class BusinessAddressController : ODataController
    {
        private GaiaContext ctx;

        public BusinessAddressController(GaiaContext ctx)
        {
            this.ctx = ctx;
        }

        [EnableQuery(PageSize = 30)]
        [ODataRoute]
        public IQueryable<BusinessAddress> Get()
        {
            return ctx.BusinessAddress.AsQueryable();
        }

        [ODataRoute("{id}")]
        public async Task<BusinessAddress> Get([FromODataUri] int id)
        {
            return await ctx.BusinessAddress.FindAsync(id);
        }

        public async Task<IActionResult> Put([FromODataUri] int key, BusinessAddress model)
        {
            ctx.Entry(model).State = EntityState.Modified;

            await ctx.SaveChangesAsync();

            return Updated(model);
        }

        public async Task<IActionResult> Post(BusinessAddress model)
        {
            await ctx.BusinessAddress.AddRangeAsync(model);

            await ctx.SaveChangesAsync();

            return Created(model);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] long key, Delta<BusinessAddress> model)
        {
            var entity = await ctx.BusinessAddress.FindAsync(key);

            model.Patch(entity);

            await ctx.SaveChangesAsync();

            return Updated(entity);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] int key)
        {
            var entity = await ctx.BusinessAddress.FindAsync(key);

            ctx.BusinessAddress.Remove(entity);

            await ctx.SaveChangesAsync();

            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}
