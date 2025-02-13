﻿namespace TicketManager.Contracts.Users.Requests
{
    public record CreateUserRequest(
       string FirstName,
       string LastName,
       string Email,
       string Password,
       string Role);
}
