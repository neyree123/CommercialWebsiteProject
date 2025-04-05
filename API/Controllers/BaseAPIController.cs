using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.RequestHelpers;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseAPIController : ControllerBase
{
    protected async Task<ActionResult> CreatePageResult<T>(IGenericRepository<T> repo, 
        ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
        {
            var items = await repo.ListAsync(spec);
            var count = await repo.CountAsync(spec);

            var pagination = new Pagination<T>(pageIndex, pageSize, count, items);

            return Ok(pagination);
        }
}

