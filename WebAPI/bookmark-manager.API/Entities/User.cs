using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace bookmark_manager.API.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Bookmark> Bookmarks { get; set; }
    }
}