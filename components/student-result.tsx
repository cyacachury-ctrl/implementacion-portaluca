'use client';

import { ArrowLeft, Calendar, CheckCircle2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressTracker } from '@/components/progress-tracker';
import { FAQSection } from '@/components/faq-section';
import type { Student } from '@/lib/sample-data';
import { statusLabels, statusMessages } from '@/lib/sample-data';

interface StudentResultProps {
  student: Student;
  onBack: () => void;
}

function StatusBadge({ status }: { status: Student['status'] }) {
  const colorClasses = {
    inscripto: 'bg-success-light text-success',
    validado: 'bg-success-light text-success',
    en_proceso: 'bg-warning-light text-warning',
    asignado: 'bg-success-light text-success',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colorClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export function StudentResult({ student, onBack }: StudentResultProps) {
  const messages = statusMessages[student.status];

  return (
    <div className="space-y-5">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="h-auto p-0 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Nueva consulta
      </Button>

      {/* Student info card */}
      <div className="rounded-xl bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{student.name}</h2>
              <p className="text-sm text-muted-foreground">DNI: {student.dni}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <StatusBadge status={student.status} />
        </div>

        {student.commission && (
          <div className="mb-4 rounded-lg bg-success-light p-3">
            <p className="text-sm font-medium text-success">{student.commission}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Inicio del curso: {student.courseStartDate}</span>
        </div>
      </div>

      {/* Reassuring message */}
      <div className="rounded-xl bg-success-light p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="font-medium text-success">{messages.main}</p>
            <p className="mt-1 text-sm text-success/80">{messages.secondary}</p>
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressTracker enrollmentStatus={student.status} />

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}
