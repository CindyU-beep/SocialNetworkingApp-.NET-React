using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return ResultHandler(await Mediator.Send(new List.Query()));
        }

        //Require Authorisation
        [Authorize]
        [HttpGet("{id}")] 
        public async Task<IActionResult> GetActivity(Guid id){

            return ResultHandler(await Mediator.Send(new Details.Query{Id = id}));
        
        }

        //NEW ENDPOINTS 

        [HttpPost] //CREATE ACTIVITY
        public async Task<IActionResult> CreateActivity(Activity activity) // looks inside body of activity to retrieve data
        //IActionResult gives access to http response type 
        {
            return ResultHandler(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")] //EDIT ACTIVITY
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return ResultHandler(await Mediator.Send(new Edit.Command{Activity = activity})); 
        }

        [HttpDelete("{id}")] //DELETE ACTIVITY
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return ResultHandler(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}