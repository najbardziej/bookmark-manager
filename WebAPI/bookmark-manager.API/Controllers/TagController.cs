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
using System;
using System.Collections.Generic;
using System.Linq;

namespace bookmark_manager.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TagController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{userId}/{tagId}")]
        public async Task<ActionResult<Tag>> GetTagById(int userId, int tagId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var tag = await _context.Tags.SingleOrDefaultAsync(c => c.Id == tagId);

            return tag == null ? NoContent() : Ok(_mapper.Map<TagDto>(tag));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Tag>>> GetTags(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            //TODO
            var tags = await _context.Tags.Where(t => t.User.UserId == userId)
                                                        .ToListAsync();

            return tags == null ? NoContent() : Ok(_mapper.Map<List<TagDto>>(tags));
        }


        [HttpPost("{userId}/{tagId?}")]
        public async Task<ActionResult> CreateTag(int userId, int tagId, TagDto tagDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var tag = await _context.Tags.SingleOrDefaultAsync(t => t.Id == tagId);
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            var tagToAdd = new Tag
            {
                Name = tagDto.Name,
                User = user
            };
            // ????
            if (tag == null)
                _context.Tags.Add(tagToAdd);
            else
            {
                _context.Tags.Add(tagToAdd);
            }

            if (await _context.SaveChangesAsync() > 0)
                return CreatedAtAction(nameof(GetTagById), new { userId = userId, tagId = tagId }, tagDto);

            throw new Exception("Failed to create tag");
        }

        [HttpPut("{userId}/{tagId}")]
        public async Task<ActionResult> UpdateCategory(int userId, int tagId, TagDto tagDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var tag = await _context.Tags.Include(t => t.User).SingleOrDefaultAsync(t => t.Id == tagId);

            if (tag == null)
                return BadRequest("Invalid tag id");

            _mapper.Map(tagDto, tag);

            _context.Entry(tag).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0)
                return NoContent();

            throw new Exception("Failed to update tag");
        }

        [HttpDelete("{userId}/{tagId}")]
        public async Task<ActionResult> RemoveTag(int userId, int tagId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var tag = await _context.Tags.SingleOrDefaultAsync(t => t.Id == tagId);

            _context.Tags.Remove(tag);

            if (await _context.SaveChangesAsync() > 0)
                return Ok();

            throw new Exception("Failed to remove tag");
        }
    }
}
