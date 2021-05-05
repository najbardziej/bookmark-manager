using Microsoft.EntityFrameworkCore.Migrations;

namespace bookmark_manager.API.Data.Migrations
{
    public partial class AddUrlToBookmark : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Bookmarks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Bookmarks");
        }
    }
}
