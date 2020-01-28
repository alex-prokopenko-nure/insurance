using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Models.Settings
{
    public class ApplicationSettings
    {
        public static ApplicationSettings Instance { get; set; } = new ApplicationSettings();

        public MongoDBSettings MongoDBSettings { get; set; }
    }
}
