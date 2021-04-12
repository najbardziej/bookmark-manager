using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bookmark_manager.API.Entities
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string BookmarkTitle { get; set; }
        public string BookmarkBody { get; set; }
        public User User { get; set; }


    }
}
