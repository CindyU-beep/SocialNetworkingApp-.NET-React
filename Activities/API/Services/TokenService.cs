using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{

//function to return a JwT token for users to use to authenticate with API 
    public class TokenService
    {
        private IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
            
        }

        public string CreateToken(AppUser user){
            var claims = new List<Claim>
            {
                //Token sent to API 
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            //sign a token using a key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

            //sign in credentials
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //signin token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials
            };

            //Token Handler
            var tokenHandler = new JwtSecurityTokenHandler();
            
            //create token
            var token = tokenHandler.CreateToken(tokenDescriptor);


            //return token 
            return tokenHandler.WriteToken(token);
            

        }
        
    }
}