# Machote Dashboard (Next.js + TypeScript + Tailwind + ECharts)

Este **pack** agrega un dashboard base (KPIs + 2 gráficas + tabla) a un proyecto creado con `create-next-app`.
Incluye wrappers y endpoints de demo. Está listo para funcionar **sin base de datos**; luego puedes conectar Prisma/MySQL.

---

## ¿Para qué sirve cada pieza?
- `src/components/chart.tsx`: Wrapper de **ECharts** para React.
- `src/app/page.tsx`: Página principal que monta el dashboard.
- `src/app/dashboard-client.tsx`: Lógica de datos (React Query), KPIs, gráficas y tabla.
- `src/app/api/*`: 3 endpoints de **demo** para KPIs, serie de ventas y órdenes.
- `public/manifest.json` + `public/icons/*`: PWA básica (instalable en móvil).
- `next.config.mjs`: Habilita PWA en producción con `next-pwa`.
- `.vscode/*`: Recomendaciones de extensiones/formatos.
- `prisma/schema.prisma`: (opcional) ejemplo de modelos si luego conectas MySQL.

---

## Requisitos previos
Node LTS instalado y un proyecto base creado con Next.js + Tailwind (TypeScript).

### 1) Crea el proyecto (si aún no lo tienes)
Con **pnpm**:
```bash
pnpm dlx create-next-app@latest visionboard --ts --eslint --app --src-dir --tailwind
cd visionboard
```

Con **npm**:
```bash
npx create-next-app@latest visionboard --ts --eslint --app --src-dir --tailwind
cd visionboard
```

### 2) Instala dependencias del machote
```bash
# ECharts, React Query, React Table, PWA, Prisma (opcional para después)
pnpm i echarts echarts-for-react @tanstack/react-query @tanstack/react-table next-pwa @prisma/client prisma
# o con npm:
# npm i echarts echarts-for-react @tanstack/react-query @tanstack/react-table next-pwa @prisma/client prisma
```

### 3) Copia el contenido de este ZIP en la **raíz** del proyecto
Sobrescribe archivos si te pregunta (por ejemplo `next.config.mjs`).  
Estructura final esperada (parcial):
```
visionboard/
  src/app/page.tsx
  src/app/dashboard-client.tsx
  src/components/chart.tsx
  src/app/api/kpis/route.ts
  src/app/api/series/sales/route.ts
  src/app/api/orders/route.ts
  public/manifest.json
  public/icons/icon-192.png
  public/icons/icon-512.png
  next.config.mjs
```

### 4) Ejecuta el proyecto
```bash
pnpm dev
# o npm run dev
```
Abre `http://localhost:3000` en tu navegador. Deberías ver el dashboard con KPIs, 2 gráficas y una tabla.

### 5) (Opcional) PWA
PWA se activa **solo en producción** (`next build && next start`).  
El `manifest.json` ya está incluido; recuerda crear tu icono real más adelante.

### 6) (Opcional) Prisma/MySQL
- Ajusta `DATABASE_URL` en `.env`.
- Modifica `prisma/schema.prisma` a tus modelos y corre migraciones:
```bash
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
```
- Cambia `/api/kpis` para leer datos reales (ver notas en el código).

---

## Siguientes pasos
1. Personaliza el menú, colores y KPIs.
2. Sube a GitHub y sigue los pasos de EC2 de staging.
3. Conecta tu base de datos de staging y cambia los endpoints de demo por consultas reales.
