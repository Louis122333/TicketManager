using Mapster;
using TicketManager.Contracts.Tickets.Responses;
using TicketManager.Domain.Aggregates.Tickets.Entities;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Api.Common.Mapping
{
    public class TicketMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Ticket, TicketResponse>()
                .Map(dest => dest.TicketId, src => src.Id.Value.ToString())
                .Map(dest => dest.ReferenceNumber, src => src.Number.Value)
                .Map(dest => dest.Title, src => src.Title)
                .Map(dest => dest.Status, src => src.Status)
                .Map(dest => dest.AssignedTo, src => src.AssignedTo.Value);

            config.NewConfig<Ticket, TicketDetailedResponse>()
                .Map(dest => dest.TicketId, src => src.Id.Value.ToString())
                .Map(dest => dest.ReferenceNumber, src => src.Number.Value)
                .Map(dest => dest.CreatedDateTime, src => src.CreatedDateTime.ToLocalTime())
                .Map(dest => dest.UpdatedDateTime, src => src.UpdatedDateTime.ToLocalTime())
                .Map(dest => dest.CreatedBy, src => src.CreatedBy.Value)
                 .Map(dest => dest.AssignedTo, src => src.AssignedTo.Value);

            config.NewConfig<Comment, CommentResponse>()
                .Map(dest => dest.CommentId, src => src.Id.Value.ToString())
                .Map(dest => dest.CreatedBy, src => src.CreatedBy.Value)
                .Map(dest => dest.CreatedDateTime, src => src.CreatedDateTime.ToLocalTime());
        }
    }
}
