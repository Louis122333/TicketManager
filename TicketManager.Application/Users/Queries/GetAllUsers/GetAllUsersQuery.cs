using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Users.Queries.GetAllUsers
{
    public record GetAllUsersQuery : IRequest<ErrorOr<IReadOnlyList<User>>>;
}
