using TicketManager.Api;
using TicketManager.Application;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Infrastructure;
using TicketManager.Infrastructure.Persistence.Data;
using TicketManager.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
         .AddPresentation()
         .AddApplication()
         .AddInfrastructure(builder.Configuration);

    builder.Services.AddEndpointsApiExplorer();
}

var app = builder.Build();
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var dbContext = services.GetRequiredService<TicketManagerDbContext>();

        dbContext.Database.EnsureCreated();

        var userRepository = services.GetRequiredService<IUserRepository>();
        var dataSeeder = services.GetRequiredService<DataSeeder>();

        if (!dbContext.Users.Any())
        {
            await dataSeeder.SeedAsync();
        }
    }

    app.UseExceptionHandler("/error");
    app.UseDefaultFiles();
    app.UseStaticFiles();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.MapFallbackToFile("/index.html");
    app.Run();
}