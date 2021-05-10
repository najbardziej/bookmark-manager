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
        private const int _MAX_NESTING = 3;
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

            var category = await _context.Categories.Include(c => c.Subcategories)
                                                    .ThenInclude(c => c.Subcategories)
                                                    .SingleOrDefaultAsync(c => c.Id == categoryId);

            var categoryToReturn = _mapper.Map<CategoryDto>(category);
            return categoryToReturn == null ? NoContent() : Ok(categoryToReturn);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Category>>> GetCategories(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var categories = await _context.Categories.Include(c => c.Subcategories)
                                                        .ThenInclude(c => c.Subcategories)
                                                        .Where(c => c.User.UserId == userId)
                                                        .ToListAsync();

            return categories == null ? NoContent() : Ok(categories);
        }      


        [HttpPost("{userId}/{categoryId?}")]
        public async Task<ActionResult> CreateCategory(int userId, int categoryId, CategoryDto categoryDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var category = await _context.Categories.Include(c => c.Subcategories).SingleOrDefaultAsync(c => c.Id == categoryId);
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);


            if(category.NodeLevel >= _MAX_NESTING)
                return BadRequest($"Nest level cannot be higher than { _MAX_NESTING }");
            
            var categoryToAdd = new Category
            {
                Name = categoryDto.Name,
                NodeLevel = 1,
                Subcategories = new List<Category>(),
                User = user
            };

            if(category == null)
                _context.Categories.Add(categoryToAdd);
            else
            {
                categoryToAdd.NodeLevel = category.NodeLevel + 1;
                category.Subcategories.Add(categoryToAdd);
            }

            if(await _context.SaveChangesAsync() > 0)
                return CreatedAtAction(nameof(GetCategoryById), new {userId = userId, categoryId = categoryId}, categoryDto);
            
            throw new Exception("Failed to create category");
        }

        [HttpPut("{userId}/{categoryId}")]
        public async Task<ActionResult> UpdateCategory(int userId, int categoryId, CategoryDto categoryDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var category = await _context.Categories.Include(c => c.Subcategories)
                                                    .ThenInclude(c => c.Subcategories)
                                                    .Include(c => c.User)
                                                    .SingleOrDefaultAsync(c => c.Id == categoryId);

            if(category == null)
                return BadRequest("Invalid category id");

            _mapper.Map(categoryDto, category);

            _context.Entry(category).State = EntityState.Modified;

            if(await _context.SaveChangesAsync() > 0)
                return NoContent();

            throw new Exception("Failed to update category");
        }

        /* TO FIX */
        [HttpDelete("{userId}/{categoryId}")]
        public async Task<ActionResult> RemoveCategory(int userId, int categoryId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var category = await _context.Categories.Include(c => c.Subcategories)
                                                    .ThenInclude(c => c.Subcategories)
                                                    .SingleOrDefaultAsync(c => c.Id == categoryId);


            foreach(var cat in category.Subcategories)
            {
                if(category.NodeLevel == 2)
                {
                    foreach(var cat2 in cat.Subcategories)
                        _context.Categories.Remove(cat2);
                }
                _context.Categories.Remove(cat);
            }

            _context.Categories.Remove(category);

            if(await _context.SaveChangesAsync() > 0)
                return Ok();

            throw new Exception("Failed to remove category");
        }
    }
}
