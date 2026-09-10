using Microsoft.EntityFrameworkCore;
using TechTest.Api.Data;
using TechTest.Api.Endpoints;
using TechTest.Api.Models;
using TechTest.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/", () => Results.Ok(new
{
    name = "TechTest.Api",
    purpose = "Proyecto pedagógico .NET + C# + EF Core",
    endpoints = new[] { "/api/products", "/api/products/reports/inventory" }
}));

app.MapProductEndpoints();

await SeedAsync(app.Services);
await app.RunAsync();

static async Task SeedAsync(IServiceProvider services)
{
    await using var scope = services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.EnsureCreatedAsync();

    if (await db.Categories.AnyAsync()) return;

    var hardware = new Category { Name = "Hardware" };
    var software = new Category { Name = "Software" };
    var books = new Category { Name = "Libros" };
    db.Categories.AddRange(hardware, software, books);
    await db.SaveChangesAsync();

    db.Products.AddRange(
        new Product { Name = "Teclado mecánico", Price = 280000m, Stock = 8, CategoryId = hardware.Id },
        new Product { Name = "Mouse ergonómico", Price = 145000m, Stock = 15, CategoryId = hardware.Id },
        new Product { Name = "Licencia IDE", Price = 390000m, Stock = 5, CategoryId = software.Id },
        new Product { Name = "C# in Depth", Price = 190000m, Stock = 4, CategoryId = books.Id }
    );
    await db.SaveChangesAsync();
}
