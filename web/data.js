const MODULES = [
  {
    id:1, level:'Fundamentos', title:'Ecosistema .NET y CLI', duration:'2 h',
    goals:['Diferenciar .NET, runtime, SDK, CLR y BCL','Crear, compilar y ejecutar proyectos desde terminal','Entender solución, proyecto, NuGet y configuración'],
    theory:`<p><strong>.NET</strong> es una plataforma de desarrollo multiplataforma. El SDK contiene las herramientas para crear y compilar; el runtime ejecuta las aplicaciones; el CLR administra ejecución, memoria, excepciones y JIT; la BCL aporta las bibliotecas base.</p><p>En una prueba técnica debes poder crear un proyecto sin depender del asistente de Visual Studio y explicar qué ocurre entre el archivo <code>.cs</code> y la ejecución.</p>`,
    code:`# Ver SDK instalado\ndotnet --info\ndotnet --list-sdks\n\n# Crear solución y proyectos\ndotnet new sln -n VacanteTech\ndotnet new console -n VacanteTech.Console\ndotnet sln add VacanteTech.Console\ndotnet build\ndotnet run --project VacanteTech.Console\n\n# Paquetes NuGet\ndotnet add package NOMBRE_PAQUETE\ndotnet list package`,
    key:'SDK compila · Runtime ejecuta · CLR administra la ejecución · NuGet distribuye paquetes.'
  },
  {
    id:2, level:'Fundamentos', title:'C# moderno: tipos, variables y nullability', duration:'4 h',
    goals:['Dominar tipos de valor y referencia','Usar inferencia, constantes, records y nullable reference types','Entender boxing, conversión y alcance'],
    theory:`<p>C# es fuertemente tipado. Entre los tipos de valor están <code>int</code>, <code>decimal</code>, <code>bool</code>, <code>struct</code> y <code>enum</code>; clases, arrays, delegados y strings son tipos de referencia. <code>decimal</code> suele ser preferible para dinero.</p><p>Con nullable reference types, <code>string</code> expresa que no debería ser nulo y <code>string?</code> que puede serlo. El operador <code>?.</code>, <code>??</code> y los patrones reducen errores por null.</p>`,
    code:`string nombre = "Johan";\nstring? segundoNombre = null;\nint edad = 24;\ndecimal salario = 3_500_000m;\nvar activo = true;\nconst int MaxIntentos = 3;\n\nstring etiqueta = segundoNombre ?? "Sin segundo nombre";\nint longitud = segundoNombre?.Length ?? 0;\n\nrecord Candidato(string Nombre, int ExperienciaMeses);\nvar candidato = new Candidato("Ana", 30);`,
    key:'Para cálculos financieros usa decimal. Trata null de forma explícita y evita conversiones implícitas peligrosas.'
  },
  {
    id:3, level:'Fundamentos', title:'Control de flujo, métodos y parámetros', duration:'4 h',
    goals:['Usar if, switch y patrones','Elegir entre for, foreach, while','Diseñar métodos claros y entender ref/out/in'],
    theory:`<p>La claridad del flujo importa más que mostrar sintaxis complicada. En código de producción se prefieren retornos tempranos, métodos pequeños y nombres expresivos. Los <em>switch expressions</em> permiten expresar decisiones de forma concisa.</p><p>Los parámetros opcionales y nombrados mejoran legibilidad; <code>ref</code> pasa una variable por referencia, <code>out</code> exige asignarla dentro del método e <code>in</code> pasa por referencia de solo lectura.</p>`,
    code:`static decimal CalcularDescuento(decimal total, string tipo) => tipo switch\n{\n    "VIP" when total >= 500_000 => total * 0.15m,\n    "VIP" => total * 0.10m,\n    "Empleado" => total * 0.08m,\n    _ => 0m\n};\n\nforeach (var numero in Enumerable.Range(1, 10))\n{\n    if (numero % 2 != 0) continue;\n    Console.WriteLine(numero);\n}`,
    key:'En entrevista explica por qué eliges una estructura de control, no solo cómo escribirla.'
  },
  {
    id:4, level:'Intermedio', title:'POO, interfaces y SOLID', duration:'7 h',
    goals:['Aplicar encapsulación, abstracción, herencia y polimorfismo','Favorecer composición sobre herencia cuando corresponda','Aplicar SOLID en ejemplos concretos'],
    theory:`<p>La POO modela comportamiento y estado. Una interfaz expresa un contrato. Una clase abstracta puede compartir estado e implementación. El polimorfismo permite intercambiar implementaciones sin modificar al consumidor.</p><p>SOLID ayuda a reducir acoplamiento: responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces e inversión de dependencias.</p>`,
    code:`public interface INotificador\n{\n    Task EnviarAsync(string destino, string mensaje);\n}\n\npublic sealed class ServicioAlertas(INotificador notificador)\n{\n    public Task AlertarAsync(string correo, string mensaje)\n        => notificador.EnviarAsync(correo, mensaje);\n}\n\n// ServicioAlertas depende de una abstracción, no de EmailNotificador concreto.`,
    key:'Pregunta típica: interfaz vs clase abstracta. Responde en términos de contrato, reutilización, estado y herencia múltiple de interfaces.'
  },
  {
    id:5, level:'Intermedio', title:'Colecciones, genéricos y LINQ', duration:'7 h',
    goals:['Elegir List, Dictionary, HashSet y Queue según el caso','Crear tipos y métodos genéricos','Dominar Where, Select, GroupBy, Join, Any y FirstOrDefault'],
    theory:`<p><code>List&lt;T&gt;</code> ofrece acceso ordenado; <code>Dictionary&lt;TKey,TValue&gt;</code> busca por clave; <code>HashSet&lt;T&gt;</code> evita duplicados; <code>Queue&lt;T&gt;</code> representa FIFO. La elección tiene impacto en complejidad y expresividad.</p><p>LINQ permite consultar colecciones y proveedores como EF Core. La ejecución suele ser diferida: una consulta puede no ejecutarse hasta enumerarla con <code>ToList()</code>, <code>First()</code>, etc.</p>`,
    code:`var ventas = new[]\n{\n    new { Cliente = "A", Ciudad = "Bogotá", Total = 120_000m },\n    new { Cliente = "B", Ciudad = "Bogotá", Total = 250_000m },\n    new { Cliente = "C", Ciudad = "Cali", Total = 90_000m }\n};\n\nvar resumen = ventas\n    .Where(v => v.Total >= 100_000m)\n    .GroupBy(v => v.Ciudad)\n    .Select(g => new { Ciudad = g.Key, Total = g.Sum(x => x.Total) })\n    .OrderByDescending(x => x.Total)\n    .ToList();`,
    key:'Evita múltiples enumeraciones innecesarias. Con EF Core recuerda que no todo LINQ se ejecuta en memoria: puede traducirse a SQL.'
  },
  {
    id:6, level:'Intermedio', title:'Excepciones, IDisposable y archivos', duration:'4 h',
    goals:['Distinguir errores esperados de excepciones','Crear excepciones de dominio con criterio','Gestionar recursos con using'],
    theory:`<p>Una excepción representa una situación excepcional, no debe reemplazar validaciones normales. Captura excepciones donde realmente puedas manejarlas, registrar contexto o traducirlas a una respuesta de aplicación.</p><p><code>using</code> asegura la liberación de recursos que implementan <code>IDisposable</code>. No ocultes errores con un <code>catch { }</code>.</p>`,
    code:`try\n{\n    using var stream = File.OpenRead("datos.csv");\n    using var reader = new StreamReader(stream);\n    string contenido = await reader.ReadToEndAsync();\n}\ncatch (FileNotFoundException ex)\n{\n    Console.Error.WriteLine($"Archivo no encontrado: {ex.FileName}");\n}\ncatch (IOException ex)\n{\n    Console.Error.WriteLine(ex.Message);\n}`,
    key:'Nunca hagas throw ex; porque altera el stack trace. Usa throw; si solo relanzas la excepción actual.'
  },
  {
    id:7, level:'Intermedio', title:'Delegados, lambdas, eventos y extensiones', duration:'5 h',
    goals:['Entender Action, Func y Predicate','Usar lambdas de forma legible','Implementar eventos y métodos de extensión'],
    theory:`<p>Un delegado representa una referencia tipada a un método. <code>Action</code> no retorna valor, <code>Func</code> sí y <code>Predicate&lt;T&gt;</code> representa una condición booleana. LINQ depende intensamente de delegados y lambdas.</p><p>Los eventos implementan el patrón publicador/suscriptor y son apropiados cuando múltiples consumidores reaccionan a un suceso.</p>`,
    code:`Func<int, int, int> sumar = (a, b) => a + b;\nAction<string> log = mensaje => Console.WriteLine(mensaje);\nPredicate<int> esPar = n => n % 2 == 0;\n\npublic static class StringExtensions\n{\n    public static bool TieneContenido(this string? valor)\n        => !string.IsNullOrWhiteSpace(valor);\n}`,
    key:'En una lambda corta la concisión ayuda; en lógica compleja conviene extraer un método con nombre.'
  },
  {
    id:8, level:'Avanzado', title:'Async/await, Tasks y concurrencia', duration:'8 h',
    goals:['Diferenciar concurrencia, paralelismo y asincronía','Evitar bloqueos con .Result/.Wait()','Usar CancellationToken y Task.WhenAll'],
    theory:`<p><code>async/await</code> es especialmente útil para I/O: HTTP, archivos y bases de datos. No significa automáticamente crear un hilo nuevo. Una <code>Task</code> representa trabajo que puede completar en el futuro.</p><p>Propaga <code>CancellationToken</code> en operaciones largas. Usa <code>Task.WhenAll</code> para operaciones independientes, pero controla límites de concurrencia cuando el volumen sea alto.</p>`,
    code:`public async Task<decimal> ObtenerTotalAsync(\n    IEnumerable<int> ids, CancellationToken ct)\n{\n    var tareas = ids.Select(id => clienteApi.ObtenerPedidoAsync(id, ct));\n    var pedidos = await Task.WhenAll(tareas);\n    return pedidos.Sum(p => p.Total);\n}\n\n// Evitar en código async:\n// var x = ObtenerAsync().Result;`,
    key:'Pregunta típica: ¿async crea un hilo? No necesariamente. Para I/O permite liberar el hilo mientras espera.'
  },
  {
    id:9, level:'Fundamentos → Intermedio', title:'Modelo relacional y normalización', duration:'7 h',
    goals:['Diseñar entidades, atributos y relaciones','Dominar PK, FK, cardinalidad y restricciones','Normalizar hasta 3FN'],
    theory:`<p>Una base relacional organiza datos en tablas conectadas por claves. La integridad referencial impide relaciones inválidas. Modela primero el dominio y luego piensa en consultas e índices.</p><p>1FN elimina grupos repetidos y exige valores atómicos; 2FN elimina dependencias parciales respecto de claves compuestas; 3FN elimina dependencias transitivas.</p>`,
    code:`CREATE TABLE Clientes (\n    Id INTEGER PRIMARY KEY,\n    Nombre VARCHAR(120) NOT NULL,\n    Email VARCHAR(160) NOT NULL UNIQUE\n);\n\nCREATE TABLE Pedidos (\n    Id INTEGER PRIMARY KEY,\n    ClienteId INTEGER NOT NULL,\n    Fecha DATETIME NOT NULL,\n    Total DECIMAL(18,2) NOT NULL CHECK (Total >= 0),\n    FOREIGN KEY (ClienteId) REFERENCES Clientes(Id)\n);`,
    key:'Normalizar evita redundancia y anomalías; desnormalizar solo debe hacerse con una razón de rendimiento o lectura claramente medida.'
  },
  {
    id:10, level:'Intermedio → Avanzado', title:'SQL: JOIN, CTE, ventanas, índices y transacciones', duration:'10 h',
    goals:['Resolver consultas con JOIN y agregación','Usar CTE y funciones de ventana','Explicar índices, ACID y niveles de aislamiento'],
    theory:`<p>SQL avanzado requiere pensar en conjuntos. Evita el enfoque fila-por-fila cuando una operación declarativa resuelve el problema. Aprende a leer un plan de ejecución y a identificar filtros, joins y ordenamientos costosos.</p><p>Los índices aceleran lecturas pero cuestan almacenamiento y escrituras. Un índice compuesto debe responder a patrones reales de consulta. Las transacciones agrupan cambios y las propiedades ACID ayudan a mantener consistencia.</p>`,
    code:`WITH VentasPorCliente AS (\n    SELECT ClienteId, SUM(Total) AS TotalComprado\n    FROM Pedidos\n    GROUP BY ClienteId\n)\nSELECT c.Nombre, v.TotalComprado,\n       DENSE_RANK() OVER (ORDER BY v.TotalComprado DESC) AS Posicion\nFROM VentasPorCliente v\nJOIN Clientes c ON c.Id = v.ClienteId\nORDER BY Posicion;\n\nCREATE INDEX IX_Pedidos_ClienteId_Fecha\nON Pedidos(ClienteId, Fecha);`,
    key:'No respondas “un índice hace todo más rápido”. Explica qué consultas ayuda, selectividad, orden de columnas y costo de mantenimiento.'
  },
  {
    id:11, level:'Intermedio', title:'Entity Framework Core', duration:'9 h',
    goals:['Configurar DbContext y entidades','Usar migraciones y relaciones','Evitar N+1 y tracking innecesario'],
    theory:`<p>EF Core es un ORM: traduce operaciones entre objetos .NET y una base relacional. El <code>DbContext</code> representa una unidad de trabajo de corta duración. Las migraciones versionan cambios de esquema.</p><p>Para consultas de solo lectura usa <code>AsNoTracking()</code> cuando tenga sentido. Conoce carga eager mediante <code>Include</code>, explícita y lazy. Proyectar con <code>Select</code> suele ser mejor que traer entidades completas.</p>`,
    code:`var productos = await db.Productos\n    .AsNoTracking()\n    .Where(p => p.Activo && p.Precio >= minimo)\n    .OrderBy(p => p.Nombre)\n    .Select(p => new ProductoDto(p.Id, p.Nombre, p.Precio))\n    .ToListAsync(ct);\n\n// CLI migraciones\ndotnet ef migrations add InitialCreate\ndotnet ef database update`,
    key:'Pregunta típica: IQueryable vs IEnumerable. IQueryable permite componer una consulta que el proveedor puede traducir, por ejemplo a SQL.'
  },
  {
    id:12, level:'Intermedio → Avanzado', title:'ASP.NET Core Web API y REST', duration:'10 h',
    goals:['Diseñar endpoints REST','Dominar DI, middleware, routing y configuración','Usar códigos HTTP y DTOs correctamente'],
    theory:`<p>ASP.NET Core permite crear APIs basadas en controladores o Minimal APIs. La tubería HTTP pasa por middleware. La inyección de dependencias integrada administra servicios con ciclos de vida Transient, Scoped y Singleton.</p><p>REST no consiste solo en “hacer CRUD”. Diseña recursos, usa semántica HTTP, validación, paginación, filtros y respuestas coherentes. No expongas entidades de persistencia como contrato público sin evaluar consecuencias.</p>`,
    code:`var builder = WebApplication.CreateBuilder(args);\nbuilder.Services.AddScoped<IProductoService, ProductoService>();\n\nvar app = builder.Build();\n\napp.MapGet("/api/productos/{id:int}", async (\n    int id, IProductoService service, CancellationToken ct) =>\n{\n    var producto = await service.ObtenerAsync(id, ct);\n    return producto is null ? Results.NotFound() : Results.Ok(producto);\n});\n\napp.Run();`,
    key:'Scoped suele ser adecuado para servicios ligados a una solicitud y para DbContext. Singleton no debe depender de Scoped directamente.'
  },
  {
    id:13, level:'Avanzado', title:'Seguridad: autenticación, JWT y autorización', duration:'8 h',
    goals:['Diferenciar autenticación y autorización','Entender JWT, claims y políticas','Prevenir errores frecuentes de seguridad'],
    theory:`<p>Autenticación responde quién es el usuario; autorización determina qué puede hacer. Un JWT firmado no implica que su contenido sea secreto. Nunca almacenes contraseñas en texto plano: usa un algoritmo de hashing de contraseñas apropiado provisto por frameworks consolidados.</p><p>La autorización basada en políticas y claims evita llenar controladores de condicionales. Mantén secretos fuera del repositorio y valida entrada, permisos y ownership del recurso.</p>`,
    code:`builder.Services.AddAuthorization(options =>\n{\n    options.AddPolicy("PuedeAdministrar", policy =>\n        policy.RequireClaim("permission", "products.write"));\n});\n\napp.MapDelete("/api/productos/{id:int}", Eliminar)\n   .RequireAuthorization("PuedeAdministrar");`,
    key:'HTTPS protege el transporte; autenticación identifica; autorización limita acciones; validación evita confiar en entrada externa.'
  },
  {
    id:14, level:'Avanzado', title:'Testing, mocks y calidad', duration:'8 h',
    goals:['Crear pruebas unitarias AAA','Distinguir unitarias, integración y end-to-end','Diseñar código testeable sin sobreusar mocks'],
    theory:`<p>Una prueba unitaria debe ser rápida, aislada y determinista. El patrón Arrange-Act-Assert organiza la intención. No pruebes detalles internos sin valor; prueba comportamiento observable.</p><p>Las pruebas de integración verifican componentes trabajando juntos, por ejemplo API + base de datos. Una buena suite mezcla tipos de pruebas de acuerdo con riesgo y costo.</p>`,
    code:`[Fact]\npublic void CalcularTotal_AplicaDescuentoVip()\n{\n    // Arrange\n    var sut = new CalculadoraPrecios();\n\n    // Act\n    var total = sut.Calcular(100m, esVip: true);\n\n    // Assert\n    Assert.Equal(90m, total);\n}`,
    key:'Un mock es útil para aislar colaboraciones, pero demasiados mocks pueden indicar diseño acoplado a detalles de implementación.'
  },
  {
    id:15, level:'Avanzado', title:'Arquitectura, patrones y DDD práctico', duration:'10 h',
    goals:['Reconocer Repository, Strategy, Factory y Decorator','Aplicar separación de responsabilidades por capas','Entender Clean Architecture sin dogmas'],
    theory:`<p>Una arquitectura útil hace explícitas las dependencias y facilita cambios. Clean Architecture busca que las reglas de negocio no dependan de infraestructura. No necesitas muchas capas para cada proyecto: el tamaño debe responder a la complejidad real.</p><p>Los patrones son vocabulario para problemas recurrentes, no requisitos. <strong>Strategy</strong> intercambia algoritmos; <strong>Decorator</strong> añade comportamiento; <strong>Factory</strong> encapsula creación compleja.</p>`,
    code:`public interface ICalculadorEnvio\n{\n    decimal Calcular(Pedido pedido);\n}\n\npublic sealed class EnvioExpress : ICalculadorEnvio\n{\n    public decimal Calcular(Pedido pedido) =>\n        pedido.Total >= 300_000 ? 0 : 25_000;\n}\n\n// Strategy: el consumidor recibe ICalculadorEnvio por DI.`,
    key:'En entrevista explica trade-offs. Una arquitectura más compleja tiene costo cognitivo y de mantenimiento.'
  },
  {
    id:16, level:'Avanzado', title:'Rendimiento, debugging, logging y despliegue', duration:'8 h',
    goals:['Medir antes de optimizar','Usar logging estructurado y configuración por entorno','Identificar problemas de memoria, consultas y latencia'],
    theory:`<p>Optimizar sin medición produce trabajo inútil. Revisa tiempos de respuesta, consultas SQL, allocations, GC y llamadas externas. El logging estructurado permite consultar propiedades sin analizar texto libre.</p><p>Separa configuración por entorno y usa variables de entorno o gestores de secretos. En producción controla health checks, trazas, métricas y fallos de dependencias.</p>`,
    code:`logger.LogInformation(\n    "Pedido {PedidoId} procesado en {ElapsedMs} ms",\n    pedidoId, elapsed.TotalMilliseconds);\n\n// Publicar\ndotnet publish -c Release -o ./publish\n\n// Variables de entorno\n// ConnectionStrings__Default=...`,
    key:'No registres tokens, contraseñas ni datos sensibles. Logging útil es contextual y estructurado.'
  },
  {
    id:17, level:'Vacante', title:'Prueba técnica integral y entrevista', duration:'12 h',
    goals:['Resolver un CRUD completo bajo tiempo','Explicar decisiones técnicas','Revisar código ajeno y detectar fallos'],
    theory:`<p>Una prueba técnica suele evaluar más que el resultado final: estructura, nombres, control de errores, consultas, diseño de API, pruebas y capacidad de explicar decisiones. Prioriza un núcleo funcional y luego agrega mejoras.</p><p>Practica narrar tu razonamiento: requisitos, supuestos, modelo, endpoints, validación, persistencia, pruebas y riesgos. Si desconoces algo, explica cómo lo verificarías.</p>`,
    code:`// Checklist mental\n// 1. Entender requisitos y casos borde\n// 2. Diseñar entidades/DTOs\n// 3. Crear modelo relacional\n// 4. Implementar caso feliz\n// 5. Validaciones + errores\n// 6. Consultas eficientes\n// 7. Tests\n// 8. README + decisiones`,
    key:'Tu meta no es memorizar todo: es demostrar fundamentos, criterio, capacidad de investigación y código mantenible.'
  }
];

