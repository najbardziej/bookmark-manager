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

namespace bookmark_manager.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class BookmarkController : ControllerBase
    {
        private readonly DataContext _context;
        public BookmarkController(DataContext context)
        {
            _context = context;
        }
        // GET: Bookmark
        [HttpGet]
        public ActionResult<List<Bookmark>> Get()
        {
            return _context.Bookmarks.ToList();
        }


        // GET: Bookmark/5
        [HttpGet("{id}")]
        public  async Task<ActionResult<BookmarkDto>> GetId(int id)
        {
            var bookmark =  await _context.Bookmarks.Include(x=>x.User).SingleOrDefaultAsync(x => x.Id == id);
            if (bookmark == null)
                return Unauthorized("Invalid bookmark ID");


            return Ok(new BookmarkDto
            {
                BookmarkTitle = bookmark.BookmarkTitle,
                BookmarkBody = bookmark.BookmarkBody,
                UserId = bookmark.User.Id
            });
        }



        // POST: Bookmark
        [HttpPost]
        public async Task<ActionResult> Create(BookmarkDto bookmarkDto) // Nie wiem co tu zwrocic
        {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == bookmarkDto.UserId);
            if (user == null)
                return BadRequest();
            
                await _context.Bookmarks.AddAsync(new Bookmark
                {
                    BookmarkTitle = bookmarkDto.BookmarkTitle,
                    BookmarkBody = bookmarkDto.BookmarkBody,
                    User = user
                });
                await _context.SaveChangesAsync();
                return Ok();
            
            
        }

        // PUT: Bookmark/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, BookmarkDto bookmarkDto)
        {
            //await _context.Entry(bookmarkDto) = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: Bookmark/Delete/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var bookmark = _context.Bookmarks.SingleOrDefault(x => x.Id == id);
            _context.Bookmarks.Remove(bookmark);
            await  _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
