# 🏗️ React Hexagonal Architecture + Vertical Slicing

> Proyecto de ejemplo para demostrar la implementación de **Arquitectura Hexagonal** (Ports & Adapters) combinada con **Vertical Slicing** en una aplicación React moderna con TypeScript.

## 📖 Sobre este proyecto

Este es un proyecto educativo que implementa una aplicación de gestión de tareas (Todos) siguiendo principios de **Clean Architecture** y patrones de diseño avanzados. El objetivo es mostrar cómo estructurar aplicaciones React de forma escalable, mantenible y testeable.

### Patrones arquitectónicos implementados:

- **🔷 Arquitectura Hexagonal**: Separación en capas (Domain, Application, Infrastructure)
- **📊 Vertical Slicing**: Organización por features en lugar de por tipo técnico
- **🎯 Domain-Driven Design**: Entidades ricas con lógica de negocio
- **🔌 Ports & Adapters**: Inversión de dependencias y desacoplamiento
- **✅ Test-Driven Friendly**: Arquitectura diseñada para facilitar el testing

## 🗂️ Estructura del Proyecto

```
src/
└── features/
    └── todos/                         # Feature vertical slice
        ├── domain/                    # 🔵 Capa de Dominio
        │   ├── entities/              # Entidades con lógica de negocio
        │   ├── enums/                 # Enumeraciones de dominio
        │   ├── exceptions/            # Excepciones de dominio
        │   └── ports/                 # Interfaces (contratos)
        │
        ├── application/               # 🟢 Capa de Aplicación
        │   └── services/              # Casos de uso y servicios
        │       └── dtos/              # Data Transfer Objects
        │
        └── infrastructure/            # 🟡 Capa de Infraestructura
            ├── adapters/              # Implementaciones concretas
            ├── factories/             # Inyección de dependencias
            ├── stores/                # State management (Zustand)
            └── ui/                    # Componentes React
                ├── components/
                └── pages/
```

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Ejecutar tests
```bash
npm run test
```

### Build para producción
```bash
npm run build
```

## 🛠️ Stack Tecnológico

- **React 19** - Biblioteca de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7** - Build tool y dev server
- **Vitest 4** - Framework de testing
- **React Router 7** - Enrutamiento
- **Zustand 5** - State management
- **TailwindCSS 4** - Estilos utility-first

## 🎓 Conceptos Clave

### Arquitectura Hexagonal (Puertos y Adaptadores)

La aplicación está dividida en tres capas concéntricas:

1. **Dominio (Core)**: Lógica de negocio pura, sin dependencias externas
2. **Aplicación**: Casos de uso que orquestan el dominio
3. **Infraestructura**: Adaptadores técnicos (UI, repositories, APIs)

### Vertical Slicing

En lugar de organizar el código por tipo técnico (components/, services/, types/), lo organizamos por **features completas** (todos/, users/, etc.). Cada feature contiene todas sus capas de arquitectura.

**Ventajas:**
- ✅ Alta cohesión, bajo acoplamiento
- ✅ Desarrollo en paralelo sin conflictos
- ✅ Features fáciles de eliminar o extraer
- ✅ Onboarding simplificado

## 🧪 Testing

El proyecto incluye tests unitarios en tres niveles:

```bash
src/tests/
├── domain/           # Tests de entidades y lógica de negocio
├── application/      # Tests de servicios
└── infrastructure/   # Tests de componentes UI
```

## 📚 Documentación Completa

Para una explicación detallada de la arquitectura, patrones y decisiones de diseño, consulta el artículo completo en [ARTICLE.md](ARTICLE.md).

## 👤 Autor

**Carlos Martinez**  
Ingeniero en Sistemas Computacionales | Desarrollador Web Full Stack

## 📄 Licencia

MIT License - Este proyecto es de código abierto y está disponible para uso educativo.

---

⭐ Si este proyecto te ayudó a comprender mejor la Arquitectura Hexagonal en React, considera darle una estrella
