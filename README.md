# 🏗️ React Hexagonal Architecture + Vertical Slicing

> Example project to demonstrate the implementation of **Hexagonal
> Architecture** (Ports & Adapters) combined with **Vertical Slicing**
> in a modern React application with TypeScript.

## 📖 About this project

This is an educational project that implements a task management
application (Todos) following **Clean Architecture** principles and
advanced design patterns. The goal is to show how to structure React
applications in a scalable, maintainable, and testable way.

### Implemented architectural patterns:

-   **🔷 Hexagonal Architecture**: Layered separation (Domain,
    Application, Infrastructure)
-   **📊 Vertical Slicing**: Organization by features instead of
    technical type
-   **🎯 Domain-Driven Design**: Rich entities with business logic
-   **🔌 Ports & Adapters**: Dependency inversion and decoupling
-   **✅ Test-Driven Friendly**: Architecture designed to facilitate
    testing

## 🗂️ Project Structure

    src/
    └── features/
        └── todos/                         # Feature vertical slice
            ├── domain/                    # 🔵 Domain Layer
            │   ├── entities/              # Entities with business logic
            │   ├── enums/                 # Domain enumerations
            │   ├── exceptions/            # Domain exceptions
            │   └── ports/                 # Interfaces (contracts)
            │
            ├── application/               # 🟢 Application Layer
            │   └── services/              # Use cases and services
            │       └── dtos/              # Data Transfer Objects
            │
            └── infrastructure/            # 🟡 Infrastructure Layer
                ├── adapters/              # Concrete implementations
                ├── factories/             # Dependency injection
                ├── stores/                # State management (Zustand)
                └── ui/                    # React components
                    ├── components/
                    └── pages/

## 🚀 Installation and Execution

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Install dependencies

``` bash
npm install
```

### Run in development mode

``` bash
npm run dev
```

### Run tests

``` bash
npm run test
```

### Production build

``` bash
npm run build
```

## 🛠️ Tech Stack

-   **React 19** - UI library
-   **TypeScript 5.9** - Static typing
-   **Vite 7** - Build tool and dev server
-   **Vitest 4** - Testing framework
-   **React Router 7** - Routing
-   **Zustand 5** - State management
-   **TailwindCSS 4** - Utility-first styling

## 🎓 Key Concepts

### Hexagonal Architecture (Ports & Adapters)

The application is divided into three concentric layers:

1.  **Domain (Core)**: Pure business logic, no external dependencies\
2.  **Application**: Use cases that orchestrate the domain\
3.  **Infrastructure**: Technical adapters (UI, repositories, APIs)

### Vertical Slicing

Instead of organizing the code by technical type (components/,
services/, types/), we organize it by **complete features** (todos/,
users/, etc.). Each feature contains all its architectural layers.

**Advantages:**

-   ✅ High cohesion, low coupling
-   ✅ Parallel development without conflicts
-   ✅ Features easy to remove or extract
-   ✅ Simplified onboarding

## 🧪 Testing

The project includes unit tests at three levels:

``` bash
src/tests/
├── domain/           # Entity and business logic tests
├── application/      # Service tests
└── infrastructure/   # UI component tests
```

## 📚 Full Documentation

For a detailed explanation of the architecture, patterns, and design
decisions, see the full article in [ARTICLE.md](ARTICLE.md).

## 👤 Author

**Carlos Martinez**\
Computer Systems Engineer \| Full Stack Web Developer

## 📄 License

MIT License - This project is open source and available for educational
use.

------------------------------------------------------------------------

⭐ If this project helped you better understand Hexagonal Architecture
in React, consider giving it a star
