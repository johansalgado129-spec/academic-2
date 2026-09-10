-- Esquema pedagógico relacional. Compatible conceptualmente con SQL Server.

CREATE TABLE Clientes (
    Id INTEGER PRIMARY KEY,
    Nombre VARCHAR(120) NOT NULL,
    Email VARCHAR(160) NOT NULL UNIQUE,
    Ciudad VARCHAR(80) NOT NULL,
    Activo INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE Categorias (
    Id INTEGER PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Productos (
    Id INTEGER PRIMARY KEY,
    Nombre VARCHAR(160) NOT NULL,
    Precio DECIMAL(18,2) NOT NULL CHECK (Precio > 0),
    Stock INTEGER NOT NULL CHECK (Stock >= 0),
    CategoriaId INTEGER NOT NULL,
    Activo INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (CategoriaId) REFERENCES Categorias(Id)
);

CREATE TABLE Pedidos (
    Id INTEGER PRIMARY KEY,
    ClienteId INTEGER NOT NULL,
    Fecha DATETIME NOT NULL,
    Estado VARCHAR(30) NOT NULL,
    FOREIGN KEY (ClienteId) REFERENCES Clientes(Id)
);

CREATE TABLE DetallesPedido (
    PedidoId INTEGER NOT NULL,
    ProductoId INTEGER NOT NULL,
    Cantidad INTEGER NOT NULL CHECK (Cantidad > 0),
    PrecioUnitario DECIMAL(18,2) NOT NULL CHECK (PrecioUnitario > 0),
    PRIMARY KEY (PedidoId, ProductoId),
    FOREIGN KEY (PedidoId) REFERENCES Pedidos(Id),
    FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);

CREATE INDEX IX_Pedidos_ClienteId_Fecha ON Pedidos(ClienteId, Fecha);
CREATE INDEX IX_Productos_CategoriaId_Activo ON Productos(CategoriaId, Activo);

INSERT INTO Clientes (Id, Nombre, Email, Ciudad, Activo) VALUES
(1, 'Ana Torres', 'ana@example.com', 'Bogotá', 1),
(2, 'Carlos Ruiz', 'carlos@example.com', 'Medellín', 1),
(3, 'Luisa Gómez', 'luisa@example.com', 'Bogotá', 1),
(4, 'Mateo Díaz', 'mateo@example.com', 'Cali', 0);

INSERT INTO Categorias (Id, Nombre) VALUES
(1, 'Hardware'), (2, 'Software'), (3, 'Libros');

INSERT INTO Productos (Id, Nombre, Precio, Stock, CategoriaId, Activo) VALUES
(1, 'Teclado mecánico', 280000, 8, 1, 1),
(2, 'Mouse ergonómico', 145000, 15, 1, 1),
(3, 'Monitor 27', 950000, 6, 1, 1),
(4, 'Licencia IDE', 390000, 5, 2, 1),
(5, 'Curso backend', 250000, 20, 2, 1),
(6, 'Libro C# avanzado', 190000, 7, 3, 1);

INSERT INTO Pedidos (Id, ClienteId, Fecha, Estado) VALUES
(1, 1, '2026-08-02 10:00:00', 'Pagado'),
(2, 1, '2026-08-18 14:30:00', 'Pagado'),
(3, 2, '2026-08-20 09:15:00', 'Pagado'),
(4, 3, '2026-09-01 16:00:00', 'Pendiente'),
(5, 2, '2026-09-05 11:20:00', 'Pagado');

INSERT INTO DetallesPedido (PedidoId, ProductoId, Cantidad, PrecioUnitario) VALUES
(1, 1, 1, 280000),
(1, 2, 2, 145000),
(2, 6, 1, 190000),
(2, 4, 1, 390000),
(3, 3, 1, 950000),
(4, 5, 2, 250000),
(5, 2, 1, 145000),
(5, 6, 2, 190000);
