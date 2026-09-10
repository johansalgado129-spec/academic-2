using TechTest.Api.DTOs;
using TechTest.Api.Services;

namespace TechTest.Api.Endpoints;

public static class ProductEndpoints
{
    public static IEndpointRouteBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/products");

        group.MapGet("/", async (
            string? search,
            int? categoryId,
            IProductService service,
            CancellationToken ct) =>
            Results.Ok(await service.GetAllAsync(search, categoryId, ct)));

        group.MapGet("/{id:int}", async (
            int id,
            IProductService service,
            CancellationToken ct) =>
        {
            var product = await service.GetByIdAsync(id, ct);
            return product is null ? Results.NotFound() : Results.Ok(product);
        });

        group.MapPost("/", async (
            CreateProductRequest request,
            IProductService service,
            CancellationToken ct) =>
        {
            var (product, error) = await service.CreateAsync(request, ct);
            if (error is not null) return Results.BadRequest(new { error });
            return Results.Created($"/api/products/{product!.Id}", product);
        });

        group.MapPut("/{id:int}", async (
            int id,
            UpdateProductRequest request,
            IProductService service,
            CancellationToken ct) =>
        {
            var (updated, error) = await service.UpdateAsync(id, request, ct);
            if (error is not null) return Results.BadRequest(new { error });
            return updated ? Results.NoContent() : Results.NotFound();
        });

        group.MapDelete("/{id:int}", async (
            int id,
            IProductService service,
            CancellationToken ct) =>
            await service.DeleteAsync(id, ct) ? Results.NoContent() : Results.NotFound());

        group.MapGet("/reports/inventory", async (
            IProductService service,
            CancellationToken ct) =>
            Results.Ok(await service.GetInventorySummaryAsync(ct)));

        return app;
    }
}
