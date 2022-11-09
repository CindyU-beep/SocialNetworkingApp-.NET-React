using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")] 
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }

        //NEW ENDPOINTS 

        [HttpPost] //CREATE ACTIVITY
        public async Task<IActionResult> CreateActivity(Activity activity) // looks inside body of activity to retrieve data
        //IActionResult gives access to http response type 
        {
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")] //EDIT ACTIVITY
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity})); 
        }

        [HttpDelete("{id}")] //DELETE ACTIVITY
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

 
    }
}