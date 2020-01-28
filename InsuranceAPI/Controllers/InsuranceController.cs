using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsuranceAPI.Models;
using InsuranceAPI.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("insurance")]
    public class InsuranceController : ControllerBase
    {

        private readonly ILogger<InsuranceController> _logger;
        private readonly IInsuranceService _insuranceService;

        public InsuranceController(
            ILogger<InsuranceController> logger,
            IInsuranceService insuranceService
            )
        {
            _logger = logger;
            _insuranceService = insuranceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> Get()
        {
            var result = await _insuranceService.GetCases();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Case>> Get([FromRoute]string id)
        {
            var result = await _insuranceService.GetCase(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Case>> Post([FromBody]Case caseModel)
        {
            var result = await _insuranceService.CreateCase(caseModel);
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<IEnumerable<Case>>> Patch([FromRoute]string id, [FromBody]Case caseModel)
        {
            var result = await _insuranceService.UpdateCase(id, caseModel);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Case>>> Delete([FromRoute]string id)
        {
            await _insuranceService.DeleteCase(id);
            return NoContent();
        }
    }
}