const CSHARP_CHALLENGES = [
  {id:'c1',level:'Básico',title:'FizzBuzz profesional',prompt:'Escribe un método que reciba n y retorne una lista con 1..n. Múltiplos de 3 => Fizz, de 5 => Buzz y de ambos => FizzBuzz. Valida n > 0.',starter:`public static List<string> FizzBuzz(int n)\n{\n    // tu código\n}`,checks:['for','% 3','% 5','FizzBuzz','return']},
  {id:'c2',level:'Básico',title:'Frecuencia de palabras',prompt:'Recibe un texto y devuelve Dictionary<string,int> con frecuencia de palabras ignorando mayúsculas/minúsculas.',starter:`public static Dictionary<string,int> Contar(string texto)\n{\n    // tu código\n}`,checks:['Dictionary','Split','ToLower','return']},
  {id:'c3',level:'Intermedio',title:'LINQ: top clientes',prompt:'Dada una lista de pedidos con ClienteId y Total, obtén los 3 clientes con mayor total comprado.',starter:`var top = pedidos\n    // completa la consulta LINQ\n    ;`,checks:['GroupBy','Sum','OrderByDescending','Take']},
  {id:'c4',level:'Intermedio',title:'Validador con Strategy',prompt:'Crea IValidador<T> y dos implementaciones intercambiables. Un servicio debe depender de la interfaz.',starter:`public interface IValidador<T>\n{\n    bool EsValido(T value);\n}`,checks:['interface','IValidador','class','bool']},
  {id:'c5',level:'Intermedio',title:'Manejo de excepciones',prompt:'Lee un archivo async. Captura FileNotFoundException y propaga CancellationToken.',starter:`public async Task<string> LeerAsync(string ruta, CancellationToken ct)\n{\n    // completa\n}`,checks:['async','await','FileNotFoundException','CancellationToken']},
  {id:'c6',level:'Avanzado',title:'Procesamiento concurrente',prompt:'Recibe una lista de ids y consulta cada recurso de forma concurrente con Task.WhenAll y CancellationToken.',starter:`public async Task<IReadOnlyList<Item>> CargarAsync(IEnumerable<int> ids, CancellationToken ct)\n{\n    // completa\n}`,checks:['Task.WhenAll','Select','await','CancellationToken']},
  {id:'c7',level:'Avanzado',title:'Extensión segura',prompt:'Crea un método de extensión ToIntOrDefault para string? usando int.TryParse.',starter:`public static class ConversionExtensions\n{\n    // completa\n}`,checks:['this string','int.TryParse','return']},
  {id:'c8',level:'Vacante',title:'Revisión de código',prompt:'Reescribe este código para evitar bloqueo y mejorar null-safety: var user = service.GetUserAsync(id).Result; return user.Name.ToUpper();',starter:`public async Task<string> ObtenerNombreAsync(int id)\n{\n    // solución\n}`,checks:['await','async','??','ToUpper']}
];

