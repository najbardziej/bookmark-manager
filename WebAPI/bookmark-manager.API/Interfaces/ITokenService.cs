using bookmark_manager.API.Entities;

namespace bookmark_manager.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}