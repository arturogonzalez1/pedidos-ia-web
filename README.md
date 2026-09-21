# Pedidos

Panel web para restaurantes: login con token Bearer, dashboard y cambio de estatus de pedidos.

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

| Campo | Valor |
| --- | --- |
| Usuario | `admin` |
| Contraseña | `Admin123!` |

No hay registro ni recuperación de contraseña: el acceso es solo para personal.

## Qué incluye

- Login único con validación y sesión persistida
- Rutas protegidas: sin token válido se redirige a `/login`
- API real con JWT Bearer (`Authorization: Bearer <token>`)
- Dashboard con KPIs del turno
- Tabla de pedidos (mesa, delivery y para llevar)
- Cambio de estatus en un clic: **Recibido → Preparando → Enviado → Entregado**
- Tema claro/oscuro y color primario personalizable (se guarda en el navegador)

## Personalizar colores

1. En la app: botón **Colores** (esquina superior derecha).
2. En código: `src/styles/tokens.css` — cambia `--color-primary` y los neutros.
3. Presets: `src/theme/presets.js`.

Los hover, fondos suaves y anillos de foco se derivan del primario con `color-mix`, así que un solo cambio retematiza el producto.

Moneda y locale: `src/config/app.js`.

## Estructura

```
src/
  app/                 Router, providers
  components/
    layout/            Sidebar, header, shell
    ui/                Botón, input, tabla, badges…
    feedback/          Toasts
  config/              Nombre, moneda, claves de storage
  features/
    auth/              Login, sesión, guards
    dashboard/         Pedidos, KPIs, cambio de estatus
  lib/                 Cliente API, token Bearer, mock backend
  styles/              Tokens, reset, globales
  theme/               Presets y aplicación de tema
```

Cada módulo de `features/` agrupa `pages`, `components`, `services`, `hooks` y `constants`. Los componentes de `components/ui` se reutilizan entre pantallas.

## Autenticación

1. `POST /api/auth/login` con `{ userName, password }` devuelve `{ accessToken, tokenType, expiresAt, user }`.
2. El JWT se guarda y se envía en cada petición como `Authorization: Bearer …`.
3. Al recargar, se restaura la sesión si el token sigue vigente (`expiresAt` y claim `exp`).
4. Si el token expira o la API responde 401, la sesión se limpia y `ProtectedRoute` redirige a `/login`.

## Pedidos demo

Los pedidos de ejemplo viven en `src/features/dashboard/data/seedOrders.js` y se persisten en `localStorage` (los cambios de estatus sobreviven al refresco). Si todos tienen más de 24 h, se vuelven a sembrar.
