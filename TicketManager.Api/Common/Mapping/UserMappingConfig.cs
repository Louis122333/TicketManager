using Mapster;
using TicketManager.Application.Users.Commands.Update;
using TicketManager.Contracts.Users.Requests;
using TicketManager.Contracts.Users.Responses;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Api.Common.Mapping
{
    public class USerMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, UserResponse>()
                .Map(dest => dest.Id, src => src.Id.Value.ToString())
                .Map(dest => dest.FullName, src => src.FirstName + " " + src.LastName)
                .Map(dest => dest.Email, src => src.Email)
                .Map(dest => dest.Role, src => src.Role.ToString());

            config.NewConfig<User, UserDetailedResponse>()
                .Map(dest => dest.UserId, src => src.Id.Value.ToString())
                .Map(dest => dest.FirstName, src => src.FirstName)
                .Map(dest => dest.LastName, src => src.LastName)
                .Map(dest => dest.Email, src => src.Email)
                .Map(dest => dest.Role, src => src.Role.ToString())
                .Map(dest => dest.CreatedDate, src => src.CreatedDate.ToLocalTime());
        }
    }
}
