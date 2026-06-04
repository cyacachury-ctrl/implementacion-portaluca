'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { SearchForm } from '@/components/search-form';
import { StudentResult } from '@/components/student-result';
import { NotFoundResult } from '@/components/not-found-result';
import { findStudent, type Student } from '@/lib/sample-data';

type ViewState =
  | { type: 'search' }
  | { type: 'found'; student: Student }
  | { type: 'not-found'; query: string };

export default function PortalIngresante() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'search' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const student = findStudent(query);
    
    if (student) {
      setViewState({ type: 'found', student });
    } else {
      setViewState({ type: 'not-found', query });
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    setViewState({ type: 'search' });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">Portal del Ingresante</h1>
            <p className="text-xs text-muted-foreground">Curso de Ingreso 2025</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-md px-5 py-6">
        {viewState.type === 'search' && (
          <div className="space-y-6">
            {/* Title section */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground text-balance">
                Consultá tu estado de inscripción
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ingresá tu DNI o correo electrónico para ver el estado de tu inscripción al curso de ingreso.
              </p>
            </div>

            {/* Search form */}
            <div className="rounded-xl bg-card p-5 shadow-sm">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>

            {/* Demo info */}
            <div className="rounded-lg border border-border bg-card/50 p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Datos de prueba disponibles:
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="font-medium">DNI:</span> 42567890, 41234567, 43890123, 40678901</p>
                <p><span className="font-medium">Email:</span> maria.garcia@email.com</p>
              </div>
            </div>
          </div>
        )}

        {viewState.type === 'found' && (
          <StudentResult student={viewState.student} onBack={handleBack} />
        )}

        {viewState.type === 'not-found' && (
          <NotFoundResult query={viewState.query} onBack={handleBack} />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card">
        <div className="mx-auto max-w-md px-5 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            ¿Tenés dudas? Escribinos a{' '}
            <a
              href="mailto:ingresantes@universidad.edu.ar"
              className="font-medium text-primary underline"
            >
              ingresantes@universidad.edu.ar
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
