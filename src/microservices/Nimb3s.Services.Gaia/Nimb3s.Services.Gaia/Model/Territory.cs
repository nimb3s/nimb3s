using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class Territory
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Territory1 { get; set; }
        public string City { get; set; }
        public string Zipcode { get; set; }
        public string StreetName { get; set; }
        public string StreetAddress { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public string TerritoryType { get; set; }
    }
}
