export interface UserDTO {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  trialEndsAt: Date;
}

enum Plan {
  FREE = "FREE",
  TRIAL = "TRIAL",
  PREMIUM = "PREMIUM",
}