const SQL_CHALLENGES = [
  {id:'s1',level:'Básico',title:'Clientes activos',prompt:'Lista Id, Nombre y Email de clientes activos, ordenados por Nombre.',starter:`SELECT\nFROM Clientes\n`,checks:['SELECT','FROM Clientes','WHERE','ORDER BY']},
  {id:'s2',level:'Intermedio',title:'Ventas por cliente',prompt:'Muestra cada cliente y su total comprado. Incluye clientes sin pedidos.',starter:`SELECT c.Nombre\nFROM Clientes c\n`,checks:['LEFT JOIN','GROUP BY','SUM']},
  {id:'s3',level:'Intermedio',title:'Clientes sobre promedio',prompt:'Obtén clientes cuyo total comprado sea superior al promedio de total comprado por cliente.',starter:`-- Puedes usar CTE o subconsulta\n`,checks:['SELECT','GROUP BY','AVG']},
  {id:'s4',level:'Avanzado',title:'Ranking mensual',prompt:'Rankea clientes por total de ventas dentro de cada mes usando una función de ventana.',starter:`SELECT\n`,checks:['OVER','PARTITION BY','ORDER BY','SUM']},
  {id:'s5',level:'Avanzado',title:'Último pedido por cliente',prompt:'Devuelve únicamente el pedido más reciente de cada cliente usando ROW_NUMBER.',starter:`WITH Ranked AS (\n  SELECT\n`,checks:['ROW_NUMBER','PARTITION BY','ORDER BY','WHERE']},
  {id:'s6',level:'Vacante',title:'Optimización',prompt:'La consulta filtra por ClienteId y rango de Fecha sobre millones de pedidos. Escribe el índice que propondrías.',starter:`CREATE INDEX\n`,checks:['CREATE INDEX','Pedidos','ClienteId','Fecha']}
];

