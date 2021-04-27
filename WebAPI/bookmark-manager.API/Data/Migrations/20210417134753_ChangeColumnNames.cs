using Microsoft.EntityFrameworkCore.Migrations;

namespace bookmark_manager.API.Data.Migrations
{
    public partial class ChangeColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookmarkBody",
                table: "Bookmarks");

            migrationBuilder.DropColumn(
                name: "BookmarkTitle",
                table: "Bookmarks");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Bookmarks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Bookmarks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Bookmarks");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Bookmarks");

            migrationBuilder.AddColumn<string>(
                name: "BookmarkBody",
                table: "Bookmarks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BookmarkTitle",
                table: "Bookmarks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
