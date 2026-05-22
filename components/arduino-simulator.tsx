'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, CircuitBoard, Code2, ChevronRight, Info, Thermometer, Zap, Lightbulb, Activity } from 'lucide-react'

// ─── Project Types ──────────────────────────────────────────────────────────

type ProjectId = 'led' | 'semaforo' | 'temperatura'

interface Project {
  id: ProjectId
  name: string
  icon: React.ElementType
  color: string
  borderColor: string
  badgeBg: string
  desc: string
}

const PROJECTS: Project[] = [
  {
    id: 'led',
    name: 'Control de LED',
    icon: Lightbulb,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/10',
    desc: 'Parpadeo de LED en Pin 13 con retardo de tiempo configurable.'
  },
  {
    id: 'semaforo',
    name: 'Semáforo Simple',
    icon: Activity,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/10',
    desc: 'Secuencia Rojo → Amarillo → Verde con tiempos proporcionales.'
  },
  {
    id: 'temperatura',
    name: 'Control de Temperatura',
    icon: Thermometer,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/10',
    desc: 'Sensor LM35 y ventilador DC PWM proporcional a la temperatura.'
  }
]

// ─── Code Templates ─────────────────────────────────────────────────────────

const CODE: Record<ProjectId, { lines: { code: string; comment?: string }[] }> = {
  led: {
    lines: [
      { code: 'const int LED_PIN = 13;', comment: '// Pin 13 = LED integrado' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  pinMode(LED_PIN, OUTPUT);', comment: '// Configurar como salida' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  digitalWrite(LED_PIN, HIGH);', comment: '// Encender LED (5V)' },
      { code: '  delay(1000);', comment: '// Esperar 1 segundo' },
      { code: '  digitalWrite(LED_PIN, LOW);', comment: '// Apagar LED (0V)' },
      { code: '  delay(1000);', comment: '// Esperar 1 segundo' },
      { code: '}' },
    ]
  },
  semaforo: {
    lines: [
      { code: 'const int ROJO    = 8;' },
      { code: 'const int AMARILLO = 9;' },
      { code: 'const int VERDE   = 10;' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  pinMode(ROJO, OUTPUT);' },
      { code: '  pinMode(AMARILLO, OUTPUT);' },
      { code: '  pinMode(VERDE, OUTPUT);' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  digitalWrite(ROJO, HIGH); delay(5000);', comment: '// STOP - 5s' },
      { code: '  digitalWrite(ROJO, LOW);' },
      { code: '  digitalWrite(AMARILLO, HIGH); delay(2000);', comment: '// WARN - 2s' },
      { code: '  digitalWrite(AMARILLO, LOW);' },
      { code: '  digitalWrite(VERDE, HIGH); delay(5000);', comment: '// GO - 5s' },
      { code: '  digitalWrite(VERDE, LOW);' },
      { code: '}' },
    ]
  },
  temperatura: {
    lines: [
      { code: 'const int SENSOR_PIN = A0;', comment: '// LM35 en A0' },
      { code: 'const int FAN_PIN = 6;', comment: '// PWM pin ~6' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  Serial.begin(9600);' },
      { code: '  pinMode(FAN_PIN, OUTPUT);' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  int raw = analogRead(SENSOR_PIN);', comment: '// 0-1023' },
      { code: '  float v = raw * (5.0 / 1023.0);', comment: '// a voltaje' },
      { code: '  float temp = v / 0.01;', comment: '// 10mV/°C' },
      { code: '' },
      { code: '  if (temp >= 30.0) {' },
      { code: '    int pwm = map(temp, 30, 50, 80, 255);', comment: '// proporcional' },
      { code: '    analogWrite(FAN_PIN, pwm);' },
      { code: '  } else {' },
      { code: '    analogWrite(FAN_PIN, 0);', comment: '// apagar ventilador' },
      { code: '  }' },
      { code: '  delay(500);' },
      { code: '}' },
    ]
  }
}

// ─── LED Blink Circuit SVG ───────────────────────────────────────────────────

function LedCircuit({ ledOn }: { ledOn: boolean }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="60" width="130" height="140" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="75" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>
      <text x="75" y="92" textAnchor="middle" fill="#22c55e" fontSize="6.5" fontFamily="monospace">ATmega328P</text>

      {/* Pin labels on board */}
      {[13, 12, 11, 10].map((pin, i) => (
        <g key={pin}>
          <rect x="130" y={108 + i * 16} width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
          <text x="126" y={116 + i * 16} textAnchor="end" fill="#9ca3af" fontSize="6" fontFamily="monospace">~{pin}</text>
        </g>
      ))}
      {/* GND pin */}
      <rect x="130" y="172" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="126" y="180" textAnchor="end" fill="#6b7280" fontSize="6" fontFamily="monospace">GND</text>

      {/* VCC / 5V label on board */}
      <rect x="30" y="168" width="40" height="16" rx="3" fill="#1a2744" stroke="#2563eb" strokeWidth="0.8" />
      <text x="50" y="180" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="monospace">5V / 3.3V</text>

      {/* USB connector */}
      <rect x="10" y="60" width="18" height="12" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.8" />
      <text x="19" y="69" textAnchor="middle" fill="#9ca3af" fontSize="5" fontFamily="monospace">USB</text>

      {/* Protoboard */}
      <rect x="160" y="60" width="145" height="140" rx="4" fill="#f0e8d0" stroke="#d4c89a" strokeWidth="1" />
      <text x="232" y="75" textAnchor="middle" fill="#78716c" fontSize="7" fontFamily="monospace">PROTOBOARD</text>

      {/* VCC / GND rails on protoboard */}
      <line x1="170" y1="82" x2="295" y2="82" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,2" />
      <line x1="170" y1="190" x2="295" y2="190" stroke="#1f2937" strokeWidth="2" strokeDasharray="3,2" />
      <text x="164" y="86" textAnchor="end" fill="#ef4444" fontSize="6">+</text>
      <text x="164" y="194" textAnchor="end" fill="#6b7280" fontSize="6">−</text>

      {/* Holes grid */}
      {[0,1,2,3,4,5,6].map(col =>
        [0,1,2,3,4,5,6,7].map(row => (
          <circle
            key={`${col}-${row}`}
            cx={182 + col * 16}
            cy={98 + row * 10}
            r="2"
            fill="#c8b97a"
            stroke="#b8a868"
            strokeWidth="0.5"
          />
        ))
      )}

      {/* Resistor */}
      <rect x="226" y="104" width="30" height="10" rx="3" fill="#f5e6c8" stroke="#d4a017" strokeWidth="1" />
      {/* Resistor stripes */}
      <line x1="233" y1="104" x2="233" y2="114" stroke="#c0392b" strokeWidth="2" />
      <line x1="239" y1="104" x2="239" y2="114" stroke="#2980b9" strokeWidth="2" />
      <line x1="245" y1="104" x2="245" y2="114" stroke="#27ae60" strokeWidth="2" />
      <text x="241" y="129" textAnchor="middle" fill="#78716c" fontSize="6" fontFamily="monospace">330Ω</text>

      {/* LED body */}
      <circle cx="241" cy="155" r="9" fill={ledOn ? '#fde68a' : '#1f2937'} stroke={ledOn ? '#f59e0b' : '#374151'} strokeWidth="1.5" style={{ transition: 'all 0.2s ease' }} />
      {/* LED lens */}
      <ellipse cx="238" cy="151" rx="3" ry="2" fill={ledOn ? 'rgba(255,255,200,0.7)' : 'rgba(255,255,255,0.05)'} style={{ transition: 'all 0.2s ease' }} />
      {/* LED legs */}
      <line x1="241" y1="164" x2="241" y2="175" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="237" y1="164" x2="234" y2="175" stroke="#9ca3af" strokeWidth="1.5" />
      {/* LED glow when on */}
      {ledOn && (
        <>
          <circle cx="241" cy="155" r="16" fill="rgba(251,191,36,0.12)" />
          <circle cx="241" cy="155" r="24" fill="rgba(251,191,36,0.06)" />
        </>
      )}
      <text x="241" y="185" textAnchor="middle" fill={ledOn ? '#f59e0b' : '#6b7280'} fontSize="6" fontFamily="monospace">LED</text>

      {/* Wires */}
      {/* Pin 13 → resistor */}
      <path d="M140 113 L180 113 L226 109" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="none" />
      {/* Resistor → LED */}
      <path d="M256 109 L280 109 L280 135 L241 135 L241 146" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      {/* LED cathode → GND */}
      <path d="M234 175 L200 175 L200 190" fill="none" stroke="#4b5563" strokeWidth="1.5" />
      {/* GND rail → Board GND */}
      <path d="M170 190 L155 190 L155 177 L140 177" fill="none" stroke="#4b5563" strokeWidth="1.5" />

      {/* Status labels */}
      <text x="10" y="215" fill="#6b7280" fontSize="7" fontFamily="monospace">Pin 13 → R(330Ω) → LED(+) → LED(−) → GND</text>
    </svg>
  )
}

// ─── Traffic Light Circuit SVG ────────────────────────────────────────────────

function SemaforoCircuit({ activeLight }: { activeLight: 'rojo' | 'amarillo' | 'verde' | null }) {
  const lights = [
    { id: 'rojo',    label: 'ROJO',     y: 90,  onClass: 'led-on-red',    offFill: '#1f2937', pin: 'P8' },
    { id: 'amarillo',label: 'AMARILLO', y: 130, onClass: 'led-on-yellow', offFill: '#1f2937', pin: 'P9' },
    { id: 'verde',   label: 'VERDE',    y: 170, onClass: 'led-on-green',  offFill: '#1f2937', pin: 'P10' },
  ] as const

  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="40" width="115" height="170" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="67" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>

      {/* Pins 8-10 */}
      {[8, 9, 10].map((pin, i) => (
        <g key={pin}>
          <rect x="115" y={88 + i * 40} width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
          <text x="111" y={96 + i * 40} textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">P{pin}</text>
        </g>
      ))}
      {/* GND */}
      <rect x="115" y="190" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="111" y="198" textAnchor="end" fill="#6b7280" fontSize="6" fontFamily="monospace">GND</text>

      {/* Traffic Light housing */}
      <rect x="200" y="55" width="50" height="145" rx="8" fill="#111827" stroke="#374151" strokeWidth="2" />
      <text x="225" y="73" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily="monospace">SEMÁFORO</text>

      {/* LEDs in housing */}
      {lights.map(({ id, label, y, onClass, offFill, pin }) => {
        const isOn = activeLight === id
        return (
          <g key={id}>
            <circle cx="225" cy={y} r="14" className={isOn ? onClass : ''} fill={isOn ? undefined : offFill} stroke={isOn ? undefined : '#1f2937'} strokeWidth="1.5" style={{ transition: 'all 0.3s ease' }} />
            {isOn && <circle cx="225" cy={y} r="22" fill="currentColor" opacity="0.08" />}
            <text x="248" y={y + 4} fill={isOn ? '#e5e7eb' : '#4b5563'} fontSize="6" fontFamily="monospace">{label}</text>
            {/* Wire from pin */}
            <path d={`M125 ${78 + lights.findIndex(l => l.id === id) * 40} L175 ${78 + lights.findIndex(l => l.id === id) * 40} L175 ${y} L211 ${y}`} fill="none" stroke={isOn ? (id === 'rojo' ? '#ef4444' : id === 'amarillo' ? '#f59e0b' : '#22c55e') : '#374151'} strokeWidth="1.5" style={{ transition: 'stroke 0.3s ease' }} />
            {/* Resistor */}
            <rect x="175" y={y - 4} width="12" height="8" rx="2" fill="#f5e6c8" stroke="#d4a017" strokeWidth="0.8" />
          </g>
        )
      })}

      {/* Common GND wire */}
      <path d="M125 195 L165 195 L165 210 L225 210 L225 184" fill="none" stroke="#4b5563" strokeWidth="1.5" />
      <text x="10" y="215" fill="#6b7280" fontSize="7" fontFamily="monospace">P8→ROJO | P9→AMARILLO | P10→VERDE | GND común</text>
    </svg>
  )
}

// ─── Temperature Circuit SVG ─────────────────────────────────────────────────

function TemperaturaCircuit({ temperature, fanSpeed }: { temperature: number; fanSpeed: number }) {
  const fanAngle = useRef(0)
  const [fanRotation, setFanRotation] = useState(0)
  const animRef = useRef<number>()

  useEffect(() => {
    const fps = fanSpeed > 0 ? (fanSpeed / 255) * 6 : 0
    const animate = () => {
      if (fps > 0) {
        fanAngle.current = (fanAngle.current + fps) % 360
        setFanRotation(fanAngle.current)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [fanSpeed])

  const tempColor = temperature < 25 ? '#60a5fa' : temperature < 35 ? '#fbbf24' : '#ef4444'

  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="40" width="110" height="170" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="65" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>
      <text x="65" y="68" textAnchor="middle" fill="#22c55e" fontSize="6" fontFamily="monospace">ATmega328P</text>

      {/* Analog pin A0 */}
      <rect x="110" y="90" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="98" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">A0</text>

      {/* PWM pin 6 */}
      <rect x="110" y="130" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="138" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">~6</text>

      {/* GND */}
      <rect x="110" y="170" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="178" textAnchor="end" fill="#6b7280" fontSize="6" fontFamily="monospace">GND</text>

      {/* LM35 sensor */}
      <rect x="148" y="78" width="40" height="32" rx="4" fill="#1a2744" stroke="#2563eb" strokeWidth="1.5" />
      <text x="168" y="91" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace" fontWeight="bold">LM35</text>
      <text x="168" y="101" textAnchor="middle" fill="#93c5fd" fontSize="6" fontFamily="monospace">SENSOR</text>
      {/* LM35 legs */}
      <line x1="155" y1="110" x2="155" y2="118" stroke="#9ca3af" strokeWidth="1" />
      <line x1="168" y1="110" x2="168" y2="118" stroke="#9ca3af" strokeWidth="1" />
      <line x1="181" y1="110" x2="181" y2="118" stroke="#9ca3af" strokeWidth="1" />
      <text x="155" y="126" textAnchor="middle" fill="#6b7280" fontSize="5">VCC</text>
      <text x="168" y="126" textAnchor="middle" fill="#6b7280" fontSize="5">Vout</text>
      <text x="181" y="126" textAnchor="middle" fill="#6b7280" fontSize="5">GND</text>

      {/* Temp wire from A0 to sensor Vout */}
      <path d="M120 95 L140 95 L140 103 L168 103 L168 110" fill="none" stroke="#60a5fa" strokeWidth="1.5" />

      {/* Motor / Fan */}
      <circle cx="255" cy="135" r="32" fill="#1a1a2e" stroke="#374151" strokeWidth="2" />
      <text x="255" y="178" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily="monospace">MOTOR DC</text>

      {/* Fan blades - rotate based on speed */}
      <g transform={`rotate(${fanRotation}, 255, 135)`} style={{ transition: fanSpeed > 0 ? 'none' : 'transform 0.3s ease' }}>
        {[0, 90, 180, 270].map(angle => (
          <ellipse
            key={angle}
            cx="255" cy="135"
            rx="22" ry="7"
            fill={fanSpeed > 0 ? `rgba(99, 102, 241, ${0.4 + (fanSpeed / 255) * 0.5})` : 'rgba(75, 85, 99, 0.5)'}
            transform={`rotate(${angle}, 255, 135)`}
            style={{ transition: 'fill 0.3s ease' }}
          />
        ))}
      </g>
      <circle cx="255" cy="135" r="6" fill="#374151" stroke="#4b5563" strokeWidth="1.5" />

      {/* Motor wire from PWM 6 */}
      <path d="M120 135 L215 135 L223 135" fill="none" stroke={fanSpeed > 0 ? '#818cf8' : '#374151'} strokeWidth="1.5" style={{ transition: 'stroke 0.3s ease' }} />

      {/* GND wires */}
      <path d="M120 175 L135 175 L135 175 L181 130 L181 120" fill="none" stroke="#4b5563" strokeWidth="1" opacity="0.7" />

      {/* Temperature display */}
      <rect x="145" y="145" width="65" height="28" rx="4" fill="#0f172a" stroke={tempColor} strokeWidth="1.5" style={{ transition: 'border-color 0.3s ease' }} />
      <text x="177" y="157" textAnchor="middle" fill={tempColor} fontSize="7" fontFamily="monospace" style={{ transition: 'fill 0.3s ease' }}>TEMP</text>
      <text x="177" y="169" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">{temperature.toFixed(1)}°C</text>

      {/* PWM speed indicator */}
      {fanSpeed > 0 && (
        <>
          <text x="255" y="100" textAnchor="middle" fill="#818cf8" fontSize="7" fontFamily="monospace">PWM: {fanSpeed}</text>
          <text x="255" y="110" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily="monospace">{Math.round((fanSpeed/255)*100)}% velocidad</text>
        </>
      )}

      <text x="10" y="215" fill="#6b7280" fontSize="7" fontFamily="monospace">A0→LM35 | ~6→Motor DC | 10mV/°C</text>
    </svg>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ArduinoSimulator() {
  const [activeProject, setActiveProject] = useState<ProjectId>('led')
  const [isRunning, setIsRunning] = useState(false)
  const [tick, setTick] = useState(0)

  // LED state
  const [ledOn, setLedOn] = useState(false)

  // Semaforo state
  const [semaforoPhase, setSemaforoPhase] = useState<'rojo' | 'amarillo' | 'verde'>('rojo')
  const phaseTimers = { rojo: 5, amarillo: 2, verde: 5 }
  const [phaseCountdown, setPhaseCountdown] = useState(5)

  // Temperature state
  const [temperature, setTemperature] = useState(25)
  const fanSpeed = temperature >= 30 ? Math.min(255, Math.round(((temperature - 30) / 20) * 175 + 80)) : 0

  // Console log
  const [logs, setLogs] = useState<string[]>(['[Sistema] Arduino inicializado.', '[Sistema] Listo para ejecutar.'])
  const logsEndRef = useRef<HTMLDivElement>(null)

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString('es-NI')}] ${msg}`])
  }, [])

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Reset on project change
  useEffect(() => {
    setIsRunning(false)
    setLedOn(false)
    setSemaforoPhase('rojo')
    setPhaseCountdown(5)
    setTick(0)
    setLogs(['[Sistema] Proyecto cargado: ' + PROJECTS.find(p => p.id === activeProject)?.name, '[Sistema] Presiona ▶ para ejecutar.'])
  }, [activeProject])

  // Main simulation tick
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTick(t => t + 1)
    }, activeProject === 'led' ? 1000 : activeProject === 'semaforo' ? 1000 : 500)

    return () => clearInterval(interval)
  }, [isRunning, activeProject])

  // Simulation logic per tick
  useEffect(() => {
    if (!isRunning) return

    if (activeProject === 'led') {
      setLedOn(prev => {
        const next = !prev
        addLog(next ? 'digitalWrite(13, HIGH) → LED encendido' : 'digitalWrite(13, LOW) → LED apagado')
        return next
      })
    }

    if (activeProject === 'semaforo') {
      setPhaseCountdown(prev => {
        if (prev <= 1) {
          setSemaforoPhase(ph => {
            const order: ('rojo' | 'amarillo' | 'verde')[] = ['rojo', 'amarillo', 'verde']
            const nextPh = order[(order.indexOf(ph) + 1) % 3]
            addLog(`Cambio → ${nextPh.toUpperCase()} (${phaseTimers[nextPh]}s)`)
            setPhaseCountdown(phaseTimers[nextPh])
            return nextPh
          })
          return phaseTimers[semaforoPhase]
        }
        return prev - 1
      })
    }

    if (activeProject === 'temperatura') {
      addLog(`analogRead(A0) → Temp: ${temperature.toFixed(1)}°C | Fan PWM: ${fanSpeed}`)
    }
  }, [tick]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    setIsRunning(true)
    addLog('▶ Ejecución iniciada...')
  }

  const handleStop = () => {
    setIsRunning(false)
    addLog('⏸ Ejecución pausada.')
  }

  const handleReset = () => {
    setIsRunning(false)
    setLedOn(false)
    setSemaforoPhase('rojo')
    setPhaseCountdown(5)
    setTick(0)
    addLog('⟳ Sistema reiniciado.')
  }

  const activeProjectData = PROJECTS.find(p => p.id === activeProject)!

  return (
    <div className="space-y-6">
      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PROJECTS.map(({ id, name, icon: Icon, color, borderColor, badgeBg, desc }) => {
          const isActive = activeProject === id
          return (
            <button
              key={id}
              onClick={() => setActiveProject(id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 group ${
                isActive
                  ? `${borderColor} ${badgeBg} ${color}`
                  : 'border-border/50 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={16} className={isActive ? color : 'opacity-60'} />
                <span className="text-sm font-semibold">{name}</span>
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed">{desc}</p>
            </button>
          )
        })}
      </div>

      {/* Main Workspace */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Circuit Display */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border/50 bg-card/25 glass-panel overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-background/60">
              <div className="flex items-center gap-2">
                <CircuitBoard size={14} className={activeProjectData.color} />
                <span className="text-xs font-mono font-semibold text-foreground">CIRCUITO SIMULADO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/40'}`} />
                <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">
                  {isRunning ? 'EJECUTANDO' : 'DETENIDO'}
                </span>
              </div>
            </div>
            <div className="p-4 aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-slate-900/60 to-slate-950/80">
              {activeProject === 'led' && <LedCircuit ledOn={ledOn} />}
              {activeProject === 'semaforo' && <SemaforoCircuit activeLight={isRunning ? semaforoPhase : null} />}
              {activeProject === 'temperatura' && <TemperaturaCircuit temperature={temperature} fanSpeed={isRunning ? fanSpeed : 0} />}
            </div>
          </div>

          {/* Temperature slider */}
          {activeProject === 'temperatura' && (
            <div className="rounded-xl border border-border/50 bg-card/25 glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Thermometer size={14} className="text-cyan-400" />
                  <span>TEMPERATURA SIMULADA (LM35)</span>
                </div>
                <span className="font-mono text-sm font-bold text-cyan-400">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="15" max="55"
                value={temperature}
                onChange={e => setTemperature(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground/50">
                <span>15°C (frío)</span>
                <span className="text-amber-400">30°C (umbral)</span>
                <span className="text-rose-400">55°C (caliente)</span>
              </div>
              {isRunning && (
                <div className={`text-xs font-mono text-center py-1.5 px-3 rounded-lg border transition-all duration-300 ${
                  fanSpeed > 0
                    ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
                    : 'border-border/40 bg-muted/20 text-muted-foreground'
                }`}>
                  {fanSpeed > 0
                    ? `Ventilador: PWM = ${fanSpeed} (${Math.round((fanSpeed/255)*100)}% velocidad)`
                    : 'Ventilador: OFF — temperatura < 30°C'}
                </div>
              )}
            </div>
          )}

          {/* Control buttons */}
          <div className="flex gap-2">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono font-bold hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <Play size={15} />
                Ejecutar
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-mono font-bold hover:bg-amber-500/20 transition-all cursor-pointer"
              >
                <Pause size={15} />
                Pausar
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/8 border border-rose-500/25 text-rose-400 text-sm font-mono font-bold hover:bg-rose-500/15 transition-all cursor-pointer"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        {/* Code + Console Panel */}
        <div className="lg:col-span-7 space-y-4">
          {/* Code panel */}
          <div className="rounded-xl border border-border/50 bg-card/25 glass-panel overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-background/60">
              <div className="flex items-center gap-2">
                <Code2 size={14} className={activeProjectData.color} />
                <span className="text-xs font-mono font-semibold text-foreground">
                  {activeProject.toUpperCase()}_SKETCH.ino
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[320px] bg-black/70 font-mono text-[11px]">
              {CODE[activeProject].lines.map((line, i) => (
                <div
                  key={i}
                  className="flex items-start hover:bg-white/3 transition-colors px-1"
                >
                  <span className="w-8 text-right pr-3 py-0.5 text-muted-foreground/30 select-none flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="py-0.5 flex-1">
                    <span className="text-zinc-200 whitespace-pre">{line.code}</span>
                    {line.comment && (
                      <span className="text-muted-foreground/55 ml-1">{line.comment}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Serial Console */}
          <div className="rounded-xl border border-border/50 bg-card/25 glass-panel overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-background/60">
              <div className="flex items-center gap-2">
                <Zap size={13} className="text-primary" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Monitor Serial — 9600 baud
                </span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[10px] font-mono text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
              >
                Limpiar
              </button>
            </div>
            <div className="bg-black/80 p-3 h-36 overflow-y-auto font-mono text-[10px] space-y-0.5">
              {logs.map((log, i) => (
                <div key={i} className={`${log.startsWith('[Sistema]') ? 'text-muted-foreground/50' : 'text-emerald-400'}`}>
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Info card */}
          <div className={`rounded-xl border ${activeProjectData.borderColor} ${activeProjectData.badgeBg} p-4 flex items-start gap-3`}>
            <Info size={16} className={`${activeProjectData.color} flex-shrink-0 mt-0.5`} />
            <div>
              <p className={`text-xs font-semibold ${activeProjectData.color} mb-1`}>{activeProjectData.name}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{activeProjectData.desc}</p>
              {activeProject === 'semaforo' && isRunning && (
                <p className={`text-xs font-mono mt-1.5 font-semibold ${
                  semaforoPhase === 'rojo' ? 'text-rose-400' : semaforoPhase === 'amarillo' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  Fase activa: {semaforoPhase.toUpperCase()} — {phaseCountdown}s restantes
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
