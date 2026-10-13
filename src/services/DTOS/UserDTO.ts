export interface UserDTO {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  trialEndsAt: Date;
  // Calculados pelo servidor (o app não recalcula a regra de plano/trial).
  isPremium: boolean;
  isTrialActive: boolean;
}

enum Plan {
  FREE = "FREE",
  TRIAL = "TRIAL",
  PREMIUM = "PREMIUM",
}
