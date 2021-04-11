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
        }
    }
}