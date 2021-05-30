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

        [HttpGet]
        public async Task<ActionResult<List<BookmarkDto>>> GetUserBookmarks()
        {
            var bookmarks = await _context.Bookmarks.Include(b => b.User)
                                                    .Include(b => b.Category)
                                                    .Include(b => b.Tags)
                                                    .Where(b => b.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                                                    .ToListAsync();

            return bookmarks == null ? NoContent() : Ok(_mapper.Map<List<BookmarkDto>>(bookmarks));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BookmarkDto>> GetUserBookmarkById(int id)
        {
            var bookmark = await _context.Bookmarks.Include(x => x.User)
                                                    .Include(b => b.Category)
                                                    .Include(b => b.Tags)
                                                    .SingleOrDefaultAsync(x => x.BookmarkId == id &&
                                                     x.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            return bookmark == null ? NoContent() : Ok(_mapper.Map<BookmarkDto>(bookmark));
        }

        [HttpPost]
        public async Task<ActionResult> CreateBookmark(BookmarkDto bookmarkDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            if (user == null)
                return BadRequest("Cound not find a user");

            Category category = null;
            if (bookmarkDto.Category != null)
                category = await _context.Categories.SingleOrDefaultAsync(x => x.Id == bookmarkDto.Category.Id);
            
            List<Tag> tags = new List<Tag>();
            if (bookmarkDto.Tags.Any())
            {
                foreach(TagDto tag in bookmarkDto.Tags)
                {
                    var tagToAdd = await _context.Tags.SingleOrDefaultAsync(t => t.Id == tag.Id);
                    if (tagToAdd != null)
                        tags.Add(tagToAdd);
                }
            }


            var bookmarkToAdd = new Bookmark
            {
                Title = bookmarkDto.Title,
                Content = bookmarkDto.Content,
                Url = bookmarkDto.Url,
                User = user,
            };

            if (category != null)
                bookmarkToAdd.Category = category;
            if (tags != null)
                bookmarkToAdd.Tags = tags;

            await _context.Bookmarks.AddAsync(bookmarkToAdd);

            if (await _context.SaveChangesAsync() > 0)
                return CreatedAtAction(nameof(GetUserBookmarkById), new { userId = user.UserId, id = bookmarkToAdd.BookmarkId }, bookmarkDto);

            throw new Exception("Failed to create bookmark");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBookmark(int id, BookmarkDto bookmarkDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            var bookmark = await _context.Bookmarks.Include(b => b.Category)
                                                   .Include(b => b.Tags)
                                                   .SingleOrDefaultAsync(x => x.BookmarkId == id);

            if (bookmark == null)
                return BadRequest("Invalid bookmark ID");

            _mapper.Map(bookmarkDto, bookmark);

            _context.Entry(bookmark).State = EntityState.Modified;

            if (await _context.SaveChangesAsync() > 0)
                return NoContent();

            throw new Exception("Failed to update bookmark");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var bookmark = await _context.Bookmarks.Include(b => b.Category).Include(b => b.Tags).SingleOrDefaultAsync(x => x.BookmarkId == id &&
                 x.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            if (bookmark == null)
                return BadRequest("Invalid bookmark ID");

            _context.Bookmarks.Remove(bookmark);

            if (await _context.SaveChangesAsync() > 0)
                return Ok();

            throw new Exception("Failed to remove bookmark");
        }
    }
}