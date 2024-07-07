using ErrorOr;

namespace TicketManager.Domain.Common.Errors
{
    public static partial class Errors
    {
        public static class Validation
        {
            public static Error Required(string fieldName) => Error.Validation(
                code: $"{fieldName}.Required",
                description: $"{fieldName} is required.");

            public static Error Invalid(string fieldName, string reason) => Error.Validation(
                code: $"{fieldName}.Invalid",
                description: $"{fieldName} is invalid. {reason}");

            public static Error NotFound(string objectName) => Error.NotFound(
                code: $"{objectName}.NotFound",
                description: $"{objectName} not found.");

            public static Error LengthOutOfRange(string fieldName, int minLength, int maxLength) => Error.Validation(
                code: $"{fieldName}.LengthOutOfRange",
                description: $"{fieldName} length should be between {minLength} and {maxLength} characters.");

            public static Error InvalidFormat(string fieldName, string expectedFormat) => Error.Validation(
                code: $"{fieldName}.InvalidFormat",
                description: $"{fieldName} should match the format: {expectedFormat}");
        }
    }
}
