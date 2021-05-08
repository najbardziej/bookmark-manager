using System.Collections.Generic;
using bookmark_manager.API.Entities;

namespace bookmark_manager.API.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NodeLevel { get; set; }
        public List<CategoryDto> Subcategories { get; set; }
    }
}