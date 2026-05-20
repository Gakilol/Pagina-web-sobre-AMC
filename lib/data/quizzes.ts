import type { Quiz, QuizQuestion, QuizOption } from '../types'

export const localQuizzes: Quiz[] = [
  {
    id: 'quiz-unidad-1',
    unit_id: 'unidad-1',
    title: 'Evaluación Unidad 1: Fundamentos de Arquitectura',
    description: 'Comprueba tu dominio sobre los conceptos de arquitectura vs organización, estructuras operativas del computador y diferencias entre microprocesador y microcontrolador.',
    created_at: new Date().toISOString()
  },
  {
    id: 'quiz-unidad-2',
    unit_id: 'unidad-2',
    title: 'Evaluación Unidad 2: Modelos CPU y Diagramas',
    description: 'Evalúa tus conocimientos sobre Von Neumann vs Harvard, el sistema de buses, la conexión externa del 8086 y la simbología técnica de los diagramas de bloques.',
    created_at: new Date().toISOString()
  },
  {
    id: 'quiz-unidad-3',
    unit_id: 'unidad-3',
    title: 'Evaluación Unidad 3: Apoyo de Hardware y Registros',
    description: 'Pon a prueba tu comprensión de los integrados 8255 y 8259, la comunicación serial de datos, la segmentación de memoria y el banco de registros del 8086.',
    created_at: new Date().toISOString()
  },
  {
    id: 'quiz-unidad-4',
    unit_id: 'unidad-4',
    title: 'Evaluación Unidad 4: Ensamblador e Instrucciones 8086',
    description: 'Mide tus habilidades en sintaxis de ensamblador, directivas de desarrollo, modos de direccionamiento de operandos y lógica de bifurcación con saltos condicionales.',
    created_at: new Date().toISOString()
  },
  {
    id: 'quiz-unidad-5',
    unit_id: 'unidad-5',
    title: 'Evaluación Unidad 5: Estructuración y Control Físico de E/S',
    description: 'Valida tu conocimiento sobre constantes, operaciones físicas de Entrada/Salida por puertos, e implementación estructurada con procedimientos y macros expandibles.',
    created_at: new Date().toISOString()
  }
]

