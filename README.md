
# Frontend - Sistema de Reservas ESFOT

Este proyecto corresponde al **frontend del Sistema de Reservas de Aulas y Laboratorios** de la Escuela de Formación de Tecnólogos (ESFOT) de la Escuela Politécnica Nacional.  
Provee una **interfaz gráfica moderna e intuitiva** para la gestión de usuarios, espacios académicos y reservas, adaptándose a los diferentes roles de usuario (Administrador, Docente, Estudiante).

---

## 🚀 Tecnologías Utilizadas

- **React.js** (Framework de desarrollo frontend)
- **CoreUI React** (Componentes y estilos)
- **React Router DOM** (Navegación entre vistas)
- **Axios** (Consumo de API REST)
- **React Big Calendar** (Visualización de reservas en calendario)
- **SCSS** (Estilos personalizados)
- **Vite** (Entorno de build y desarrollo)

---

## 📂 Estructura del Proyecto

```
src/
│── assets/images/   # Recursos gráficos e imágenes
│── components/      # Componentes reutilizables
│── hooks/           # Hooks personalizados
│── layout/          # Layouts principales (Dashboard, Login, etc.)
│── scss/            # Estilos SCSS
│── validations/     # Validaciones de formularios
│── views/           # Vistas principales de la aplicación
│── App.jsx          # Componente raíz
│── AppRoutes.jsx    # Definición de rutas
│── store.jsx        # Gestión de estado
│── index.jsx        # Punto de entrada de la aplicación
```

---

## ⚙️ Configuración del Entorno

Antes de ejecutar el frontend, crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=https://backend-reservas-esfot.onrender.com/api
```

---

## ▶️ Ejecución Local

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/RichardSoria/Frontend-Reservas-ESFOT.git
   cd Frontend-Reservas-ESFOT
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:5173`.

---

## 📌 Funcionalidades

- **Autenticación de usuarios** (login, logout, recuperación de contraseña).
- **Gestión de usuarios** (creación, edición, visualización).
- **Gestión de espacios académicos** (aulas y laboratorios).
- **Gestión de reservas** (creación, aprobación, rechazo, cancelación).
- **Calendario interactivo** con **React Big Calendar**.
- **Perfil de usuario** con actualización de datos.

---
## 📌 Despliegue

El frontend se encuentra desplegado en:

https://frontend-reservas-esfot.onrender.com/iniciar-sesion

---
## 👨‍💻 Autor

**Richard Soria**  
Desarrollador Frontend - Sistema de Reservas ESFOT  
