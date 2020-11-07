using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class YellowPageAddress
    {
        public int Id { get; set; }
        public string ListingUrl { get; set; }
        public string BusinessName { get; set; }
        public string BusinessType { get; set; }
        public string Tags { get; set; }
        public string StreetAddress { get; set; }
        public string Locality { get; set; }
        public string Region { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; }
        public DateTimeOffset? InsertDate { get; set; }
    }
}
