# .NET + C# Technical Academy

Repositorio pedagógico interactivo para aprender y practicar **C#, .NET, ASP.NET Core, Entity Framework Core y bases de datos relacionales**, desde fundamentos hasta nivel de prueba técnica.

## Objetivo

Prepararte para una vacante backend .NET mediante una ruta progresiva que combina teoría, código, ejercicios, SQL, un proyecto real y simulaciones de entrevista.

## Stack de referencia

- .NET 10 LTS
- C# 14
- ASP.NET Core 10
- Entity Framework Core 10
- SQLite para ejecutar el ejemplo sin instalar un servidor de base de datos
- SQL relacional con ejercicios compatibles conceptualmente con SQL Server
- HTML, CSS y JavaScript para la plataforma pedagógica

> Microsoft mantiene .NET 10 como LTS hasta noviembre de 2028. Para información actualizada consulta: https://learn.microsoft.com/es-es/dotnet/core/releases-and-support

## Contenido del repositorio

```text
dotnet-csharp-academy/
├─ web/                     # Plataforma interactiva que puedes abrir en el navegador
├─ src/TechTest.Api/        # API de práctica en ASP.NET Core + EF Core
├─ database/                # Esquema, datos, ejercicios y respuestas SQL
├─ exercises/               # Retos de C#, SQL y prueba técnica
├─ docs/                    # Guías de uso y de subida a GitHub
├─ README.md
├─ .gitignore
└─ LICENSE
```

## Cómo empezar en 3 minutos

1. Descomprime el repositorio.
2. Abre `web/index.html` en tu navegador.
3. Entra en **Ruta de aprendizaje** y comienza por el módulo 1.
4. Marca cada módulo como completado; el progreso queda guardado en tu navegador.
5. Usa **Laboratorio C#**, **Laboratorio SQL** y **Simulador técnico** para practicar.
6. Cuando tengas .NET 10 instalado, abre `src/TechTest.Api` y ejecuta:

```bash
dotnet restore
dotnet run
```

## Ruta recomendada

1. Fundamentos de .NET y CLI
2. Sintaxis y tipos de C#
3. Control de flujo y métodos
4. POO y SOLID
5. Colecciones, genéricos y LINQ
6. Excepciones, archivos y recursos
7. Delegados, eventos y expresiones lambda
8. Async/await y concurrencia
9. Bases de datos relacionales y normalización
10. SQL intermedio y avanzado
11. Entity Framework Core
12. ASP.NET Core Web API
13. Seguridad, autenticación y autorización
14. Testing y calidad
15. Arquitectura y patrones
16. Rendimiento, debugging y despliegue
17. Prueba técnica integral

## Plataforma interactiva

La carpeta `web` funciona sin instalar Node ni dependencias. Incluye:

- Panel de progreso
- 17 módulos de estudio
- Snippets de C# y SQL
- Retos con validación orientativa
- Banco de preguntas técnicas
- Simulador de prueba técnica
- Cheatsheets de comandos
- Videos embebidos en español
- Proyecto final guiado
- Glosario
- Progreso persistente con `localStorage`

## Proyecto práctico

`src/TechTest.Api` contiene una API de inventario con:

- Minimal API
- Entity Framework Core
- SQLite
- Entidades relacionadas
- DTOs
- Capa de servicio
- Inyección de dependencias
- CRUD
- Validaciones básicas
- Consultas LINQ
- Endpoints de reportes

El propósito es que puedas leerlo, romperlo, repararlo, extenderlo y usarlo como base para pruebas técnicas.

## Videos incluidos en la plataforma

La sección de videos contiene recursos en español sobre:

- C# desde cero
- API REST con .NET y SQL Server
- SQL y bases de datos relacionales
- Clean Architecture en C#

Los videos son recursos externos de YouTube y pueden cambiar de disponibilidad.

## Documentación oficial recomendada

- .NET: https://learn.microsoft.com/es-es/dotnet/
- C#: https://learn.microsoft.com/es-es/dotnet/csharp/
- ASP.NET Core: https://learn.microsoft.com/es-es/aspnet/core/
- Entity Framework Core: https://learn.microsoft.com/es-es/ef/core/

## Licencia

MIT. Puedes modificar y usar el repositorio para estudio personal.


## Publicación con GitHub Pages

Este paquete ya incluye `index.html`, `styles.css`, `data.js` y `app.js` en la raíz para que GitHub Pages abra directamente la academia interactiva. Configura **Settings > Pages > Deploy from a branch > main > /(root)**.
