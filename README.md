# React vs Vue - Framework Comparison Project

A comprehensive comparison of **React** and **Vue** frameworks with different state management solutions. This project implements the same CRUD application (Products App) using multiple tech stacks to evaluate performance, developer experience, and architectural differences.

The accompanying YouTube video provides an in-depth walkthrough of the code, architecture, and performance benchmarks: [React vs Vue Performance Comparison](https://www.youtube.com/watch?v=hCyv92mHJPM).

[![Security](https://img.shields.io/badge/security-info-blue)](./SECURITY.md) [![License](https://img.shields.io/badge/license-open%20source-green)](./LICENSE)

## 📋 Project Overview

This monorepo contains three fully-functional implementations of a **Products CRUD Application**, each using different frameworks and state management libraries:

| App | Framework | State Management | UI Library | Styling |
|-----|-----------|------------------|-----------|---------|
| [react-redux](./react-redux) | React 19 | Redux Toolkit | Headless UI | Tailwind CSS |
| [react-zustand](./react-zustand) | React 19 | Zustand | Headless UI | Tailwind CSS |
| [vue-pinia](./vue-pinia) | Vue 3 | Pinia | Headless UI | Tailwind CSS |

## 🚀 Features

All implementations include the following CRUD operations:

- ✅ **Create** - Add new products with form validation
- ✅ **Read** - Display products with pagination and search
- ✅ **Update** - Edit existing product details
- ✅ **Delete** - Remove products with confirmation
- ✅ **Search** - Filter products by name with debouncing
- ✅ **Pagination** - Navigate through product results
- ✅ **Detail View** - View full product information in a modal

## 📁 Directory Structure

```
reactjs_vs_vuejs/
├── react-redux/                    # React with Redux Toolkit
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── store/                 # Redux store, slices, and hooks
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── api/                   # API integration
│   │   └── App.tsx                # Main application component
│   └── package.json
│
├── react-zustand/                  # React with Zustand
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── store/                 # Zustand store setup
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── api/                   # API integration
│   │   └── App.tsx                # Main application component
│   └── package.json
│
├── vue-pinia/                      # Vue 3 with Pinia
│   ├── src/
│   │   ├── components/            # Vue components
│   │   ├── stores/                # Pinia store setup
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── api/                   # API integration
│   │   └── App.vue                # Root component
│   └── package.json
│
├── React_vs_Vue_Performance_Report.pdf      # Performance comparison
├── React_Zustand_vs_Vue_Pinia_Report.pdf    # State management comparison
└── README.md                       # This file
```

## 🛠 Tech Stack

### Common Technologies
- **Build Tool**: Vite 8
- **Package Manager**: pnpm
- **Language**: TypeScript 6.0
- **Linting**: Biome 2.4
- **API**: DummyJSON (fake REST API for products)

### React Applications
- **React**: 19.2.6 - Modern React with Hooks
- **UI Library**: Headless UI 2.2.10 (React) - Unstyled, accessible components
- **Tailwind CSS**: 4.3.0 - Utility-first CSS framework
- **State Management**:
  - Redux Toolkit 2.12.0 (redux app)
  - Zustand 5.0.13 (zustand app)

### Vue Application
- **Vue**: 3.5.34 - Progressive framework
- **UI Library**: Headless UI 1.7.23 (Vue) - Vue version of Headless UI
- **Tailwind CSS**: 4.3.0 - Utility-first CSS framework
- **State Management**: Pinia 3.0.4 - Intuitive state management for Vue

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd reactjs_vs_vuejs
```

2. **Install dependencies** (for all projects)
```bash
pnpm install
```

Or install for a specific project:
```bash
cd react-redux && pnpm install
cd react-zustand && pnpm install
cd vue-pinia && pnpm install
```

### Development

Run the development server for any project:

```bash
cd react-redux
pnpm dev

# Or in another project
cd ../react-zustand
pnpm dev
```

The app will be available at `http://localhost:5173` (Vite default)

### Building

Build for production:

```bash
cd react-redux
pnpm build
```

All projects use the same build scripts:
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (TypeScript + Vite)
- `pnpm preview` - Preview production build
- `pnpm lint` - Format and lint code with Biome
- `pnpm typecheck` - Check TypeScript types

## 📊 Comparison Points

### State Management Approaches

**Redux Toolkit (react-redux)**
- Centralized store with slices
- Predictable state updates with actions
- Great DevTools and middleware support
- More boilerplate code
- Excellent for large, complex applications

**Zustand (react-zustand)**
- Minimal, lightweight library
- Simple hook-based API
- Less boilerplate than Redux
- Smaller bundle size
- Great for smaller to medium-sized apps

**Pinia (vue-pinia)**
- Designed specifically for Vue 3
- Option API and Composition API support
- Similar structure to Vuex but simpler
- Great TypeScript support
- Excellent Vue DevTools integration

### Key Differences

| Aspect | React | Vue |
|--------|-------|-----|
| **Learning Curve** | Steeper, requires ecosystem knowledge | Gentler, more intuitive |
| **Component Syntax** | JSX (JavaScript-like) | Template (HTML-like) |
| **State Management** | Multiple options (Redux, Zustand, etc.) | Built-in (Pinia) |
| **Bundle Size** | Varies by setup | Generally smaller |
| **Performance** | Excellent with proper optimization | Very good, optimized reactivity |
| **Community** | Larger ecosystem | Growing, very supportive |
| **Job Market** | Higher demand | Growing demand |

## 📈 Reports

Two comprehensive reports are included in the root directory:

1. **React_vs_Vue_Performance_Report.pdf** - Detailed performance metrics comparing React and Vue implementations
2. **React_Zustand_vs_Vue_Pinia_Report.pdf** - In-depth comparison of state management solutions (Zustand vs Pinia)

## 🔧 Project Structure Details

### Components (Common across all apps)

- **ProductList** - Display paginated list of products
- **ProductForm** - Create/Edit product modal form
- **ProductDetail** - View full product details modal
- **DeleteConfirm** - Confirmation dialog for deletion
- **Toolbar** - Search and pagination controls

### API Integration

All apps fetch products from [DummyJSON API](https://dummyjson.com/docs/products):
- GET `/products` - List products with pagination
- GET `/products/{id}` - Get single product details
- POST, PUT, DELETE - Create, update, delete products

### Type Safety

All projects use **TypeScript** for type safety:
- `types/product.ts` - Product domain types
- `types/api.ts` - API request/response types
- Strict mode enabled in `tsconfig.json`

## 📝 Code Quality

### Linting & Formatting

All projects use **Biome** for code quality:
```bash
pnpm lint    # Lint and format code
```

### Type Checking

```bash
pnpm typecheck    # Check TypeScript without emitting
```

## 📚 Resources

### React Documentation
- [React 19 Docs](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Vue Documentation
- [Vue 3 Docs](https://vuejs.org)
- [Pinia Documentation](https://pinia.vuejs.org)

### Tools & Libraries
- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Headless UI](https://headlessui.com) - Unstyled accessible components
- [Biome](https://biomejs.dev) - Fast formatter and linter


## 📄 License

This project is open source and available for educational purposes.

---

**Created**: May 2026  
**Last Updated**: May 24, 2026  
**Purpose**: Educational framework comparison and learning resource
