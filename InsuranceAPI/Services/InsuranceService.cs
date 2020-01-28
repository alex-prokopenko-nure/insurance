using InsuranceAPI.Models;
using InsuranceAPI.Models.Settings;
using InsuranceAPI.Services.Abstractions;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Services
{
    public class InsuranceService : IInsuranceService
    {
        private const string _caseCollectionName = "cases";
        private readonly string _connectionString;
        private readonly IMongoCollection<Case> _cases;

        public InsuranceService(ApplicationSettings appSettings)
        {
            _connectionString = appSettings.MongoDBSettings.ConnectionString;
            var connection = new MongoUrlBuilder(_connectionString);
            MongoClient client = new MongoClient(_connectionString);
            IMongoDatabase database = client.GetDatabase(connection.DatabaseName);
            _cases = database.GetCollection<Case>(_caseCollectionName);
        }

        public async Task<Case> CreateCase(Case caseModel)
        {
            await _cases.InsertOneAsync(caseModel);
            return caseModel;
        }

        public async Task DeleteCase(string id)
        {
            await _cases.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }

        public async Task<Case> GetCase(string id)
        {
            return await _cases.Find(new BsonDocument("_id", new ObjectId(id))).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Case>> GetCases()
        {
            var builder = new FilterDefinitionBuilder<Case>();
            var filter = builder.Empty;

            return await _cases.Find(filter).ToListAsync();
        }

        public async Task<Case> UpdateCase(string id, Case caseModel)
        {
            await _cases.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(id)), caseModel);
            return caseModel;
        }
    }
}
