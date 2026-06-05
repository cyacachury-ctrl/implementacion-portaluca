'use client';

import { useState } from 'react';
import { AlertCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import { SearchForm } from '@/components/search-form';
import { StudentResult } from '@/components/student-result';
import { NotFoundResult } from '@/components/not-found-result';
import { Button } from '@/components/ui/button';
import type { Student } from '@/lib/sample-data';

type ViewState =
  | { type: 'search' }
  | { type: 'found'; student: Student }
  | { type: 'not-found'; query: string }
  | { type: 'error' };

type SearchResponse = Partial<{
  found: boolean;
  student: Student;
  error: string;
}>;

const TECHNICAL_ERROR_MESSAGE =
  'No pudimos consultar el estado en este momento. Intentá nuevamente más tarde.';

export default function PortalIngresante() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'search' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/enrollment/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        setViewState({ type: 'error' });
        return;
      }

      const result = (await response.json()) as SearchResponse;

      if (result.found === true && result.student) {
        setViewState({ type: 'found', student: result.student });
        return;
      }

      if (result.found === false) {
        setViewState({ type: 'not-found', query });
        return;
      }

      setViewState({ type: 'error' });
    } catch {
      setViewState({ type: 'error' });
    } finally {
      setIsLoading(false);
    }
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

        {viewState.type === 'error' && (
          <div className="space-y-5">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver a buscar
            </Button>

            <div className="rounded-xl bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                No pudimos realizar la consulta
              </h2>
              <p className="text-sm text-muted-foreground">
                {TECHNICAL_ERROR_MESSAGE}
              </p>
            </div>
          </div>
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
