using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketManager.Application.Tickets.Commands.AssignToUser;
using TicketManager.Application.Tickets.Commands.CreateComment;
using TicketManager.Application.Tickets.Commands.CreateTicket;
using TicketManager.Application.Tickets.Commands.UpdateTicketPriority;
using TicketManager.Application.Tickets.Commands.UpdateTicketStatus;
using TicketManager.Application.Tickets.Queries.GetAllTickets;
using TicketManager.Application.Tickets.Queries.GetTicketsByStatus;
using TicketManager.Application.Tickets.Queries.GetTicketsByType;
using TicketManager.Application.Tickets.Queries.GetTicketsByUserId;
using TicketManager.Contracts.Tickets.Requests;
using TicketManager.Contracts.Tickets.Responses;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Api.Controllers
{
    [Route("tickets")]
    public class TicketController : ApiController
    {
        private readonly ISender _mediator;
        private readonly IMapper _mapper;

        public TicketController(ISender mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            var query = new GetAllTicketsQuery();

            var result = await _mediator.Send(query);

            return result.Match(
                tickets => Ok(_mapper.Map<IReadOnlyList<TicketDetailedResponse>>(tickets)),
                Problem);
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpGet("status/{ticketStatus}")]
        public async Task<IActionResult> GetTicketsByStatus(string ticketStatus)
        {
            if (!Enum.TryParse<TicketStatus>(ticketStatus, true, out var status))
            {
                return BadRequest("Invalid ticket status");
            }

            var query = new GetTicketsByStatusQuery(ticketStatus);

            var result = await _mediator.Send(query);

            return result.Match(
                tickets => Ok(_mapper.Map<IReadOnlyList<TicketDetailedResponse>>(tickets)),
                Problem);
        }


        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpGet("type/{ticketType}")]
        public async Task<IActionResult> GetTicketsByType(string ticketType)
        {
            if (!Enum.TryParse<TicketType>(ticketType, true, out var type))
            {
                return BadRequest("Invalid ticket type");
            }

            var query = new GetTicketsByTypeQuery(ticketType);

            var result = await _mediator.Send(query);

            return result.Match(
                tickets => Ok(_mapper.Map<IReadOnlyList<TicketDetailedResponse>>(tickets)),
                Problem);
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTicketsByUserId(Guid userId)
        {
            var query = new GetTicketsByUserIdQuery(userId);

            var result = await _mediator.Send(query);

            return result.Match(
                tickets => Ok(_mapper.Map<IReadOnlyList<TicketDetailedResponse>>(tickets)),
                Problem);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyTickets()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            var query = new GetTicketsByUserIdQuery(userId);

            var result = await _mediator.Send(query);

            return result.Match(
                tickets => Ok(_mapper.Map<IReadOnlyList<TicketResponse>>(tickets)),
                Problem);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            if (!Enum.TryParse<TicketType>(request.Type, true, out var ticketType))
            {
                return BadRequest("Invalid ticket type");
            }

            var command = new CreateTicketCommand(
                UserId: UserId.Create(userId).Value,
                Title: request.Title,
                Description: request.Description,
                Type: request.Type);

            var result = await _mediator.Send(command);

            return result.Match(
                ticket => Ok(_mapper.Map<TicketResponse>(ticket)),
                Problem);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{ticketId}/comments")]
        public async Task<IActionResult> CreateComment(Guid ticketId, CreateCommentRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userRoleClaim = User.FindFirst(ClaimTypes.Role);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            if (!Enum.TryParse<UserRole>(userRoleClaim?.Value, out var userRole))
            {
                return Forbid();
            }

            var command = new CreateCommentCommand(
                TicketId: ticketId,
                Text: request.Text,
                UserId: UserId.Create(userId).Value,
                Role: userRole.ToString()
            );

            var result = await _mediator.Send(command);

            return result.Match(
                comment => Ok(_mapper.Map<CommentResponse>(comment)),
                Problem);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "Administrator, HelpDesk")]
        [HttpPut("{ticketId}/assign")]
        public async Task<IActionResult> AssignToUser(Guid ticketId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized();
            }

            var command = new AssignToUserCommand(
                TicketId: ticketId,
                UserId: UserId.Create(userId).Value);

            var result = await _mediator.Send(command);

            return result.Match(
                ticket => Ok(_mapper.Map<TicketResponse>(ticket)),
                Problem);
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpPut("{ticketId}/status")]
        public async Task<IActionResult> UpdateStatus(Guid ticketId, [FromBody] UpdateTicketStatusRequest request)
        {
            if (!Enum.TryParse<TicketStatus>(request.Status, true, out var ticketStatus))
            {
                return BadRequest("Invalid ticket status");
            }

            var command = new UpdateTicketStatusCommand(
                TicketId: ticketId,
                Status: request.Status);

            var result = await _mediator.Send(command);

            return result.Match(
                ticket => Ok(_mapper.Map<TicketDetailedResponse>(ticket)),
                Problem);
        }

        [Authorize(Roles = "Administrator, HelpDesk")]
        [HttpPut("{ticketId}/priority")]
        public async Task<IActionResult> UpdatePriority(Guid ticketId, [FromBody] UpdateTicketPriorityRequest request)
        {
            if (!Enum.TryParse<TicketPriority>(request.Priority, true, out var ticketPriority))
            {
                return BadRequest("Invalid ticket priority");
            }

            var command = new UpdateTicketPriorityCommand(
                TicketId: ticketId,
                Priority: request.Priority);

            var result = await _mediator.Send(command);

            return result.Match(
                ticket => Ok(_mapper.Map<TicketDetailedResponse>(ticket)),
                Problem);
        }
    }
}
