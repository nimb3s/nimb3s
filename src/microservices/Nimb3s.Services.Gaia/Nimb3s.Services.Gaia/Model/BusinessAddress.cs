using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class BusinessAddress
    {
        public long Id { get; set; }
        public string ListingUrl { get; set; }
        public string Name { get; set; }
        public string BusinessType { get; set; }
        public string StreetAddress { get; set; }
        public string Language { get; set; }
        public string Locality { get; set; }
        public string Region { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Tags { get; set; }
        public DateTimeOffset InsertTimeStamp { get; set; }
        public bool IsVerified { get; set; }
    }
}
