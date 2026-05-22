import type { Guide } from '../types'

export const localGuides: Guide[] = [
  {
    id: 'guia-actividad-1',
    unit_id: 'unidad-1',
    title: 'Guía Oficial: Actividad 1 - Conceptos Fundamentales de Arquitectura',
    file_url: '/materiales/ACTIVIDAD 1.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-actividad-2',
    unit_id: 'unidad-2',
    title: 'Guía Oficial: Actividad 2 - Esquema del Microprocesador y Diagrama de Bloques',
    file_url: '/materiales/ACTIVIDAD 2.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-actividad-3',
    unit_id: 'unidad-3',
    title: 'Guía Oficial: Actividad 3 - Periféricos 8255/8259, Serial y Familia ix86',
    file_url: '/materiales/ACTIVIDAD 3.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-actividad-4',
    unit_id: 'unidad-4',
    title: 'Guía Oficial: Actividad 4 - Infografía y Ejercicios Básicos de Ensamblador',
    file_url: '/materiales/ACTIVIDAD 4.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-actividad-5',
    unit_id: 'unidad-5',
    title: 'Guía Oficial: Actividad 5 - Glosario de Ideas y Uso de Macros',
    file_url: '/materiales/ACTIVIDAD 5.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-practica-emu8086',
    unit_id: 'unidad-4', // Linked to assembly unit
    title: 'Práctica Completa de Máquinas 1: Uso del simulador EMU8086',
    file_url: '/materiales/Practica de maquinas 1.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-actividad-6',
    unit_id: 'unidad-6',
    title: 'Guía Oficial: Actividad 6 - Arquitectura de Microcontroladores y Arduino',
    file_url: '/materiales/ACTIVIDAD 6.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  },
  {
    id: 'guia-proyecto-final',
    unit_id: 'unidad-6',
    title: 'Guía Oficial: Proyecto Final - Diseño e Implementación AMC 1',
    file_url: '/materiales/Proyecto Final AMC 1.docx',
    file_type: 'docx',
    created_at: new Date().toISOString()
  }
]
