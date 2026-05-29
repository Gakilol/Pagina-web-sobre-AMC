'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  ChevronRight, 
  RotateCcw, 
  Terminal as TerminalIcon, 
  Cpu, 
  HelpCircle, 
  FolderOpen, 
  Code2, 
  Settings2,
  AlertCircle,
  FileCode
} from 'lucide-react'
import type { EMU8086Tutorial } from '@/lib/types'

interface EMU8086SimulatorProps {
  tutorials: EMU8086Tutorial[]
}

// Interactive Code Presets for UNI Nicaragua students
const PRESETS = [
  {
    name: 'Hola Mundo (INT 21h)',
    code: `; Programa: Hola Mundo en 8086
.model small
.data
    msg db "Hola, UNI Nicaragua!$"
.code
    mov ax, @data
    mov ds, ax      ; Iniciar Segmento de Datos
    mov dx, offset msg ; Cargar offset del mensaje
    mov ah, 09h     ; Servicio 9: Imprimir cadena
    int 21h         ; Llamada al sistema MS-DOS
    mov ah, 4ch     ; Servicio 4Ch: Salir del programa
    int 21h`
  },
  {
    name: 'Suma de dos Números',
    code: `; Suma de dos operandos
.model small
.data
    num1 db 05h
    num2 db 08h
    res db ?
.code
    mov al, num1    ; AL = 05h
    add al, num2    ; AL = AL + 08h (AL = 13d o 0Dh)
    mov res, al     ; Guardar en variable res
    
    ; Imprimir resultado en consola (ASCII)
    mov dl, al
    add dl, 30h     ; Convertir a caracter ASCII (si < 10)
    mov ah, 02h     ; Servicio 2: Imprimir caracter
    int 21h
    
    mov ah, 4ch
    int 21h`
  },
  {
    name: 'Bucle Contador (LOOP)',
    code: `; Bucle descendente con CX
.code
    mov cx, 05h     ; Establecer contador CX = 5
    mov al, 00h     ; Iniciar AL = 0
    
start:
    inc al          ; Incrementar AL
    
    ; Imprimir un asterisco '*' cada ciclo
    mov dl, 2Ah     ; 2Ah es '*' en ASCII
    mov ah, 02h     ; Imprimir caracter
    int 21h
    
    loop start      ; Decrementa CX, salta si CX != 0
    
    mov ah, 4ch
    int 21h`
  },
  {
    name: 'Multiplicación Básica',
    code: `; Multiplicar AL * BL
.code
    mov al, 04h     ; Cargar 4 en AL
    mov bl, 03h     ; Cargar 3 en BL
    mul bl          ; AX = AL * BL (AX = 12d o 0Ch)
    
    mov ah, 4ch
    int 21h`
  },
  {
    name: 'Comparación y Salto',
    code: `; Comparar dos valores y saltar
.model small
.data
    num1 db 0Ah
    num2 db 05h
.code
    mov ax, @data
    mov ds, ax
    mov al, num1    ; AL = 10d (0Ah)
    cmp al, num2    ; Comparar AL con num2 (5)
    je  iguales     ; Saltar si son iguales (ZF=1)
    mov al, 01h     ; AL=1 → num1 > num2
    jmp fin
iguales:
    mov al, 00h     ; AL=0 → iguales
fin:
    mov ah, 4ch
    int 21h`
  },
  {
    name: 'Operaciones con Pila (PUSH/POP)',
    code: `; Demostración de la Pila (Stack)
.code
    mov ax, 0A0Ah   ; Valor de prueba
    mov bx, 0B0Bh   ; Otro valor
    
    push ax         ; Guardar AX en la pila
    push bx         ; Guardar BX en la pila
    
    mov ax, 0000h   ; Limpiar AX
    mov bx, 0000h   ; Limpiar BX
    
    pop bx          ; Restaurar BX (LIFO: sale BX primero)
    pop ax          ; Restaurar AX
    
    ; Ahora AX=0A0Ah y BX=0B0Bh nuevamente
    mov ah, 4ch
    int 21h`
  },
  {
    name: 'División y Módulo',
    code: `; División: AX / BL
.code
    mov ax, 0011h   ; AX = 17 decimal
    mov bl, 05h     ; BL = 5 divisor
    div bl          ; AL = cociente (3), AH = residuo (2)
    
    ; Mostrar cociente
    mov dl, al      ; Cociente en DL
    add dl, 30h     ; A ASCII
    mov ah, 02h
    int 21h
    
    ; Mostrar residuo
    mov dl, ah      ; Residuo
    add dl, 30h
    mov ah, 02h
    int 21h
    
    mov ah, 4ch
    int 21h`
  }
]

