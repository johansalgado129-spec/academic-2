namespace TechTest.Api.DTOs;

public sealed record ProductResponse(
    int Id,
    string Name,
    decimal Price,
    int Stock,
    bool Active,
    int CategoryId,
    string Category);

public sealed record CreateProductRequest(
    string Name,
    decimal Price,
    int Stock,
    int CategoryId);

public sealed record UpdateProductRequest(
    string Name,
    decimal Price,
    int Stock,
    bool Active,
    int CategoryId);

public sealed record CategoryResponse(int Id, string Name);
public sealed record SalesSummaryResponse(string Category, int ProductCount, decimal InventoryValue);
