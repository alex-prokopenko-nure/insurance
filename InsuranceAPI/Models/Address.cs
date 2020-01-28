using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Models
{
    public class Address
    {
        [BsonElement("street")]
        public string Street { get; set; }

        [BsonElement("streetNumber")]
        public int StreetNumber { get; set; }

        [BsonElement("postalCode")]
        public string PostalCode { get; set; }

        [BsonElement("cityId")]
        public int CityId { get; set; }
    }
}
