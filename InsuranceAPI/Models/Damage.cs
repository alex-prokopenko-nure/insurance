using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Models
{
    public class Damage
    {
        [BsonElement("type")]
        public string Type { get; set; }

        [BsonElement("amount")]
        public int Amount { get; set; }
    }
}
