using System.ComponentModel.DataAnnotations;

namespace bookmark_manager.API.Dtos
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}