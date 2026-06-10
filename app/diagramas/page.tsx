'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Zap, Cpu, MemoryStick, Database, Info, GitFork, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ConceptNode {
  id: string
  name: string
  parent: string
  description: string
  details: string
  category: 'cpu' | 'memoria' | 'buses'
}

const CONCEPTS: ConceptNode[] = [
  {
    id: 'cpu',
    name: 'Unidad Central de Procesamiento (CPU)',
    parent: 'root',
    description: 'El cerebro del microprocesador o microcontrolador, responsable de decodificar y ejecutar todas las instrucciones del sistema.',
    details: 'En el Intel 8086, la CPU se divide en dos secciones principales: la Unidad de Ejecución (EU) que procesa los cálculos y la Unidad de Interfaz de Bus (BIU) que lee instrucciones de la memoria. En Arduino (ATmega328P), es una CPU RISC de 8 bits muy compacta y eficiente.',
    category: 'cpu'
  },
  {
    id: 'alu',
    name: 'Unidad Aritmético Lógica (ALU)',
    parent: 'cpu',
    description: 'El motor de cálculo físico dentro de la CPU encargado de realizar operaciones de lógica binaria y aritmética.',
    details: 'Realiza sumas (ADD), restas (SUB), multiplicaciones (MUL), divisiones (DIV) y operaciones booleanas (AND, OR, XOR). Actualiza el registro de Flags del microprocesador en base al resultado de estas operaciones.',
    category: 'cpu'
  },
  {
    id: 'registers',
    name: 'Banco de Registros',
    parent: 'cpu',
    description: 'Celdas de memoria ultra rápidas integradas directamente en el silicio de la CPU para almacenar operandos en tránsito.',
    details: 'En el 8086 son registros de 16 bits como AX (Acumulador), BX (Base), CX (Contador) y DX (Datos). Se dividen en partes altas y bajas de 8 bits (AH/AL, etc.) para compatibilidad. En Arduino, el ATmega328P cuenta con 32 registros de propósito general de 8 bits.',
    category: 'cpu'
  },
  {
    id: 'flags',
    name: 'Registro de Flags (Banderas)',
    parent: 'cpu',
    description: 'Indicadores binarios (0 o 1) que guardan el estado o las condiciones resultantes de las operaciones aritméticas de la ALU.',
    details: 'Las banderas clave son ZF (Zero Flag: se pone en 1 si el resultado de una resta/comparación da 0), CF (Carry Flag: 1 si hubo acarreo o préstamo), y SF (Sign Flag: 1 si el resultado es negativo). Los saltos condicionales (JE, JNE, JC) leen estas banderas para desviar la ejecución.',
    category: 'cpu'
  },
  {
    id: 'memoria',
    name: 'Estructura de Memoria',
    parent: 'root',
    description: 'Sistemas encargados de almacenar tanto las instrucciones ejecutable del programa como las variables temporales del usuario.',
    details: 'La disposición física define la arquitectura: Von Neumann (un espacio compartido para código y datos en un único bus, como en computadoras x86) o Harvard (espacios físicos y buses separados para Flash y RAM, como en el microcontrolador de Arduino).',
    category: 'memoria'
  },
  {
    id: 'ram',
    name: 'Memoria RAM (SRAM)',
    parent: 'memoria',
    description: 'Memoria volátil de acceso aleatorio. Almacena las variables temporales que cambian en tiempo de ejecución.',
    details: 'En el Intel 8086 la memoria externa se direcciona segmentadamente en bloques de 64 KB (hasta 1 MB físico). En Arduino Uno, el ATmega328P cuenta con una SRAM interna muy limitada de tan solo 2 Kilobytes para almacenar variables.',
    category: 'memoria'
  },
  {
    id: 'flash',
    name: 'Memoria Flash (ROM)',
    parent: 'memoria',
    description: 'Memoria no volátil donde se graba de forma estable el firmware o sketch de programa de control.',
    details: 'Es reprogramable eléctricamente en bloques. El Arduino Uno posee 32 KB de memoria Flash para guardar el programa de control del circuito sin que se borre al desconectar el cable de alimentación.',
    category: 'memoria'
  },
  {
    id: 'eeprom',
    name: 'Memoria EEPROM',
    parent: 'memoria',
    description: 'Memoria no volátil integrada de borrado eléctrico byte a byte para configuraciones permanentes de software.',
    details: 'Útil para guardar datos estables que deben sobrevivir a apagados (como calibraciones o configuraciones del sistema). El ATmega328P de Arduino dispone de 1 Kilobyte de EEPROM accesible a través de la librería EEPROM.h.',
    category: 'memoria'
  },
  {
    id: 'buses',
    name: 'Sistema de Buses',
    parent: 'root',
    description: 'Autopistas de comunicación y conductores físicos que interconectan la CPU con la memoria y los puertos lógicos.',
    details: 'Compuesto por cables paralelos que transportan datos, direcciones de destino o señales de sincronización de control.',
    category: 'buses'
  },
  {
    id: 'databus',
    name: 'Bus de Datos',
    parent: 'buses',
    description: 'Canal bidireccional que transporta el valor o la información real entre la CPU y la memoria o periféricos.',
    details: 'En el microprocesador Intel 8086 es un bus de datos de 16 bits de ancho (permite mover 2 bytes simultáneamente). En el microcontrolador ATmega328P de Arduino, el bus de datos interno es de 8 bits de ancho.',
    category: 'buses'
  },
  {
    id: 'addressbus',
    name: 'Bus de Direcciones',
    parent: 'buses',
    description: 'Canal unidireccional por el cual la CPU indica la celda física de memoria o puerto de E/S al que desea acceder.',
    details: 'El número de líneas determina la capacidad de direccionamiento (2^n). El 8086 posee 20 líneas físicas de dirección, direccionando exactamente 1 Megabyte (2^20 bytes).',
    category: 'buses'
  },
  {
    id: 'controlbus',
    name: 'Bus de Control',
    parent: 'buses',
    description: 'Líneas físicas que transportan señales de reloj, sincronización y órdenes de lectura/escritura (RD/WR).',
    details: 'Incluye señales como RD (Read), WR (Write) y la selección Memory/IO para diferenciar accesos entre la memoria principal y los dispositivos de entrada/salida periféricos.',
    category: 'buses'
  }
]

