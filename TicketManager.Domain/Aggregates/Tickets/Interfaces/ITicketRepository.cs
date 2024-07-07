using TicketManager.Domain.Aggregates.Tickets.Entities;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Domain.Aggregates.Tickets.Interfaces
{
    public interface ITicketRepository
    {
        /// <summary>
        /// Adds a new ticket asynchronously to the repository.
        /// </summary>
        /// <param name="ticket">The ticket object to add.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task AddAsync(Ticket ticket);

        /// <summary>
        /// Adds a comment asynchronously to an existing ticket in the repository.
        /// </summary>
        /// <param name="ticket">The ticket to which the comment will be added.</param>
        /// <param name="comment">The comment object to add.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task AddCommentAsync(Ticket ticket, Comment comment);

        /// <summary>
        /// Retrieves a ticket by its unique identifier asynchronously.
        /// </summary>
        /// <param name="ticketId">The unique identifier of the ticket.</param>
        /// <returns>
        /// A task that represents the asynchronous operation. 
        /// The task result contains the ticket if found; otherwise, null.
        /// </returns>
        Task<Ticket?> GetByIdAsync(TicketId ticketId);

        /// <summary>
        /// Retrieves all tickets associated with a specific user asynchronously.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains a read-only list of tickets associated with the user.
        /// </returns>
        Task<IReadOnlyList<Ticket>> GetByUserIdAsync(UserId userId);

        /// <summary>
        /// Retrieves all tickets in the repository asynchronously.
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains a read-only list of all tickets in the repository.
        /// </returns>
        Task<IReadOnlyList<Ticket>> GetAllAsync();

        /// <summary>
        /// Retrieves tickets with a specific status asynchronously.
        /// </summary>
        /// <param name="status">The status of the tickets to retrieve.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains a read-only list of tickets with the specified status.
        /// </returns>
        Task<IReadOnlyList<Ticket>> GetByStatusAsync(TicketStatus status);

        /// <summary>
        /// Retrieves tickets of a specific type asynchronously.
        /// </summary>
        /// <param name="type">The type of tickets to retrieve.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains a read-only list of tickets of the specified type.
        /// </returns>
        Task<IReadOnlyList<Ticket>> GetByTypeAsync(TicketType type);

        /// <summary>
        /// Updates the status of a ticket asynchronously.
        /// </summary>
        /// <param name="ticket">The ticket to update.</param>
        /// <param name="status">The new status of the ticket.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains the updated ticket object.
        /// </returns>
        Task<Ticket> UpdateStatusAsync(Ticket ticket, TicketStatus status);

        /// <summary>
        /// Updates the priority of a ticket asynchronously.
        /// </summary>
        /// <param name="ticket">The ticket to update.</param>
        /// <param name="priority">The new priority of the ticket.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains the updated ticket object.
        /// </returns>
        Task<Ticket> UpdatePriorityAsync(Ticket ticket, TicketPriority priority);

        /// <summary>
        /// Assigns a ticket to a user asynchronously.
        /// </summary>
        /// <param name="ticket">The ticket to assign.</param>
        /// <param name="assignedTo">The user to whom the ticket will be assigned.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains the updated ticket object.
        /// </returns>
        Task<Ticket> AssignToUserAsync(Ticket ticket, UserId assignedTo);

        /// <summary>
        /// Checks if a ticket with the specified reference number exists asynchronously.
        /// </summary>
        /// <param name="referenceNumber">The reference number to check.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result is true if a ticket with the reference number exists; otherwise, false.
        /// </returns>
        Task<bool> ExistsByReferenceNumberAsync(ReferenceNumber referenceNumber);
    }
}
