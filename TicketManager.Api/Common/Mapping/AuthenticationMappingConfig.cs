using Mapster;
using Microsoft.AspNetCore.Identity.Data;
using TicketManager.Application.Authentication.Commands.Register;
using TicketManager.Application.Authentication.Common;
using TicketManager.Application.Authentication.Queries.Login;
using TicketManager.Contracts.Authentication.Responses;

namespace TicketManager.Api.Common.Mapping
{
    public class AuthenticationMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RegisterRequest, RegisterCommand>();
            config.NewConfig<LoginRequest, LoginQuery>();
            config.NewConfig<AuthenticationResult, AuthenticationResponse>()
                .Map(dest => dest.Id, src => src.User.Id.Value.ToString())
                .Map(dest => dest, src => src.User);
        }
    }
}
