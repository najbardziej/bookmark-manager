using System.ComponentModel.DataAnnotations;

namespace bookmark_manager.API.Dtos
{
    public class BookmarkDto
    {
        [Required]
        [MinLength(1)]
        public string BookmarkTitle { get; set; }
        [Required]
        public string BookmarkBody { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
