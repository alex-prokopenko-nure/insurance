using InsuranceAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAPI.Services.Abstractions
{
    public interface IInsuranceService
    {
        Task<IEnumerable<Case>> GetCases();

        Task<Case> GetCase(string id);

        Task<Case> CreateCase(Case caseModel);

        Task<Case> UpdateCase(string id, Case caseModel);

        Task DeleteCase(string id);
    }
}
