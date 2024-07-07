using TicketManager.Application.Common.Interfaces.Services;

namespace TicketManager.Infrastructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
