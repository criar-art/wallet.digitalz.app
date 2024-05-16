import {
  renderBorderType,
  types,
  capitalize,
  ckeckTypeTouchable,
  parseMoney,
  formatDate,
  isDatePast,
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
        liquid: "Líquido",
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

  describe("Basic render parseMoney function", () => {
    it("is parseMoney BRL show value", () => {
      expect(parseMoney("R$ 1.000,00", true)).toBe("R$ 1.000,00");
    });
    it("is parseMoney BRL with hidden value", () => {
      expect(parseMoney("R$ 1.000,00", false)).toBe("R$ ********");
    });
  });

  describe("Date Utilities", () => {
    describe("formatDate", () => {
      test("should correctly format a date string into a Date object", () => {
        const dateStr = "15/05/2023";
        const expectedDate = new Date(2023, 4, 15); // Note que o mês é zero-based, então maio é 4
        expect(formatDate(dateStr)).toEqual(expectedDate);
      });

      test("should correctly format a date string with leading zeros", () => {
        const dateStr = "01/01/2024";
        const expectedDate = new Date(2024, 0, 1); // Janeiro é 0
        expect(formatDate(dateStr)).toEqual(expectedDate);
      });

      test("should handle invalid date strings gracefully", () => {
        const dateStr = "invalid-date";
        expect(() => formatDate(dateStr)).toThrow("Invalid date format");
      });
    });

    describe("isDatePast", () => {
      test("should return true for a date in the past", () => {
        const dateStr = "15/05/2020";
        expect(isDatePast(dateStr)).toBe(true);
      });

      test("should return false for a date in the future", () => {
        const dateStr = "15/05/2025";
        expect(isDatePast(dateStr)).toBe(false);
      });

      test("should return false for today's date", () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 2).padStart(2, "0");
        const year = today.getFullYear();
        const dateStr = `${day}/${month}/${year}`;

        expect(isDatePast(dateStr)).toBe(false);
      });
    });
  });
});
