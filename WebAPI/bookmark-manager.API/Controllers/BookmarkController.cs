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
    public class BookmarkController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public BookmarkController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        // GET: bookmark/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<BookmarkDto>>> GetUserBookmarks(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bookmarks = await _context.Bookmarks.Include(b => b.User).Where(b => b.UserId == userId).ToListAsync();

            if(bookmarks == null)
                return NoContent();

            var bookmarksToReturn = _mapper.Map<List<BookmarkDto>>(bookmarks);
            return Ok(bookmarksToReturn);
        }


        // GET: bookmark/{userId}/5
        [HttpGet("{userId}/{id}")]
        public async Task<ActionResult<BookmarkDto>> GetUserBookmarkById(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bookmark = await _context.Bookmarks.Include(x => x.User).SingleOrDefaultAsync(x => x.BookmarkId == id);

            if (bookmark == null)
                return NoContent();

            var bookmarkToReturn = _mapper.Map<BookmarkDto>(bookmark);

            return Ok(bookmarkToReturn);
        }

        // POST: bookmark/{userId}
        [HttpPost("{userId}")]
        public async Task<ActionResult> CreateBookmark(int userId, BookmarkDto bookmarkDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            if(user == null)
                return BadRequest("Cound not find a user");

            var bookmarkToAdd = new Bookmark
            {
                Title = bookmarkDto.Title,
                Content = bookmarkDto.Content,
                Url = bookmarkDto.Url,
                User = user
            };

            await _context.Bookmarks.AddAsync(bookmarkToAdd);

            if(await _context.SaveChangesAsync() > 0)
                return CreatedAtAction(nameof(GetUserBookmarkById), new {userId = user.UserId, id = bookmarkToAdd.BookmarkId}, bookmarkDto);

            throw new Exception("Failed to create bookmark");           
        }

        // PUT: bookmark/{userId}/5
        [HttpPut("{userId}/{id}")]
        public async Task<ActionResult> UpdateBookmark(int userId, int id, BookmarkDto bookmarkDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            var bookmark = await _context.Bookmarks.SingleOrDefaultAsync(x => x.BookmarkId == id);

            if (bookmark == null)
                return BadRequest("Invalid bookmark ID");

            _mapper.Map(bookmarkDto, bookmark);

            _context.Entry(bookmark).State = EntityState.Modified;

            if(await _context.SaveChangesAsync() > 0)
                return NoContent();

            throw new Exception("Failed to update bookmark");
        }

        // DELETE: bookmark/1/delete/5
        [HttpDelete("{userId}/delete/{id}")]
        public async Task<ActionResult> Delete(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var bookmark = await _context.Bookmarks.SingleOrDefaultAsync(x => x.BookmarkId == id);

            if (bookmark == null)
                return BadRequest("Invalid bookmark ID");

            _context.Bookmarks.Remove(bookmark);

            if(await _context.SaveChangesAsync() > 0)
                return Ok();

            throw new Exception("Failed to remove bookmark");
        }
    }
}
