'use client';

import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotFoundResultProps {
  query: string;
  onBack: () => void;
}

export function NotFoundResult({ query, onBack }: NotFoundResultProps) {
  return (
    <div className="space-y-5">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="h-auto p-0 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Volver a buscar
      </Button>

      {/* Not found message */}
      <div className="rounded-xl bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          No encontramos tu inscripción
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          No pudimos encontrar ninguna inscripción con{' '}
          <span className="font-medium">{`"${query}"`}</span>
        </p>
        <div className="rounded-lg bg-muted p-4 text-left">
          <p className="mb-2 text-sm font-medium text-foreground">Verificá que:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• El DNI esté escrito sin puntos ni espacios</li>
            <li>• El email sea el que usaste al inscribirte</li>
            <li>• Hayas completado el proceso de inscripción</li>
          </ul>
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-xl bg-card p-5 shadow-sm">
        <h3 className="mb-2 text-base font-semibold text-foreground">¿Necesitás ayuda?</h3>
        <p className="text-sm text-muted-foreground">
          Si creés que hay un error, escribinos a{' '}
          <a
            href="mailto:ingresantes@universidad.edu.ar"
            className="font-medium text-primary underline"
          >
            ingresantes@universidad.edu.ar
          </a>
        </p>
      </div>
    </div>
  );
}