export const localQuestions: (QuizQuestion & { quiz_options: QuizOption[] })[] = [
  // QUIZ UNIDAD 1
  {
    id: 'q1-1',
    quiz_id: 'quiz-unidad-1',
    question_text: '¿Qué atributo de los siguientes pertenece a la "arquitectura" y no a la "organización" de una computadora?',
    correct_option_id: 'q1-1-o1',
    explanation: 'El conjunto de instrucciones (ISA) es visible para el programador y tiene un impacto directo en el diseño lógico del software, por lo que es un atributo arquitectónico. La tecnología de memoria, interfaces físicas y frecuencia de reloj pertenecen a la organización del hardware.',
    order_number: 1,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q1-1-o1', question_id: 'q1-1', option_text: 'El conjunto de instrucciones (ISA)', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q1-1-o2', question_id: 'q1-1', option_text: 'El tipo de circuitos integrados de la memoria RAM', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q1-1-o3', question_id: 'q1-1', option_text: 'Las señales de control eléctrico del bus del sistema', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q1-1-o4', question_id: 'q1-1', option_text: 'La frecuencia física de oscilación del reloj del sistema', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q1-2',
    quiz_id: 'quiz-unidad-1',
    question_text: '¿Qué componente estructural de la CPU se encarga de realizar operaciones matemáticas aritméticas y lógicas?',
    correct_option_id: 'q1-2-o2',
    explanation: 'La ALU (Unidad Aritmético-Lógica) es la encargada del procesamiento físico de los datos en base a sumas, restas, y operaciones lógicas binarias (AND, OR, XOR, etc.). La Unidad de Control dirige el flujo, y los Registros guardan operandos.',
    order_number: 2,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q1-2-o1', question_id: 'q1-2', option_text: 'La Unidad de Control (UC)', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q1-2-o2', question_id: 'q1-2', option_text: 'La Unidad Aritmético-Lógica (ALU)', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q1-2-o3', question_id: 'q1-2', option_text: 'El Banco de Registros Internos', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q1-2-o4', question_id: 'q1-2', option_text: 'La Memoria Caché de datos', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q1-3',
    quiz_id: 'quiz-unidad-1',
    question_text: '¿Cuál es la diferencia física principal de un microcontrolador respecto a un microprocesador general?',
    correct_option_id: 'q1-3-o3',
    explanation: 'Un microcontrolador es un sistema en un solo chip ("computer on a chip") e integra la CPU, memoria RAM, memoria ROM/Flash de programa y periféricos digitales de E/S en la misma oblea de silicio. Un microprocesador es solo la CPU externa.',
    order_number: 3,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q1-3-o1', question_id: 'q1-3', option_text: 'Tiene mayor velocidad de procesamiento del reloj del sistema', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q1-3-o2', question_id: 'q1-3', option_text: 'Utiliza compuertas lógicas de tecnología TTL en vez de CMOS', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q1-3-o3', question_id: 'q1-3', option_text: 'Integra CPU, memoria RAM, ROM y periféricos de E/S en un solo integrado', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q1-3-o4', question_id: 'q1-3', option_text: 'No requiere de señales de reloj físicas para funcionar', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q1-4',
    quiz_id: 'quiz-unidad-1',
    question_text: '¿Qué operación básica de la CPU consiste en el movimiento de datos entre el computador y su entorno externo?',
    correct_option_id: 'q1-4-o4',
    explanation: 'El movimiento de datos describe la transferencia o flujo de información entre el sistema de computación y los dispositivos del entorno exterior, a través del sistema de Entrada y Salida (E/S).',
    order_number: 4,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q1-4-o1', question_id: 'q1-4', option_text: 'Procesamiento de datos', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q1-4-o2', question_id: 'q1-4', option_text: 'Almacenamiento temporal de datos', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q1-4-o3', question_id: 'q1-4', option_text: 'Control de recursos lógicos', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q1-4-o4', question_id: 'q1-4', option_text: 'Entrada y Salida (E/S) o Movimiento de datos', order_number: 4, created_at: new Date().toISOString() }
    ]
  },

  // QUIZ UNIDAD 2
  {
    id: 'q2-1',
    quiz_id: 'quiz-unidad-2',
    question_text: '¿Cuál es la principal ventaja operativa de la Arquitectura Harvard sobre Von Neumann?',
    correct_option_id: 'q2-1-o1',
    explanation: 'Dado que la Arquitectura Harvard separa físicamente la memoria de datos y de instrucciones con buses independientes, la CPU puede leer código y operar datos al mismo tiempo, logrando un mayor procesamiento paralelo sin el cuello de botella secuencial de Von Neumann.',
    order_number: 1,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q2-1-o1', question_id: 'q2-1', option_text: 'Permite leer una instrucción y acceder a datos en memoria de forma simultánea', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q2-1-o2', question_id: 'q2-1', option_text: 'Su diseño requiere un menor número de pines físicos y buses en el microprocesador', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q2-1-o3', question_id: 'q2-1', option_text: 'Permite compartir libremente el espacio físico de instrucciones para guardar datos', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q2-1-o4', question_id: 'q2-1', option_text: 'Es la arquitectura estándar de las computadoras personales de escritorio', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q2-2',
    quiz_id: 'quiz-unidad-2',
    question_text: '¿Cómo se le denomina a la limitación secuencial que sufre la Arquitectura Von Neumann clásica al compartir un solo bus físico?',
    correct_option_id: 'q2-2-o2',
    explanation: 'Se le conoce históricamente como el "Cuello de botella de Von Neumann" (Von Neumann Bottleneck), ya que la velocidad de ejecución está limitada por la imposibilidad física del bus de realizar más de un acceso simultáneo.',
    order_number: 2,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q2-2-o1', question_id: 'q2-2', option_text: 'Retraso de Propagación de Control', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q2-2-o2', question_id: 'q2-2', option_text: 'El Cuello de Botella de Von Neumann', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q2-2-o3', question_id: 'q2-2', option_text: 'Desbordamiento de Direccionamiento Físico', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q2-2-o4', question_id: 'q2-2', option_text: 'Multiplexación de Instrucciones de Máquina', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q2-3',
    quiz_id: 'quiz-unidad-2',
    question_text: 'En un diagrama de bloques del procesador, ¿qué representa principalmente un bloque rectangular?',
    correct_option_id: 'q2-3-o3',
    explanation: 'Los rectángulos en un diagrama de bloques representan componentes o unidades lógicas del hardware que son funcionalmente independientes, como registros, decodificadores o ALU. Las flechas representan el flujo físico de datos y control.',
    order_number: 3,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q2-3-o1', question_id: 'q2-3', option_text: 'El flujo dinámico paso a paso del código de software', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q2-3-o2', question_id: 'q2-3', option_text: 'Una toma de decisión condicional del algoritmo lógico', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q2-3-o3', question_id: 'q2-3', option_text: 'Una unidad de hardware funcionalmente independiente en el sistema', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q2-3-o4', question_id: 'q2-3', option_text: 'Una conexión física del puerto USB o serial externo', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q2-4',
    quiz_id: 'quiz-unidad-2',
    question_text: '¿Cuál es la diferencia clave entre un diagrama de bloques y un diagrama de flujo?',
    correct_option_id: 'q2-4-o4',
    explanation: 'El diagrama de bloques es estático y describe la estructura y conexiones físicas de hardware en paralelo. El diagrama de flujo es secuencial/temporal y describe un algoritmo o lógica de software paso a paso a lo largo del tiempo.',
    order_number: 4,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q2-4-o1', question_id: 'q2-4', option_text: 'El diagrama de bloques solo puede representar software analógico', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q2-4-o2', question_id: 'q2-4', option_text: 'El de flujo representa componentes físicos y el de bloques la lógica binaria', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q2-4-o3', question_id: 'q2-4', option_text: 'No hay diferencias funcionales; ambos representan el mismo comportamiento eléctrico', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q2-4-o4', question_id: 'q2-4', option_text: 'El de bloques es estructural y estático, mientras que el de flujo es procedimental y secuencial', order_number: 4, created_at: new Date().toISOString() }
    ]
  },

  // QUIZ UNIDAD 3
  {
    id: 'q3-1',
    quiz_id: 'quiz-unidad-3',
    question_text: '¿Qué función cumple la Interfaz Periférica Programable 8255 en arquitecturas basadas en el 8086?',
    correct_option_id: 'q3-1-o1',
    explanation: 'El 8255 es un circuito integrado de apoyo que dota al microprocesador de 24 pines físicos configurables por software como Entradas o Salidas digitales (organizados en Puertos A, B y C) para interactuar con periféricos elementales.',
    order_number: 1,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q3-1-o1', question_id: 'q3-1', option_text: 'Proporciona 24 líneas programables de Entrada/Salida digital distribuidas en 3 puertos', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q3-1-o2', question_id: 'q3-1', option_text: 'Actúa como multiplicador aritmético físico acelerando la ALU', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q3-1-o3', question_id: 'q3-1', option_text: 'Permite segmentar y decodificar la memoria física no volátil Flash', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q3-1-o4', question_id: 'q3-1', option_text: 'Genera las señales físicas de reloj sincronizadas en el bus', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q3-2',
    quiz_id: 'quiz-unidad-3',
    question_text: '¿Qué dispositivo de hardware externo administra y asigna prioridades a múltiples interrupciones por hardware?',
    correct_option_id: 'q3-2-o2',
    explanation: 'El chip 8259 PIC (Programmable Interrupt Controller) recibe múltiples peticiones físicas de interrupción externas, decide cuál tiene mayor prioridad, interrumpe el CPU a través de su pin INTR y le devuelve el vector de interrupción respectivo.',
    order_number: 2,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q3-2-o1', question_id: 'q3-2', option_text: 'El chip 8255 PPI', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q3-2-o2', question_id: 'q3-2', option_text: 'El chip 8259 PIC', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q3-2-o3', question_id: 'q3-2', option_text: 'El decodificador físico 74LS138', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q3-2-o4', question_id: 'q3-2', option_text: 'El buffer bidireccional 74LS245', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q3-3',
    quiz_id: 'quiz-unidad-3',
    question_text: 'En el procesador 8086, si el segmento de código CS = 2000h y el puntero IP = 0100h, ¿cuál es la dirección física real generada en el bus de 20 bits?',
    correct_option_id: 'q3-3-o3',
    explanation: 'La fórmula es: Segmento * 16 (o desplazado un dígito hexadecimal a la izquierda) + Offset. Desplazando CS = 20000h y sumando IP = 0100h, se obtiene: 20000h + 0100h = 20100h.',
    order_number: 3,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q3-3-o1', question_id: 'q3-3', option_text: '20010h', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q3-3-o2', question_id: 'q3-3', option_text: '201000h', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q3-3-o3', question_id: 'q3-3', option_text: '20100h', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q3-3-o4', question_id: 'q3-3', option_text: '02100h', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q3-4',
    quiz_id: 'quiz-unidad-3',
    question_text: '¿Qué registro de 16 bits del 8086 se utiliza automáticamente como contador decreciente en el bucle LOOP?',
    correct_option_id: 'q3-4-o3',
    explanation: 'El registro CX (Counter Register) actúa por convención de hardware como el acumulador e índice contador en la instrucción LOOP y en operaciones masivas sobre cadenas del procesador.',
    order_number: 4,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q3-4-o1', question_id: 'q3-4', option_text: 'AX (Acumulador)', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q3-4-o2', question_id: 'q3-4', option_text: 'BX (Base)', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q3-4-o3', question_id: 'q3-4', option_text: 'CX (Contador)', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q3-4-o4', question_id: 'q3-4', option_text: 'DX (Datos)', order_number: 4, created_at: new Date().toISOString() }
    ]
  },

  // QUIZ UNIDAD 4
  {
    id: 'q4-1',
    quiz_id: 'quiz-unidad-4',
    question_text: '¿Qué modo de direccionamiento se utiliza al ejecutar la instrucción: MOV AX, [BX]?',
    correct_option_id: 'q4-1-o4',
    explanation: 'Puesto que el registro BX está entre corchetes, el microprocesador utilizará el valor contenido de BX como la dirección de memoria física (offset) en la memoria RAM donde irá a buscar el dato final. Esto se conoce como Direccionamiento Indirecto por Registro.',
    order_number: 1,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q4-1-o1', question_id: 'q4-1', option_text: 'Direccionamiento por Registro', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q4-1-o2', question_id: 'q4-1', option_text: 'Direccionamiento Inmediato', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q4-1-o3', question_id: 'q4-1', option_text: 'Direccionamiento Directo', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q4-1-o4', question_id: 'q4-1', option_text: 'Direccionamiento Indirecto por Registro', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q4-2',
    quiz_id: 'quiz-unidad-4',
    question_text: '¿Qué instrucción efectúa una resta virtual interna de dos operandos solo para actualizar las banderas de estado (ZF, CF, SF) sin alterar sus contenidos reales?',
    correct_option_id: 'q4-2-o2',
    explanation: 'La instrucción CMP (Compare) resta de forma ficticia (temporal) el segundo operando del primero y actualiza las banderas respectivas del registro de estado, lo cual permite realizar las posteriores bifurcaciones con saltos condicionales.',
    order_number: 2,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q4-2-o1', question_id: 'q4-2', option_text: 'SUB (Substract)', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q4-2-o2', question_id: 'q4-2', option_text: 'CMP (Compare)', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q4-2-o3', question_id: 'q4-2', option_text: 'DEC (Decrement)', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q4-2-o4', question_id: 'q4-2', option_text: 'AND (Logical And)', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q4-3',
    quiz_id: 'quiz-unidad-4',
    question_text: '¿Qué directiva de ensamblador le indica al compilador el inicio del segmento lúdico donde se ubicarán las variables de datos?',
    correct_option_id: 'q4-3-o1',
    explanation: 'La directiva ".data" abre el segmento lógico de datos. En este segmento es donde declaramos variables inicializadas y no inicializadas usando directivas como DB o DW.',
    order_number: 3,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q4-3-o1', question_id: 'q4-3', option_text: '.data', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q4-3-o2', question_id: 'q4-3', option_text: '.code', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q4-3-o3', question_id: 'q4-3', option_text: '.stack', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q4-3-o4', question_id: 'q4-3', option_text: '.model', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q4-4',
    quiz_id: 'quiz-unidad-4',
    question_text: '¿Qué instrucción realiza un salto incondicional directo a cualquier etiqueta del programa alterando IP?',
    correct_option_id: 'q4-4-o1',
    explanation: 'La instrucción JMP (Jump) ejecuta un salto incondicional, modificando la dirección guardada en el Registro de Puntero de Instrucción (IP) de forma directa sin requerir de la evaluación de condiciones físicas de banderas.',
    order_number: 4,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q4-4-o1', question_id: 'q4-4', option_text: 'JMP', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q4-4-o2', question_id: 'q4-4', option_text: 'JE', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q4-4-o3', question_id: 'q4-4', option_text: 'LOOP', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q4-4-o4', question_id: 'q4-4', option_text: 'CALL', order_number: 4, created_at: new Date().toISOString() }
    ]
  },

  // QUIZ UNIDAD 5
  {
    id: 'q5-1',
    quiz_id: 'quiz-unidad-5',
    question_text: '¿Cuál es la diferencia fundamental en la compilación y ejecución entre una Macro y un Procedimiento?',
    correct_option_id: 'q5-1-o1',
    explanation: 'Una Macro es procesada por el precompilador, expandiendo e insertando la totalidad de su código en cada punto físico del código de llamada. Un Procedimiento se compila una sola vez en una dirección fija de memoria RAM y es invocado dinámicamente mediante CALL/RET.',
    order_number: 1,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q5-1-o1', question_id: 'q5-1', option_text: 'Las macros se expanden insertando su código en cada punto de llamada; los procedimientos se llaman con CALL/RET', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q5-1-o2', question_id: 'q5-1', option_text: 'Los procedimientos solo pueden actuar sobre variables globales; las macros sobre locales', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q5-1-o3', question_id: 'q5-1', option_text: 'Las macros residen obligatoriamente en el segmento de Pila y los procedimientos en el de Código', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q5-1-o4', question_id: 'q5-1', option_text: 'No hay diferencias funcionales; ambos generan las mismas instrucciones físicas de máquina', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q5-2',
    quiz_id: 'quiz-unidad-5',
    question_text: '¿Qué instrucción de bajo nivel se utiliza para enviar información física desde un registro del CPU hacia un actuador o puerto externo?',
    correct_option_id: 'q5-2-o2',
    explanation: 'La instrucción OUT (Output) transfiere datos desde los acumuladores internos (AL o AX) hacia un puerto físico de Entrada/Salida mapeado en la arquitectura de hardware del sistema.',
    order_number: 2,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q5-2-o1', question_id: 'q5-2', option_text: 'IN', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q5-2-o2', question_id: 'q5-2', option_text: 'OUT', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q5-2-o3', question_id: 'q5-2', option_text: 'MOV', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q5-2-o4', question_id: 'q5-2', option_text: 'PUSH', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q5-3',
    quiz_id: 'quiz-unidad-5',
    question_text: 'Al declarar una variable de tipo Palabra (Word - 16 bits), ¿qué directiva es la apropiada en la sección .data?',
    correct_option_id: 'q5-3-o2',
    explanation: 'La directiva DW (Define Word) inicializa variables de 16 bits de longitud física (equivalente a 2 bytes). DB define un solo Byte (8 bits) y DD define una doble palabra (32 bits).',
    order_number: 3,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q5-3-o1', question_id: 'q5-3', option_text: 'DB (Define Byte)', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q5-3-o2', question_id: 'q5-3', option_text: 'DW (Define Word)', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q5-3-o3', question_id: 'q5-3', option_text: 'DD (Define Double Word)', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q5-3-o4', question_id: 'q5-3', option_text: 'EQU (Equal Constant)', order_number: 4, created_at: new Date().toISOString() }
    ]
  },
  {
    id: 'q5-4',
    quiz_id: 'quiz-unidad-5',
    question_text: '¿Cómo almacena el procesador la dirección física de retorno al ejecutar la llamada CALL a una subrutina?',
    correct_option_id: 'q5-4-o4',
    explanation: 'Al ejecutar un CALL, el microprocesador realiza de forma interna un PUSH automático guardando la dirección de retorno en la memoria Pila (SS:SP), permitiendo que la posterior instrucción RET realice un POP de vuelta.',
    order_number: 4,
    created_at: new Date().toISOString(),
    quiz_options: [
      { id: 'q5-4-o1', question_id: 'q5-4', option_text: 'La guarda de forma temporal en el registro general BX', order_number: 1, created_at: new Date().toISOString() },
      { id: 'q5-4-o2', question_id: 'q5-4', option_text: 'La guarda en una variable global en el segmento DS', order_number: 2, created_at: new Date().toISOString() },
      { id: 'q5-4-o3', question_id: 'q5-4', option_text: 'La graba directamente en la memoria caché L2', order_number: 3, created_at: new Date().toISOString() },
      { id: 'q5-4-o4', question_id: 'q5-4', option_text: 'La coloca temporalmente en la Pila del sistema (Stack)', order_number: 4, created_at: new Date().toISOString() }
    ]
  }
]
