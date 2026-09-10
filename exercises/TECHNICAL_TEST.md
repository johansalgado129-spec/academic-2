# Prueba técnica integral — 90 minutos

## Contexto

Una empresa necesita una API de inventario. Cada producto pertenece a una categoría. Los usuarios deben poder listar, filtrar, crear y actualizar productos. Se requiere un reporte de valor de inventario por categoría.

## Requisitos

### Datos
- Categoria: Id, Nombre
- Producto: Id, Nombre, Precio, Stock, Activo, CategoriaId
- Nombre obligatorio y máximo 160 caracteres
- Precio > 0
- Stock >= 0
- CategoriaId válido

### API
- GET `/api/products`
- GET `/api/products/{id}`
- POST `/api/products`
- PUT `/api/products/{id}`
- DELETE `/api/products/{id}`
- GET `/api/products/reports/inventory`

### Filtros
`GET /api/products?search=mouse&categoryId=1`

### Evaluación
- 25% funcionalidad
- 20% C# y diseño
- 20% persistencia/SQL
- 15% HTTP/REST
- 10% errores/validación
- 10% pruebas/documentación

## Preguntas posteriores

1. ¿Cómo agregarías paginación?
2. ¿Cómo cambiarías SQLite por SQL Server?
3. ¿Qué índice puede ayudar al filtro por categoría y activo?
4. ¿Por qué no devolverías siempre la entidad EF directamente?
5. ¿Qué cambia si esta API recibe 1.000 solicitudes simultáneas?
6. ¿Cómo añadirías autenticación y autorización?
7. ¿Qué pruebas automatizadas priorizarías?
8. ¿Qué componente medirías primero si el reporte demora 4 segundos?
