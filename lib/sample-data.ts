export type EnrollmentStatus = 'inscripto' | 'validado' | 'en_proceso' | 'asignado';

export interface Student {
  id: string;
  name: string;
  dni: string;
  email: string;
  status: EnrollmentStatus;
  courseStartDate: string;
  enrollmentDate: string;
  commission?: string;
}

export const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'María García López',
    dni: '42567890',
    email: 'maria.garcia@email.com',
    status: 'inscripto',
    courseStartDate: '3 de marzo de 2025',
    enrollmentDate: '15 de enero de 2025',
  },
  {
    id: '2',
    name: 'Juan Martínez Pérez',
    dni: '41234567',
    email: 'juan.martinez@email.com',
    status: 'validado',
    courseStartDate: '3 de marzo de 2025',
    enrollmentDate: '10 de enero de 2025',
  },
  {
    id: '3',
    name: 'Lucía Fernández Rodríguez',
    dni: '43890123',
    email: 'lucia.fernandez@email.com',
    status: 'en_proceso',
    courseStartDate: '3 de marzo de 2025',
    enrollmentDate: '8 de enero de 2025',
  },
  {
    id: '4',
    name: 'Carlos Sánchez Gómez',
    dni: '40678901',
    email: 'carlos.sanchez@email.com',
    status: 'asignado',
    courseStartDate: '3 de marzo de 2025',
    enrollmentDate: '5 de enero de 2025',
    commission: 'Comisión A - Turno Mañana',
  },
];

export const statusLabels: Record<EnrollmentStatus, string> = {
  inscripto: 'Inscripto',
  validado: 'Validado',
  en_proceso: 'En proceso',
  asignado: 'Asignado',
};

export const statusMessages: Record<EnrollmentStatus, { main: string; secondary: string }> = {
  inscripto: {
    main: 'Tu inscripción fue realizada correctamente. No necesitás hacer nada por ahora.',
    secondary: 'Estamos procesando tu documentación. Te notificaremos cuando haya novedades.',
  },
  validado: {
    main: 'Tu documentación fue validada exitosamente.',
    secondary: 'Ahora estamos procesando la asignación de tu comisión. Pronto tendrás novedades.',
  },
  en_proceso: {
    main: 'Tu asignación de comisión está en proceso.',
    secondary: 'Estamos trabajando para asignarte la mejor opción. Te avisaremos pronto.',
  },
  asignado: {
    main: '¡Felicitaciones! Ya tenés tu comisión asignada.',
    secondary: 'Recordá presentarte el primer día de clases con tu DNI.',
  },
};

export function findStudent(query: string): Student | undefined {
  const normalizedQuery = query.toLowerCase().trim();
  return sampleStudents.find(
    (student) =>
      student.dni === normalizedQuery ||
      student.email.toLowerCase() === normalizedQuery
  );
}
