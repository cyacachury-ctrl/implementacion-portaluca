import { NextResponse } from 'next/server';
import type { EnrollmentStatus, Student } from '@/lib/sample-data';

const VALID_STATUSES = new Set<EnrollmentStatus>([
  'inscripto',
  'validado',
  'en_proceso',
  'asignado',
]);

interface SearchRequestBody {
  query?: unknown;
}

type PowerAutomateStudent = Partial<Record<keyof Student, unknown>> & {
  nombre?: unknown;
  nombreCompleto?: unknown;
  fullName?: unknown;
  documento?: unknown;
  correo?: unknown;
  mail?: unknown;
  estado?: unknown;
  fechaInicioCurso?: unknown;
  fechaInscripcion?: unknown;
  comision?: unknown;
};

interface PowerAutomateResponse {
  found?: unknown;
  student?: unknown;
  data?: unknown;
  result?: unknown;
  error?: unknown;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function asString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue || undefined;
}

function normalizeStatus(value: unknown): EnrollmentStatus | undefined {
  const status = asString(value);

  if (!status || !VALID_STATUSES.has(status as EnrollmentStatus)) {
    return undefined;
  }

  return status as EnrollmentStatus;
}

function normalizeStudent(value: unknown): Student | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const rawStudent = value as PowerAutomateStudent;
  const id =
    asString(rawStudent.id) ??
    asString(rawStudent.dni) ??
    asString(rawStudent.documento);
  const name =
    asString(rawStudent.name) ??
    asString(rawStudent.nombre) ??
    asString(rawStudent.nombreCompleto) ??
    asString(rawStudent.fullName);
  const dni = asString(rawStudent.dni) ?? asString(rawStudent.documento);
  const email =
    asString(rawStudent.email) ??
    asString(rawStudent.correo) ??
    asString(rawStudent.mail);
  const status = normalizeStatus(rawStudent.status ?? rawStudent.estado);
  const courseStartDate =
    asString(rawStudent.courseStartDate) ??
    asString(rawStudent.fechaInicioCurso);
  const enrollmentDate =
    asString(rawStudent.enrollmentDate) ??
    asString(rawStudent.fechaInscripcion);

  if (
    !id ||
    !name ||
    !dni ||
    !email ||
    !status ||
    !courseStartDate ||
    !enrollmentDate
  ) {
    return undefined;
  }

  return {
    id,
    name,
    dni,
    email,
    status,
    courseStartDate,
    enrollmentDate,
    commission: asString(rawStudent.commission) ?? asString(rawStudent.comision),
  };
}

function extractStudent(responseBody: unknown): Student | undefined {
  if (!responseBody || typeof responseBody !== 'object') {
    return undefined;
  }

  if (Array.isArray(responseBody)) {
    return normalizeStudent(responseBody[0]);
  }

  const response = responseBody as PowerAutomateResponse;
  return (
    normalizeStudent(response.student) ??
    normalizeStudent(response.data) ??
    normalizeStudent(response.result) ??
    normalizeStudent(responseBody)
  );
}

export async function POST(request: Request) {
  let body: SearchRequestBody;

  try {
    body = await request.json();
  } catch {
    return jsonError('El cuerpo de la solicitud debe ser JSON válido.', 400);
  }

  const query = asString(body.query);

  if (!query) {
    return jsonError('El DNI o correo electrónico es obligatorio.', 400);
  }

  const powerAutomateUrl = process.env.POWER_AUTOMATE_URL;
  const portalApiKey = process.env.PORTAL_API_KEY;

  if (!powerAutomateUrl || !portalApiKey) {
    return jsonError('La integración de búsqueda no está configurada.', 500);
  }

  let powerAutomateResponse: Response;

  try {
    powerAutomateResponse = await fetch(powerAutomateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': portalApiKey,
      },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return jsonError('No se pudo conectar con el servicio de búsqueda.', 502);
  }

  if (!powerAutomateResponse.ok) {
    return jsonError('El servicio de búsqueda respondió con un error.', 502);
  }

  let responseBody: unknown;

  try {
    responseBody = await powerAutomateResponse.json();
  } catch {
    return jsonError('El servicio de búsqueda devolvió una respuesta inválida.', 502);
  }

  const response =
    responseBody && typeof responseBody === 'object' && !Array.isArray(responseBody)
      ? (responseBody as PowerAutomateResponse)
      : undefined;

  if (response?.error) {
    return jsonError('El servicio de búsqueda informó un error.', 502);
  }

  const student = extractStudent(responseBody);

  if (!student) {
    if (response?.found === true) {
      return jsonError('El servicio de búsqueda devolvió datos incompletos.', 502);
    }

    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, student });
}