// 16-bit Register state interface
interface Registers {
  AX: number
  BX: number
  CX: number
  DX: number
  SI: number
  DI: number
  BP: number
  SP: number
  IP: number
  CS: number
  DS: number
  SS: number
}

// CPU Flag register interface
interface Flags {
  ZF: number
  CF: number
  SF: number
}

// Compiled Assembly Instruction representational shape
interface ParsedInstruction {
  raw: string
  lineNum: number
  mnemonic: string
  operands: string[]
  label?: string
}

export function EMU8086Simulator({ tutorials }: EMU8086SimulatorProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<EMU8086Tutorial | null>(tutorials[0] || null)
  
  // Simulator State variables
  const [code, setCode] = useState(PRESETS[0].code)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'EMU8086 Emulador de CPU v1.0',
    'Listo para cargar código...'
  ])
  const [registers, setRegisters] = useState<Registers>({
    AX: 0, BX: 0, CX: 0, DX: 0,
    SI: 0, DI: 0, BP: 0, SP: 0x0100,
    IP: 0, CS: 0x1000, DS: 0x2000, SS: 0x3000
  })
  const [flags, setFlags] = useState<Flags>({ ZF: 0, CF: 0, SF: 0 })
  
  // Execution Control variables
  const [compiledInstructions, setCompiledInstructions] = useState<ParsedInstruction[]>([])
  const [symbolTable, setSymbolTable] = useState<{ [label: string]: number }>({})
  const [variableTable, setVariableTable] = useState<{ [varName: string]: { value: number, isWord: boolean } }>({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null)
  const [isCompiled, setIsCompiled] = useState(false)
  const [executionHalted, setExecutionHalted] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load a preset program
  const handleLoadPreset = (idx: number) => {
    setCode(PRESETS[idx].code)
    handleReset()
    setConsoleLogs([
      `Cargado programa preset: ${PRESETS[idx].name}`,
      'Presione "Compilar / Cargar" para preparar la ejecución.'
    ])
  }

  // Parse and compile assembly code
  const handleCompile = () => {
    try {
      const lines = code.split('\n')
      const parsedInstructions: ParsedInstruction[] = []
      const symbols: { [label: string]: number } = {}
      const variables: { [varName: string]: { value: number, isWord: boolean } } = {}

      let currentSection = 'code'
      let instructionIdx = 0

      // First pass: Parse variables in .data and Labels in .code
      lines.forEach((line, idx) => {
        let cleanLine = line.split(';')[0].trim() // Strip comments
        if (!cleanLine) return

        const cleanLower = cleanLine.toLowerCase()

        if (cleanLower.startsWith('.data')) {
          currentSection = 'data'
          return
        }
        if (cleanLower.startsWith('.code') || cleanLower.startsWith('.model') || cleanLower.startsWith('.stack')) {
          currentSection = 'code'
          return
        }

        if (currentSection === 'data') {
          // Parse declarations like: msg db "Hello$" or num1 db 05h or res dw ?
          const parts = cleanLine.split(/\s+/)
          if (parts.length >= 3) {
            const varName = parts[0]
            const type = parts[1].toLowerCase() // db or dw
            let valStr = parts.slice(2).join(' ')
            
            let val = 0
            const isWord = type === 'dw'

            if (valStr.startsWith('"') && valStr.endsWith('"')) {
              // String constant
              // Simple emulation stores first char ASCII or placeholder
              val = valStr.charCodeAt(1)
            } else if (valStr.endsWith('h')) {
              val = parseInt(valStr.slice(0, -1), 16)
            } else if (valStr === '?') {
              val = 0
            } else {
              val = parseInt(valStr, 10) || 0
            }

            variables[varName] = { value: val, isWord }
          }
        }

        if (currentSection === 'code') {
          // Check for label like "start:"
          let label: string | undefined = undefined
          if (cleanLine.includes(':')) {
            const labelParts = cleanLine.split(':')
            label = labelParts[0].trim()
            symbols[label] = instructionIdx
            cleanLine = labelParts.slice(1).join(':').trim()
          }

          if (cleanLine) {
            const parts = cleanLine.match(/(".*?"|[^,\s]+)/g) || []
            if (parts.length > 0) {
              const mnemonic = parts[0]?.toUpperCase() || ''
              const operands = parts.slice(1).map(op => op.trim().replace(/^,|,$/g, ''))
              
              parsedInstructions.push({
                raw: line,
                lineNum: idx + 1,
                mnemonic,
                operands,
                label
              })
              instructionIdx++
            }
          }
        }
      })

      setCompiledInstructions(parsedInstructions)
      setSymbolTable(symbols)
      setVariableTable(variables)
      setIsCompiled(true)
      setExecutionHalted(false)
      setCurrentLineIndex(parsedInstructions.length > 0 ? 0 : null)
      
      // Reset registers to execution-start default values
      setRegisters({
        AX: 0, BX: 0, CX: 0, DX: 0,
        SI: 0, DI: 0, BP: 0, SP: 0x0100,
        IP: parsedInstructions.length > 0 ? parsedInstructions[0].lineNum : 0,
        CS: 0x1000, DS: 0x2000, SS: 0x3000
      })
      setFlags({ ZF: 0, CF: 0, SF: 0 })
      
      setConsoleLogs([
        'Compilación exitosa.',
        `Se cargaron ${parsedInstructions.length} instrucciones de código.`,
        'Use "Paso a Paso (Step)" o "Simular Ejecución (Run)" para iniciar.'
      ])
    } catch (err: any) {
      setConsoleLogs([
        'ERROR DE COMPILACIÓN:',
        err.message || 'Verifique la sintaxis de las directivas y operandos.'
      ])
    }
  }

  // Helper: Read register or immediate value
  const resolveValue = (operand: string, is8Bit = false): number => {
    const opLower = operand.toLowerCase()
    
    // 1. Is it a register?
    if (opLower === 'ax') return registers.AX
    if (opLower === 'bx') return registers.BX
    if (opLower === 'cx') return registers.CX
    if (opLower === 'dx') return registers.DX
    if (opLower === 'ah') return (registers.AX >> 8) & 0xFF
    if (opLower === 'al') return registers.AX & 0xFF
    if (opLower === 'bh') return (registers.BX >> 8) & 0xFF
    if (opLower === 'bl') return registers.BX & 0xFF
    if (opLower === 'ch') return (registers.CX >> 8) & 0xFF
    if (opLower === 'cl') return registers.CX & 0xFF
    if (opLower === 'dh') return (registers.DX >> 8) & 0xFF
    if (opLower === 'dl') return registers.DX & 0xFF
    if (opLower === 'sp') return registers.SP
    if (opLower === 'bp') return registers.BP
    if (opLower === 'si') return registers.SI
    if (opLower === 'di') return registers.DI
    
    // 2. Is it a declared variable?
    if (variableTable[operand] !== undefined) {
      return variableTable[operand].value
    }

    // 3. Is it a string literal?
    if (operand.startsWith('"') && operand.endsWith('"')) {
      return operand.charCodeAt(1)
    }

    // 4. Hexadecimal constant like "05h" or "12"
    if (opLower.endsWith('h')) {
      return parseInt(operand.slice(0, -1), 16) || 0
    }
    
    return parseInt(operand, 10) || 0
  }

  // Helper: Write value to register or variable
  const writeValue = (target: string, value: number) => {
    const targetLower = target.toLowerCase()
    
    // Limit to 16-bit or 8-bit masks
    const val16 = value & 0xFFFF
    const val8 = value & 0xFF

    setRegisters(prev => {
      const regs = { ...prev }
      if (targetLower === 'ax') regs.AX = val16
      else if (targetLower === 'bx') regs.BX = val16
      else if (targetLower === 'cx') regs.CX = val16
      else if (targetLower === 'dx') regs.DX = val16
      else if (targetLower === 'ah') regs.AX = (regs.AX & 0x00FF) | (val8 << 8)
      else if (targetLower === 'al') regs.AX = (regs.AX & 0xFF00) | val8
      else if (targetLower === 'bh') regs.BX = (regs.BX & 0x00FF) | (val8 << 8)
      else if (targetLower === 'bl') regs.BX = (regs.BX & 0xFF00) | val8
      else if (targetLower === 'ch') regs.CX = (regs.CX & 0x00FF) | (val8 << 8)
      else if (targetLower === 'cl') regs.CX = (regs.CX & 0xFF00) | val8
      else if (targetLower === 'dh') regs.DX = (regs.DX & 0x00FF) | (val8 << 8)
      else if (targetLower === 'dl') regs.DX = (regs.DX & 0xFF00) | val8
      else if (targetLower === 'sp') regs.SP = val16
      else if (targetLower === 'bp') regs.BP = val16
      else if (targetLower === 'si') regs.SI = val16
      else if (targetLower === 'di') regs.DI = val16
      
      return regs
    })

    // Variable updates
    if (variableTable[target] !== undefined) {
      setVariableTable(prev => ({
        ...prev,
        [target]: { ...prev[target], value: prev[target].isWord ? val16 : val8 }
      }))
    }
  }

  // Step Single Instruction
  const handleStep = (): boolean => {
    if (!isCompiled || compiledInstructions.length === 0 || currentLineIndex === null) {
      return false
    }

    if (executionHalted) {
      return false
    }

    const inst = compiledInstructions[currentLineIndex]
    let nextIdx = currentLineIndex + 1
    let jumpTaken = false

    const mnemonic = inst.mnemonic
    const operands = inst.operands

    try {
      switch (mnemonic) {
        case 'MOV': {
          if (operands.length === 2) {
            const dest = operands[0]
            // Emulate mov ds, ax ignore segment fault
            if (dest.toLowerCase() === 'ds' || dest.toLowerCase() === 'es') {
              // Just visual log
            } else {
              const srcVal = resolveValue(operands[1])
              writeValue(dest, srcVal)
            }
          }
          break
        }
        case 'ADD': {
          if (operands.length === 2) {
            const dest = operands[0]
            const val1 = resolveValue(dest)
            const val2 = resolveValue(operands[1])
            const sum = val1 + val2
            
            writeValue(dest, sum)
            
            // Flags update
            const result = sum & 0xFFFF
            setFlags({
              ZF: result === 0 ? 1 : 0,
              SF: (result & 0x8000) ? 1 : 0,
              CF: sum > 0xFFFF ? 1 : 0
            })
          }
          break
        }
        case 'SUB': {
          if (operands.length === 2) {
            const dest = operands[0]
            const val1 = resolveValue(dest)
            const val2 = resolveValue(operands[1])
            const diff = val1 - val2
            
            writeValue(dest, diff)
            
            // Flags update
            const result = diff & 0xFFFF
            setFlags({
              ZF: result === 0 ? 1 : 0,
              SF: (result & 0x8000) ? 1 : 0,
              CF: val1 < val2 ? 1 : 0
            })
          }
          break
        }
        case 'MUL': {
          if (operands.length === 1) {
            const factor = resolveValue(operands[0])
            // Standard emulation multiplies AL * factor -> stores in AX
            const al = registers.AX & 0xFF
            const product = al * factor
            writeValue('ax', product)
            
            setFlags(prev => ({
              ...prev,
              ZF: (product & 0xFFFF) === 0 ? 1 : 0,
              CF: product > 0xFF ? 1 : 0
            }))
          }
          break
        }
        case 'INC': {
          if (operands.length === 1) {
            const dest = operands[0]
            const val = resolveValue(dest)
            const res = val + 1
            writeValue(dest, res)
            
            setFlags(prev => ({
              ...prev,
              ZF: (res & 0xFFFF) === 0 ? 1 : 0
            }))
          }
          break
        }
        case 'DEC': {
          if (operands.length === 1) {
            const dest = operands[0]
            const val = resolveValue(dest)
            const res = val - 1
            writeValue(dest, res)
            
            setFlags(prev => ({
              ...prev,
              ZF: (res & 0xFFFF) === 0 ? 1 : 0
            }))
          }
          break
        }
        case 'CMP': {
          if (operands.length === 2) {
            const val1 = resolveValue(operands[0])
            const val2 = resolveValue(operands[1])
            const diff = val1 - val2
            const result = diff & 0xFFFF
            
            setFlags({
              ZF: result === 0 ? 1 : 0,
              SF: (result & 0x8000) ? 1 : 0,
              CF: val1 < val2 ? 1 : 0
            })
          }
          break
        }
        case 'JMP': {
          if (operands.length === 1) {
            const label = operands[0]
            if (symbolTable[label] !== undefined) {
              nextIdx = symbolTable[label]
              jumpTaken = true
            } else {
              throw new Error(`Etiqueta "${label}" no definida`)
            }
          }
          break
        }
        case 'JE':
        case 'JZ': {
          if (operands.length === 1) {
            const label = operands[0]
            if (flags.ZF === 1) {
              if (symbolTable[label] !== undefined) {
                nextIdx = symbolTable[label]
                jumpTaken = true
              } else {
                throw new Error(`Etiqueta "${label}" no definida`)
              }
            }
          }
          break
        }
        case 'JNE':
        case 'JNZ': {
          if (operands.length === 1) {
            const label = operands[0]
            if (flags.ZF === 0) {
              if (symbolTable[label] !== undefined) {
                nextIdx = symbolTable[label]
                jumpTaken = true
              } else {
                throw new Error(`Etiqueta "${label}" no definida`)
              }
            }
          }
          break
        }
        case 'LOOP': {
          if (operands.length === 1) {
            const label = operands[0]
            const currentCx = (registers.CX - 1) & 0xFFFF
            
            // Write CX decremented
            setRegisters(prev => ({
              ...prev,
              CX: currentCx
            }))

            if (currentCx !== 0) {
              if (symbolTable[label] !== undefined) {
                nextIdx = symbolTable[label]
                jumpTaken = true
              } else {
                throw new Error(`Etiqueta "${label}" no definida`)
              }
            }
          }
          break
        }
        case 'INT': {
          if (operands[0] === '21H' || operands[0] === '21h') {
            const ah = (registers.AX >> 8) & 0xFF
            
            if (ah === 0x09) {
              // Write message to terminal
              // Simulate extract text
              // Search for msg or offset
              let msg = 'Hola, UNI Nicaragua!'
              if (code.includes('msg db "')) {
                const match = code.match(/msg db "(.*?)\$"/)
                if (match) msg = match[1]
              }
              setConsoleLogs(prev => [...prev, `[Consola]: ${msg}`])
            } 
            else if (ah === 0x02) {
              // Print single ASCII char from DL
              const dlChar = String.fromCharCode(registers.DX & 0xFF)
              setConsoleLogs(prev => {
                const logs = [...prev]
                const last = logs[logs.length - 1]
                if (last.startsWith('[Consola]:')) {
                  logs[logs.length - 1] = last + dlChar
                } else {
                  logs.push(`[Consola]: ${dlChar}`)
                }
                return logs
              })
            }
            else if (ah === 0x4C || ah === 0x4c) {
              setConsoleLogs(prev => [...prev, '>>> HALT: INT 21h AH=4Ch (Terminar programa)'])
              setExecutionHalted(true)
              setIsRunning(false)
              return false
            }
          }
          break
        }
        default:
          // Skip unrecognized instruction gracefully
          break
      }

      // Update IP visually
      if (nextIdx < compiledInstructions.length) {
        const nextInst = compiledInstructions[nextIdx]
        setRegisters(prev => ({ ...prev, IP: nextInst.lineNum }))
        setCurrentLineIndex(nextIdx)
        return true
      } else {
        setConsoleLogs(prev => [...prev, '>>> Programa llegó al final de la ejecución (Faltan int 21h).'])
        setExecutionHalted(true)
        setIsRunning(false)
        return false
      }
    } catch (err: any) {
      setConsoleLogs(prev => [...prev, `ERROR OPERATIVO: ${err.message}`])
      setExecutionHalted(true)
      setIsRunning(false)
      return false
    }
  }

  // Automatic simulation runner loop
  const handleRun = () => {
    if (!isCompiled) {
      handleCompile()
    }
    setIsRunning(true)
  }

  // Trigger automated stepping if isRunning changes
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        const ok = handleStep()
        if (!ok) {
          setIsRunning(false)
        }
      }, 500) // 500ms delay per line
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, currentLineIndex, isCompiled, registers, flags])

  // Reset simulator
  const handleReset = () => {
    setIsRunning(false)
    setIsCompiled(false)
    setExecutionHalted(false)
    setCurrentLineIndex(null)
    setCompiledInstructions([])
    setSymbolTable({})
    setVariableTable({})
    setRegisters({
      AX: 0, BX: 0, CX: 0, DX: 0,
      SI: 0, DI: 0, BP: 0, SP: 0x0100,
      IP: 0, CS: 0x1000, DS: 0x2000, SS: 0x3000
    })
    setFlags({ ZF: 0, CF: 0, SF: 0 })
    setConsoleLogs([
      'EMU8086 Emulador de CPU v1.0',
      'Registros y variables reestablecidos a cero.'
    ])
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* Left Sidebar - Tutorial Lessons (Col 4) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="rounded-xl border border-border/60 bg-card/25 p-5 glass-panel">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 pl-0.5">
            Módulos del Tutorial
          </h3>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {tutorials.map((tutorial) => {
              const isSelected = selectedTutorial?.id === tutorial.id
              return (
                <button
                  key={tutorial.id}
                  onClick={() => setSelectedTutorial(tutorial)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border/60 hover:border-primary/20 bg-background/20 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileCode size={16} className="mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold leading-snug line-clamp-1">{tutorial.title}</div>
                    <div className="text-[9px] font-mono opacity-70 mt-0.5">Paso 0{tutorial.order_number}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tutorial Content Display Card */}
        {selectedTutorial && (
          <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel space-y-4">
            <div className="border-b border-border/40 pb-3">
              <span className="text-[10px] font-mono text-primary uppercase tracking-wider">GUÍA PASO A PASO</span>
              <h4 className="text-base font-bold text-white mt-0.5">{selectedTutorial.title}</h4>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-[12]">
              {selectedTutorial.description}
            </p>
            
            <div className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto bg-background/30 p-4 border border-border/40 rounded-lg">
              {selectedTutorial.content}
            </div>
          </div>
        )}
      </div>

      {/* Right Content - Visual CPU Simulator Workspace (Col 8) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Core Control Dashboard Toolbar */}
        <div className="rounded-xl border border-border/60 bg-card/20 p-5 glass-panel flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Cpu size={18} className={isRunning ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Consola de Desarrollo 8086</h3>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">MODO SIMULADOR DE HARDWARE</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCompile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary hover:bg-primary/20 transition-all cursor-pointer"
            >
              <Settings2 size={13} />
              Compilar / Cargar
            </button>
            <button
              onClick={handleStep}
              disabled={!isCompiled || executionHalted || isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-400 hover:bg-blue-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={13} />
              Paso (Step)
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning || executionHalted}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Play size={13} />
              Simular (Run)
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>
        </div>

        {/* Workspace Code & Diagnostics Grid */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Code Editor and Console Logs (Col 7) */}
          <div className="md:col-span-7 space-y-6">
            {/* Assembly Source Code Area */}
            <div className="rounded-xl border border-border/60 bg-card/25 overflow-hidden glass-panel">
              <div className="bg-background/80 px-4 py-2.5 border-b border-border/40 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Code2 size={14} />
                  EDITOR_SANDER.ASM
                </span>
                
                {/* Presets Select Dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground/60 text-[10px]">PRESETS:</span>
                  <select
                    onChange={(e) => handleLoadPreset(parseInt(e.target.value))}
                    className="bg-card border border-border/80 px-2 py-0.5 rounded text-[10px] focus:outline-none focus:border-primary text-foreground font-sans font-medium"
                  >
                    {PRESETS.map((preset, i) => (
                      <option key={i} value={i}>{preset.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="w-full h-80 bg-black/60 p-4 font-mono text-xs text-zinc-100 border-0 focus:bg-black/80 focus:ring-1 focus:ring-primary/20 focus:outline-none resize-none leading-relaxed select-text"
                placeholder="Escribe tus mnemónicos aquí..."
              />
            </div>

            {/* MS-DOS Console Output Screen */}
            <div className="rounded-xl border border-border/60 bg-card/25 overflow-hidden glass-panel">
              <div className="bg-background/85 px-4 py-2 border-b border-border/40 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <TerminalIcon size={14} className="text-primary" />
                <span>TERMINAL_SALIDA (MS-DOS EMULATION)</span>
              </div>
              
              <div className="bg-black p-4 h-36 font-mono text-xs text-emerald-400 overflow-y-auto space-y-1 select-text scrollbar-thin">
                {consoleLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('ERROR') ? 'text-rose-500 font-semibold' : log.startsWith('>>>') ? 'text-primary font-semibold' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostics Panel - Registers & Flags (Col 5) */}
          <div className="md:col-span-5 space-y-6">
            {/* Registers Panel */}
            <div className="rounded-xl border border-border/60 bg-card/25 p-5 glass-panel space-y-4">
              <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pl-0.5 border-b border-border/40 pb-2">
                BANCO DE REGISTROS ix86
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {/* AX */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30 flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground/80 block">AX</span>
                    <span className="text-primary font-bold">0x{registers.AX.toString(16).toUpperCase().padStart(4, '0')}</span>
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground/50 border-l border-border/40 pl-2">
                    <div>AH: {((registers.AX >> 8) & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                    <div>AL: {(registers.AX & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                  </div>
                </div>

                {/* BX */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30 flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground/80 block">BX</span>
                    <span className="text-primary font-bold">0x{registers.BX.toString(16).toUpperCase().padStart(4, '0')}</span>
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground/50 border-l border-border/40 pl-2">
                    <div>BH: {((registers.BX >> 8) & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                    <div>BL: {(registers.BX & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                  </div>
                </div>

                {/* CX */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30 flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground/80 block">CX</span>
                    <span className="text-primary font-bold">0x{registers.CX.toString(16).toUpperCase().padStart(4, '0')}</span>
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground/50 border-l border-border/40 pl-2">
                    <div>CH: {((registers.CX >> 8) & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                    <div>CL: {(registers.CX & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                  </div>
                </div>

                {/* DX */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30 flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground/80 block">DX</span>
                    <span className="text-primary font-bold">0x{registers.DX.toString(16).toUpperCase().padStart(4, '0')}</span>
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground/50 border-l border-border/40 pl-2">
                    <div>DH: {((registers.DX >> 8) & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                    <div>DL: {(registers.DX & 0xFF).toString(16).toUpperCase().padStart(2, '0')}</div>
                  </div>
                </div>

                {/* SP & BP */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30">
                  <span className="text-muted-foreground/80 block text-[10px]">PILA SP</span>
                  <span className="text-white font-semibold">0x{registers.SP.toString(16).toUpperCase().padStart(4, '0')}</span>
                </div>
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30">
                  <span className="text-muted-foreground/80 block text-[10px]">BASE BP</span>
                  <span className="text-white font-semibold">0x{registers.BP.toString(16).toUpperCase().padStart(4, '0')}</span>
                </div>

                {/* SI & DI */}
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30">
                  <span className="text-muted-foreground/80 block text-[10px]">ORIGEN SI</span>
                  <span className="text-white font-semibold">0x{registers.SI.toString(16).toUpperCase().padStart(4, '0')}</span>
                </div>
                <div className="border border-border/50 rounded-lg p-2.5 bg-background/30">
                  <span className="text-muted-foreground/80 block text-[10px]">DESTINO DI</span>
                  <span className="text-white font-semibold">0x{registers.DI.toString(16).toUpperCase().padStart(4, '0')}</span>
                </div>

                {/* IP Instruction Pointer */}
                <div className="border border-primary/20 rounded-lg p-2.5 bg-primary/5 col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-primary block text-[10px] font-bold">PUNTERO DE INSTRUCCIÓN (IP)</span>
                    <span className="text-primary font-bold text-sm">Line {registers.IP || 0}</span>
                  </div>
                  {currentLineIndex !== null && compiledInstructions[currentLineIndex] && (
                    <div className="text-[10px] text-right font-mono text-muted-foreground italic truncate max-w-[150px]">
                      {compiledInstructions[currentLineIndex].mnemonic} {compiledInstructions[currentLineIndex].operands.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Flags Panel */}
            <div className="rounded-xl border border-border/60 bg-card/25 p-5 glass-panel space-y-4">
              <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pl-0.5 border-b border-border/40 pb-2">
                BANDERAS DE ESTADO (FLAGS)
              </h4>

              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                {/* ZF */}
                <div className={`border rounded-lg p-3 ${flags.ZF === 1 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-border/60 bg-background/20 text-muted-foreground'}`}>
                  <div className="text-[10px] font-bold">ZF (Zero)</div>
                  <div className="text-lg font-extrabold mt-1">{flags.ZF}</div>
                </div>

                {/* CF */}
                <div className={`border rounded-lg p-3 ${flags.CF === 1 ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/60 bg-background/20 text-muted-foreground'}`}>
                  <div className="text-[10px] font-bold">CF (Carry)</div>
                  <div className="text-lg font-extrabold mt-1">{flags.CF}</div>
                </div>

                {/* SF */}
                <div className={`border rounded-lg p-3 ${flags.SF === 1 ? 'border-amber-500/50 bg-amber-500/10 text-amber-400' : 'border-border/60 bg-background/20 text-muted-foreground'}`}>
                  <div className="text-[10px] font-bold">SF (Sign)</div>
                  <div className="text-lg font-extrabold mt-1">{flags.SF}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Grid/Segment Inspector block */}
        {Object.keys(variableTable).length > 0 && (
          <div className="rounded-xl border border-border/60 bg-card/25 p-6 glass-panel space-y-4">
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pl-0.5 border-b border-border/40 pb-2">
              INSPECTOR DEL SEGMENTO DE DATOS (DS)
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(variableTable).map(([name, item]) => (
                <div key={name} className="border border-border/50 rounded-lg p-3 bg-background/30 font-mono text-xs">
                  <div className="text-muted-foreground text-[10px] truncate">{name} ({item.isWord ? 'WORD' : 'BYTE'})</div>
                  <div className="text-white font-bold mt-1">
                    0x{item.value.toString(16).toUpperCase().padStart(item.isWord ? 4 : 2, '0')}
                    <span className="text-[10px] text-muted-foreground/60 ml-1.5">({item.value}d)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
