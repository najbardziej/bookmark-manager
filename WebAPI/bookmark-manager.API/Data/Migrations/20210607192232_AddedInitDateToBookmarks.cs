using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bookmark_manager.API.Data.Migrations
{
    public partial class AddedInitDateToBookmarks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedAt",
                table: "Bookmarks",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedAt",
                table: "Bookmarks");
        }
    }
}
