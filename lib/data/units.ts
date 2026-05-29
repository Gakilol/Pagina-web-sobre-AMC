import type { Unit, Lesson } from '../types'

export const localUnits: Unit[] = [
  {
    id: 'unidad-1',
    title: 'Conceptos de Arquitectura y Organización de Computadoras',
    description: 'Fundamentos teóricos que definen la estructura, funciones y diferencias clave entre arquitectura y organización, así como entre microprocesadores y microcontroladores.',
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-2',
    title: 'Arquitectura del Microprocesador y Diagramas de Bloques',
    description: 'Estudio comparativo de los modelos Von Neumann y Harvard, las conexiones de buses con memoria y periféricos, y el diseño estructurado con diagramas de bloques.',
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-3',
    title: 'Periféricos, Interrupciones y la Familia ix86',
    description: 'Exploración de la interfaz programable 8255, el controlador de interrupciones 8259, la comunicación serial, el mapa de registros ix86 y la evolución de los procesadores.',
    order_number: 3,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-4',
    title: 'Programación en Lenguaje Ensamblador ix86 Básica',
    description: 'Sintaxis del lenguaje ensamblador, directivas de segmentos, modos de direccionamiento de memoria, estructuras de control de flujo y ejercicios prácticos en EMU8086.',
    order_number: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-5',
    title: 'Procedimientos, Macros y Dispositivos de E/S',
    description: 'Glosario técnico de tipos de datos, control y llamadas a puertos físicos de Entrada/Salida, interrupciones avanzadas y modularización de código con macros y procedimientos.',
    order_number: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-6',
    title: 'Arquitectura de Microcontroladores y Arduino',
    description: 'Estudio profundo de los microcontroladores embebidos: comparativa de arquitecturas Harvard vs Von Neumann, CISC vs RISC, ecosistema Arduino Uno y desarrollo de sistemas de control físico con LEDs, semáforos y sensores de temperatura.',
    order_number: 6,
    created_at: new Date().toISOString()
  },
  {
    id: 'unidad-7',
    title: 'Estructura de Memoria y Características Especiales de Microcontroladores',
    description: 'Estudio detallado de la organización de memoria en microcontroladores (RAM, ROM, Flash, EEPROM, Registros Especiales), características del hardware (ALU, W register, Pipeline, Osciladores) y gestión de memoria embebida y externa.',
    order_number: 7,
    created_at: new Date().toISOString()
  }
]

