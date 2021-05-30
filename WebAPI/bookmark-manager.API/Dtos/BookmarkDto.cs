using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace bookmark_manager.API.Dtos
{
    public class BookmarkDto
    {
        public int BookmarkId { get; set; }
        [Required]
        [MinLength(1)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Url { get; set; }
        public CategoryInBookmarkDto Category { get; set; }
        public List<TagDto> Tags { get; set; }
    }
}