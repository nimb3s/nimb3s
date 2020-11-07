using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class CleanTerritory
    {
        public int Id { get; set; }
        public int TerritoryNumber { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string StreetName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Filename { get; set; }
    }
}
