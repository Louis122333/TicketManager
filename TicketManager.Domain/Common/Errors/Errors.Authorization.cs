using ErrorOr;

namespace TicketManager.Domain.Common.Errors
{
    public static partial class Errors
    {
        public static class Authorization
        {
            public static Error Unauthorized => Error.Forbidden(
                code: "Auth.AccessDenied",
                description: "Access to the requested resource is forbidden.");
        }
    }
}