export const localLessons: Lesson[] = [
  // UNIDAD 1
  {
    id: 'l1-1',
    unit_id: 'unidad-1',
    title: 'Arquitectura vs Organización de Computadoras',
    content: `La diferencia entre arquitectura y organización de computadoras es fundamental en el estudio de sistemas de hardware.

**1. Arquitectura de Computadoras:**
Se refiere a los atributos de un sistema que son visibles para un programador, o bien, aquellos atributos que tienen un impacto directo en la ejecución lógica de un programa. 
*Ejemplos:*
- El conjunto de instrucciones (ISA - Instruction Set Architecture).
- El número de bits utilizados para representar tipos de datos (e.g., enteros de 8, 16, 32 o 64 bits).
- Los mecanismos de Entrada/Salida (E/S).
- Las técnicas de direccionamiento de memoria.

**2. Organización de Computadoras:**
Se refiere a las unidades operativas de hardware y sus interconexiones, las cuales implementan las especificaciones de la arquitectura. Los detalles organizacionales son transparentes para el programador.
*Ejemplos:*
- Señales de control de hardware e interfaces del bus.
- La tecnología de memoria utilizada (SRAM, DRAM, etc.).
- Si se utiliza una unidad de multiplicación física o aritmética sumada por software.

*Resumen Práctico:* La arquitectura define qué hace una computadora (la interfaz de software/hardware), mientras que la organización define cómo lo hace (la implementación física).`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l1-2',
    unit_id: 'unidad-1',
    title: 'Estructura de la Computadora: Estructura y Función',
    content: `El análisis de una computadora se aborda tradicionalmente desde dos perspectivas fundamentales: su estructura lógica y su comportamiento funcional.

**1. Estructura (El Componente Estático):**
Es el modo en que los componentes están interconectados. Toda computadora tiene cuatro partes estructurales principales:
- **Unidad Central de Procesamiento (CPU):** Controla el funcionamiento de la computadora y realiza sus funciones de procesamiento de datos. Comunmente llamada procesador.
- **Memoria Principal:** Almacena temporalmente tanto los datos como las instrucciones en ejecución.
- **Entrada/Salida (E/S):** Transfiere datos entre la computadora y su entorno externo (periféricos de entrada, dispositivos de almacenamiento secundario y terminales).
- **Sistema de Interconexión (Buses):** Proporciona los canales de comunicación entre la CPU, la memoria principal y el sistema de E/S.

**2. Función (El Componente Dinámico):**
Es la operación de cada componente individual como parte de la estructura global del sistema. Un computador realiza cuatro operaciones básicas:
- **Procesamiento de datos:** Operaciones aritméticas y lógicas sobre los datos de entrada.
- **Almacenamiento de datos:** Retención a corto plazo en memoria principal o a largo plazo en memoria secundaria.
- **Movimiento de datos:** Transferencia de información entre el computador y el exterior.
- **Control:** La CPU gestiona el flujo de recursos coordinando todas las actividades anteriores en base a secuencias de instrucciones de control.`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'l1-3',
    unit_id: 'unidad-1',
    title: 'Microprocesador vs Microcontrolador',
    content: `Aunque ambos son circuitos integrados diseñados para el control electrónico y computación, sus objetivos de arquitectura, componentes integrados y áreas de aplicación son marcadamente diferentes.

**1. Definición de Microprocesador (uP):**
Es una unidad central de procesamiento (CPU) contenida en un solo chip de silicio. No tiene memoria (RAM, ROM) ni periféricos integrados en el mismo silicio. Para funcionar, requiere la conexión externa de chips de memoria, oscilador, decodificadores y controladores de E/S en una tarjeta de circuito impreso (motherboard).
- **Enfoque:** Computación de propósito general y alto rendimiento (Computadoras, Servidores).
- **Costos/Consumo:** Mayor costo, alto consumo energético, requiere disipación térmica.
- **Ejemplos:** Intel Core i7, AMD Ryzen, Intel 8086.

**2. Definición de Microcontrolador (uC):**
Es un sistema computacional completo contenido dentro de un solo chip de silicio. Integra en su interior la CPU, memoria RAM (almacenamiento temporal), memoria no volátil (Flash/ROM para guardar el programa), generador de reloj, puertos digitales de Entrada/Salida, y periféricos especiales como temporizadores (Timers), convertidores Analógico-Digitales (ADC) e interfaces de comunicación (UART, SPI, I2C).
- **Enfoque:** Control de sistemas embebidos de propósito específico (Electrodomésticos, Automóviles, IoT).
- **Costos/Consumo:** Muy bajo costo, bajísimo consumo energético, ideal para baterías.
- **Ejemplos:** PIC16F877A, ATmega328P (utilizado en Arduino Uno), ESP32.

**Diferencias Clave:**
- El microprocesador es el "cerebro" y el microcontrolador es un "computador completo en un chip".
- Los microprocesadores destacan por su alta velocidad de cómputo y flexibilidad, mientras que los microcontroladores sobresalen en integración física, bajo costo de fabricación y control en tiempo real en tareas específicas.`,
    order_number: 3,
    created_at: new Date().toISOString()
  },

  // UNIDAD 2
  {
    id: 'l2-1',
    unit_id: 'unidad-2',
    title: 'Arquitectura Von Neumann vs Harvard',
    content: `La disposición de los canales de comunicación de la memoria con el CPU define el rendimiento de la CPU. Existen dos arquitecturas fundamentales:

**1. Arquitectura Von Neumann:**
Se caracteriza por utilizar un **único espacio de memoria física** compartido para almacenar tanto las instrucciones del programa como los datos del usuario. Ambos tipos de información viajan a través del **mismo conjunto de buses** (bus de datos y de direcciones).
- **Ventaja:** Flexibilidad de uso de memoria física y diseño de hardware más simple y barato.
- **Desventaja (El Cuello de Botella de Von Neumann):** La CPU no puede leer una instrucción y leer/escribir datos en memoria al mismo tiempo, lo que obliga a realizar los accesos secuencialmente, limitando la velocidad máxima del sistema.
- **Ejemplo relacionado:** Computadoras personales tradicionales, procesadores antiguos (Intel 8086).

**2. Arquitectura Harvard:**
Se caracteriza por disponer de **memorias físicas separadas** para almacenar instrucciones por un lado y datos por el otro. Cada memoria cuenta con sus **propios buses físicos de direcciones y de datos**.
- **Ventaja:** Acceso simultáneo de alta velocidad. La CPU puede leer una nueva instrucción de código en el mismo ciclo de reloj en que escribe un resultado de datos en la memoria de datos. Esto maximiza el procesamiento paralelo.
- **Desventaja:** Diseño físico mucho más complejo (doble de conexiones de pines) e imposibilidad de utilizar memoria no utilizada de instrucciones para guardar datos adicionales de manera directa.
- **Ejemplo relacionado:** Procesadores de Señales Digitales (DSP), la mayoría de los microcontroladores modernos (PIC, AVR), caches L1 de procesadores modernos.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l2-2',
    unit_id: 'unidad-2',
    title: 'Organización Externa y Conexión del Microprocesador',
    content: `Para interactuar con el mundo, un microprocesador cuenta con una organización externa basada en terminales (pines) conectados a través del bus del sistema. Los buses son autopistas digitales de información clasificadas en:

**1. Bus de Direcciones:**
Unidireccional (de la CPU hacia afuera). Especifica la dirección exacta de memoria o puerto de E/S con el que se desea realizar una operación. El número de líneas del bus determina la capacidad máxima de direccionamiento (2^n bytes, donde n es el número de líneas del bus de direcciones).
*Ejemplo:* El 8086 posee 20 líneas de dirección, direccionando hasta 1 MB ($2^{20}$ bytes).

**2. Bus de Datos:**
Bidireccional. Transporta la información real (datos u operandos de instrucciones) que fluyen entre la CPU y la memoria o los puertos periféricos.
*Ejemplo:* El 8086 posee un bus de datos de 16 bits de ancho, permitiendo leer/escribir palabras enteras de 16 bits en una sola transacción física.

**3. Bus de Control:**
Transporta señales de reloj y señales de sincronización. Las señales clave para la conexión incluyen:
- **RD (Read):** Indica que la CPU desea leer información de un dispositivo externo.
- **WR (Write):** Indica que la CPU está colocando datos válidos en el bus para grabarlos.
- **M/IO (Memory / Input-Output):** Selecciona si la dirección del bus pertenece a la memoria principal o a un dispositivo periférico de Entrada/Salida.
- **ALE (Address Latch Enable):** Utilizada para desmultiplexar buses que comparten funciones de datos e instrucciones físicamente en los mismos pines.`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'l2-3',
    unit_id: 'unidad-2',
    title: 'Diagrama de Bloques en Arquitectura de Máquinas',
    content: `El diagrama de bloques es una representación gráfica simplificada y de alto nivel que ilustra los componentes principales de un sistema y sus relaciones funcionales a través de bloques interconectados por flechas orientadas.

**Símbolos Clave:**
- **Bloques Rectangulares:** Representan unidades de hardware funcionalmente independientes (e.g., ALU, Registros, Decodificador de Instrucciones, Puertos E/S).
- **Flechas Sólidas:** Representan el flujo de datos.
- **Flechas de Líneas Segmentadas:** Representan señales lógicas de control.
- **Buses (Líneas Anchas con Flechas en los extremos):** Representan el flujo de datos multilínea de buses de direcciones y buses de datos del sistema.

**¿Cuándo utilizar los Diagramas de Bloques?**
- Para explicar o entender la estructura interna de una CPU compleja sin perderse en el diseño eléctrico detallado de compuertas lógicas.
- Al documentar cómo interactúan los subsistemas principales de una computadora (CPU, Memoria, Controladores de Periféricos).
- En fases de diseño inicial de sistemas de hardware embebidos.

**Diferencias con Diagramas de Flujo:**
- Un **Diagrama de Bloques** es de carácter **estructural y estático**; describe los elementos físicos existentes en un sistema y sus caminos de conexión de datos de forma paralela.
- Un **Diagrama de Flujo** es de carácter **secuencial e institucional**; describe los pasos lógicos, algoritmos y decisiones temporales que realiza un software a lo largo del tiempo.`,
    order_number: 3,
    created_at: new Date().toISOString()
  },

  // UNIDAD 3
  {
    id: 'l3-1',
    unit_id: 'unidad-3',
    title: 'Interfaz Programable 8255 y Controlador de Interrupciones 8259',
    content: `El microprocesador 8086 requiere chips de apoyo periféricos para controlar dispositivos e interrupciones eficientemente.

**1. Interfaz de Periféricos Programable (8255 PPI):**
Es un chip de E/S versátil de bajo costo que proporciona 24 líneas de E/S digitales configurables en tres puertos independientes de 8 bits:
- **Puerto A (Port A):** Puede ser configurado para entrada o salida en 3 modos distintos.
- **Puerto B (Port B):** Puerto simple de entrada/salida configurable.
- **Puerto C (Port C):** Puede actuar como puerto de entrada/salida simple o dividirse en dos nibbles (4 bits cada uno) para actuar como líneas de control (Handshaking) para el Puerto A y el Puerto B.
*Uso común:* Conectar teclados matriciales, displays de 7 segmentos e impresoras antiguas.

**2. Controlador Programable de Interrupciones (8259 PIC):**
El microprocesador 8086 posee solo dos pines físicos para recibir señales de interrupción de hardware externas: INTR e NMI. Para conectar múltiples dispositivos externos, se añade el chip 8259, que actúa como administrador de prioridades:
- Puede gestionar hasta 8 líneas de interrupción externas independientes en cascada, expandible hasta 64 interrupciones asociando múltiples integrados.
- Resuelve conflictos asignando prioridades configurables por software (el dispositivo prioritario interrumpe de primero).
- Entrega el "Vector de Interrupción" exacto a la CPU para que sepa qué subrutina de servicio ejecutar (ISR).`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l3-2',
    unit_id: 'unidad-3',
    title: 'Comunicación Serial y Modelos de Memoria ix86',
    content: `La comunicación serial y los esquemas organizativos de memoria representan pilares clave de la interconexión y programación del procesador.

**1. Comunicación Serial:**
Consiste en la transmisión de datos **bit a bit de forma secuencial** a través de un único canal o cable físico.
- **Ventajas:** Requiere muchísimos menos pines y cables que la comunicación paralela (que envía 8 o 16 bits simultáneamente), disminuyendo costos de tendido y evitando la desincronización por interferencia electromagnética a largas distancias.
- **Protocolo Asíncrono (UART):** No comparte una línea común de reloj físico. Para sincronizar la transferencia se utilizan bits de inicio (Start Bit), bits de parada (Stop Bit), velocidades constantes acordadas (Baud Rate) y bits opcionales de paridad para control de errores elementales.

**2. Modelos de Memoria y Segmentación ix86:**
El 8086 puede direccionar físicamente 1 Megabyte ($2^{20}$ bytes) pero internamente posee registros de direcciones que son de solo 16 bits ($2^{16} = 64$ Kilobytes). Para solucionar esta limitación, Intel introdujo la **Segmentación de Memoria**:
La memoria física se divide en segmentos lógicos móviles de hasta 64 KB de longitud. Una dirección se representa en formato **Segmento:Desplazamiento (Segment:Offset)**.
La dirección física real de 20 bits se calcula en hardware de la siguiente manera:
$$\\text{Dirección Física} = (\\text{Registro de Segmento} \\times 16) + \\text{Desplazamiento (Offset)}$$
En hexadecimal, equivale a desplazar el valor del registro de segmento un dígito hexadecimal a la izquierda (añadir un cero) y sumar el offset.
*Ejemplo:* \`1234:0005\` se calcula como:
$$12340 + 0005 = 12345\\text{h (Dirección física real en bus de 20 bits)}$$`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'l3-3',
    unit_id: 'unidad-3',
    title: 'Registros del Microprocesador 8086',
    content: `El microprocesador 8086 cuenta con un banco interno de registros de 16 bits muy organizados, fundamentales para realizar cualquier programa en ensamblador:

**1. Registros de Propósito General:**
Pueden usarse para operaciones aritméticas y lógica general, y sus mitades superior (H) e inferior (L) de 8 bits se pueden acceder de forma independiente:
- **AX (Accumulator):** Registro acumulador de operaciones. Utilizado obligatoriamente en multiplicaciones, divisiones y operaciones de E/S rápidas.
- **BX (Base Register):** Registro base para direccionamiento indirecto. Puede almacenar direcciones de memoria.
- **CX (Counter Register):** Registro contador. Usado por defecto en bucles recurrentes (\`LOOP\`) y operaciones de cadenas de texto.
- **DX (Data Register):** Registro de datos. Usado en multiplicación/división de 32 bits y para guardar direcciones de puertos de E/S físicos en instrucciones \`IN\`/\`OUT\`.

**2. Registros de Segmento:**
Definen las bases de las áreas lógicas de memoria activas:
- **CS (Code Segment):** Apunta al segmento donde están guardadas las instrucciones que se van a ejecutar.
- **DS (Data Segment):** Apunta al segmento de almacenamiento de variables del programa.
- **SS (Stack Segment):** Apunta al segmento destinado para la pila del sistema (almacenamiento temporal de llamadas y parámetros).
- **ES (Extra Segment):** Segmento de memoria extra utilizado frecuentemente en copias rápidas de cadenas y tablas.

**3. Registros de Punteros e Índices (Offsets obligatorios):**
- **IP (Instruction Pointer):** Puntero de instrucción. Apunta a la siguiente instrucción a ejecutar en el segmento \`CS\` (Dirección física calculada como \`CS:IP\`).
- **SP (Stack Pointer) / BP (Base Pointer):** Punteros a la pila del segmento \`SS\`.
- **SI (Source Index) / DI (Destination Index):** Índices de direccionamiento de origen y destino para movimientos masivos de memoria de datos.`,
    order_number: 3,
    created_at: new Date().toISOString()
  },

  // UNIDAD 4
  {
    id: 'l4-1',
    unit_id: 'unidad-4',
    title: 'Estructura de un Programa y Sintaxis de Ensamblador',
    content: `Programar en ensamblador implica dar instrucciones detalladas de bajo nivel directamente relacionadas con la CPU y la memoria de datos.

**1. Formato de una Sentencia en Ensamblador:**
Toda línea de código en ensamblador sigue típicamente una estructura de cuatro campos de texto:
$$\\text{[Etiqueta:] } \\text{ Mnemónico } \\text{ [Operando(s)] } \\text{ [; Comentario]}$$
- **Etiqueta:** Identificador opcional que representa una dirección de memoria para realizar saltos condicionales o definir variables.
- **Mnemónico:** La instrucción u orden física ejecutable por el procesador (e.g., \`MOV\`, \`ADD\`, \`LOOP\`, \`INT\`).
- **Operandos:** Los datos de entrada o registros que utiliza la instrucción. Pueden ser dos (Destino, Origen), uno, o ninguno.
- **Comentario:** Texto explicativo ignorado por el compilador que comienza siempre con punto y coma (\`;\`).

**2. Declaración de Segmentos y Directivas:**
Las directivas son órdenes especiales dirigidas al compilador de ensamblador que no generan código de máquina directamente, sino que definen cómo se compilará:
- **.model:** Especifica el tamaño de memoria global (e.g., \`.model small\` define un segmento de código y un segmento de datos, ideal para programas sencillos).
- **.stack:** Reserva espacio físico en memoria para la pila del programa (e.g., \`.stack 100h\` reserva 256 bytes).
- **.data:** Declara el inicio del segmento de datos donde se definen las constantes y variables del programa utilizando operadores de asignación de tamaño como \`DB\` (Define Byte - 8 bits) y \`DW\` (Define Word - 16 bits).
- **.code:** Declara el inicio del segmento de código de máquina ejecutable.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l4-2',
    unit_id: 'unidad-4',
    title: 'Modos de Direccionamiento de Memoria',
    content: `Los modos de direccionamiento definen la manera en que el procesador calcula u obtiene el operando de origen o de destino al ejecutar una instrucción de lectura/escritura de datos. Los modos en el 8086 incluyen:

**1. Direccionamiento Implícito:**
La instrucción define el registro u operando de forma interna, no requiere escribir operandos adicionales.
*Ejemplo:* \`CLC\` (Clear Carry - pone la bandera de acarreo a 0).

**2. Direccionamiento Inmediato:**
El valor operando es un dato numérico o constante fijo escrito directamente en la propia línea de instrucción.
*Ejemplo:* \`MOV AX, 1234h\` (Se guarda el número hexadecimal \`1234\` en el registro \`AX\`).

**3. Direccionamiento por Registro:**
Los datos se encuentran alojados internamente en registros del procesador. No se accede a la memoria RAM.
*Ejemplo:* \`MOV AX, BX\` (Copia el valor contenido del registro \`BX\` en el registro \`AX\`).

**4. Direccionamiento Directo:**
El operando indica la dirección de desplazamiento de memoria RAM de forma numérica o mediante el nombre de una variable.
*Ejemplo:* \`MOV AX, [1000h]\` o \`MOV AL, variable\` (Busca el valor guardado en el offset correspondiente del segmento de datos).

**5. Direccionamiento Indirecto por Registro:**
La dirección del operando en memoria está guardada dentro de un registro base o índice (comúnmente \`BX\`, \`SI\`, \`DI\`, \`BP\`).
*Ejemplo:* \`MOV AL, [BX]\` (Busca en la memoria RAM en la dirección a la que apunta el valor actual guardado en \`BX\`).`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'l4-3',
    unit_id: 'unidad-4',
    title: 'Estructuras de Control de Flujo',
    content: `El microprocesador ejecuta instrucciones secuencialmente una tras otra apuntada por el registro de instrucción \`IP\`. Para implementar estructuras de control de flujo (como decisiones \`IF-ELSE\`, bucles \`FOR\` o ciclos \`WHILE\`), se utilizan saltos para alterar secuencialmente \`IP\`.

**1. Comparaciones y Banderas:**
La instrucción clave es \`CMP\` (Compare). Realiza internamente una resta virtual temporal (Operando1 - Operando2) sin modificar sus valores reales, solo actualizando los estados de las banderas en el registro de banderas:
- **ZF (Zero Flag):** Se pone en 1 si los operandos son iguales (la resta dió cero).
- **CF (Carry Flag):** Se pone en 1 si hubo acarreo o préstamo (Operando1 < Operando2 en números sin signo).
- **SF (Sign Flag):** Refleja si el resultado de la resta virtual fue negativo.

**2. Saltos Incondicionales:**
- \`JMP etiqueta\`: Salta directamente a la línea identificada por la etiqueta sin evaluar ninguna condición.

**3. Saltos Condicionales (Evalúan el estado de las banderas):**
- \`JE\` / \`JZ\` (Jump If Equal / Zero): Salta si los operandos son iguales (\`ZF=1\`).
- \`JNE\` / \`JNZ\` (Jump If Not Equal / Not Zero): Salta si son diferentes (\`ZF=0\`).
- \`JG\` / \`JA\` (Jump If Greater / Above): Salta si el primer operando es mayor al segundo.
- \`JL\` / \`JB\` (Jump If Less / Below): Salta si el primer operando es menor al segundo.

**4. Bucle Automático:**
- \`LOOP etiqueta\`: Resta automáticamente \`1\` al registro acumulador contador \`CX\`. Si \`CX\` no es igual a \`0\`, realiza un salto condicional a la etiqueta indicada, ideal para repetir bloques de código con exactitud.`,
    order_number: 3,
    created_at: new Date().toISOString()
  },

  // UNIDAD 5
  {
    id: 'l5-1',
    unit_id: 'unidad-5',
    title: 'Glosario Técnico de Ensamblador y E/S',
    content: `Para dominar la programación de bajo nivel avanzada, es necesario clarificar términos clave del glosario técnico y el manejo físico de Entrada y Salida:

**1. Constantes:**
Valores fijos que no cambian durante la ejecución del programa. Pueden declararse con directivas como \`EQU\` (Equal).
*Ejemplo:* \`PUERTO_A EQU 80h\` (asigna el alias de texto \`PUERTO_A\` al puerto físico número \`80h\`).

**2. Operadores:**
Expresiones matemáticas o lógicas que actúan sobre valores constantes durante el proceso de ensamblado.
*Ejemplos:* \`+\`, \`-\`, \`OFFSET\` (extrae la dirección de memoria en lugar del valor), \`SEG\` (extrae el número de segmento de una variable).

**3. Tipos de Datos elementales:**
- **Byte (DB):** Variable numérica de 8 bits (rango: $0$ a $255$ sin signo, $-128$ a $+127$ con signo).
- **Word (DW):** Palabra de 16 bits de tamaño ($2$ bytes).
- **Double Word (DD):** Doble palabra de 32 bits ($4$ bytes).

**4. Entrada y Salida (E/S) física:**
El 8086 cuenta con instrucciones especiales de bajo nivel para interactuar con puertos externos digitales de control físico:
- \`IN AL, DX\` / \`IN AL, puerto\`: Lee un byte físico proveniente de un puerto de hardware externo y lo almacena en el registro de la CPU.
- \`OUT DX, AL\` / \`OUT puerto, AL\`: Envía un byte físico de datos de salida desde el registro de la CPU hacia un puerto periférico o actuador externo.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l5-2',
    unit_id: 'unidad-5',
    title: 'Uso de Procedimientos y Macros en Ensamblador',
    content: `A medida que un programa ensamblador crece, modularizar y estructurar el código se vuelve indispensable. Existen dos mecanismos muy diferentes: Procedimientos y Macros.

**1. Procedimientos (Subrutinas):**
Son subsecciones independientes de código que residen en una dirección física única de la memoria y que pueden llamarse repetidamente desde cualquier parte del programa.
- **Funcionamiento:** Se definen con las directivas \`PROC\` y \`ENDP\`. Se invocan con la instrucción \`CALL\` y se retorna obligatoriamente con la instrucción \`RET\`.
- **Mecanismo de hardware:** Al ejecutar \`CALL\`, el procesador guarda la dirección de retorno en la Pila (\`STACK\`) y altera el registro \`IP\`. Al ejecutar \`RET\`, la CPU extrae (POP) esa dirección de retorno de la Pila para seguir con la ejecución normal.
- **Pros/Contras:** Ahorran muchísimo espacio en memoria física del chip, pero tienen una pequeña penalización de velocidad al realizar saltos físicos e interactuar con la pila de memoria.

**2. Macros:**
Son bloques de instrucciones de ensamblador con nombres asignados definidos por el programador. No se compilan de forma independiente en una única dirección física de memoria.
- **Funcionamiento:** Se definen con la directiva \`MACRO\` y finalizan con \`ENDM\`.
- **Mecanismo del ensamblador (Expansión):** Cada vez que escribimos el nombre de la macro en el código, el ensamblador durante la precompilación **copia y pega la totalidad del código** de la macro exactamente en esa línea.
- **Pros/Contras:** Ejecución ultrarrápida (sin saltos físicos en hardware ni interacciones lentas con la pila), pero multiplican enormemente el tamaño físico de la memoria si la macro se utiliza muchas veces en el código.
- **Parámetros:** Aceptan argumentos variables que sustituyen el texto internamente al expandirse.`,
    order_number: 2,
    created_at: new Date().toISOString()
  },

  // UNIDAD 6
  {
    id: 'l6-1',
    unit_id: 'unidad-6',
    title: 'Arquitectura de Microcontroladores: Harvard, Von Neumann, CISC y RISC',
    content: `Un microcontrolador es un sistema computacional completo integrado en un solo chip de silicio, diseñado para el control de sistemas embebidos de propósito específico.

**1. Arquitectura Harvard vs Von Neumann en Microcontroladores:**

**Arquitectura Von Neumann (Clásica):**
Utiliza un único espacio de memoria compartido para instrucciones (programa) y datos. Ambos comparten el mismo bus de datos y de direcciones.
- **Ventaja:** Diseño simple y flexible.
- **Desventaja:** Cuello de botella al no poder leer instrucción y dato simultáneamente.
- *Relacionados:* Intel 8086, computadoras de escritorio clásicas.

**Arquitectura Harvard (Moderna en Microcontroladores):**
Memorías físicamente separadas para instrucciones (Flash/ROM) y datos (SRAM). Cada memoria tiene sus propios buses independientes.
- **Ventaja:** La CPU puede buscar la siguiente instrucción mientras procesa datos del ciclo actual, logrando mayor velocidad y eficiencia.
- **Desventaja:** Mayor complejidad de diseño físico (más pines).
- *Relacionados:* PIC, AVR (Arduino), ARM Cortex-M.

**2. CISC vs RISC:**

**CISC (Complex Instruction Set Computer):**
- Instrucciones complejas y de longitud variable que realizan múltiples operaciones físicas en un solo ciclo de ejecución.
- Menor número de líneas de código de ensamblador por tarea.
- Requiere circuitería de decodificación más compleja internamente.
- *Ejemplo:* Intel 8086, x86-64 (procesadores de escritorio modernos).

**RISC (Reduced Instruction Set Computer):**
- Instrucciones simples, uniformes y de longitud fija que se ejecutan en exactamente un ciclo de reloj.
- Mayor número de instrucciones de ensamblador necesarias, pero pipeline más eficiente.
- Permite velocidades de reloj mucho más altas con menor consumo energético.
- *Ejemplo:* ARM (base de casi todos los microcontroladores modernos y smartphones), RISC-V.

**3. Tipos de Microcontroladores:**

**Microcontroladores Embebidos (Integrados):**
Toda la circuitería (CPU, RAM, Flash, E/S, ADC, Timers) está en un único chip de silicio compacto. Son los más usados en IoT y electrónica de consumo.
- *Ejemplos:* ATmega328P (Arduino Uno), ESP32, STM32F103.

**Microcontroladores con Memoria Externa:**
La CPU está en el chip principal, pero la memoria RAM o Flash de programa se conecta externamente mediante buses físicos. Diseño más flexible para aplicaciones con grandes volúmenes de datos.
- *Ejemplos:* MCS-51 expandido, familia PIC18F con memoria externa.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l6-2',
    unit_id: 'unidad-6',
    title: 'Ecosistema Arduino Uno: Placa, Entradas/Salidas y Componentes',
    content: `Arduino es una plataforma de desarrollo de hardware y software libre orientada a la creación rápida de prototipos de sistemas embebidos. La placa más popular es el **Arduino Uno**, que utiliza el microcontrolador **ATmega328P** de Atmel (8 bits, arquitectura Harvard, RISC).

**1. Especificaciones Técnicas del Arduino Uno:**
- **Microcontrolador:** ATmega328P a 16 MHz de reloj.
- **Memoria Flash (Programa):** 32 KB.
- **Memoria SRAM (Datos):** 2 KB.
- **Pines Digitales de E/S:** 14 pines (6 con capacidad PWM, marcados con ~).
- **Pines Analógicos de Entrada:** 6 pines (A0 a A5), con convertidor ADC de 10 bits.
- **Voltaje de Operación:** 5V DC.
- **Voltaje de Alimentación:** 7-12V (jack DC) o 5V (USB).

**2. Pines y Modos de Operación:**

**Pines Digitales de Entrada/Salida:**
- Funcionan en 2 modos: INPUT (lectura de señales 0V/5V = LOW/HIGH) u OUTPUT (escritura de 0V o 5V).
- El Pin 13 tiene un LED integrado en la placa útil para pruebas básicas.
- pinMode(pin, modo): Configura el pin como entrada o salida.
- digitalWrite(pin, valor): Escribe HIGH (5V) o LOW (0V) en un pin de salida.
- digitalRead(pin): Lee el estado lógico de un pin de entrada.

**Pines Analógicos y PWM:**
- analogRead(pinA): Convierte una señal analógica (0V-5V) a un valor digital de 0 a 1023 (resolución de 10 bits del ADC).
- analogWrite(pin, valor): Genera una señal PWM (modulación de ancho de pulso) en pines marcados con ~ para controlar la intensidad de LEDs o velocidad de motores (valor de 0 a 255).

**3. Componentes Electrónicos Básicos:**

**LED (Light Emitting Diode):**
Diodo semiconductor que emite luz al ser polarizado directamente. Siempre requiere una resistencia en serie (330Ω a 1kΩ) para limitar la corriente y evitar quemarlo.

**Resistencia:**
Componente que opone resistencia al flujo de corriente eléctrica. Se identifica por sus bandas de colores. Fundamental para proteger LEDs y configurar divisores de voltaje.

**Sensor de Temperatura LM35:**
Ci analógico que produce una tensión de salida proporcional a la temperatura: Vout = 10mV × °C. Se conecta al pin analógico A0.
- Temperatura = (analogRead(A0) × 5.0 / 1023.0) / 0.01

**Protoboard (Breadboard):**
Tablero de conexiones temporales sin soldadura. Las filas horizontales externas (líneas rojas/negras) son carriles de alimentación (VCC y GND). Los agujeros verticales internos están interconectados en grupos de 5.

**Motor DC (Actuador):**
Motor de corriente continua controlado mediante transistores o puente-H. Se puede regular su velocidad usando la señal PWM generada con analogWrite().`,
    order_number: 2,
    created_at: new Date().toISOString()
  },

  {
    id: 'l6-3',
    unit_id: 'unidad-6',
    title: 'Sistemas de Control: LED, Semáforo y Control de Temperatura',
    content: `La Actividad 6 requiere implementar tres sistemas de control usando Arduino como plataforma de microcontrolador. Estos ejercicios demuestran las capacidades de control de entrada/salida digital y analógica.

**Ejercicio 1: Control de un LED (LED Blink)**

Objetivo: Hacer parpadear un LED en el Pin 13 alternando su estado entre ON y OFF con retardos de tiempo configurados.

\`\`\`cpp
// Control de LED: Parpadeo básico
const int LED_PIN = 13;  // Pin 13 tiene LED integrado en Arduino Uno

void setup() {
  pinMode(LED_PIN, OUTPUT);  // Configurar Pin 13 como SALIDA
}

void loop() {
  digitalWrite(LED_PIN, HIGH);  // Encender LED (5V en Pin 13)
  delay(1000);                  // Esperar 1 segundo
  digitalWrite(LED_PIN, LOW);   // Apagar LED (0V en Pin 13)
  delay(1000);                  // Esperar 1 segundo
}
\`\`\`

**Ejercicio 2: Semáforo Simple**

Objetivo: Simular un semáforo con tres LEDs (Rojo en Pin 8, Amarillo en Pin 9, Verde en Pin 10) que cambian en secuencia automáticamente.

\`\`\`cpp
// Semáforo de 3 luces
const int LED_ROJO    = 8;
const int LED_AMARILLO= 9;
const int LED_VERDE   = 10;

void setup() {
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
}

void loop() {
  // ROJO: Alto (5 segundos)
  digitalWrite(LED_ROJO, HIGH);
  delay(5000);
  digitalWrite(LED_ROJO, LOW);

  // AMARILLO: Precaución (2 segundos)
  digitalWrite(LED_AMARILLO, HIGH);
  delay(2000);
  digitalWrite(LED_AMARILLO, LOW);

  // VERDE: Avanzar (5 segundos)
  digitalWrite(LED_VERDE, HIGH);
  delay(5000);
  digitalWrite(LED_VERDE, LOW);
}
\`\`\`

**Ejercicio 3: Control de Temperatura con Sensor LM35 y Actuador**

Objetivo: Leer la temperatura ambiente con un sensor LM35 conectado al pin analógico A0. Si la temperatura supera 30°C, activar el ventilador (motor DC) vía PWM proporcional a la temperatura.

\`\`\`cpp
// Control de temperatura con LM35 y ventilador DC
const int SENSOR_PIN = A0;  // Sensor LM35 en pin analógico A0
const int FAN_PIN    = 6;   // Motor DC en pin PWM 6 (~)

void setup() {
  Serial.begin(9600);        // Puerto serial para depuración
  pinMode(FAN_PIN, OUTPUT);
}

void loop() {
  int lectura = analogRead(SENSOR_PIN);  // Lectura ADC (0-1023)
  
  // Conversión: Vout = 10mV/°C → Temp = (Vout / 10mV)
  float voltaje = lectura * (5.0 / 1023.0);
  float temperatura = voltaje / 0.01;  // 10mV por °C = 0.01V/°C

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  if (temperatura >= 30.0) {
    // Velocidad proporcional: mapear 30-50°C a 0-255 PWM
    int velocidad = map((int)temperatura, 30, 50, 80, 255);
    analogWrite(FAN_PIN, velocidad);
  } else {
    analogWrite(FAN_PIN, 0);  // Apagar ventilador
  }

  delay(500);  // Actualizar cada 500ms
}
\`\`\``,
    order_number: 3,
    created_at: new Date().toISOString()
  },
  // UNIDAD 7
  {
    id: 'l7-1',
    unit_id: 'unidad-7',
    title: 'Organización de Memoria en Microcontroladores',
    content: `La memoria en los microcontroladores está altamente integrada y estructurada para maximizar la velocidad y el control en tiempo real. A diferencia de las computadoras convencionales, coexisten varios tipos de memorias en un solo chip:

**1. Memoria de Almacenamiento de Programa (ROM / Flash):**
Se utiliza para guardar el código ejecutable del programa (instrucciones de máquina). Es una memoria no volátil, es decir, la información no se borra cuando se desconecta la alimentación eléctrica del microcontrolador.
- **Flash (Predominante):** Permite miles de ciclos de escritura y borrado electrónico directo.
- **ROM (Read Only Memory):** Grabada en fábrica, de bajo costo para producciones masivas.
- **EPROM / EEPROM:** Memorias reprogramables (mediante luz ultravioleta o voltajes eléctricos respectivamente).

**2. Área de Variables (RAM):**
Es la memoria de acceso aleatorio utilizada por la CPU para almacenar datos temporales de variables, arreglos y pila del programa durante la ejecución en vivo. Es volátil: al quitar la corriente, los datos se pierden inmediatamente.
- **SRAM (Static RAM):** Más rápida, no requiere refresco, ideal para chips embebidos.

**3. Registros de Propósito Especial (SFR):**
Posiciones de memoria RAM que tienen asignadas funciones físicas de control de hardware específicas.
- *Ejemplos:* Configuración de dirección de puertos E/S (como \`DDRD\` o \`TRISB\`), banderas de timers, habilitación de interrupciones, estado del convertidor ADC.

**4. Diferencias entre RAM, ROM, EPROM, EEPROM y Flash:**
- **RAM:** Volátil, lectura/escritura sumamente rápidas e ilimitadas.
- **ROM:** No volátil, solo lectura, grabada en fábrica, inalterable.
- **EPROM:** No volátil, borrado físico total con luz ultravioleta, escritura lenta.
- **EEPROM:** No volátil, borrado y escritura eléctrica byte a byte a nivel de software. Soporta alrededor de 100,000 ciclos de escritura antes de degradarse.
- **Flash:** No volátil, más rápida que la EEPROM, pero el borrado y escritura se realizan por bloques o páginas enteras.`,
    order_number: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'l7-2',
    unit_id: 'unidad-7',
    title: 'Características de los Microcontroladores',
    content: `Los microcontroladores operan con características internas especializadas optimizadas para la interacción directa con sensores y actuadores físicos:

**1. ALU y el Registro W (o Acumulador):**
- La **ALU (Unidad Aritmético Lógica)** ejecuta las operaciones físicas binarias.
- El **Registro W (Working Register)** o Registro Acumulador es el registro central sobre el que se cargan y computan casi todas las instrucciones en chips de arquitectura RISC como los de Microchip (PIC).

**2. Ciclos de Máquina y Pipeline:**
- **Ciclo de Máquina:** La cantidad de ciclos de reloj necesarios para que la CPU complete una instrucción completa. En PIC suele ser $4$ ciclos de oscilador ($4 \\text{ Tosc} = 1 \\text{ ciclo máquina}$). En AVR (Arduino) la mayoría se ejecutan en exactamente $1$ ciclo de oscilador.
- **Pipeline (Segmentación):** Permite el solapamiento de ejecución y búsqueda de instrucciones. Mientras la CPU ejecuta la instrucción actual, el hardware simultáneamente busca la siguiente instrucción en la memoria Flash, duplicando el rendimiento lógico total.

**3. Osciladores (Reloj del Sistema):**
Generan la señal de onda cuadrada periódica que sincroniza el funcionamiento interno del chip. Pueden ser:
- **Cristal de Cuarzo externo (XT/HS):** Altamente estable y preciso (e.g., 16 MHz en Arduino).
- **RC interno (Resistencia-Condensador):** Económico y de bajo consumo, pero inestable ante variaciones térmicas.

**4. Fuentes de Reset:**
Causan que el contador de programa (PC) regrese a la dirección de inicio (\`0x0000\`). Incluyen:
- **POR (Power-On Reset):** Al conectar la alimentación principal.
- **MCLR (Master Clear):** Activación manual por pin externo físico.
- **BOD (Brown-Out Reset):** Si el voltaje cae por debajo de un umbral seguro para evitar corrupción de datos.

**5. Perro Guardián (Watchdog Timer - WDT):**
Es un temporizador interno autónomo con su propio oscilador RC independiente. Si el programa del microcontrolador entra en un bucle infinito o se bloquea (cuelga), el WDT se desborda y fuerza un Reset físico del microcontrolador de forma automática para restaurar el servicio. El software debe reiniciarlo periódicamente (\`CLRWDT\`) en condiciones normales de funcionamiento.`,
    order_number: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 'l7-3',
    unit_id: 'unidad-7',
    title: 'Acceso, Mapeo y Gestión de Memoria Embebida',
    content: `La gestión correcta del mapa de memoria física y las técnicas de direccionamiento determinan el correcto desempeño del firmware en sistemas de bajo nivel:

**1. Mapeo de Direcciones (Memory Mapping):**
Supongamos un microcontrolador de 16 bits de dirección (capacidad de direccionar $2^{16} = 64 \\text{ KB}$ de memoria física). Su mapa de direcciones organiza el espacio de la siguiente forma:
- **ROM (32 KB):** Rango \`0x0000 - 0x7FFF\`. Contiene el código de arranque (Bootloader) e instrucciones principales del programa.
- **RAM (16 KB):** Rango \`0x8000 - 0xBFFF\`. Destinada para variables dinámicas y almacenamiento temporal de datos en vivo.
- **Periféricos y SFR (16 KB):** Rango \`0xC000 - 0xFFFF\`. Mapea los registros especiales de control de puertos de hardware y E/S.
- *Ejemplo de Acceso:* Acceder a la dirección \`0xA10F\` corresponde inequívocamente al espacio de la memoria RAM del sistema.

**2. Desbordamiento de Memoria (Memory Overflow):**
Ocurre si un programa intenta almacenar una estructura de datos estática mayor a la RAM física disponible (e.g., intentar declarar una tabla de datos de 3 KB en un microcontrolador de 2 KB de RAM).
- **Consecuencias:** Sobrescribe posiciones ajenas de memoria, colisiona con el puntero de la Pila (Stack Overflow) y provoca un fallo crítico del procesador o comportamientos caóticos.
- **Solución/Técnicas:** Uso de variables dinámicas localizadas, almacenamiento de tablas de constantes directamente en la memoria Flash en lugar de la RAM (utilizando modificadores de compilación como \`PROGMEM\` en Arduino), y optimización del uso de variables locales.

**3. Acceso a Memoria Externa:**
Si el espacio interno es insuficiente (e.g., solo 512 bytes de RAM interna) y el chip cuenta con bus de datos externo, se puede expandir mediante buses externos de direcciones y datos:
- El microcontrolador coloca la dirección en su puerto externo de direcciones (mapeada a un rango lógico como \`0x1000 - 0x1FFF\`).
- Habilita las señales físicas de control de lectura/escritura (\`RD\` / \`WR\`).
- Transfiere el byte de datos a través del bus de datos bidireccional de 8 bits.
- **Técnicas en software:** Uso de punteros a direcciones de memoria directa indirecta mediante registros base/índice.`,
    order_number: 3,
    created_at: new Date().toISOString()
  }
]
