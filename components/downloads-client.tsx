'use client'

import { useState } from 'react'
import { Download, FileText, FileSpreadsheet, Archive, Search, ChevronRight, Sparkles } from 'lucide-react'
import type { Guide, Unit } from '@/lib/types'

interface DownloadsClientProps {
  initialGuides: Guide[]
  units: Unit[]
}

export function DownloadsClient({ initialGuides, units }: DownloadsClientProps) {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGuides = initialGuides.filter(guide => {
    // 1. Unit filter matching
    if (selectedUnitId && guide.unit_id !== selectedUnitId) return false
    
    // 2. Search query matching
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const titleMatches = guide.title.toLowerCase().includes(query)
      const typeMatches = guide.file_type?.toLowerCase().includes(query)
      return titleMatches || typeMatches
    }
    
    return true
  })

  const getUnitTitle = (unitId: string | null) => {
    if (!unitId) return 'Todos los materiales de la UNI'
    return units.find(u => u.id === unitId)?.title || 'Unidad Curricular'
  }

  return (
    <div className="grid gap-8 lg:grid-cols-4 items-start">
      {/* Left Sidebar - Unit Selection & Search Filter */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
        {/* Search Bar Widget */}
        <div className="rounded-xl border border-border/60 bg-card/20 p-4 glass-panel">
          <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 pl-0.5">
            Buscar Guías
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ej: Actividad 1, Emu8086..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background/50 border border-border/80 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
            />
          </div>
        </div>

        {/* Categories / Filter Selection */}
        <div className="rounded-xl border border-border/60 bg-card/25 p-5 glass-panel">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 pl-0.5">
            Filtrar por Unidad
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedUnitId(null)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                selectedUnitId === null
                  ? 'border-primary bg-primary/5 text-primary font-bold'
                  : 'border-border/60 hover:border-primary/20 bg-background/20 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="text-xs font-semibold">Todos los Materiales</div>
              <div className="text-[10px] opacity-70 font-mono mt-0.5">{initialGuides.length} recursos disponibles</div>
            </button>

            {units.map((unit) => {
              const unitGuideCount = initialGuides.filter(g => g.unit_id === unit.id).length
              const isSelected = selectedUnitId === unit.id
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary font-bold'
                      : 'border-border/60 hover:border-primary/20 bg-background/20 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="text-xs font-semibold line-clamp-1">U{unit.order_number}: {unit.title.split(':')[0]}</div>
                  <div className="text-[10px] opacity-70 font-mono mt-0.5">{unitGuideCount} recurso{unitGuideCount !== 1 ? 's' : ''}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Content Panel - Search Results */}
      <div className="lg:col-span-3 space-y-6">
        {/* Dynamic header display */}
        <div className="border-b border-border/40 pb-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {getUnitTitle(selectedUnitId)}
            </h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 uppercase tracking-wide">
              {filteredGuides.length} archivos de estudio localizados
            </p>
          </div>
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-primary hover:underline font-mono"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>

        {/* Dynamic Guides List */}
        {filteredGuides.length > 0 ? (
          <div className="space-y-4">
            {filteredGuides.map((guide) => {
              const matchingUnit = units.find(u => u.id === guide.unit_id)
              return (
                <a
                  key={guide.id}
                  href={guide.file_url}
                  download
                  className="group block rounded-xl border border-border/60 bg-card/25 p-5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(9,137,255,0.06)] transition-all glass-panel"
                >
                  <div className="flex items-center gap-4">
                    {/* Visual File Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary/20 transition-all">
                        {guide.file_type === 'docx' ? (
                          <FileSpreadsheet size={24} />
                        ) : guide.file_type === 'pdf' ? (
                          <FileText size={24} />
                        ) : (
                          <Archive size={24} />
                        )}
                      </div>
                    </div>

                    {/* File Text Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                        {guide.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-muted-foreground font-mono mt-1">
                        {matchingUnit && (
                          <>
                            <span className="text-primary-foreground/70 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full text-[9px] font-sans">
                              Unidad 0{matchingUnit.order_number}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span className="uppercase text-muted-foreground/80">{guide.file_type || 'archivo'}</span>
                        <span>•</span>
                        <span>SERVIDO LOCALMENTE</span>
                      </div>
                    </div>

                    {/* Download interactive button */}
                    <div className="flex-shrink-0 pl-2">
                      <div className="w-10 h-10 rounded-lg bg-background border border-border/60 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 flex items-center justify-center group-hover:scale-105 transition-all">
                        <Download size={18} />
                      </div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-card/10 py-16 text-center glass-panel">
            <Archive className="mx-auto text-muted-foreground mb-4 opacity-40" size={48} />
            <h3 className="text-lg font-bold text-white mb-1">Sin archivos localizados</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              No hemos encontrado guías prácticas que coincidan con la unidad seleccionada o tus términos de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
