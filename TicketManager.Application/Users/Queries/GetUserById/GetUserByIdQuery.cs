using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Users.Queries.GetUserById
{
    public record GetUserByIdQuery(Guid UserId) : IRequest<ErrorOr<User>>;
}
