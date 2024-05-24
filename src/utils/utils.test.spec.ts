import {
  renderBorderType,
  types,
  capitalize,
  checkTypeTouchable,
  parseMoney,
  formatDate,
  isDatePast,
} from "./index";

describe("Utility Functions", () => {
  describe("renderBorderType", () => {
    test("returns the correct border type for each input", () => {
      expect(renderBorderType("liquid")).toBe("border-yellow-400");
      expect(renderBorderType("patrimony")).toBe("border-black dark:border-white");
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

  describe("checkTypeTouchable", () => {
    test('returns false for "liquid" and "patrimony", true otherwise', () => {
      expect(checkTypeTouchable("liquid")).toBe(false);
      expect(checkTypeTouchable("patrimony")).toBe(false);
      expect(checkTypeTouchable("investiment")).toBe(true);
      expect(checkTypeTouchable("entry")).toBe(true);
      expect(checkTypeTouchable("expense")).toBe(true);
      expect(checkTypeTouchable("vehicle")).toBe(true);
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
      test("should correctly format a date string into a 'dd/MM/yyyy' string", () => {
        const dateStr = "15/05/2023";
        const expectedDateStr = "15/05/2023";
        expect(formatDate(dateStr)).toBe(expectedDateStr);
      });

      test("should correctly format a date string with leading zeros", () => {
        const dateStr = "01/01/2024";
        const expectedDateStr = "01/01/2024";
        expect(formatDate(dateStr)).toBe(expectedDateStr);
      });

      test("should handle different date formats", () => {
        const dateStr1 = "2023-05-15";
        const dateStr2 = "05/15/2023";
        const dateStr3 = "15-05-2023";
        const expectedDateStr = "15/05/2023";

        expect(formatDate(dateStr1)).toBe(expectedDateStr);
        expect(formatDate(dateStr2)).toBe(expectedDateStr);
        expect(formatDate(dateStr3)).toBe(expectedDateStr);
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
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const dateStr = `${day}/${month}/${year}`;

        expect(isDatePast(dateStr)).toBe(false);
      });
    });
  });
});
