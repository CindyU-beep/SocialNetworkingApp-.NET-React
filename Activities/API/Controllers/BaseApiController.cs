using Application.Activities.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

        private  IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult ResultHandler<T>(Result<T> result){
                        //if activity found, return success
            if(result.IsSuccess && result.Value != null){
                return Ok(result.Value);
            }

            //if activity not found, return not found error
            if(result.IsSuccess && result.Value == null){
                return NotFound();
            }
            
            //if request unsuccessful, return bad request error 
            return BadRequest(result.Error);
        }
    }
}