export default function ConceptMapsPage() {
  const [selectedId, setSelectedId] = useState<string>('cpu')

  const activeNode = CONCEPTS.find(c => c.id === selectedId) || CONCEPTS[0]

  // Node position coordinates for SVG rendering (responsive mindmap)
  const nodesGeo: Record<string, { x: number; y: number; color: string; label: string }> = {
    root: { x: 50, y: 110, color: '#6366f1', label: 'Arquitectura' },
    cpu: { x: 180, y: 50, color: '#38bdf8', label: 'CPU (Procesador)' },
    alu: { x: 310, y: 25, color: '#06b6d4', label: 'ALU' },
    registers: { x: 310, y: 55, color: '#f59e0b', label: 'Registros' },
    flags: { x: 310, y: 85, color: '#818cf8', label: 'Banderas' },
    memoria: { x: 180, y: 135, color: '#10b981', label: 'Memoria' },
    ram: { x: 310, y: 115, color: '#34d399', label: 'SRAM (RAM)' },
    flash: { x: 310, y: 145, color: '#059669', label: 'Flash (ROM)' },
    eeprom: { x: 310, y: 175, color: '#10b981', label: 'EEPROM' },
    buses: { x: 180, y: 215, color: '#a78bfa', label: 'Sistema Buses' },
    databus: { x: 310, y: 205, color: '#a78bfa', label: 'Bus Datos' },
    addressbus: { x: 310, y: 230, color: '#c084fc', label: 'Bus Direcciones' },
    controlbus: { x: 310, y: 255, color: '#e879f9', label: 'Bus Control' }
  }

  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background relative overflow-hidden pb-16">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

        <Header />

        <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-foreground font-semibold">Mapas Conceptuales</span>
          </div>

          {/* Section Header */}
          <div className="mb-10 border-b border-border/40 pb-6 relative select-none">
            <div className="absolute bottom-0 left-0 w-32 h-[3px] bg-primary"></div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
              <Zap size={14} className="animate-pulse" />
              <span>Visualización de Bloques de Hardware</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Mapas Conceptuales Interactivos
            </h1>
            <p className="text-sm text-muted-foreground max-w-4xl mt-2 leading-relaxed font-sans">
              Haga clic en cualquier nodo o elemento del diagrama técnico a continuación para revelar una explicación detallada del componente, su rol en la arquitectura de la CPU y cómo opera físicamente en lenguaje ensamblador e interfaces de microcontroladores.
            </p>
          </div>

          {/* Interactive Workspace Grid */}
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* SVG Visual Map Panel (Col 7) */}
            <div className="lg:col-span-7 rounded-xl border border-border/60 bg-card/25 p-5 glass-panel flex flex-col justify-between select-none">
              <div className="border-b border-border/40 pb-2.5 mb-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                  Diagrama Estructural (Árbol de Componentes)
                </span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                  MAPA ACTIVO
                </span>
              </div>

              {/* Responsive SVG Canvas Container */}
              <div className="w-full aspect-[4/3] bg-black/60 rounded-lg p-2 flex items-center justify-center border border-border/40 relative overflow-hidden">
                <svg viewBox="0 0 380 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection cables (spline curves) */}
                  <g fill="none" strokeWidth="1.2" strokeLinecap="round">
                    {/* Root to secondary nodes */}
                    <path d="M 50 110 C 100 110, 100 50, 180 50" stroke="#38bdf8" strokeDasharray="3,1.5" />
                    <path d="M 50 110 C 100 110, 100 135, 180 135" stroke="#10b981" strokeDasharray="3,1.5" />
                    <path d="M 50 110 C 100 110, 100 215, 180 215" stroke="#a78bfa" strokeDasharray="3,1.5" />

                    {/* CPU to subnodes */}
                    <path d="M 180 50 C 230 50, 230 25, 310 25" stroke="#06b6d4" />
                    <path d="M 180 50 L 310 55" stroke="#f59e0b" />
                    <path d="M 180 50 C 230 50, 230 85, 310 85" stroke="#818cf8" />

                    {/* Memoria to subnodes */}
                    <path d="M 180 135 C 230 135, 230 115, 310 115" stroke="#34d399" />
                    <path d="M 180 135 L 310 145" stroke="#059669" />
                    <path d="M 180 135 C 230 135, 230 175, 310 175" stroke="#10b981" />

                    {/* Buses to subnodes */}
                    <path d="M 180 215 C 230 215, 230 205, 310 205" stroke="#a78bfa" />
                    <path d="M 180 215 L 310 230" stroke="#c084fc" />
                    <path d="M 180 215 C 230 215, 230 255, 310 255" stroke="#e879f9" />
                  </g>

                  {/* Draw Nodes */}
                  {Object.entries(nodesGeo).map(([nodeId, n]) => {
                    const isSelected = selectedId === nodeId
                    const isParentNode = nodeId === 'root' || nodeId === 'cpu' || nodeId === 'memoria' || nodeId === 'buses'
                    const isRoot = nodeId === 'root'

                    return (
                      <g 
                        key={nodeId} 
                        transform={`translate(${n.x}, ${n.y})`}
                        onClick={() => {
                          if (!isRoot) {
                            setSelectedId(nodeId)
                          }
                        }}
                        className={`cursor-pointer group ${isRoot ? 'pointer-events-none' : ''}`}
                      >
                        {/* Node circle/glow background */}
                        <circle 
                          r={isRoot ? 9 : isParentNode ? 7 : 5.5} 
                          fill={isSelected ? n.color : '#0f172a'}
                          stroke={n.color}
                          strokeWidth={isSelected ? 2.5 : 1.2}
                          className="transition-all duration-300 group-hover:scale-125"
                          style={{
                            filter: isSelected ? `drop-shadow(0 0 4px ${n.color})` : 'none'
                          }}
                        />
                        {/* Interactive circle highlight */}
                        {!isRoot && (
                          <circle r={14} fill="transparent" />
                        )}

                        {/* Node Label Text */}
                        <text
                          y={isParentNode ? -12 : 3.5}
                          x={isParentNode ? 0 : 11}
                          textAnchor={isParentNode ? 'middle' : 'start'}
                          fill={isSelected ? '#ffffff' : '#9ca3af'}
                          fontSize={isRoot ? 7.5 : isParentNode ? 6.5 : 5.8}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="monospace"
                          className="transition-colors duration-200 group-hover:fill-white pointer-events-none"
                        >
                          {n.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Interactive footnote instructions */}
              <div className="mt-3 text-[10px] font-mono text-muted-foreground/60 leading-normal flex items-start gap-1">
                <Info size={11} className="mt-0.5 flex-shrink-0" />
                <span>Navegue haciendo clic en los puntos del diagrama. Los conectores segmentados representan el bus lógico principal del sistema.</span>
              </div>
            </div>

            {/* Explanatory Info Card Panel (Col 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Detailed Explanation widget */}
              <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel flex-1 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-2 left-4 font-mono text-[9px] text-muted-foreground/30 uppercase select-none">
                  SYS_CONCEPT_INSPECTOR // NODE: {activeNode.id.toUpperCase()}
                </div>

                <div className="mt-4 space-y-5 flex-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-bold">
                      Detalle del Concepto
                    </span>
                    <h2 className="text-xl font-bold text-white leading-tight">
                      {activeNode.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                    {activeNode.description}
                  </p>

                  <div className="p-4 rounded-xl border border-primary/15 bg-primary/5 text-xs text-zinc-300 leading-relaxed font-sans flex items-start gap-3">
                    <GitFork size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white font-mono text-[9px] uppercase tracking-wider block mb-1">
                        Operación Física y Aplicación:
                      </strong>
                      <p className="text-muted-foreground/90">{activeNode.details}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground/50">
                  <span className="uppercase text-[9px]">Capítulo: {activeNode.category}</span>
                  <Link 
                    href="/glosario" 
                    className="text-primary hover:underline hover:text-primary/90 transition-colors uppercase text-[9px]"
                  >
                    Ver Glosario completo &rarr;
                  </Link>
                </div>
              </div>

              {/* Quick Jump Sidebar actions */}
              <div className="rounded-xl border border-border/60 bg-card/25 p-5 glass-panel select-none">
                <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 pl-0.5">
                  Salto Rápido a Secciones
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cpu', label: 'CPU Core', color: 'hover:border-cyan-500/50' },
                    { id: 'memoria', label: 'Memoria', color: 'hover:border-emerald-500/50' },
                    { id: 'buses', label: 'Buses', color: 'hover:border-purple-500/50' }
                  ].map(sec => (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedId(sec.id)}
                      className={`py-2 px-1 rounded-lg border text-[10px] font-mono font-bold transition-all text-center cursor-pointer ${
                        selectedId === sec.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : `border-border/60 bg-background/25 text-muted-foreground hover:text-foreground ${sec.color}`
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LayoutWrapper>
  )
}
