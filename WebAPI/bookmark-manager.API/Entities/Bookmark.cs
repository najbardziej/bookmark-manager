using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace bookmark_manager.API.Entities
{
    public class Bookmark
    {
        public int BookmarkId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public Category Category { get; set; }

        public List<Tag> Tags { get; set; }
    }
}
