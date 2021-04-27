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
        // GET: bookmark/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<BookmarkDto>>> Get(int userId)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _context.Users.Include(b => b.Bookmarks).SingleOrDefaultAsync(x => x.UserName.Equals(claim.Value));

            if (userId != user.UserId)
            {
                return Unauthorized();
            }

            List<BookmarkDto> bookmarks=new List<BookmarkDto>();

            foreach(Bookmark bookmark in user.Bookmarks.ToList())
            {
                bookmarks.Add(new BookmarkDto
                {
                    Title = bookmark.Title,
                    Content = bookmark.Content,
                    Url = bookmark.Url,
                    UserId = bookmark.User.UserId
                });
            }

            return Ok(bookmarks);
        }


        // GET: bookmark/{userId}/5
        [HttpGet("{userId}/{id}")]
        public  async Task<ActionResult<BookmarkDto>> GetId(int userId,int id)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName.Equals(claim.Value));

            if (userId != user.UserId)
            {
                return Unauthorized("It's not your bookmark!");
            }

            var bookmark =  await _context.Bookmarks.Include(x=>x.User).SingleOrDefaultAsync(x => x.BookmarkId == id);
            if (bookmark == null)
                return Unauthorized("Invalid bookmark ID");


            return Ok(new BookmarkDto
            {
                Title = bookmark.Title,
                Content = bookmark.Content,
                Url = bookmark.Url,
                UserId = bookmark.User.UserId
            });
        }



        // POST: bookmark/{userId}
        [HttpPost("{userId}")]
        public async Task<ActionResult> Create(int userId, BookmarkDto bookmarkDto) // Nie wiem co tu zwrocic
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _context.Users.Include(b => b.Bookmarks).SingleOrDefaultAsync(x => x.UserName.Equals(claim.Value));

            if (userId != user.UserId)
            {
                return Unauthorized("You can't add bookmark to another user!");
            }

            if (user == null)
                return BadRequest();

            await _context.Bookmarks.AddAsync(new Bookmark
            {
                Title = bookmarkDto.Title,
                Content = bookmarkDto.Content,
                Url = bookmarkDto.Url,
                User = user
            });
                await _context.SaveChangesAsync();
                return Ok();           
        }

        // PUT: bookmark/{userId}/5
        [HttpPut("{userId}/{id}")]
        public async Task<ActionResult> Edit(int userId, int id, BookmarkDto bookmarkDto)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = await _context.Users.Include(b => b.Bookmarks).SingleOrDefaultAsync(x => x.UserName.Equals(claim.Value));

            if (userId != user.UserId)
            {
                return Unauthorized("It's not your bookmark!");
            }


            var bookmark = _context.Bookmarks.Include(x => x.User).SingleOrDefault(x => x.BookmarkId == id);
            if (bookmark == null)
                return Unauthorized("Invalid bookmark ID");

            bookmark.Title = bookmarkDto.Title;
            bookmark.Content = bookmarkDto.Content;
            bookmark.Url = bookmarkDto.Url;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: bookmark/1/delete/5
        [HttpDelete("{userId}/delete/{id}")]
        public ActionResult Delete(int userId, int id)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user =  _context.Users.Include(b => b.Bookmarks).SingleOrDefault(x => x.UserName.Equals(claim.Value));

            if (userId != user.UserId)
            {
                return Unauthorized("It's not your bookmark!");
            }

            var bookmark = _context.Bookmarks.Include(x => x.User).SingleOrDefault(x => x.BookmarkId == id);
            if (bookmark == null)
                return Unauthorized("Invalid bookmark ID");

             _context.Bookmarks.Remove(bookmark);
             _context.SaveChanges();
            return Ok();
        }
    }
}
