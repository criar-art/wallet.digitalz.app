import {
  renderBorderType,
  types,
  capitalize,
  ckeckTypeTouchable,
} from "./index";

describe("Utility Functions", () => {
  describe("renderBorderType", () => {
    test("returns the correct border type for each input", () => {
      expect(renderBorderType("liquid")).toBe("border-yellow-400");
      expect(renderBorderType("patrimony")).toBe("border-black");
      expect(renderBorderType("investiment")).toBe("border-sky-400");
      expect(renderBorderType("entry")).toBe("border-green-400");
      expect(renderBorderType("expense")).toBe("border-red-400");
      expect(renderBorderType("vehicle")).toBe("border-gray-400");
    });
  });

  describe("types", () => {
    test("contains the expected type labels", () => {
      const expectedTypes = {
        liquid: "Liquido",
        patrimony: "Patrimônio",
        investiment: "Investimento",
        entry: "Entrada",
        expense: "Despesa",
        vehicle: "Veículo",
      };

      expect(types).toEqual(expectedTypes);
    });
  });

  describe("capitalize", () => {
    test("capitalizes the first letter and lowercases the rest", () => {
      expect(capitalize("test")).toBe("Test");
      expect(capitalize("HELLO")).toBe("Hello");
    });
  });

  describe("ckeckTypeTouchable", () => {
    test('returns false for "liquid" and "patrimony", true otherwise', () => {
      expect(ckeckTypeTouchable("liquid")).toBe(false);
      expect(ckeckTypeTouchable("patrimony")).toBe(false);
      expect(ckeckTypeTouchable("investiment")).toBe(true);
      expect(ckeckTypeTouchable("entry")).toBe(true);
      expect(ckeckTypeTouchable("expense")).toBe(true);
      expect(ckeckTypeTouchable("vehicle")).toBe(true);
    });
  });
});