const QUIZ = [
  {q:'¿Qué componente se necesita para compilar una aplicación .NET?',o:['Solo el runtime','El SDK','El CLR sin SDK','NuGet'],a:1,e:'El SDK incluye compilador y herramientas; el runtime se centra en ejecutar.'},
  {q:'¿Qué tipo es normalmente más apropiado para valores monetarios?',o:['float','double','decimal','byte'],a:2,e:'decimal tiene representación decimal de alta precisión y es habitual para dinero.'},
  {q:'¿Cuál colección evita duplicados por diseño?',o:['List<T>','Queue<T>','HashSet<T>','LinkedList<T>'],a:2,e:'HashSet<T> mantiene valores únicos según su comparador.'},
  {q:'¿Qué operador proporciona un valor alternativo si la izquierda es null?',o:['?.','??','=>','is'],a:1,e:'?? es el operador null-coalescing.'},
  {q:'¿Qué principio SOLID propone depender de abstracciones?',o:['SRP','OCP','LSP','DIP'],a:3,e:'Dependency Inversion Principle.'},
  {q:'¿Qué método LINQ comprueba si existe al menos un elemento que cumple una condición?',o:['All','Any','Single','Select'],a:1,e:'Any puede detenerse al encontrar la primera coincidencia.'},
  {q:'¿Qué ocurre generalmente con IQueryable de EF Core?',o:['Siempre carga todo en RAM','Puede traducirse a SQL','No admite filtros','Solo funciona con arrays'],a:1,e:'El proveedor puede traducir la expresión a su lenguaje de consulta.'},
  {q:'En async, ¿qué debe evitarse normalmente?',o:['await','CancellationToken','.Result/.Wait()','Task.WhenAll'],a:2,e:'Bloquear tareas puede causar deadlocks o desperdicio de hilos.'},
  {q:'¿Qué JOIN incluye filas del lado izquierdo aunque no tengan coincidencia?',o:['INNER JOIN','CROSS JOIN','LEFT JOIN','SELF JOIN'],a:2,e:'LEFT JOIN conserva todas las filas de la tabla izquierda.'},
  {q:'¿Qué normalización elimina dependencias transitivas?',o:['1FN','2FN','3FN','0FN'],a:2,e:'3FN busca que atributos no clave dependan de la clave, no de otros atributos no clave.'},
  {q:'¿Qué propiedad ACID garantiza que una transacción se completa entera o no se aplica?',o:['Atomicidad','Consistencia','Aislamiento','Durabilidad'],a:0,e:'Atomicidad: todo o nada.'},
  {q:'¿Qué ciclo de vida de DI crea normalmente una instancia por solicitud HTTP?',o:['Singleton','Scoped','Transient global','Static'],a:1,e:'Scoped es por alcance, que en una app web suele corresponder a una solicitud.'},
  {q:'¿Qué código HTTP corresponde normalmente a un recurso no encontrado?',o:['200','201','404','500'],a:2,e:'404 Not Found.'},
  {q:'¿Qué código HTTP es común tras crear correctamente un recurso?',o:['201','204','302','409'],a:0,e:'201 Created; idealmente con ubicación del recurso.'},
  {q:'¿Autenticación y autorización son lo mismo?',o:['Sí','No: autenticar identifica y autorizar decide permisos','Solo en JWT','Solo en MVC'],a:1,e:'Son responsabilidades diferentes.'},
  {q:'Un JWT firmado...',o:['Siempre está cifrado','No puede contener claims','Puede ser leído si no está cifrado','Reemplaza HTTPS'],a:2,e:'La firma protege integridad/autenticidad; no necesariamente confidencialidad.'},
  {q:'Para una consulta EF Core de solo lectura, ¿qué puede reducir tracking innecesario?',o:['AsNoTracking','IncludeAll','ToArraySync','Attach'],a:0,e:'AsNoTracking evita mantener entidades en el Change Tracker.'},
  {q:'¿Qué problema describe N+1?',o:['Un índice duplicado','Una consulta inicial seguida de muchas consultas por cada fila','Una transacción rota','Una excepción nula'],a:1,e:'N+1 suele aparecer por acceso repetido a datos relacionados.'},
  {q:'En pruebas, AAA significa...',o:['Act-Arrange-Assert','Arrange-Act-Assert','Assert-Arrange-Act','API-Auto-Async'],a:1,e:'Preparar, actuar y verificar.'},
  {q:'¿Qué patrón permite intercambiar algoritmos detrás de una interfaz?',o:['Strategy','Singleton','Facade únicamente','Builder únicamente'],a:0,e:'Strategy encapsula algoritmos intercambiables.'},
  {q:'¿Cuál es una buena razón para crear un índice?',o:['Porque toda tabla debe tener 10 índices','Acelerar un patrón de consulta frecuente medido','Evitar claves primarias','Reemplazar validaciones'],a:1,e:'Los índices deben responder a patrones reales y tienen costos.'},
  {q:'¿Qué palabra relanza una excepción conservando el stack trace actual?',o:['throw ex;','throw;','retry;','raise;'],a:1,e:'throw; conserva el stack de la excepción actual.'},
  {q:'¿Qué hace Task.WhenAll?',o:['Cancela todas las tareas','Espera un conjunto de tareas','Convierte async en sync','Crea un proceso'],a:1,e:'Devuelve una tarea que completa cuando completan las tareas proporcionadas.'},
  {q:'¿Qué es middleware en ASP.NET Core?',o:['Una tabla SQL','Componente de la tubería HTTP','Un tipo de record','Un test unitario'],a:1,e:'Procesa solicitudes/respuestas en una cadena configurable.'},
  {q:'¿Por qué usar DTOs en una API?',o:['Para hacer SQL más lento','Para separar contrato externo de entidades internas','Porque EF no admite clases','Para eliminar HTTP'],a:1,e:'Los DTOs permiten controlar forma, seguridad y evolución del contrato.'}
];

