# Módulo de Ventas

Este repositorio contiene el desarrollo del módulo de ventas para una aplicación web desarrollada en Next.js.

## Inicio Rápido

Antes de comenzar, asegúrate de tener la base de datos, Node.js y npm instalados en tu máquina. Luego, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:

```bash
# Clona este repositorio en tu máquina local
git clone https://github.com/BlasGabriel/venta.git
# Ir al directorio de trabajo
cd venta
# Instala los paquetes necesarios Next.js
npm ci
# Instala los paquetes necesarios Node.js
cd NodeApi
npm ci

# Inicia el servidor de desarrollo
npm run dev
```
Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en tu navegador visitando [http://localhost:3000](http://localhost:3000).

## Paquetes Utilizados

Este proyecto utiliza los siguientes paquetes:

- [Next.js](https://nextjs.org/): Un marco de trabajo de React para aplicaciones web.
- [Material-UI](https://mui.com/): Una biblioteca de componentes de React para un desarrollo web rápido y fácil.
- [Tailwind CSS](https://tailwindcss.com/): Un framework CSS utilizable dentro de React para el diseño de interfaces de usuario.
- [Express](https://expressjs.com/): Un marco de aplicación web de Node.js flexible y minimalista.
- [Prisma](https://www.prisma.io/): Un ORM de base de datos moderno y de tipo seguro para Node.js y TypeScript.
- [@prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client): Cliente de Prisma para Node.js, proporciona una API para acceder a la base de datos.
- [mysql2](https://www.npmjs.com/package/mysql2): Un controlador de MySQL para Node.js que ofrece una implementación rápida y segura.
- [nodemon](https://nodemon.io/): Una utilidad que monitorea los cambios en los archivos y reinicia automáticamente el servidor.


## Requisitos

Asegúrate de tener Node.js instalado en tu máquina. Este proyecto se ha probado con Node.js v20.11.1. Puedes descargar Node.js desde [su sitio web oficial](https://nodejs.org/en).
## Instalen
La extensión Prisma nos ayuda a interactuar con la base de datos.

# Integración de Node.js y Prisma

Estos fueron los pasos que se utilizaron para la integración de Node.js y Prisma cuando se creó el proyecto.



 [! CAUTION ]
> [!¡Advertencia]
> **¡Advertencia!**
>Los pasos de inicialización están arriba en el apartado de [Inicio Rápido](#inicio-rápido).

Paquetes necesarios:

```bash
npm init -y
npm install express prisma @prisma/client mysql2 nodemon
```
Inicializa Prisma:

```bash
npx prisma init
```

Realiza una introspección de la base de datos para generar los modelos de Prisma:

```bash
npx prisma introspect
```

Genera y aplica las migraciones de la base de datos:

```bash
npx prisma migrate dev
```

Ejecuta Prisma Studio para interactuar visualmente con tu base de datos:

```bash
npx prisma studio
```

