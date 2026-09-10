# TechTest.Api

API pedagógica pequeña para practicar ASP.NET Core, Entity Framework Core, LINQ, DI, DTOs y una base relacional.

## Requisitos

- .NET 10 SDK

## Ejecutar

```bash
dotnet restore
dotnet run
```

La base SQLite `techtest.db` se crea automáticamente con datos de ejemplo.

## Endpoints

- `GET /api/products`
- `GET /api/products?search=mouse&categoryId=1`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`
- `GET /api/products/reports/inventory`

## Ejemplo POST

```json
{
  "name": "Monitor 27",
  "price": 950000,
  "stock": 4,
  "categoryId": 1
}
```

## Retos para evolucionar la API

1. Cambia `EnsureCreated` por migraciones.
2. Agrega paginación.
3. Crea endpoints de categorías.
4. Implementa pedidos y detalle de pedido.
5. Añade validación centralizada.
6. Agrega middleware global de excepciones.
7. Implementa autenticación y políticas de autorización.
8. Escribe pruebas unitarias y de integración.
9. Cambia SQLite por SQL Server.
10. Mide y corrige una consulta ineficiente.
