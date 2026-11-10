import type { ProductSubscription } from "react-native-iap";

export const MONTHLY_PRODUCT_ID = "plano_mensal";
export const ANNUAL_PRODUCT_ID = "plano_anual";
export const PRODUCT_IDS = [MONTHLY_PRODUCT_ID, ANNUAL_PRODUCT_ID];

export interface PremiumProduct {
  productId: string;
  title: string;
  // Preço em destaque: o mensal equivalente no plano anual, o cheio nos demais.
  localizedPrice: string;
  // Preço cheio do plano anual, mostrado abaixo do mensal equivalente.
  pricePerMonth?: string;
  description: string;
  savings?: string;
  discount?: string;
}

const firstPricingPhase = (sub: ProductSubscription) =>
  sub.platform === "android"
    ? sub.subscriptionOffers?.[0]?.pricingPhasesAndroid?.pricingPhaseList?.[0]
    : undefined;

const toMonthlyLabel = (yearly: number) =>
  `R$ ${(yearly / 12).toFixed(2).replace(".", ",")}/mês`;

export const getPrice = (sub: ProductSubscription): string =>
  firstPricingPhase(sub)?.formattedPrice ?? sub.displayPrice ?? "";

// Só o plano anual tem preço mensal equivalente.
export const getPricePerMonth = (
  sub: ProductSubscription
): string | undefined => {
  if (sub.id !== ANNUAL_PRODUCT_ID) return undefined;

  const phase = firstPricingPhase(sub);
  if (!phase) return undefined;

  if (phase.priceAmountMicros) {
    return toMonthlyLabel(Number(phase.priceAmountMicros) / 1_000_000);
  }

  const numeric = parseFloat(
    (phase.formattedPrice ?? "").replace(/[^\d,]/g, "").replace(",", ".")
  );
  return isNaN(numeric) ? undefined : toMonthlyLabel(numeric);
};

export const formatProduct = (sub: ProductSubscription): PremiumProduct => {
  const fullPrice = getPrice(sub);
  const monthlyPrice = getPricePerMonth(sub);

  return {
    productId: sub.id,
    // A loja acrescenta o nome do app entre parênteses: "Plano Anual (Money Track)".
    title: (sub.title || "Plano").replace(/\s*\(.*\)\s*$/, "").trim(),
    localizedPrice: monthlyPrice ?? fullPrice,
    pricePerMonth: monthlyPrice ? fullPrice : undefined,
    description: sub.description || "",
  };
};
