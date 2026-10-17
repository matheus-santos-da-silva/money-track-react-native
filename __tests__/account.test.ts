import {
  dayAndMonth,
  planSummary,
  trialDaysLeft,
} from "../src/utils/plan-summary";
import {
  canSaveProfile,
  canUpdatePassword,
  confirmationError,
  emailError,
  isNewPasswordValid,
  nameError,
} from "../src/utils/account-forms";

// 14 de outubro de 2026, à tarde no horário local.
const TODAY = new Date(2026, 9, 14, 15, 30);

const trialUser = (trialEndsAt: Date) => ({
  plan: "TRIAL" as never,
  isPremium: true,
  isTrialActive: true,
  trialEndsAt,
});

describe("plan summary", () => {
  it("should count the calendar days left in the trial", () => {
    expect(trialDaysLeft(new Date(2026, 9, 26, 9, 0), TODAY)).toBe(12);
    expect(trialDaysLeft(new Date(2026, 9, 15, 1, 0), TODAY)).toBe(1);
    expect(trialDaysLeft(new Date(2026, 9, 14, 23, 0), TODAY)).toBe(0);
    expect(trialDaysLeft(new Date(2026, 9, 10), TODAY)).toBe(0);
  });

  it("should describe an active trial", () => {
    expect(planSummary(trialUser(new Date(2026, 9, 26, 9, 0)), TODAY)).toEqual({
      kind: "trial",
      badge: "Teste grátis",
      title: "Faltam 12 dias do seu teste",
      text: "Até 26 de outubro você usa tudo do Premium. Depois, seus dados ficam só para consulta.",
      action: "Conhecer o Premium",
      actionStyle: "button",
    });
  });

  it("should handle the last days of the trial", () => {
    const title = (end: Date) => planSummary(trialUser(end), TODAY).title;

    expect(title(new Date(2026, 9, 15, 8, 0))).toBe("Falta 1 dia do seu teste");
    expect(title(new Date(2026, 9, 14, 22, 0))).toBe("Seu teste termina hoje");
  });

  it("should describe premium and the free plan", () => {
    const base = { trialEndsAt: new Date(2026, 8, 1), isTrialActive: false };

    expect(
      planSummary({ ...base, plan: "PREMIUM" as never, isPremium: true })
    ).toMatchObject({
      kind: "premium",
      badge: "Premium",
      action: "Gerenciar assinatura",
      actionStyle: "link",
    });
    expect(
      planSummary({ ...base, plan: "FREE" as never, isPremium: false })
    ).toMatchObject({
      kind: "free",
      badge: "Plano gratuito",
      title: "Seu teste terminou",
      action: "Assinar o Premium",
    });
  });

  it("should write the day and the month without the year", () => {
    expect(dayAndMonth(new Date(2026, 2, 1))).toBe("1 de março");
  });
});

describe("profile form", () => {
  const original = { name: "Matheus Santos", email: "matheus@email.com" };

  it("should validate the name like the server, within 3 to 20 characters", () => {
    expect(nameError("Matheus Santos")).toBeNull();
    expect(nameError("João D'Ávila-Neto")).toBeNull();
    expect(nameError("  Ana  ")).toBeNull();
    expect(nameError("Al")).toBe("O nome deve ter entre 3 e 20 caracteres.");
    expect(nameError("Matheus Santos Oliveira")).toBe(
      "O nome deve ter entre 3 e 20 caracteres."
    );
    expect(nameError("Matheus 2")).toBe(
      "Use apenas letras, espaços, apóstrofo ou hífen."
    );
  });

  it("should flag an invalid e-mail only after something is typed", () => {
    expect(emailError("")).toBeNull();
    expect(emailError("matheus@email.com")).toBeNull();
    expect(emailError("matheus@")).toBe("Digite um e-mail válido.");
  });

  it("should save only a valid change", () => {
    expect(canSaveProfile(original, original)).toBe(false);
    expect(
      canSaveProfile({ ...original, name: "Matheus Santos " }, original)
    ).toBe(false);
    expect(canSaveProfile({ ...original, name: "Matheus S." }, original)).toBe(
      false
    );
    expect(canSaveProfile({ ...original, name: "Matheus" }, original)).toBe(
      true
    );
    expect(canSaveProfile({ ...original, email: "" }, original)).toBe(false);
  });
});

describe("password form", () => {
  it("should require 7 to 30 characters in the new password", () => {
    expect(isNewPasswordValid("123456")).toBe(false);
    expect(isNewPasswordValid("1234567")).toBe(true);
    expect(isNewPasswordValid("x".repeat(31))).toBe(false);
  });

  it("should tell when the confirmation differs", () => {
    expect(confirmationError("novasenha", "")).toBeNull();
    expect(confirmationError("novasenha", "novasenha")).toBeNull();
    expect(confirmationError("novasenha", "novasenh")).toBe(
      "As senhas não coincidem."
    );
  });

  it("should allow the update only with every rule met", () => {
    expect(canUpdatePassword("atual", "novasenha", "novasenha")).toBe(true);
    expect(canUpdatePassword("", "novasenha", "novasenha")).toBe(false);
    expect(canUpdatePassword("atual", "curta", "curta")).toBe(false);
    expect(canUpdatePassword("atual", "novasenha", "outra")).toBe(false);
  });
});
