# Cómo subir este proyecto a GitHub

## Opción 1: desde la página de GitHub

1. Entra a GitHub y crea un repositorio nuevo.
2. Nombre sugerido: `dotnet-csharp-technical-academy`.
3. No marques la opción de crear README, porque el proyecto ya tiene uno.
4. Descomprime el ZIP.
5. En el repositorio creado usa **Add file > Upload files**.
6. Arrastra el contenido de la carpeta descomprimida.
7. Haz el commit.

## Opción 2: usando Git

```bash
git init
git add .
git commit -m "Initial learning platform"
git branch -M main
git remote add origin TU_URL_DEL_REPOSITORIO
git push -u origin main
```

## Publicar la plataforma con GitHub Pages

La plataforma está en `web/`. Para publicarla fácilmente puedes mover el contenido de `web/` a una rama `gh-pages`, o configurar GitHub Pages mediante una Action.

Para uso local no necesitas publicar nada: abre `web/index.html`.
