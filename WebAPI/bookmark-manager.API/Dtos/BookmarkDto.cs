using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace bookmark_manager.API.Dtos
{
    public class BookmarkDto
    {
        [Required]
        [MinLength(1)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public int UserId { get; set; }

        public CategoryInBookmarkDto Category { get; set; }

        public List<TagDto> Tags { get; set; }
    }
}
