# Products CRUD — React 19 vs Vue 3

Two equivalent client-side products dashboards built against the free
[dummyjson.com/products](https://dummyjson.com/docs/products) API.

| App                  | Stack                                                                |
| -------------------- | -------------------------------------------------------------------- |
| `react-products-app` | React 19, Redux Toolkit, TypeScript, Headless UI, Tailwind CSS, Vite |
| `vue-products-app`   | Vue 3, Pinia, TypeScript, Headless UI Vue, Tailwind CSS, Vite        |

Both apps share the same feature set: paginated list, search, view detail,
create, edit, and delete — implemented entirely client-side.

## Run the React app

```bash
cd react-products-app
npm install
npm run dev   # http://localhost:5173
```

## Run the Vue app

```bash
cd vue-products-app
npm install
npm run dev   # http://localhost:5174
```

## About the API

dummyjson is a fake API: `POST /products/add`, `PUT /products/:id`, and
`DELETE /products/:id` return a realistic response but **do not persist**
changes server-side. Both apps merge the response into local store state so
the change is reflected for the session — refreshing reloads the original
dataset.

## Project layout

```
react-products-app/
  src/
    api/products.ts            # fetch wrapper around dummyjson
    store/                     # Redux Toolkit slice + typed hooks
    components/                # Toolbar, ProductList, ProductForm, DeleteConfirm, ProductDetail
    App.tsx, main.tsx

vue-products-app/
  src/
    api/products.ts            # same fetch wrapper
    stores/products.ts         # Pinia store
    components/                # same five components, .vue SFCs
    App.vue, main.ts
```
