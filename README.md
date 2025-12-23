# Modern Ecommerce Store

A modern, responsive ecommerce application built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates a fully functional storefront with product browsing, cart management, and user authentication.

## Features

- **🛍️ Product Browsing**: Browse featured products and explore different categories.
- **🔍 Search**: Find products easily with built-in search functionality.
- **🛒 Shopping Cart**: Full cart management including adding items, updating quantities, and removing products. State is managed locally using Zustand.
- **📱 Responsive Design**: Mobile-first design ensuring a seamless experience across all devices.
- **🔐 Authentication**: Secure user authentication powered by Supabase.
- **🎨 Modern UI**: Beautiful and accessible UI components built with Shadcn UI and Radix UI primitives.

## Tech Stack

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Cart), [TanStack Query](https://tanstack.com/query/latest) (Data Fetching)
- **Routing**: [React Router](https://reactrouter.com/)
- **Backend & Database**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecommerce-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080` (or the port shown in your terminal).

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── cart/        # Cart-related components
│   ├── layout/      # Layout components (Header, Footer)
│   ├── product/     # Product-related components
│   └── ui/          # Shadcn UI primitive components
├── hooks/           # Custom React hooks
├── integrations/    # Third-party integrations (Supabase)
├── lib/             # Utility functions
├── pages/           # Application pages (Home, Cart, Auth, etc.)
└── store/           # Global state management (Zustand)
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

## License

This project is open source and available under the [MIT License](LICENSE).
