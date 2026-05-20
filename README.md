# 💻 Plataforma Educativa de Arquitectura de Máquinas 1 (UNI Nicaragua)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Una plataforma web interactiva y cyber-tecnológica diseñada específicamente para la asignatura de **Arquitectura de Máquinas 1** en la **Universidad Nacional de Ingeniería (UNI)**, Managua, Nicaragua.

Este proyecto tiene como objetivo educar de forma autónoma e interactiva sobre la arquitectura interna de microprocesadores CISC, enfocándose en la **familia Intel x86 (8086)**, ofreciendo recursos teóricos, evaluaciones en tiempo real, gestión de guías prácticas y un simulador interactivo de CPU completo integrado directamente en la web.

---

## 🌟 Características Clave

### 1. 🖥️ Simulador CPU Intel 8086 Integrado (EMU8086 Virtual)
El núcleo de la plataforma es un emulador interactivo de CPU de 16 bits de la familia ix86 programado completamente en JavaScript y TypeScript:
* **Banco de Registros en Tiempo Real**: Visualización dinámica de registros de propósito general (`AX` [con desglose `AH`/`AL`], `BX`, `CX`, `DX`), registros de índice/puntero (`SI`, `DI`, `SP`, `BP`, `IP`) y de segmento (`CS`, `DS`, `SS`).
* **Banderas de Estado (Flags)**: Indicadores visuales reactivos para las banderas `ZF` (Zero Flag), `CF` (Carry Flag) y `SF` (Sign Flag).
* **Consola de Salida Virtual (Emulación MS-DOS)**: Pantalla retro verde y negra que responde a servicios de interrupción `INT 21H` (Servicio `09h` para strings, `02h` para caracteres ASCII y `4Ch` para finalización).
* **Visor del Segmento de Datos (RAM)**: Monitoreo interactivo de variables y constantes declaradas en el segmento `.data` de tu código con sus valores hexadecimales y decimales correspondientes.
* **Presets de Código Incorporados**: Programas reales listos para simular (Hola Mundo, Suma de operandos, Bucle Contador con `LOOP` y Multiplicación básica).

### 2. 📚 Currículo Oficial UNI Nicaragua
Las 5 unidades temáticas del plan de estudios oficial se encuentran estructuradas con lecciones detalladas en formato Markdown técnico, con resaltado de código ensamblador e indicadores paso a paso:
* **Unidad 1**: Conceptos de Arquitectura y Organización de Computadoras.
* **Unidad 2**: Arquitectura del Microprocesador y Diagramas de Bloques.
* **Unidad 3**: Periféricos, Interrupciones y la Familia ix86.
* **Unidad 4**: Programación en Lenguaje Ensamblador ix86 Básica.
* **Unidad 5**: Procedimientos, Macros y Dispositivos de E/S.

### 3. 🧠 Autoevaluaciones Interactivas (Quizzes)
* Cuestionarios específicos para cada una de las 5 unidades.
* Barra de progreso del cuestionario, validación de aciertos/errores en tiempo real mediante neones visuales y **paneles explicativos de justificación técnica** detallados.
* Dashboard final con puntajes, análisis porcentual y comentarios motivacionales basados en el rendimiento académico.

### 4. 📂 Centro de Descargas Centralizado y Búsqueda en Tiempo Real
* Sirve directamente las guías oficiales de estudio y prácticas de laboratorio reales (archivos `.docx` provistos por la facultad de la UNI) desde la carpeta local `/public/materiales/`.
* Buscador fuzzy de títulos e índice de guías filtrado por unidades académicas en tiempo real.

### 5. ⚡ Diseño Cyber-Tecnológico Ultra Premium
* Temática oscura profunda con un panel de inicio estilo *Motherboard*.
* Componentes con bordes de luz neón móvil, paneles traslúcidos estilo *Glassmorphism* y animaciones de flujo en buses de datos (`data-bus-pulse`).
* Tipografía optimizada con Google Fonts (`Outfit` para descripciones didácticas y `JetBrains Mono` para la consola y mnemónicos de ensamblador).

### 6. 🔒 Arquitectura Local-First (Independiente de Configuración)
* El servicio `lib/db-service.ts` detecta si existen credenciales de Supabase. 
* Si no están configuradas, realiza un **graceful fallback** inmediato hacia el almacén de datos locales estáticos (`lib/data/*.ts`), permitiendo que el proyecto funcione de forma impecable offline o en entornos locales serverless sin configuraciones adicionales.

---

## 🛠️ Tecnologías y Librerías Utilizadas

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Lógica**: React 19, TypeScript 5
* **Estilizado**: TailwindCSS v4, Vanilla CSS
* **Iconos**: [Lucide React](https://lucide.dev/)
* **Database & Auth (Opcional)**: [Supabase](https://supabase.com/)

---

## 📦 Instalación y Desarrollo Local

Sigue estos sencillos pasos para levantar la plataforma en tu entorno local:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Gakilol/Pagina-web-sobre-AMC.git
   cd Pagina-web-sobre-AMC
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Correr servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

4. **Compilación para Producción**:
   ```bash
   npm run build
   ```

---

## 🏫 Créditos y Dedicatoria

Esta plataforma educativa fue desarrollada con mucho empeño y dedicación para los estudiantes y docentes de la **Universidad Nacional de Ingeniería (UNI) - Nicaragua**, con el fin de modernizar, dinamizar y simplificar el aprendizaje práctico de la Arquitectura de Máquinas de bajo nivel. 

*¡El conocimiento nos hace libres y la ingeniería construye el mañana!* 🇳🇮💪