const CHEATS = {
  'CLI .NET':[
    ['dotnet --info','Información del SDK/runtime'],['dotnet new list','Plantillas disponibles'],['dotnet new webapi -n Api','Crear API'],['dotnet restore','Restaurar paquetes'],['dotnet build','Compilar'],['dotnet run','Ejecutar'],['dotnet test','Ejecutar pruebas'],['dotnet publish -c Release','Publicar release'],['dotnet add package X','Agregar paquete NuGet'],['dotnet list package','Listar paquetes']
  ],
  'C# esencial':[
    ['var x = ...','Inferencia de tipo local'],['string?','Referencia anulable'],['?. / ??','Acceso seguro / valor alternativo'],['is / switch','Pattern matching'],['record','Modelo de datos con semántica de valor'],['yield return','Iterador'],['using','Liberación determinista'],['async / await','Flujo asíncrono'],['nameof(x)','Nombre de símbolo seguro ante refactor'],['ArgumentNullException.ThrowIfNull(x)','Guard clause']
  ],
  'LINQ':[
    ['Where','Filtrar'],['Select','Proyectar'],['SelectMany','Aplanar'],['OrderBy / ThenBy','Ordenar'],['GroupBy','Agrupar'],['Join','Unir secuencias'],['Any / All','Existencia / universalidad'],['FirstOrDefault','Primero o default'],['SingleOrDefault','Exactamente uno o default'],['ToDictionary','Materializar como diccionario']
  ],
  'SQL':[
    ['SELECT / FROM','Consultar'],['WHERE','Filtrar antes de agregación'],['GROUP BY','Agrupar'],['HAVING','Filtrar grupos'],['INNER JOIN','Solo coincidencias'],['LEFT JOIN','Conservar izquierda'],['CTE WITH','Consulta nombrada temporal'],['ROW_NUMBER() OVER','Numerar filas'],['BEGIN / COMMIT / ROLLBACK','Control transaccional'],['CREATE INDEX','Crear índice']
  ],
  'HTTP/REST':[
    ['GET','Leer recurso'],['POST','Crear/ejecutar acción no idempotente'],['PUT','Reemplazar/actualizar de forma idempotente'],['PATCH','Actualización parcial'],['DELETE','Eliminar'],['200','OK'],['201','Created'],['204','No Content'],['400','Bad Request'],['401 / 403','No autenticado / no autorizado'],['404','Not Found'],['409','Conflict']
  ],
  'EF Core':[
    ['DbContext','Unidad de trabajo y acceso a datos'],['DbSet<T>','Conjunto de entidad'],['AsNoTracking','Lectura sin tracking'],['Include','Carga eager'],['Select','Proyección'],['SaveChangesAsync','Persistir cambios'],['Add / Update / Remove','Cambiar estado'],['dotnet ef migrations add','Crear migración'],['dotnet ef database update','Aplicar migraciones']
  ]
};

