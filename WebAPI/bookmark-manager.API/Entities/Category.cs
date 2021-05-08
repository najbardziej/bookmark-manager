using System.Collections.Generic;

namespace bookmark_manager.API.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NodeLevel { get; set; }
        public List<Category> Subcategories { get; set; }
        public User User { get; set; }
    }
}