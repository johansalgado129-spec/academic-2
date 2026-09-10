# Preguntas de entrevista .NET / C# / SQL

Practica respuestas de 60–120 segundos.

## C# y .NET

1. Diferencia entre SDK, runtime y CLR.
2. Value types vs reference types.
3. `class` vs `record` vs `struct`.
4. `IEnumerable<T>` vs `IQueryable<T>`.
5. `List<T>` vs `HashSet<T>` vs `Dictionary<TKey,TValue>`.
6. ¿Qué es boxing/unboxing?
7. ¿Qué hace el GC?
8. `interface` vs clase abstracta.
9. Explica SOLID con un ejemplo práctico.
10. ¿Qué es un delegado?
11. `Action` vs `Func`.
12. Ejecución diferida en LINQ.
13. `First`, `FirstOrDefault`, `Single`, `SingleOrDefault`.
14. ¿Qué problema puede causar `.Result` sobre una Task?
15. ¿async/await crea nuevos hilos?
16. ¿Para qué sirve `CancellationToken`?
17. `throw;` vs `throw ex;`.
18. ¿Qué hace `using`?

## ASP.NET Core

19. ¿Qué es middleware?
20. Transient vs Scoped vs Singleton.
21. ¿Por qué DbContext suele ser Scoped?
22. Controller API vs Minimal API.
23. ¿Por qué usar DTOs?
24. 400 vs 404 vs 409.
25. PUT vs PATCH.
26. ¿Qué hace que una operación sea idempotente?
27. Autenticación vs autorización.
28. ¿Qué contiene un JWT?
29. ¿Cómo manejarías excepciones globalmente?
30. ¿Cómo guardarías secretos?

## EF Core y SQL

31. ¿Qué es tracking?
32. ¿Cuándo usar `AsNoTracking()`?
33. Eager, explicit y lazy loading.
34. Explica N+1.
35. ¿Qué es una migración?
36. PK vs FK vs UNIQUE.
37. INNER JOIN vs LEFT JOIN.
38. WHERE vs HAVING.
39. 1FN, 2FN y 3FN.
40. ¿Qué es un índice y qué costo tiene?
41. Índice compuesto: ¿por qué importa el orden?
42. Explica ACID.
43. ¿Qué es una transacción?
44. ¿Qué es una función de ventana?
45. CTE vs subconsulta.

## Diseño y calidad

46. ¿Cuándo usar Repository sobre EF Core?
47. ¿Qué problema resuelve Strategy?
48. ¿Qué trade-offs tiene Clean Architecture?
49. Unit test vs integration test.
50. ¿Qué hace un buen test unitario?
51. ¿Cuándo un mock es contraproducente?
52. ¿Cómo investigarías una API lenta?
53. ¿Cómo detectarías una consulta SQL lenta?
54. ¿Qué registrarías en logs y qué jamás registrarías?
55. Cuéntame una decisión técnica con trade-offs.
