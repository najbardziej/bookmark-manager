using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace bookmark_manager.API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
    
    }
}
