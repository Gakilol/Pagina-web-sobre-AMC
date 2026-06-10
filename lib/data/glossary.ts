export interface GlossaryTerm {
  term: string
  definition: string
  category: string
}

export const localGlossary: GlossaryTerm[] = [
  {
    term: 'CPU',
    definition: 'Unidad Central de Procesamiento. El componente de hardware encargado de interpretar y ejecutar las instrucciones de un programa de computadora mediante la realización de operaciones aritméticas, lógicas y de entrada/salida.',
    category: 'Procesamiento'
  },
  {
    term: 'ALU',
    definition: 'Unidad Aritmético Lógica. Circuito digital dentro de la CPU encargado de realizar operaciones aritméticas (suma, resta, multiplicación) y lógicas (AND, OR, NOT, XOR) entre operandos.',
    category: 'Procesamiento'
  },
  {
    term: 'Bus',
    definition: 'Canal o conjunto de líneas conductoras físicas o lógicas que transfieren datos, direcciones de memoria o señales de control entre los distintos componentes de un sistema computacional.',
    category: 'Conexión'
  },
  {
    term: 'Flag',
    definition: 'Bandera de estado. Registro de un solo bit en la CPU que indica el estado resultante de la última instrucción aritmética o lógica ejecutada (como el bit de Cero ZF, Acarreo CF o Signo SF).',
    category: 'Control'
  },
  {
    term: 'Interrupción',
    definition: 'Señal de hardware o software que suspende temporalmente la ejecución secuencial del programa principal en la CPU para desviar el flujo hacia una subrutina de servicio específica (ISR) y atender un evento urgente.',
    category: 'Control'
  },
  {
    term: 'Segmento',
    definition: 'Bloque lógico de memoria en la arquitectura Intel 8086 de hasta 64 Kilobytes de longitud. Permite acceder a 1 MB de memoria física utilizando registros de segmento de 16 bits (CS, DS, SS, ES).',
    category: 'Memoria'
  },
  {
    term: 'Stack',
    definition: 'Pila del sistema. Estructura de datos LIFO (último en entrar, primero en salir) almacenada en el segmento SS. Se utiliza para guardar temporalmente las direcciones de retorno de llamadas a funciones y el estado de los registros.',
    category: 'Memoria'
  },
  {
    term: 'Macro',
    definition: 'Directiva del ensamblador que representa un bloque de código reutilizable. Al compilarse, el ensamblador sustituye el nombre de la macro copiando y pegando el bloque de instrucciones físicamente en cada línea de invocación.',
    category: 'Programación'
  },
  {
    term: 'Procedimiento',
    definition: 'Subrutina independiente de código compilada en una dirección física fija de memoria. Se invoca mediante CALL (guardando la dirección de retorno en la pila) y devuelve el control al programa principal mediante RET.',
    category: 'Programación'
  },
  {
    term: 'Registro',
    definition: 'Memoria interna de acceso ultra rápido integrada dentro del silicio de la CPU. Utilizada para almacenar operandos, direcciones y resultados temporales de instrucciones (ej: AX, BX, CX, DX, SI, DI, SP, BP, IP).',
    category: 'Procesamiento'
  },
  {
    term: 'Memoria Flash',
    definition: 'Memoria de almacenamiento masivo no volátil integrada en microcontroladores (como el ATmega328P de Arduino). Se utiliza para guardar de manera estable el código compilado (sketch) del programa.',
    category: 'Memoria'
  },
  {
    term: 'EEPROM',
    definition: 'Memoria programable de solo lectura borrable eléctricamente. Memoria no volátil integrada que permite guardar byte a byte variables persistentes de configuración que sobreviven a apagados de energía.',
    category: 'Memoria'
  },
  {
    term: 'Watchdog Timer (WDT)',
    definition: 'Temporizador del perro guardián. Circuito de seguridad autónomo con oscilador propio que genera un reset físico del microcontrolador si el firmware entra en un bucle infinito o se bloquea por un error lógico.',
    category: 'Control'
  },
  {
    term: 'CISC',
    definition: 'Complex Instruction Set Computer. Arquitectura de computadoras (como la de la familia x86 / 8086) con un conjunto de instrucciones de longitud variable y complejas que ejecutan múltiples operaciones en pocos ciclos.',
    category: 'Arquitectura'
  },
  {
    term: 'RISC',
    definition: 'Reduced Instruction Set Computer. Arquitectura de computadoras (como la de los microcontroladores AVR de Arduino o procesadores ARM) que utiliza instrucciones uniformes de longitud fija ejecutadas en un solo ciclo.',
    category: 'Arquitectura'
  },
  {
    term: 'ADC',
    definition: 'Convertidor Analógico a Digital. Periférico que mide tensiones de voltaje continuas de entrada (ej: 0V - 5V) y las convierte en valores digitales numéricos discretos (0 a 1023 en el ADC de 10 bits de Arduino).',
    category: 'Entrada/Salida'
  },
  {
    term: 'PWM',
    definition: 'Modulación por Ancho de Pulso. Técnica para simular salidas analógicas variando el ciclo de trabajo de una señal de onda cuadrada digital rápida, permitiendo regular la velocidad de motores o brillo de LEDs.',
    category: 'Entrada/Salida'
  }
]
