
using System.Security.Claims;
using API.DataTransferObjects;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        //Handles LOGIN for users
        [HttpPost("login")]
        public async Task<ActionResult<DataTransferObjects.UserDTO>> Login(DataTransferObjects.LoginDTO loginDTO){
            //get user object from database using email
            var user= await _userManager.FindByEmailAsync(loginDTO.Email);
            //if no user, return unauthorised error
            if (user == null) return Unauthorized();

            //attempts to log user in
            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDTO.Password,false);

            if(result.Succeeded){ //if success log user in
                return CreateUserObj(user);

            } return Unauthorized(); //else, return unauthorised

        }

        //REGISTER new user
        [HttpPost("register")]

        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO){
            //if email already exists, return bad request error
            if(await _userManager.Users.AnyAsync(x=> x.Email == registerDTO.Email)){
                return BadRequest("Email already in use");
            } 
            //if username already exists, return bad request error
            if(await _userManager.Users.AnyAsync(x=> x.UserName == registerDTO.Username)){
                return BadRequest("Username already in use");
            }

            // new user requirements
            var user = new AppUser{
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
            };

            //attempt to create new user
            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if(result.Succeeded){ 
                //if success, return new user object 
                return CreateUserObj(user);
            }
            //if not successful, return bad request
            return BadRequest("We ran into a problem with registering");    
        }

        //get a current user, ensure authorised
        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObj(user);
        }

        //helper method to create new user objects
        private UserDTO CreateUserObj(AppUser user){
            return new UserDTO{
                DisplayName = user.DisplayName,
                ProfileImage = null,
                Token= _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}