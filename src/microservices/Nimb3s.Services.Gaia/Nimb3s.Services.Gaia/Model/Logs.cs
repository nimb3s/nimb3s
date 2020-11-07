using System;
using System.Collections.Generic;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class Logs
    {
        public long Id { get; set; }
        public string LogEntry { get; set; }
        public DateTimeOffset? InsertDate { get; set; }
    }
}
