using Microsoft.EntityFrameworkCore;
using TicketManager.Domain.Aggregates.Tickets.Entities;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Infrastructure.Persistence.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly TicketManagerDbContext _context;

        public TicketRepository(TicketManagerDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task AddCommentAsync(Ticket ticket, Comment comment)
        {
            ticket.AddComment(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Ticket>> GetAllAsync()
        {
            return await _context.Tickets.AsNoTracking().ToListAsync();
        }

        public async Task<IReadOnlyList<Ticket>> GetByUserIdAsync(UserId userId)
        {
            return await _context.Tickets
                 .AsNoTracking()
                 .Where(t => t.CreatedBy == userId)
                 .ToListAsync();
        }

        public async Task<Ticket?> GetByIdAsync(TicketId id)
        {
            return await _context.Tickets
                .Include(t => t.Comments)
                .SingleOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IReadOnlyList<Ticket>> GetByTypeAsync(TicketType type)
        {
            return await _context.Tickets
                .AsNoTracking()
                .Where(t => t.Type == type)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Ticket>> GetByStatusAsync(TicketStatus status)
        {
            return await _context.Tickets
                .AsNoTracking()
                .Where(t => t.Status == status)
                .ToListAsync();
        }

        public async Task<Ticket> UpdatePriorityAsync(Ticket ticket, TicketPriority ticketPriority)
        {
            ticket.UpdatePriority(ticketPriority);
            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task<Ticket> UpdateStatusAsync(Ticket ticket, TicketStatus ticketStatus)
        {
            ticket.UpdateStatus(ticketStatus);
            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task<Ticket> AssignToUserAsync(Ticket ticket, UserId assignedTo)
        {
            _context.Tickets.Attach(ticket);
            ticket.AssignToUser(assignedTo);
            _context.Entry(ticket).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task<bool> ExistsByReferenceNumberAsync(ReferenceNumber referenceNumber)
        {
            return await _context.Tickets
                .AnyAsync(t => t.Number.Value == referenceNumber.Value);
        }
    }
}
