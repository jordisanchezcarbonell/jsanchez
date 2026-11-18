import type { Locale } from '../i18n';

/** One decision of a case study: what was chosen, what was ruled out and why. */
export interface CaseDecision {
  decided: string;
  discarded: string;
  why: string;
}

/**
 * Long-form case study: context, what was broken, why it was hard, decisions and hindsight.
 * Cases stay anonymised and qualitative: no client, company, cost or metric data is published.
 * Anything not yet confirmed carries a `[PENDIENTE: …]` marker instead of an invented value; the page hides those fields.
 */
export interface CaseDetail {
  context: string;
  broken: string;
  hard: string;
  decisions: CaseDecision[];
  hindsight: string;
}

// Open questions for Jordi. Kept identical in every language so they are easy to find and replace.
const pending = {
  discarded: '[PENDIENTE: alternativa descartada]',
  why: '[PENDIENTE: motivo de la decisión]',
  hindsight: '[PENDIENTE: qué harías distinto hoy, en una línea]',
} as const;

const details: Record<string, Record<Locale, CaseDetail>> = {
  'pagos-3d-secure': {
    es: {
      context: `Mi rol: integración frontend del pago, coordinación con las APIs de pago y control de estados.`,
      broken: `Checkout con abandonos por errores intermitentes en la verificación 3DS y estados de pago inconsistentes entre frontend y pasarela.`,
      hard: `El challenge 3DS ocurre fuera de la aplicación y su retorno puede fallar; el pago pasa por estados intermedios y el error era intermitente.`,
      decisions: [
        { decided: 'Modelar los estados del pago de forma explícita.', discarded: pending.discarded, why: pending.why },
        { decided: 'Gestionar el retorno del challenge 3DS y los reintentos.', discarded: pending.discarded, why: pending.why },
        { decided: 'Añadir trazas para seguir cada transacción de punta a punta.', discarded: pending.discarded, why: pending.why },
      ],
      hindsight: pending.hindsight,
    },
    ca: {
      context: `El meu rol: integració frontend del pagament, coordinació amb les APIs de pagament i control d’estats.`,
      broken: `Checkout amb abandonaments per errors intermitents en la verificació 3DS i estats de pagament inconsistents entre frontend i passarel·la.`,
      hard: `El challenge 3DS passa fora de l’aplicació i el seu retorn pot fallar; el pagament passa per estats intermedis i l’error era intermitent.`,
      decisions: [
        { decided: 'Modelar els estats del pagament de manera explícita.', discarded: pending.discarded, why: pending.why },
        { decided: 'Gestionar el retorn del challenge 3DS i els reintents.', discarded: pending.discarded, why: pending.why },
        { decided: 'Afegir traces per seguir cada transacció de punta a punta.', discarded: pending.discarded, why: pending.why },
      ],
      hindsight: pending.hindsight,
    },
    en: {
      context: `My role: frontend integration of the payment, coordination with the payment APIs and state control.`,
      broken: `A checkout losing customers to intermittent 3DS verification errors and payment states that disagreed between frontend and gateway.`,
      hard: `The 3DS challenge happens outside the application and its return can fail; the payment goes through intermediate states and the error was intermittent.`,
      decisions: [
        { decided: 'Model payment states explicitly.', discarded: pending.discarded, why: pending.why },
        { decided: 'Handle the 3DS challenge return and the retries.', discarded: pending.discarded, why: pending.why },
        { decided: 'Add tracing to follow every transaction end to end.', discarded: pending.discarded, why: pending.why },
      ],
      hindsight: pending.hindsight,
    },
  },
};

/** The long-form case study of a project, when it has one. */
export function getCaseDetail(slug: string, locale: Locale): CaseDetail | undefined {
  return details[slug]?.[locale];
}
