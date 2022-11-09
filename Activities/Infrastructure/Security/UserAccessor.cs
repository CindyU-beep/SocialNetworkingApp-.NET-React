using System.Security.Claims;
using Application.Activities.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
//Access user objects from API in Application
    public class UserAccessor : UsernameAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

        }
        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}