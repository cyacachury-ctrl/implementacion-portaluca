'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    id: '1',
    question: '¿Tengo que enviar un mail si mi inscripción figura en proceso?',
    answer:
      'No es necesario. Si tu inscripción figura "en proceso", significa que estamos revisando tu documentación. Este proceso puede demorar algunos días hábiles. Te notificaremos por email cuando haya novedades. Solo comunicate con nosotros si pasaron más de 10 días hábiles sin cambios.',
  },
  {
    id: '2',
    question: '¿Qué significa asignación de comisión en proceso?',
    answer:
      'Significa que tu documentación ya fue validada y ahora estamos asignándote una comisión (grupo de cursada) según tu disponibilidad horaria y la capacidad de cada turno. Este proceso es automático y puede demorar entre 3 y 5 días hábiles.',
  },
  {
    id: '3',
    question: '¿Cuándo debería comunicarme con la universidad?',
    answer:
      'Deberías comunicarte si: (1) pasaron más de 10 días hábiles sin cambios en tu estado, (2) detectás un error en tus datos personales, (3) necesitás modificar tu disponibilidad horaria antes de la asignación de comisión, o (4) tenés dudas que no se responden en esta sección. Podés escribirnos a ingresantes@universidad.edu.ar',
  },
];

export function FAQSection() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-foreground">Preguntas frecuentes</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-border">
            <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
