import type { EMU8086Tutorial } from '../types'

export const localTutorials: EMU8086Tutorial[] = [
  {
    id: 't-1',
    title: 'Introducción e Instalación de EMU8086',
    description: '¿Qué es el emulador 8086, cuáles son sus requisitos de sistema y cómo realizar una instalación y configuración básica paso a paso?',
    content: `### 1. ¿Qué es EMU8086?
**EMU8086 - Microprocessor Emulator** es una herramienta educativa de software que combina un editor de código de lenguaje ensamblador con un emulador virtual completo del microprocesador **Intel 8086**. 

Este programa permite simular de forma visual y controlada el comportamiento de la CPU, mostrando en tiempo real los registros internos, la memoria RAM asignada, la pila del sistema y la pantalla de salida de texto (pantalla DOS), facilitando el aprendizaje y la depuración sin riesgo de bloquear el sistema operativo real.

### 2. Requisitos de Instalación
EMU8086 es una herramienta sumamente liviana:
- **Sistema Operativo:** Windows XP, 7, 8, 10 o 11 (32 y 64 bits).
- **Procesador:** Intel Pentium o superior (cualquier procesador x86/x64 moderno).
- **Memoria RAM:** 256 MB mínimo (1 GB recomendado).
- **Espacio en Disco:** Aproximadamente 10 MB de almacenamiento libre.

### 3. Pasos de Instalación y Configuración
1. **Descarga:** Descarga el archivo de instalación oficial de EMU8086.
2. **Instalador:** Ejecuta el archivo descargado (\`setup.exe\`).
3. **Asistente:** Haz clic en *Next* (Siguiente), acepta los términos de la licencia, selecciona el directorio de instalación deseado y presiona *Install*.
4. **Finalizar:** Marca la casilla "Launch EMU8086" y haz clic en *Finish*.
5. **Ejecución inicial:** Al abrir el programa, verás una ventana de bienvenida que te ofrece crear un nuevo archivo de ensamblador (\`New\`), abrir un archivo existente (\`Open\`) o explorar ejemplos de código predefinidos.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 't-2',
    title: 'Descripción y Anatomía del Entorno',
    description: 'Análisis detallado de la interfaz gráfica de EMU8086: barra de herramientas, ventana de emulación, registros y grilla de memoria.',
    content: `El entorno gráfico de EMU8086 se compone de dos ventanas principales que trabajan en estrecha armonía durante el ciclo de desarrollo.

### 1. Ventana del Editor (Código Fuente)
Aquí es donde escribes tu código en lenguaje ensamblador. Sus partes esenciales son:
- **Barra de Herramientas Principal:**
  - **New / Open / Save:** Operaciones tradicionales de archivos de código.
  - **Compile:** Compila tu código fuente generando un archivo ejecutable binario (\`.com\` o \`.exe\`) e identifica errores de sintaxis en tus líneas.
  - **Emulate (Botón Clave):** Compila tu código y abre automáticamente la **Ventana de Emulación** cargando el programa en la memoria simulada, listo para ser ejecutado paso a paso.
- **Área de Edición:** Editor de texto simple con numeración de líneas y resaltado de palabras clave de ensamblador.

### 2. Ventana del Emulador (Depuración)
Se abre tras presionar **Emulate** y cuenta con paneles interactivos espectaculares:
- **Barra de Control de Simulación:**
  - **Single Step (Paso a Paso):** Ejecuta una única instrucción de código de máquina a la vez. Al presionarlo, el registro \`IP\` avanza, las banderas y registros cambian, e ilumina la siguiente línea a ejecutar.
  - **Run:** Ejecuta todo el programa automáticamente a velocidad regulada.
  - **Stop:** Pausa la ejecución automática en cualquier momento.
  - **Reload:** Reinicia el emulador, recargando el código en memoria y volviendo los registros a su estado inicial.
- **Panel de Registros (Lado Izquierdo):**
  Muestra en tiempo real el contenido hexadecimal de todos los registros del CPU:
  - Los de propósito general (\`AX\`, \`BX\`, \`CX\`, \`DX\`) divididos visiblemente en sus componentes High/Low de 8 bits.
  - Los de segmento (\`CS\`, \`DS\`, \`SS\`, \`ES\`).
  - Los punteros de direcciones e índices (\`IP\`, \`SP\`, \`BP\`, \`SI\`, \`DI\`).
- **Botón Flags (Banderas):**
  Abre una ventana flotante que muestra el estado binario (0 o 1) de las banderas de control y estado (Carry \`CF\`, Zero \`ZF\`, Sign \`SF\`, Overflow \`OF\`, etc.).
- **Botón Auxiliar de Memoria (Memory):**
  Muestra una grilla interactiva que despliega los valores hexadecimales contenidos en todas las posiciones físicas de la memoria RAM del sistema. Permite buscar direcciones y alterar valores dinámicamente.`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 't-3',
    title: 'Estructura Obligatoria de un Programa',
    description: 'Explicación detallada de las directivas básicas del compilador, declaración de variables y la estructura general de código 8086.',
    content: `Para que el compilador de EMU8086 pueda entender tu programa, debes definir la estructura lógica de los segmentos de memoria. El formato recomendado para tus trabajos escolares de la UNI es el siguiente:

\`\`\`assembly
.model small       ; Define el modelo de memoria (64KB de datos, 64KB de código)
.stack 100h        ; Reserva 256 bytes (100h) en la memoria Pila (Stack)

.data              ; INICIO DEL SEGMENTO DE DATOS
    ; Aquí declaras tus variables y constantes
    mensaje  db  'Hola Mundo UNI$', 13, 10
    numero1  db  10
    resultado db 0

.code              ; INICIO DEL SEGMENTO DE CÓDIGO
main proc          ; Declara el procedimiento principal
    ; 1. Inicialización obligatoria del Segmento de Datos
    mov ax, @data  ; Carga la dirección del segmento de datos en AX
    mov ds, ax     ; Asigna AX al registro de datos DS (No se puede mover directo a DS)

    ; 2. Tu código de instrucciones físicas
    mov ah, 09h    ; Servicio 09h de la interrupción 21h (Imprimir cadena)
    lea dx, mensaje ; Carga la dirección física del mensaje en el registro DX
    int 21h        ; Llama a la interrupción del DOS (imprime en pantalla)

    ; 3. Finalización correcta y retorno al Sistema Operativo
    mov ah, 4ch    ; Servicio 4ch de la interrupción 21h (Terminar programa)
    int 21h        ; Llama al DOS para devolver el control al sistema

main endp          ; Fin del procedimiento principal
end main           ; Fin del programa completo
\`\`\`

### Desglose de Instrucciones Clave:
- **mov ds, ax:** El registro de segmento de datos (\`DS\`) no acepta direccionamiento inmediato directo por restricciones físicas del hardware de Intel. Por ende, cargamos primero la dirección \`@data\` en el registro \`AX\`, y luego la movemos de \`AX\` a \`DS\`.
- **int 21h:** Es la llamada a las interrupciones lógicas del sistema operativo MS-DOS. Dependiendo del valor numérico que guardes en el registro acumulador alto \`AH\`, realizará diferentes acciones como imprimir texto, leer teclado o finalizar el programa.
- **lea dx, mensaje:** Carga la dirección de desplazamiento de la variable \`mensaje\` en el registro de índice \`DX\`. La cadena a imprimir con el servicio \`09h\` debe terminar obligatoriamente con el signo de dólar (\`$\`).`,
    order_number: 3,
    created_at: new Date().toISOString()
  }
]
