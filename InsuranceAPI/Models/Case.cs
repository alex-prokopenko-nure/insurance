using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Models
{
    public class Case
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("number")]
        public string Number { get; set; }

        [BsonElement("holder")]
        public Holder Holder { get; set; }

        [BsonElement("date")]
        public DateTime Date { get; set; }

        [BsonElement("damages")]
        public IEnumerable<Damage> Damages { get; set; }
    }
}
