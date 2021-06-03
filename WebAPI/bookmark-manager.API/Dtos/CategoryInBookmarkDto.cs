using System;
using bookmark_manager.API.Entities;

namespace bookmark_manager.API.Dtos
{
    public class CategoryInBookmarkDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NodeLevel { get; set; }
    }
}