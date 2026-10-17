import { UserDTO } from "../services/DTOS/UserDTO";

export type PlanKind = "trial" | "premium" | "free";

export interface PlanSummary {
  kind: PlanKind;
  badge: string;
  title: string;
  text: string;
  action: string;
  // Botão cheio (convite para assinar) ou link (quem já assina).
  actionStyle: "button" | "link";
}

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// Dias de calendário de hoje até o fim do teste; 0 no último dia.
export const trialDaysLeft = (
  trialEndsAt: string | Date,
  today = new Date()
) => {
  const diff =
    startOfDay(new Date(trialEndsAt)).getTime() - startOfDay(today).getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
};

// "26 de outubro"
export const dayAndMonth = (value: string | Date) => {
  const date = new Date(value);
  return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
};

const trialTitle = (days: number) => {
  if (days === 0) return "Seu teste termina hoje";
  if (days === 1) return "Falta 1 dia do seu teste";
  return `Faltam ${days} dias do seu teste`;
};

// O app só lê os campos que o servidor já calculou; não refaz a regra do plano.
export const planSummary = (
  user: Pick<UserDTO, "plan" | "isPremium" | "isTrialActive" | "trialEndsAt">,
  today = new Date()
): PlanSummary => {
  if (user.isTrialActive) {
    return {
      kind: "trial",
      badge: "Teste grátis",
      title: trialTitle(trialDaysLeft(user.trialEndsAt, today)),
      text: `Até ${dayAndMonth(
        user.trialEndsAt
      )} você usa tudo do Premium. Depois, seus dados ficam só para consulta.`,
      action: "Conhecer o Premium",
      actionStyle: "button",
    };
  }

  if (user.isPremium) {
    return {
      kind: "premium",
      badge: "Premium",
      title: "Seu Premium está ativo",
      text: "Crie, edite e acompanhe seus lançamentos sem limites.",
      action: "Gerenciar assinatura",
      actionStyle: "link",
    };
  }

  return {
    kind: "free",
    badge: "Plano gratuito",
    title: "Seu teste terminou",
    text: "Você ainda consulta e exclui seus dados, mas não pode criar nem editar lançamentos.",
    action: "Assinar o Premium",
    actionStyle: "button",
  };
};
