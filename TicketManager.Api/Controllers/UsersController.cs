using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketManager.Application.Users.Commands.Create;
using TicketManager.Application.Users.Commands.Update;
using TicketManager.Application.Users.Queries.GetAllUsers;
using TicketManager.Application.Users.Queries.GetUserById;
using TicketManager.Contracts.Users.Requests;
using TicketManager.Contracts.Users.Responses;
using TicketManager.Domain.Aggregates.Users.Enums;

namespace TicketManager.Api.Controllers
{
    [Route("users")]
    public class UsersController : ApiController
    {
        private readonly ISender _mediator;
        private readonly IMapper _mapper;

        public UsersController(ISender mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var query = new GetAllUsersQuery();
            var result = await _mediator.Send(query);

            return result.Match(
                users => Ok(_mapper.Map<IReadOnlyList<UserDetailedResponse>>(users)),
                Problem);
        }


        [Authorize(Roles = "Guest, Administrator, HelpDesk")]
        [HttpGet("{userid}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var query = new GetUserByIdQuery(userId);

            var result = await _mediator.Send(query);

            return result.Match(
                user => Ok(_mapper.Map<UserResponse>(user)),
                Problem);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserRequest request)
        {
            if (!Enum.TryParse<UserRole>(request.Role, true, out var userRole))
            {
                return BadRequest("Invalid user role");
            }

            var command = new CreateUserCommand(
                FirstName: request.FirstName,
                LastName: request.LastName,
                Email: request.Email,
                Password: request.Password,
                Role: userRole.ToString());

            var result = await _mediator.Send(command);

            return result.Match(
                user => Ok(_mapper.Map<UserResponse>(user)),
                Problem);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequest request)
        {
            if (!Enum.TryParse<UserRole>(request.Role, true, out var userRole))
            {
                return BadRequest("Invalid user role");
            }

            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (currentUserId == userId.ToString())
            {
                return BadRequest("You cannot change your own role.");
            }

            var command = new UpdateUserCommand(
                UserId: userId,
                Role: userRole.ToString());

            var result = await _mediator.Send(command);

            return result.Match(
                user => Ok(_mapper.Map<UserResponse>(user)),
                Problem);
        }
    }
}
