# ODS 13: Desarrollo sostenible

Este proyecto está creado en [Next.js](https://nextjs.org), usando ReactTS, TailwindCSS y MongoDB

[![Netlify Status](https://api.netlify.com/api/v1/badges/d52c0ded-b6ad-4f60-8545-ae054c476f50/deploy-status)](https://app.netlify.com/sites/ods13/deploys)
![GitHub Repo stars](https://img.shields.io/github/stars/CrIsTiAnPvP/ODS-13_WebPage?style=flat-square&logo=githubsponsors)
![GitHub watchers](https://img.shields.io/github/watchers/CrIsTiAnPvP/ODS-13_WebPage?style=social&label=Viendo)


## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

	```bash
	git clone https://github.com/CrIsTiAnPvP/ODS-13_WebPage
	```

2. Instala pnpm:

	```bash
	npm install --global corepack@latest
	corepack enable pnpm
	```

3. Navega al directorio del proyecto:

	```bash
	cd ODS-13_WebPage
	```

4. Instala las dependencias:

	```bash
	pnpm install
	```

5. Crea tu cluster en MongoDB:
	
	```url
	https://www.mongodb.com/
	```

6. Inicializa prisma:
	
	```bash
	npx prisma init
	```

7. Crea el esquema de la BD:

	```bash
	npx prisma db push
	````

8. Ejecuta el servidor de desarrollo:

	```bash
	pnpm run dev
	```

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:
```
ODS-13_WebPage/ 
	...
	├ messages/		# Traducciones usadas por i18n
	├ prisma/		# Esquema de la BD (MongoDB)
	├ src/ ─┐
		├ app/[locale]/		# Páginas de Next.js con soporte i18n 
		├ app/api/		# Rutas de la API
		├ components/		# Componentes de React
		├ i18n/			# Configuraciones de ruteo e Internacionalización
		├ public/         	# Archivos publicos (Imagenes, Videos, etc)
		...
		├ middleware.ts		# Ruteo lógico de la aplicación
		└ types.d.ts		# Definiciones de tipos para TS
	...
```

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request en GitHub.
6. Espera a que revise tu pull request! :)

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
