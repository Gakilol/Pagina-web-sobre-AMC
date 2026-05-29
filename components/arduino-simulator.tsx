'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, CircuitBoard, Code2, ChevronRight, Info, Thermometer, Zap, Lightbulb, Activity, Plus, Trash2, Sliders } from 'lucide-react'

// ─── Project Types ──────────────────────────────────────────────────────────

type ProjectId = 'led' | 'semaforo' | 'temperatura' | 'servo' | 'ultrasonido' | 'sandbox'

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
  },
  {
    id: 'servo',
    name: 'Control de Servomotor',
    icon: Zap,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/10',
    desc: 'Control de ángulo de servomotor (0° a 180°) usando un potenciómetro analógico.'
  },
  {
    id: 'ultrasonido',
    name: 'Sensor de Parqueo',
    icon: CircuitBoard,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    badgeBg: 'bg-rose-500/10',
    desc: 'Sensor ultrasónico HC-SR04 con indicador de distancia por buzzer y LED.'
  },
  {
    id: 'sandbox',
    name: 'Creador de Circuitos',
    icon: Code2,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/10',
    desc: 'Sandbox libre: ¡coloca piezas (LEDs, zumbadores, servos) y conecta cables interactivos!'
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
  },
  servo: {
    lines: [
      { code: '#include <Servo.h>', comment: '// Incluir librería de Servo' },
      { code: '' },
      { code: 'Servo myservo;  // Crear objeto servo' },
      { code: 'const int POT_PIN = A0;  // Potenciómetro en A0' },
      { code: 'const int SERVO_PIN = 9; // Servo en Pin PWM ~9' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  myservo.attach(SERVO_PIN);  // Conectar servo al pin 9' },
      { code: '  Serial.begin(9600);' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  int raw = analogRead(POT_PIN);          // Leer pot (0-1023)' },
      { code: '  int angle = map(raw, 0, 1023, 0, 180);  // Mapear a grados (0-180)' },
      { code: '  myservo.write(angle);                  // Mover servo' },
      { code: '  Serial.print("Angulo: ");' },
      { code: '  Serial.println(angle);' },
      { code: '  delay(15);                             // Esperar que se mueva' },
      { code: '}' }
    ]
  },
  ultrasonido: {
    lines: [
      { code: 'const int TRIG = 12;   // Trigger en Pin 12' },
      { code: 'const int ECHO = 11;   // Echo en Pin 11' },
      { code: 'const int BUZZER = 3;  // Buzzer PWM ~3' },
      { code: 'const int LED = 7;     // LED de Alerta en Pin 7' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  pinMode(TRIG, OUTPUT);' },
      { code: '  pinMode(ECHO, INPUT);' },
      { code: '  pinMode(BUZZER, OUTPUT);' },
      { code: '  pinMode(LED, OUTPUT);' },
      { code: '  Serial.begin(9600);' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  // Generar pulso de ultrasonido' },
      { code: '  digitalWrite(TRIG, LOW); delayMicroseconds(2);' },
      { code: '  digitalWrite(TRIG, HIGH); delayMicroseconds(10);' },
      { code: '  digitalWrite(TRIG, LOW);' },
      { code: '  long t = pulseIn(ECHO, HIGH); // Tiempo de retorno' },
      { code: '  int dist = t * 0.034 / 2;     // Distancia en cm' },
      { code: '' },
      { code: '  Serial.print("Distancia: "); Serial.println(dist);' },
      { code: '  if (dist < 15) {' },
      { code: '    // Alerta crítica: sonido continuo' },
      { code: '    digitalWrite(LED, HIGH);' },
      { code: '    tone(BUZZER, 1000);' },
      { code: '  } else if (dist < 50) {' },
      { code: '    // Obstáculo cercano: parpadeo y pitido intermitente' },
      { code: '    digitalWrite(LED, HIGH); tone(BUZZER, 1000, 80);' },
      { code: '    delay(dist * 10); // Intervalo proporcional a distancia' },
      { code: '    digitalWrite(LED, LOW);' },
      { code: '    delay(dist * 10);' },
      { code: '  } else {' },
      { code: '    // Seguro: apagar todo' },
      { code: '    digitalWrite(LED, LOW); noTone(BUZZER);' },
      { code: '    delay(500);' },
      { code: '  }' },
      { code: '}' }
    ]
  },
  sandbox: {
    lines: [
      { code: '// === MODO SANDBOX DE CIRCUITOS LIBRES ===', comment: '// Diseñador de Hardware' },
      { code: '// 1. Añade piezas en el panel izquierdo de controles.' },
      { code: '// 2. Elige el pin de conexión en el Arduino Uno.' },
      { code: '// 3. Manipula las perillas y botones para activar las señales.' },
      { code: '// 4. ¡Los cables SVG dinámicos se conectan en tiempo real!' },
      { code: '' },
      { code: 'void setup() {' },
      { code: '  // Configuración física dinámica detectada' },
      { code: '  Serial.begin(9600);' },
      { code: '}' },
      { code: '' },
      { code: 'void loop() {' },
      { code: '  // Monitoreando señales del sandbox libre...' },
      { code: '}' }
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
          <rect x="130" y="108 + i * 16" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
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
      <path d="M140 113 L180 113 L226 109" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
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

      {/* Pins 8-10 (center is at y = 88 + idx * 40 + 5 = 93 + idx * 40) */}
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
      {lights.map(({ id, label, y, onClass, offFill }, idx) => {
        const isOn = activeLight === id
        return (
          <g key={id}>
            <circle cx="225" cy={y} r="14" className={isOn ? onClass : ''} fill={isOn ? undefined : offFill} stroke={isOn ? undefined : '#1f2937'} strokeWidth="1.5" style={{ transition: 'all 0.3s ease' }} />
            {isOn && <circle cx="225" cy={y} r="22" fill="currentColor" opacity="0.08" />}
            <text x="248" y={y + 4} fill={isOn ? '#e5e7eb' : '#4b5563'} fontSize="6" fontFamily="monospace">{label}</text>
            {/* Dynamic wire from pins 8,9,10 centered properly (y = 93, 133, 173) */}
            <path d={`M125 ${93 + idx * 40} L175 ${93 + idx * 40} L175 ${y} L211 ${y}`} fill="none" stroke={isOn ? (id === 'rojo' ? '#ef4444' : id === 'amarillo' ? '#f59e0b' : '#22c55e') : '#374151'} strokeWidth="1.5" style={{ transition: 'stroke 0.3s ease' }} />
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
  const animRef = useRef<number>(0)

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

      {/* GND wire */}
      <path d="M120 175 L135 175 L181 130 L181 120" fill="none" stroke="#4b5563" strokeWidth="1" opacity="0.7" />

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

// ─── Servo Circuit SVG ───────────────────────────────────────────────────────

function ServoCircuit({ angle, potVal }: { angle: number; potVal: number }) {
  const potAngle = (potVal / 1023) * 270 - 135

  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="40" width="110" height="170" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="65" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>

      {/* Pins */}
      <rect x="110" y="90" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="98" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">A0</text>

      <rect x="110" y="130" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="138" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">~9</text>

      <rect x="110" y="170" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="178" textAnchor="end" fill="#6b7280" fontSize="6" fontFamily="monospace">GND</text>

      {/* Potentiometer */}
      <circle cx="165" cy="85" r="20" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <circle cx="165" cy="85" r="15" fill="#1a202c" />
      <line x1="165" y1="85" x2={165 + 14 * Math.sin((potAngle * Math.PI) / 180)} y2={85 - 14 * Math.cos((potAngle * Math.PI) / 180)} stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <text x="165" y="118" textAnchor="middle" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">POT (A0)</text>

      {/* Servomotor */}
      <rect x="220" y="125" width="75" height="50" rx="4" fill="#3182ce" stroke="#2b6cb0" strokeWidth="1.5" />
      <circle cx="257" cy="150" r="16" fill="#1a365d" />
      <g transform={`rotate(${angle}, 257, 150)`} style={{ transition: 'transform 0.15s ease' }}>
        <rect x="237" y="146" width="40" height="8" rx="2" fill="#edf2f7" />
        <circle cx="242" cy="150" r="2.5" fill="#4a5568" />
        <circle cx="272" cy="150" r="2.5" fill="#4a5568" />
      </g>
      <circle cx="257" cy="150" r="4" fill="#718096" />
      <text x="257" y="190" textAnchor="middle" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">SERVO (Pin 9)</text>
      <text x="257" y="140" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold" fontFamily="monospace">{angle}°</text>

      {/* Wires */}
      <path d="M120 95 L145 95 L145 85 L150 85" fill="none" stroke="#4ade80" strokeWidth="1.5" />
      <path d="M120 135 L200 135 L220 135" fill="none" stroke="#63b3ed" strokeWidth="1.5" />
      <path d="M120 175 L180 175 L180 160 L220 160" fill="none" stroke="#4b5563" strokeWidth="1.2" opacity="0.6" />
    </svg>
  )
}

// ─── Ultrasonic Parking Sensor Circuit SVG ───────────────────────────────────

function UltrasonicoCircuit({ distance, isBuzzerActive }: { distance: number; isBuzzerActive: boolean }) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="40" width="110" height="170" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="65" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>

      {/* Pins */}
      <rect x="110" y="70" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="78" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">P12</text>

      <rect x="110" y="100" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="108" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">P11</text>

      <rect x="110" y="130" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="138" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">~3</text>

      <rect x="110" y="160" width="10" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      <text x="106" y="168" textAnchor="end" fill="#9ca3af" fontSize="6.5" fontFamily="monospace">P7</text>

      {/* HC-SR04 Sensor */}
      <rect x="190" y="50" width="100" height="40" rx="4" fill="#2b6cb0" stroke="#1a365d" strokeWidth="1.5" />
      <text x="240" y="60" textAnchor="middle" fill="#fff" fontSize="6.5" fontFamily="monospace" fontWeight="bold">HC-SR04</text>
      <circle cx="215" cy="72" r="12" fill="#cbd5e0" stroke="#718096" strokeWidth="1" />
      <circle cx="215" cy="72" r="8" fill="#1a202c" />
      <circle cx="215" cy="72" r="3" fill="#cbd5e0" />
      <circle cx="265" cy="72" r="12" fill="#cbd5e0" stroke="#718096" strokeWidth="1" />
      <circle cx="265" cy="72" r="8" fill="#1a202c" />
      <circle cx="265" cy="72" r="3" fill="#cbd5e0" />

      {/* Sound waves when buzzer active */}
      {isBuzzerActive && (
        <g stroke="#f87171" strokeWidth="1.2" fill="none" className="animate-pulse">
          <path d="M 152 135 A 8 8 0 0 1 152 165" />
          <path d="M 146 128 A 15 15 0 0 1 146 172" />
        </g>
      )}

      {/* Buzzer */}
      <circle cx="170" cy="150" r="16" fill="#2d3748" stroke="#1a202c" strokeWidth="1.5" />
      <circle cx="170" cy="150" r="5" fill="#1a202c" />
      <text x="170" y="174" textAnchor="middle" fill="#9ca3af" fontSize="6" fontFamily="monospace">BUZZER (P3)</text>

      {/* LED */}
      <circle cx="265" cy="150" r="9" fill={isBuzzerActive ? '#fc8181' : '#1a202c'} stroke={isBuzzerActive ? '#ef4444' : '#4a5568'} strokeWidth="1.5" />
      <line x1="265" y1="159" x2="265" y2="175" stroke="#a0aec0" strokeWidth="1.5" />
      <text x="265" y="185" textAnchor="middle" fill={isBuzzerActive ? '#ef4444' : '#a0aec0'} fontSize="6" fontFamily="monospace">LED (P7)</text>

      {/* Wires */}
      <path d="M120 75 L160 75 L160 65 L190 65" fill="none" stroke="#4299e1" strokeWidth="1.2" />
      <path d="M120 105 L155 105 L155 80 L190 80" fill="none" stroke="#319795" strokeWidth="1.2" />
      <path d="M120 135 L145 135 L145 150 L154 150" fill="none" stroke="#dd6b20" strokeWidth="1.2" />
      <path d="M120 165 L220 165 L220 150 L256 150" fill="none" stroke="#e53e3e" strokeWidth="1.2" />
    </svg>
  )
}

// ─── Sandbox / Custom Circuit Maker SVG ──────────────────────────────────────

interface SandboxComponent {
  id: string
  type: 'led' | 'buzzer' | 'servo' | 'pot'
  pin: string // e.g., '13', '12', '9', '3', 'A0', 'A1'
  color?: 'red' | 'yellow' | 'green' | 'blue'
  state?: boolean | number // LED/Buzzer = active, Servo = angle, Pot = value
}

interface SandboxCircuitProps {
  components: SandboxComponent[]
  onPotChange: (id: string, val: number) => void
  onServoChange: (id: string, angle: number) => void
}

function SandboxCircuit({ components, onPotChange, onServoChange }: SandboxCircuitProps) {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Arduino board */}
      <rect x="10" y="40" width="110" height="170" rx="6" fill="#1e3a2f" stroke="#2d5c3f" strokeWidth="1.5" />
      <text x="65" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>

      {/* Render selected connection ports visually in white/green */}
      {['13', '12', '10', '9', '7', '6', '3', '2'].map((pin, i) => (
        <rect key={pin} x="110" y={70 + i * 14} width="10" height="8" rx="1.5" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
      ))}
      {['A0', 'A1', 'A2'].map((pin, i) => (
        <rect key={pin} x="110" y="180 + i * 10" width="10" height="7" rx="1" fill="#1a2744" stroke="#2563eb" strokeWidth="0.5" />
      ))}

      {/* Protoboard base */}
      <rect x="160" y="45" width="150" height="160" rx="4" fill="#e2e8f0" stroke="#cbd5e0" strokeWidth="1" />
      <text x="235" y="56" textAnchor="middle" fill="#718096" fontSize="6.5" fontWeight="bold" fontFamily="monospace">TABLERO DE PRUEBAS</text>

      {/* If no components placed */}
      {components.length === 0 && (
        <text x="235" y="120" textAnchor="middle" fill="#a0aec0" fontSize="7" fontFamily="sans-serif">
          [ Vacío - Añade piezas en el panel ]
        </text>
      )}

      {/* Dynamic render of placed pieces & wires */}
      {components.map((c, index) => {
        const compY = 80 + index * 30
        const compX = 220

        // Get starting Y coordinates of Arduino pins
        let startY = 74
        if (c.pin === '13') startY = 74
        else if (c.pin === '12') startY = 88
        else if (c.pin === '10') startY = 102
        else if (c.pin === '9') startY = 116
        else if (c.pin === '7') startY = 130
        else if (c.pin === '6') startY = 144
        else if (c.pin === '3') startY = 158
        else if (c.pin === '2') startY = 172
        else if (c.pin === 'A0') startY = 183
        else if (c.pin === 'A1') startY = 193
        else if (c.pin === 'A2') startY = 203

        // Colors of wire
        const wireColor = c.type === 'led' ? '#f59e0b' : c.type === 'buzzer' ? '#ef4444' : c.type === 'servo' ? '#6366f1' : '#10b981'

        return (
          <g key={c.id}>
            {/* Draw dynamic wire from Arduino port to component */}
            <path
              d={`M120 ${startY} L 145 ${startY} L 145 ${compY} L ${compX} ${compY}`}
              fill="none"
              stroke={wireColor}
              strokeWidth="1.5"
              strokeDasharray={c.state ? "none" : "none"}
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Component rendering */}
            {c.type === 'led' && (
              <g transform={`translate(${compX}, ${compY - 10})`}>
                <circle cx="15" cy="10" r="8" fill={c.state ? (c.color === 'red' ? '#ef4444' : c.color === 'yellow' ? '#f59e0b' : c.color === 'green' ? '#10b981' : '#3b82f6') : '#475569'} stroke="#334155" strokeWidth="1" />
                <rect x="13" y="18" width="4" height="6" fill="#94a3b8" />
                <text x="28" y="13" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                  LED {c.pin}
                </text>
              </g>
            )}

            {c.type === 'buzzer' && (
              <g transform={`translate(${compX}, ${compY - 10})`}>
                <circle cx="15" cy="10" r="9" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <circle cx="15" cy="10" r="3" fill="#0f172a" />
                {c.state && (
                  <path d="M 5 5 A 4 4 0 0 1 5 15" stroke="#ef4444" strokeWidth="0.8" fill="none" className="animate-pulse" />
                )}
                <text x="28" y="13" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                  ZUMB. {c.pin}
                </text>
              </g>
            )}

            {c.type === 'servo' && (
              <g transform={`translate(${compX}, ${compY - 10})`}>
                <rect x="0" y="2" width="28" height="16" rx="2" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
                {/* Horn rotating */}
                <g transform={`rotate(${Number(c.state || 0)}, 20, 10)`} style={{ transition: 'transform 0.15s ease' }}>
                  <rect x="8" y="8" width="24" height="4" rx="1" fill="#f8fafc" />
                </g>
                <circle cx="20" cy="10" r="3" fill="#94a3b8" />
                <text x="32" y="12" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                  SERVO ({c.state || 0}°)
                </text>
              </g>
            )}

            {c.type === 'pot' && (
              <g transform={`translate(${compX}, ${compY - 10})`}>
                <circle cx="14" cy="10" r="8" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                {/* Knob line */}
                <line x1="14" y1="10" x2={14 + 7 * Math.sin(((Number(c.state || 0)/1023*270-135)*Math.PI)/180)} y2={10 - 7 * Math.cos(((Number(c.state || 0)/1023*270-135)*Math.PI)/180)} stroke="#10b981" strokeWidth="1.8" />
                <text x="26" y="12" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
                  POT ({c.state || 0})
                </text>
              </g>
            )}
          </g>
        )
      })}
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

  // Servo state
  const [servoAngle, setServoAngle] = useState(90)
  const [potValue, setPotValue] = useState(512)

  // Parking Sensor state
  const [parkDistance, setParkDistance] = useState(75)
  const [buzzerActive, setBuzzerActive] = useState(false)

  // Sandbox State
  const [sandboxComponents, setSandboxComponents] = useState<SandboxComponent[]>([
    { id: '1', type: 'led', pin: '13', color: 'red', state: false },
    { id: '2', type: 'pot', pin: 'A0', state: 512 }
  ])
  const [sandboxSelectType, setSandboxSelectType] = useState<'led' | 'buzzer' | 'servo' | 'pot'>('led')
  const [sandboxSelectPin, setSandboxSelectPin] = useState('13')
  const [sandboxSelectColor, setSandboxSelectColor] = useState<'red' | 'yellow' | 'green' | 'blue'>('red')

  // Console log
  const [logs, setLogs] = useState<string[]>(['[Sistema] Arduino inicializado.', '[Sistema] Listo para ejecutar.'])
  
  // Custom scroll reference to replace global scrollIntoView
  const logsContainerRef = useRef<HTMLDivElement>(null)

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString('es-NI')}] ${msg}`])
  }, [])

  // Auto-scroll logs locally without moving the browser screen!
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    }
  }, [logs])

  // Reset on project change
  useEffect(() => {
    setIsRunning(false)
    setLedOn(false)
    setSemaforoPhase('rojo')
    setPhaseCountdown(5)
    setServoAngle(90)
    setPotValue(512)
    setParkDistance(75)
    setBuzzerActive(false)
    setTick(0)
    setLogs(['[Sistema] Proyecto cargado: ' + PROJECTS.find(p => p.id === activeProject)?.name, '[Sistema] Presiona ▶ para ejecutar.'])
  }, [activeProject])

  // Main simulation tick loop
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

    if (activeProject === 'servo') {
      // Map potentiometer to servo angle
      const targetAngle = Math.round((potValue / 1023) * 180)
      setServoAngle(targetAngle)
      addLog(`analogRead(A0) = ${potValue} | myservo.write(${targetAngle}°)`)
    }

    if (activeProject === 'ultrasonido') {
      if (parkDistance < 15) {
        setBuzzerActive(true)
        addLog(`Distancia crítica: ${parkDistance}cm | tone(3, 1000) CONTINUO`)
      } else if (parkDistance < 50) {
        setBuzzerActive(prev => {
          const next = !prev
          if (next) {
            addLog(`Obstáculo cercano: ${parkDistance}cm | tone(3, 1000, 80) PITIDO`)
          }
          return next
        })
      } else {
        setBuzzerActive(false)
        addLog(`Distancia segura: ${parkDistance}cm | noTone(3)`)
      }
    }

    if (activeProject === 'sandbox') {
      // Sandbox interactive simulation loop
      // Check if we have a Pot and a Servo, link them dynamically!
      const potComp = sandboxComponents.find(c => c.type === 'pot')
      const servoComp = sandboxComponents.find(c => c.type === 'servo')
      const ledComp = sandboxComponents.find(c => c.type === 'led')
      const buzzerComp = sandboxComponents.find(c => c.type === 'buzzer')

      if (potComp && servoComp) {
        const val = Number(potComp.state || 0)
        const angle = Math.round((val / 1023) * 180)
        setSandboxComponents(prev => prev.map(c => c.type === 'servo' ? { ...c, state: angle } : c))
        addLog(`Sandbox Link: POT (${val}) → SERVO (${angle}°)`)
      }

      if (ledComp) {
        setSandboxComponents(prev => prev.map(c => c.type === 'led' ? { ...c, state: !c.state } : c))
        addLog(`Sandbox: Alternando estado de LED en Pin ${ledComp.pin}`)
      }

      if (buzzerComp) {
        setSandboxComponents(prev => prev.map(c => c.type === 'buzzer' ? { ...c, state: !c.state } : c))
        addLog(`Sandbox: Alternando estado de Zumbador en Pin ${buzzerComp.pin}`)
      }
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
    setServoAngle(90)
    setPotValue(512)
    setParkDistance(75)
    setBuzzerActive(false)
    setTick(0)
    if (activeProject === 'sandbox') {
      setSandboxComponents(prev => prev.map(c => ({ ...c, state: c.type === 'led' || c.type === 'buzzer' ? false : c.type === 'servo' ? 90 : 512 })))
    }
    addLog('⟳ Sistema reiniciado.')
  }

  // Sandbox management actions
  const addSandboxComponent = () => {
    if (sandboxComponents.length >= 4) {
      addLog('[Error] Límite de 4 piezas alcanzado en el tablero de pruebas.')
      return
    }
    const alreadyHas = sandboxComponents.some(c => c.type === sandboxSelectType && c.pin === sandboxSelectPin)
    if (alreadyHas) {
      addLog(`[Error] Ya hay un componente conectado al pin ${sandboxSelectPin}.`)
      return
    }

    const newComp: SandboxComponent = {
      id: Math.random().toString(),
      type: sandboxSelectType,
      pin: sandboxSelectPin,
      color: sandboxSelectType === 'led' ? sandboxSelectColor : undefined,
      state: sandboxSelectType === 'led' || sandboxSelectType === 'buzzer' ? false : sandboxSelectType === 'servo' ? 90 : 512
    }
    setSandboxComponents(prev => [...prev, newComp])
    addLog(`[Tablero] Pieza añadida: ${sandboxSelectType.toUpperCase()} en Pin ${sandboxSelectPin}`)
  }

  const removeSandboxComponent = (id: string) => {
    setSandboxComponents(prev => {
      const target = prev.find(c => c.id === id)
      if (target) {
        addLog(`[Tablero] Pieza eliminada: ${target.type.toUpperCase()}`)
      }
      return prev.filter(c => c.id !== id)
    })
  }

  const updateSandboxPotValue = (id: string, val: number) => {
    setSandboxComponents(prev => prev.map(c => c.id === id ? { ...c, state: val } : c))
    if (!isRunning) {
      addLog(`[Hardware] Potenciómetro ajustado a ${val}`)
    }
  }

  const updateSandboxServoAngle = (id: string, angle: number) => {
    setSandboxComponents(prev => prev.map(c => c.id === id ? { ...c, state: angle } : c))
    if (!isRunning) {
      addLog(`[Hardware] Servo girado a ${angle}°`)
    }
  }

  const toggleSandboxDigitalComponent = (id: string) => {
    setSandboxComponents(prev => prev.map(c => c.id === id ? { ...c, state: !c.state } : c))
    const item = sandboxComponents.find(c => c.id === id)
    if (item) {
      addLog(`[Hardware] Pin ${item.pin} cambiado manualmente`)
    }
  }

  const activeProjectData = PROJECTS.find(p => p.id === activeProject)!

  // Sync sandbox pins based on component selected
  useEffect(() => {
    if (sandboxSelectType === 'led' || sandboxSelectType === 'buzzer') {
      setSandboxSelectPin('13')
    } else if (sandboxSelectType === 'servo') {
      setSandboxSelectPin('9')
    } else if (sandboxSelectType === 'pot') {
      setSandboxSelectPin('A0')
    }
  }, [sandboxSelectType])

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Project Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {PROJECTS.map(({ id, name, icon: Icon, color, borderColor, badgeBg, desc }) => {
          const isActive = activeProject === id
          return (
            <button
              key={id}
              onClick={() => setActiveProject(id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
                isActive
                  ? `${borderColor} ${badgeBg} ${color} shadow-lg shadow-emerald-500/5`
                  : 'border-border/50 bg-card/30 text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 min-w-0">
                <Icon size={16} className={isActive ? color : 'opacity-60 flex-shrink-0'} />
                <span className="text-xs font-bold truncate">{name}</span>
              </div>
              <p className="text-[10px] opacity-70 leading-normal line-clamp-2 mt-1">{desc}</p>
            </button>
          )
        })}
      </div>

      {/* Main Workspace */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Circuit Display & Sliders Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border/50 bg-card/25 glass-panel overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40 bg-background/60">
              <div className="flex items-center gap-2">
                <CircuitBoard size={14} className={activeProjectData.color} />
                <span className="text-xs font-mono font-semibold text-foreground">CIRC. SIMULADO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/40'}`} />
                <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">
                  {isRunning ? 'ACTIVO' : 'PAUSADO'}
                </span>
              </div>
            </div>
            <div className="p-4 aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-slate-900/65 to-slate-950/85">
              {activeProject === 'led' && <LedCircuit ledOn={ledOn} />}
              {activeProject === 'semaforo' && <SemaforoCircuit activeLight={isRunning ? semaforoPhase : null} />}
              {activeProject === 'temperatura' && <TemperaturaCircuit temperature={temperature} fanSpeed={isRunning ? fanSpeed : 0} />}
              {activeProject === 'servo' && <ServoCircuit angle={servoAngle} potVal={potValue} />}
              {activeProject === 'ultrasonido' && <UltrasonicoCircuit distance={parkDistance} isBuzzerActive={isRunning && buzzerActive} />}
              {activeProject === 'sandbox' && (
                <SandboxCircuit
                  components={sandboxComponents}
                  onPotChange={updateSandboxPotValue}
                  onServoChange={updateSandboxServoAngle}
                />
              )}
            </div>
          </div>

          {/* Interactive controls based on loaded project */}
          {activeProject === 'temperatura' && (
            <div className="rounded-xl border border-border/50 bg-card/25 glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Thermometer size={14} className="text-cyan-400" />
                  <span>TEMPERATURA LM35</span>
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
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50">
                <span>15°C (frío)</span>
                <span className="text-amber-400">30°C (umbral)</span>
                <span className="text-rose-400">55°C (caliente)</span>
              </div>
            </div>
          )}

          {activeProject === 'servo' && (
            <div className="rounded-xl border border-border/50 bg-card/25 glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Sliders size={14} className="text-indigo-400" />
                  <span>POTENCIÓMETRO ANALÓGICO</span>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-400">{potValue} (ADC)</span>
              </div>
              <input
                type="range"
                min="0" max="1023"
                value={potValue}
                onChange={e => setPotValue(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50">
                <span>0V (0)</span>
                <span>2.5V (512)</span>
                <span>5V (1023)</span>
              </div>
            </div>
          )}

          {activeProject === 'ultrasonido' && (
            <div className="rounded-xl border border-border/50 bg-card/25 glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Activity size={14} className="text-rose-400" />
                  <span>DISTANCIA AL SENSOR</span>
                </div>
                <span className="font-mono text-sm font-bold text-rose-400">{parkDistance} cm</span>
              </div>
              <input
                type="range"
                min="2" max="150"
                value={parkDistance}
                onChange={e => setParkDistance(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50">
                <span className="text-rose-500 font-bold">2cm (CRÍTICO)</span>
                <span className="text-amber-500">50cm (CERCANO)</span>
                <span>150cm (SEGURO)</span>
              </div>
            </div>
          )}

          {/* Controls for Sandbox Components Placed */}
          {activeProject === 'sandbox' && sandboxComponents.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card/25 glass-panel p-4 space-y-3.5">
              <h4 className="text-xs font-bold text-white border-b border-border/30 pb-1.5 flex items-center gap-2">
                <Sliders size={13} className="text-purple-400" />
                CONTROLES FÍSICOS DE PIEZAS
              </h4>
              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                {sandboxComponents.map(c => (
                  <div key={c.id} className="p-2.5 rounded-lg border border-border/40 bg-background/50 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1.5">
                        {c.type === 'led' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        {c.type.toUpperCase()} en Pin {c.pin}
                      </span>
                      <button onClick={() => removeSandboxComponent(c.id)} className="text-muted-foreground/45 hover:text-rose-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {c.type === 'pot' && (
                      <div className="space-y-1">
                        <input
                          type="range" min="0" max="1023"
                          value={Number(c.state || 0)}
                          onChange={e => updateSandboxPotValue(c.id, Number(e.target.value))}
                          className="w-full h-1.5 rounded accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-muted-foreground/60">
                          <span>0</span>
                          <span>Valor: {c.state}</span>
                          <span>1023</span>
                        </div>
                      </div>
                    )}

                    {c.type === 'servo' && (
                      <div className="space-y-1">
                        <input
                          type="range" min="0" max="180"
                          value={Number(c.state || 90)}
                          onChange={e => updateSandboxServoAngle(c.id, Number(e.target.value))}
                          className="w-full h-1.5 rounded accent-indigo-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[8px] font-mono text-muted-foreground/60">
                          <span>0°</span>
                          <span>Ángulo: {c.state}°</span>
                          <span>180°</span>
                        </div>
                      </div>
                    )}

                    {(c.type === 'led' || c.type === 'buzzer') && (
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-[9px] text-muted-foreground">Estado Manual:</span>
                        <button
                          onClick={() => toggleSandboxDigitalComponent(c.id)}
                          className={`px-3 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                            c.state
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                              : 'bg-muted/30 border border-border/50 text-muted-foreground'
                          }`}
                        >
                          {c.state ? 'HIGH (5V)' : 'LOW (0V)'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Control Execution Buttons */}
          <div className="flex gap-2">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono font-bold hover:bg-emerald-500/20 transition-all cursor-pointer shadow-lg shadow-emerald-500/5"
              >
                <Play size={15} />
                Ejecutar Sketch
              </button>
            ) : (
              <button
                onClick={handleStop}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-mono font-bold hover:bg-amber-500/20 transition-all cursor-pointer shadow-lg shadow-amber-500/5"
              >
                <Pause size={15} />
                Pausar Código
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

        {/* Component Picker / Code + Console (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Sandbox Component Placement Panel */}
          {activeProject === 'sandbox' && (
            <div className="rounded-xl border border-border/50 bg-card/25 p-5 glass-panel space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Plus size={14} className="text-purple-400" />
                AÑADIR PIEZAS AL TABLERO DE PRUEBAS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Componente</label>
                  <select
                    value={sandboxSelectType}
                    onChange={e => setSandboxSelectType(e.target.value as any)}
                    className="w-full bg-black/40 border border-border/60 text-xs text-white rounded-lg p-2 font-mono outline-none"
                  >
                    <option value="led">LED (Diodo Luminoso)</option>
                    <option value="buzzer">Zumbador (Buzzer)</option>
                    <option value="servo">Servomotor</option>
                    <option value="pot">Potenciómetro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Pin de Conexión</label>
                  <select
                    value={sandboxSelectPin}
                    onChange={e => setSandboxSelectPin(e.target.value)}
                    className="w-full bg-black/40 border border-border/60 text-xs text-white rounded-lg p-2 font-mono outline-none"
                  >
                    {sandboxSelectType === 'led' && (
                      <>
                        <option value="13">Pin 13 (~)</option>
                        <option value="12">Pin 12</option>
                        <option value="10">Pin 10 (~)</option>
                        <option value="7">Pin 7</option>
                        <option value="2">Pin 2</option>
                      </>
                    )}
                    {sandboxSelectType === 'buzzer' && (
                      <>
                        <option value="3">Pin 3 (~)</option>
                        <option value="6">Pin 6 (~)</option>
                        <option value="9">Pin 9 (~)</option>
                      </>
                    )}
                    {sandboxSelectType === 'servo' && (
                      <>
                        <option value="9">Pin 9 (~)</option>
                        <option value="10">Pin 10 (~)</option>
                      </>
                    )}
                    {sandboxSelectType === 'pot' && (
                      <>
                        <option value="A0">Puerto A0</option>
                        <option value="A1">Puerto A1</option>
                        <option value="A2">Puerto A2</option>
                      </>
                    )}
                  </select>
                </div>

                {sandboxSelectType === 'led' ? (
                  <div>
                    <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Color del LED</label>
                    <select
                      value={sandboxSelectColor}
                      onChange={e => setSandboxSelectColor(e.target.value as any)}
                      className="w-full bg-black/40 border border-border/60 text-xs text-white rounded-lg p-2 font-mono outline-none"
                    >
                      <option value="red">Rojo</option>
                      <option value="yellow">Amarillo</option>
                      <option value="green">Verde</option>
                      <option value="blue">Azul</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex items-end">
                    <button
                      onClick={addSandboxComponent}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all font-mono"
                    >
                      Conectar Cable ✓
                    </button>
                  </div>
                )}
              </div>

              {sandboxSelectType === 'led' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={addSandboxComponent}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all font-mono"
                  >
                    Conectar Cable ✓
                  </button>
                </div>
              )}
            </div>
          )}

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
            <div className="overflow-y-auto max-h-[280px] bg-black/70 font-mono text-[11px]">
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
            {/* Scrollable console using local ref only */}
            <div ref={logsContainerRef} className="bg-black/80 p-3 h-36 overflow-y-auto font-mono text-[10px] space-y-0.5">
              {logs.map((log, i) => (
                <div key={i} className={`${log.startsWith('[Sistema]') ? 'text-muted-foreground/50' : log.includes('[Error]') ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div className={`rounded-xl border ${activeProjectData.borderColor} ${activeProjectData.badgeBg} p-4 flex items-start gap-3`}>
            <Info size={16} className={`${activeProjectData.color} flex-shrink-0 mt-0.5`} />
            <div className="text-xs">
              <p className={`font-semibold ${activeProjectData.color} mb-1`}>{activeProjectData.name}</p>
              <p className="text-muted-foreground leading-relaxed">{activeProjectData.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
