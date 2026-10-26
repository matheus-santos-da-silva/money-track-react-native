import type { Subscription } from "react-native-iap";
import {
  formatProduct,
  getPrice,
  getPricePerMonth,
} from "../src/utils/premium-products";

const androidSub = (
  productId: string,
  formattedPrice: string,
  priceAmountMicros?: string
) =>
  ({
    productId,
    title: "Plano (Money Track)",
    description: "Acesso completo",
    subscriptionOfferDetails: [
      {
        offerToken: "token",
        pricingPhases: {
          pricingPhaseList: [{ formattedPrice, priceAmountMicros }],
        },
      },
    ],
  } as unknown as Subscription);

describe("premium products", () => {
  it("should read the price of the first pricing phase", () => {
    expect(getPrice(androidSub("plano_mensal", "R$ 9,90"))).toBe("R$ 9,90");
  });

  it("should give a monthly price only for the annual plan", () => {
    expect(
      getPricePerMonth(androidSub("plano_mensal", "R$ 9,90", "9900000"))
    ).toBeUndefined();
    expect(
      getPricePerMonth(androidSub("plano_anual", "R$ 99,00", "99000000"))
    ).toBe("R$ 8,25/mês");
  });

  it("should fall back to the formatted price without micros", () => {
    expect(getPricePerMonth(androidSub("plano_anual", "R$ 120,00"))).toBe(
      "R$ 10,00/mês"
    );
  });

  it("should highlight the monthly price of the annual plan", () => {
    expect(
      formatProduct(androidSub("plano_anual", "R$ 99,00", "99000000"))
    ).toEqual({
      productId: "plano_anual",
      title: "Plano",
      localizedPrice: "R$ 8,25/mês",
      pricePerMonth: "R$ 99,00",
      description: "Acesso completo",
    });
    expect(formatProduct(androidSub("plano_mensal", "R$ 9,90"))).toMatchObject(
      { localizedPrice: "R$ 9,90", pricePerMonth: undefined }
    );
  });
});
