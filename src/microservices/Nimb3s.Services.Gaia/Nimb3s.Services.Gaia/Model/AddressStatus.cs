using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class AddressStatus
    {
        public int Id { get; set; }
        public int AddressId { get; set; }
        public string Status { get; set; }
        public DateTime? DateVisited { get; set; }
    }
}
