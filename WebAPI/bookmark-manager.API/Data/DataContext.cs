using bookmark_manager.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace bookmark_manager.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bookmark>()
                .HasOne(p => p.User)
                .WithMany(b => b.Bookmarks)
                .HasForeignKey(p => p.UserId);
        }
    }
}