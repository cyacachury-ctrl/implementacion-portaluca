'use client';

import { Check, Clock, Circle } from 'lucide-react';
import type { EnrollmentStatus } from '@/lib/sample-data';

type StepStatus = 'completed' | 'in-progress' | 'pending';

interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

interface ProgressTrackerProps {
  enrollmentStatus: EnrollmentStatus;
}

function getStepsForStatus(status: EnrollmentStatus): Step[] {
  const steps: Step[] = [
    { id: 1, label: 'Inscripción completada', status: 'pending' },
    { id: 2, label: 'Documentación validada', status: 'pending' },
    { id: 3, label: 'Asignación de comisión en proceso', status: 'pending' },
    { id: 4, label: 'Inicio del curso', status: 'pending' },
  ];

  switch (status) {
    case 'inscripto':
      steps[0].status = 'completed';
      steps[1].status = 'in-progress';
      break;
    case 'validado':
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'in-progress';
      break;
    case 'en_proceso':
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'in-progress';
      break;
    case 'asignado':
      steps[0].status = 'completed';
      steps[1].status = 'completed';
      steps[2].status = 'completed';
      steps[3].status = 'in-progress';
      break;
  }

  return steps;
}

function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'completed') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white">
        <Check className="h-4 w-4" />
      </div>
    );
  }

  if (status === 'in-progress') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-white">
        <Clock className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pending text-white">
      <Circle className="h-4 w-4" />
    </div>
  );
}

function StepLine({ status }: { status: StepStatus }) {
  const colorClass =
    status === 'completed'
      ? 'bg-success'
      : status === 'in-progress'
        ? 'bg-warning'
        : 'bg-pending';

  return <div className={`absolute left-4 top-8 h-full w-0.5 -translate-x-1/2 ${colorClass}`} />;
}

export function ProgressTracker({ enrollmentStatus }: ProgressTrackerProps) {
  const steps = getStepsForStatus(enrollmentStatus);

  return (
    <div className="rounded-xl bg-card p-5 shadow-sm">
      <h3 className="mb-5 text-base font-semibold text-foreground">Estado de tu inscripción</h3>
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < steps.length - 1 && <StepLine status={steps[index + 1].status === 'pending' ? 'pending' : step.status} />}
            <StepIcon status={step.status} />
            <div className="flex-1 pt-1">
              <p
                className={`text-sm font-medium ${
                  step.status === 'completed'
                    ? 'text-success'
                    : step.status === 'in-progress'
                      ? 'text-warning'
                      : 'text-pending'
                }`}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {step.status === 'completed' && 'Completado'}
                {step.status === 'in-progress' && 'En progreso'}
                {step.status === 'pending' && 'Pendiente'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
