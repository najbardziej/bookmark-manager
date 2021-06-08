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

        [HttpGet("{tagId}")]
        public async Task<ActionResult<Tag>> GetTagById(int tagId)
        {

            var tag = await _context.Tags.SingleOrDefaultAsync(t => t.Id == tagId
                                                                    && t.User.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            return tag == null ? NoContent() : Ok(_mapper.Map<TagDto>(tag));
        }

        [HttpGet]
        public async Task<ActionResult<List<Tag>>> GetTags()
        {

            var tags = await _context.Tags.Where(t => t.User.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                                                        .ToListAsync();

            return tags == null ? NoContent() : Ok(_mapper.Map<List<TagDto>>(tags));
        }


        [HttpPost("{tagId?}")]
        public async Task<ActionResult> CreateTag(int tagId, TagDto tagDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var tag = await _context.Tags.SingleOrDefaultAsync(t => t.Name.Equals(tagDto.Name) &&
                t.User.UserId == userId);
            
            if(tag != null)
                return BadRequest("Tag with that name already exists!");
        
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            var tagToAdd = new Tag
            {
                Name = tagDto.Name,
                User = user
            };

            await _context.Tags.AddAsync(tagToAdd);

            if (await _context.SaveChangesAsync() > 0)
                return CreatedAtAction(nameof(GetTagById), new { userId = userId, tagId = tagId }, tagDto);

            throw new Exception("Failed to create tag");
        }

        [HttpPut("{tagId}")]
        public async Task<ActionResult> UpdateCategory( int tagId, TagDto tagDto)
        {
            var tagExists = await _context.Tags.SingleOrDefaultAsync(t => t.Name.Equals(tagDto.Name));

            if(tagExists != null)
                return BadRequest("Tag with that name already exists");
            var tag = await _context.Tags.Include(t => t.User).SingleOrDefaultAsync(t => t.Id == tagId &&
                                                        t.User.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            if (tag == null)
                return BadRequest("Invalid tag id");

            _mapper.Map(tagDto, tag);

            _context.Entry(tag).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0)
                return NoContent();

            throw new Exception("Failed to update tag");
        }

        [HttpDelete("{tagId}")]
        public async Task<ActionResult> RemoveTag(int tagId)
        {
            var tag = await _context.Tags.SingleOrDefaultAsync(t => t.Id == tagId &&
                                                        t.User.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            _context.Tags.Remove(tag);

            if (await _context.SaveChangesAsync() > 0)
                return Ok();

            throw new Exception("Failed to remove tag");
        }
    }
}
