# Publicar la academia con GitHub Pages

La plataforma web debe tener un `index.html` en la raíz del repositorio para que GitHub Pages abra la academia directamente.

## Configuración

1. Sube todo el contenido de `dotnet-csharp-academy/` a la raíz de tu repositorio.
2. En GitHub ve a **Settings > Pages**.
3. En **Build and deployment** selecciona **Deploy from a branch**.
4. Selecciona la rama **main** y la carpeta **/(root)**.
5. Guarda los cambios.
6. Espera a que GitHub Pages termine el despliegue y abre la URL publicada.

Los archivos `index.html`, `styles.css`, `data.js` y `app.js` también se conservan dentro de `web/`, pero las copias de la raíz son las que usa GitHub Pages como página inicial.
