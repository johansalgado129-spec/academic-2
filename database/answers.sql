-- RESPUESTAS DE REFERENCIA. Compara después de intentar cada ejercicio.

-- 1
SELECT Id, Nombre, Email FROM Clientes WHERE Activo = 1 ORDER BY Nombre;

-- 2
SELECT * FROM Productos WHERE Precio BETWEEN 150000 AND 500000;

-- 3
SELECT c.Nombre, COUNT(p.Id) AS CantidadProductos
FROM Categorias c
LEFT JOIN Productos p ON p.CategoriaId = c.Id
GROUP BY c.Id, c.Nombre;

-- 4
SELECT c.Nombre AS Categoria, p.Nombre AS Producto
FROM Categorias c
LEFT JOIN Productos p ON p.CategoriaId = c.Id
ORDER BY c.Nombre, p.Nombre;

-- 5
SELECT Id, Nombre, Precio * Stock AS ValorInventario
FROM Productos
ORDER BY ValorInventario DESC;

-- 6
SELECT PedidoId, SUM(Cantidad * PrecioUnitario) AS TotalPedido
FROM DetallesPedido
GROUP BY PedidoId;

-- 7
SELECT c.Nombre, p.Id AS PedidoId, p.Fecha,
       SUM(d.Cantidad * d.PrecioUnitario) AS TotalPedido
FROM Pedidos p
JOIN Clientes c ON c.Id = p.ClienteId
JOIN DetallesPedido d ON d.PedidoId = p.Id
GROUP BY c.Nombre, p.Id, p.Fecha;

-- 8
SELECT c.Id, c.Nombre,
       COALESCE(SUM(d.Cantidad * d.PrecioUnitario), 0) AS TotalComprado
FROM Clientes c
LEFT JOIN Pedidos p ON p.ClienteId = c.Id
LEFT JOIN DetallesPedido d ON d.PedidoId = p.Id
GROUP BY c.Id, c.Nombre
ORDER BY TotalComprado DESC;

-- 9
SELECT c.Id, c.Nombre, SUM(d.Cantidad * d.PrecioUnitario) AS TotalComprado
FROM Clientes c
JOIN Pedidos p ON p.ClienteId = c.Id
JOIN DetallesPedido d ON d.PedidoId = p.Id
GROUP BY c.Id, c.Nombre
HAVING SUM(d.Cantidad * d.PrecioUnitario) > 500000;

-- 10
WITH Ranked AS (
    SELECT p.*, ROW_NUMBER() OVER(PARTITION BY CategoriaId ORDER BY Precio DESC) AS rn
    FROM Productos p
)
SELECT * FROM Ranked WHERE rn = 1;

-- 11
SELECT Id, Nombre, Precio * Stock AS ValorInventario
FROM Productos
ORDER BY ValorInventario DESC
LIMIT 3;

-- SQL Server equivalente: SELECT TOP 3 ... ORDER BY ...

-- 12
WITH Ranked AS (
    SELECT p.*, ROW_NUMBER() OVER(PARTITION BY ClienteId ORDER BY Fecha DESC, Id DESC) AS rn
    FROM Pedidos p
)
SELECT * FROM Ranked WHERE rn = 1;

-- 13
WITH Totales AS (
    SELECT c.Id, c.Nombre, COALESCE(SUM(d.Cantidad*d.PrecioUnitario),0) AS Total
    FROM Clientes c
    LEFT JOIN Pedidos p ON p.ClienteId = c.Id
    LEFT JOIN DetallesPedido d ON d.PedidoId = p.Id
    GROUP BY c.Id, c.Nombre
)
SELECT *, DENSE_RANK() OVER(ORDER BY Total DESC) AS Ranking
FROM Totales;

-- 14
SELECT PedidoId, COUNT(DISTINCT ProductoId) AS ProductosDistintos
FROM DetallesPedido
GROUP BY PedidoId
HAVING COUNT(DISTINCT ProductoId) > 1;

-- 15
SELECT p.*
FROM Productos p
LEFT JOIN DetallesPedido d ON d.ProductoId = p.Id
WHERE d.ProductoId IS NULL;

-- 16
WITH TotalesPedido AS (
    SELECT p.Id, p.ClienteId, SUM(d.Cantidad*d.PrecioUnitario) AS Total
    FROM Pedidos p
    JOIN DetallesPedido d ON d.PedidoId = p.Id
    GROUP BY p.Id, p.ClienteId
)
SELECT c.Nombre, AVG(tp.Total) AS PromedioPorPedido
FROM Clientes c
JOIN TotalesPedido tp ON tp.ClienteId = c.Id
GROUP BY c.Id, c.Nombre;

-- 17
WITH VentasProducto AS (
    SELECT p.Id, p.Nombre,
           COALESCE(SUM(d.Cantidad*d.PrecioUnitario),0) AS Ventas
    FROM Productos p
    LEFT JOIN DetallesPedido d ON d.ProductoId = p.Id
    GROUP BY p.Id,p.Nombre
)
SELECT * FROM VentasProducto
WHERE Ventas > (SELECT AVG(Ventas) FROM VentasProducto);

-- 18
CREATE INDEX IX_Pedidos_ClienteId_Fecha ON Pedidos(ClienteId, Fecha);

-- 19 (sintaxis conceptual; puede variar por motor)
BEGIN TRANSACTION;
UPDATE Productos SET Stock = Stock - 1 WHERE Id = 1 AND Stock >= 1;
INSERT INTO DetallesPedido(PedidoId, ProductoId, Cantidad, PrecioUnitario)
VALUES (5, 1, 1, 280000);
COMMIT;

-- 20
-- Riesgo: dos transacciones leen el mismo stock y ambas intentan descontarlo.
-- Estrategias: actualización atómica condicionada, control optimista de concurrencia,
-- o aislamiento/bloqueo apropiado según motor y carga.