const VIDEOS = [
  {title:'C# desde cero — Camba Code Labs',id:'UwqYtz9l4Bk',desc:'Variables, control de flujo, colecciones, métodos, POO, archivos y excepciones.'},
  {title:'API .NET + SQL Server + EF Core — Programador E',id:'i1I03UqhaKk',desc:'API REST, SQL Server, CRUD, Entity Framework Core y pruebas con Swagger.'},
  {title:'SQL y bases de datos desde cero — TodoCode',id:'8N4M994IDt8',desc:'Modelado, PK/FK, DDL/DML, agregaciones, JOIN, subconsultas y normalización.'},
  {title:'Clean Architecture en C# — Código Estudiante',id:'ACArC8aoJOc',desc:'Arquitectura limpia aplicada a C# y .NET.'}
];

const GLOSSARY = [
 ['CLR','Common Language Runtime. Entorno que ejecuta código administrado .NET.'],['SDK','Kit de desarrollo: CLI, compiladores, plantillas y herramientas.'],['Runtime','Componentes necesarios para ejecutar una aplicación .NET.'],['JIT','Compilación Just-In-Time de IL a código máquina durante ejecución.'],['IL','Intermediate Language generado por compiladores .NET.'],['GC','Garbage Collector; administra memoria de objetos administrados.'],['NuGet','Gestor y ecosistema de paquetes para .NET.'],['Nullable','Característica para expresar y analizar posibilidad de valores null.'],['Delegate','Tipo que referencia uno o más métodos con una firma compatible.'],['Lambda','Función anónima expresada con sintaxis =>.'],['LINQ','Language Integrated Query para consultar datos desde C#.'],['IEnumerable','Secuencia enumerable; LINQ to Objects opera comúnmente sobre ella.'],['IQueryable','Consulta componible que un proveedor puede traducir a otro lenguaje.'],['Task','Representa una operación asíncrona o trabajo futuro.'],['CancellationToken','Mecanismo cooperativo para solicitar cancelación.'],['DI','Dependency Injection; entrega dependencias a consumidores desde un contenedor.'],['Middleware','Componente de la tubería de solicitudes/respuestas ASP.NET Core.'],['DTO','Data Transfer Object, contrato de transferencia de datos.'],['ORM','Mapeo objeto-relacional; conecta objetos y tablas.'],['DbContext','Componente central de EF Core para consulta y persistencia.'],['Migration','Cambio versionado del esquema de base de datos.'],['PK','Primary Key, identificador único de una fila.'],['FK','Foreign Key, referencia a una clave de otra tabla.'],['Índice','Estructura que acelera ciertos accesos a datos con costo de escritura/espacio.'],['ACID','Atomicidad, consistencia, aislamiento y durabilidad de transacciones.'],['REST','Estilo arquitectónico para sistemas distribuidos orientados a recursos.'],['JWT','Formato de token con claims; puede ser firmado y opcionalmente cifrado.'],['Claim','Afirmación sobre una identidad, por ejemplo un permiso.'],['SOLID','Cinco principios de diseño OO para mantenibilidad y desacoplamiento.'],['Mock','Sustituto controlado usado comúnmente en pruebas.'],['Clean Architecture','Enfoque de arquitectura que orienta dependencias hacia reglas de negocio.'],['N+1','Problema de acceso a datos: una consulta inicial seguida de muchas consultas adicionales.'],['Idempotencia','Repetir una operación produce el mismo efecto observable final.'],['Tracking','Seguimiento de entidades y cambios dentro de EF Core.']
];
