using AutoMapper;
using bookmark_manager.API.Dtos;
using bookmark_manager.API.Entities;

namespace bookmark_manager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, RegisterDto>().ReverseMap();
            CreateMap<User, LoginDto>().ReverseMap();
            CreateMap<Bookmark, BookmarkDto>();
            CreateMap<BookmarkDto, Bookmark>()
            .ForMember(dest => dest.BookmarkId, field => field.Ignore());
            CreateMap<CategoryDto, Category>()
            .ForMember(dest => dest.Id, field => field.Ignore())
                .ReverseMap();
            CreateMap<CategoryInBookmarkDto, Category>()
                .ReverseMap();
            CreateMap<TagDto, Tag>().ReverseMap();
        }
    }
}