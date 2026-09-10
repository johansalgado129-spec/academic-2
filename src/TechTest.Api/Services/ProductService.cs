using Microsoft.EntityFrameworkCore;
using TechTest.Api.Data;
using TechTest.Api.DTOs;
using TechTest.Api.Models;

namespace TechTest.Api.Services;

public interface IProductService
{
    Task<IReadOnlyList<ProductResponse>> GetAllAsync(string? search, int? categoryId, CancellationToken ct);
    Task<ProductResponse?> GetByIdAsync(int id, CancellationToken ct);
    Task<(ProductResponse? Product, string? Error)> CreateAsync(CreateProductRequest request, CancellationToken ct);
    Task<(bool Updated, string? Error)> UpdateAsync(int id, UpdateProductRequest request, CancellationToken ct);
    Task<bool> DeleteAsync(int id, CancellationToken ct);
    Task<IReadOnlyList<SalesSummaryResponse>> GetInventorySummaryAsync(CancellationToken ct);
}

public sealed class ProductService(AppDbContext db) : IProductService
{
    public async Task<IReadOnlyList<ProductResponse>> GetAllAsync(
        string? search, int? categoryId, CancellationToken ct)
    {
        var query = db.Products.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search));

        if (categoryId is not null)
            query = query.Where(p => p.CategoryId == categoryId);

        return await query
            .OrderBy(p => p.Name)
            .Select(p => new ProductResponse(
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.Active,
                p.CategoryId,
                p.Category!.Name))
            .ToListAsync(ct);
    }

    public Task<ProductResponse?> GetByIdAsync(int id, CancellationToken ct) =>
        db.Products
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new ProductResponse(
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.Active,
                p.CategoryId,
                p.Category!.Name))
            .SingleOrDefaultAsync(ct);

    public async Task<(ProductResponse? Product, string? Error)> CreateAsync(
        CreateProductRequest request, CancellationToken ct)
    {
        var error = Validate(request.Name, request.Price, request.Stock);
        if (error is not null) return (null, error);

        var category = await db.Categories.FindAsync([request.CategoryId], ct);
        if (category is null) return (null, "La categoría no existe.");

        var product = new Product
        {
            Name = request.Name.Trim(),
            Price = request.Price,
            Stock = request.Stock,
            CategoryId = request.CategoryId
        };

        db.Products.Add(product);
        await db.SaveChangesAsync(ct);

        return (new ProductResponse(
            product.Id,
            product.Name,
            product.Price,
            product.Stock,
            product.Active,
            product.CategoryId,
            category.Name), null);
    }

    public async Task<(bool Updated, string? Error)> UpdateAsync(
        int id, UpdateProductRequest request, CancellationToken ct)
    {
        var error = Validate(request.Name, request.Price, request.Stock);
        if (error is not null) return (false, error);

        var product = await db.Products.FindAsync([id], ct);
        if (product is null) return (false, null);

        if (!await db.Categories.AnyAsync(c => c.Id == request.CategoryId, ct))
            return (false, "La categoría no existe.");

        product.Name = request.Name.Trim();
        product.Price = request.Price;
        product.Stock = request.Stock;
        product.Active = request.Active;
        product.CategoryId = request.CategoryId;

        await db.SaveChangesAsync(ct);
        return (true, null);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        var product = await db.Products.FindAsync([id], ct);
        if (product is null) return false;
        db.Products.Remove(product);
        await db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<IReadOnlyList<SalesSummaryResponse>> GetInventorySummaryAsync(CancellationToken ct) =>
        await db.Products
            .AsNoTracking()
            .Where(p => p.Active)
            .GroupBy(p => p.Category!.Name)
            .Select(g => new SalesSummaryResponse(
                g.Key,
                g.Count(),
                g.Sum(p => p.Price * p.Stock)))
            .OrderByDescending(x => x.InventoryValue)
            .ToListAsync(ct);

    private static string? Validate(string? name, decimal price, int stock)
    {
        if (string.IsNullOrWhiteSpace(name)) return "El nombre es obligatorio.";
        if (name.Trim().Length > 160) return "El nombre supera 160 caracteres.";
        if (price <= 0) return "El precio debe ser mayor que cero.";
        if (stock < 0) return "El stock no puede ser negativo.";
        return null;
    }
}
