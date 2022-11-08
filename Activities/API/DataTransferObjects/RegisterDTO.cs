using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataTransferObjects
{
    public class RegisterDTO
    {
        //display name required
        [Required]
        public string DisplayName {get; set;}

        // required and of type email 
        [Required]
        [EmailAddress]
        public string Email {get; set;}

        //password and setup regex for validation 
        [Required]
        [RegularExpression("(?=.*[a-z])(?=.*[A-Z]).{4,}$",
        ErrorMessage ="Password must be at least 4 characters long, contain at least 1 unique character, 1 upper case, 1 lower case character")]
        public string Password {get; set;}
        
        //username required
        [Required]
public string Username {get; set;}

    }
}