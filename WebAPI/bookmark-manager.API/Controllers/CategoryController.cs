using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bookmark_manager.API.Data;
using bookmark_manager.API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using bookmark_manager.API.Dtos;
using Microsoft.EntityFrameworkCore;
using bookmark_manager.API.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AutoMapper;

namespace bookmark_manager.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{userId}/{categoryId}")]
        public async Task<ActionResult<Category>> GetCategoryById(int userId, int categoryId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var category = await _context.Categories.Include(c => c.Subcategories).SingleOrDefaultAsync(c => c.Id == categoryId);

            var categoryToReturn = _mapper.Map<CategoryDto>(category);
            return categoryToReturn == null ? NoContent() : Ok(categoryToReturn);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Category>>> GetCategories(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var categories = await _context.Categories.Include(c => c.Subcategories).Where(c => c.User.UserId == userId).ToListAsync();

            return categories == null ? NoContent() : Ok(categories);
        }
    }
}
