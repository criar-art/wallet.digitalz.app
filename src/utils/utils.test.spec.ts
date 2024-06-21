import utils from "./index";

describe("Utility Functions", () => {
  describe("utils.renderBorderType", () => {
    test("returns the correct border type for each input", () => {
      expect(utils.renderBorderType("liquid")).toBe("border-yellow-400");
      expect(utils.renderBorderType("patrimony")).toBe(
        "border-black dark:border-white"
      );
      expect(utils.renderBorderType("investment")).toBe("border-sky-400");
      expect(utils.renderBorderType("entry")).toBe("border-green-400");
      expect(utils.renderBorderType("expense")).toBe("border-red-400");
      expect(utils.renderBorderType("vehicle")).toBe("border-gray-400");
    });
  });

  describe("types", () => {
    test("contains the expected type labels", () => {
      const expectedTypes = {
        liquid: "Líquido",
        patrimony: "Patrimônio",
        investment: "Investimento",
        entry: "Entrada",
        expense: "Despesa",
        vehicle: "Veículo",
      };

      expect(utils.types).toEqual(expectedTypes);
    });
  });

  describe("capitalize", () => {
    test("capitalizes the first letter and lowercases the rest", () => {
      expect(utils.capitalize("test")).toBe("Test");
      expect(utils.capitalize("HELLO")).toBe("Hello");
    });
  });

  describe("checkTypeTouchable", () => {
    test('returns false for "liquid" and "patrimony", true otherwise', () => {
      expect(utils.checkTypeTouchable("liquid")).toBe(false);
      expect(utils.checkTypeTouchable("patrimony")).toBe(false);
      expect(utils.checkTypeTouchable("investment")).toBe(true);
      expect(utils.checkTypeTouchable("entry")).toBe(true);
      expect(utils.checkTypeTouchable("expense")).toBe(true);
      expect(utils.checkTypeTouchable("vehicle")).toBe(true);
    });
  });

  describe("Basic render parseMoney function", () => {
    it("is parseMoney BRL show value", () => {
      expect(utils.parseMoney("R$ 1.000,00", true)).toBe("R$ 1.000,00");
    });
    it("is parseMoney BRL with hidden value", () => {
      expect(utils.parseMoney("R$ 1.000,00", false)).toBe("R$ ********");
    });
  });

  describe("Date Utilities", () => {
    describe("formatDate", () => {
      test("should correctly format a date object into a 'dd/MM/yyyy' string", () => {
        const date = new Date(2023, 4, 15); // Month is 0-indexed in JavaScript Date
        const expectedDateStr = "05/15/2023";
        expect(utils.formatDate(date)).toBe(expectedDateStr);
      });

      test("should correctly format a date object with leading zeros", () => {
        const date = new Date(2024, 0, 1); // Month is 0-indexed in JavaScript Date
        const expectedDateStr = "01/01/2024";
        expect(utils.formatDate(date)).toBe(expectedDateStr);
      });
    });

    describe("isDatePast", () => {
      test("should return true for a date in the past", () => {
        const date = new Date(2020, 4, 12); // Month is 0-indexed in JavaScript Date
        expect(utils.isDatePast(date)).toBe(true);
      });

      test("should return false for a date in the future", () => {
        const date = new Date(2025, 4, 15); // Month is 0-indexed in JavaScript Date
        expect(utils.isDatePast(date)).toBe(false);
      });

      test("should return false for today's date", () => {
        const today = new Date();
        expect(utils.isDatePast(today)).toBe(false);
      });
    });

    describe("isDateToday", () => {
      test("should return true for today's date", () => {
        const today = new Date();
        expect(utils.isDateToday(today)).toBe(true);
      });

      test("should return false for a date that is not today", () => {
        const notToday = new Date(2000, 0, 1);
        expect(utils.isDateToday(notToday)).toBe(false);
      });
    });

    describe("isDateTomorrow", () => {
      test("should return true for tomorrow's date", () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(utils.isDateTomorrow(tomorrow)).toBe(true);
      });

      test("should return false for a date that is not tomorrow", () => {
        const notTomorrow = new Date(2000, 0, 2);
        expect(utils.isDateTomorrow(notTomorrow)).toBe(false);
      });
    });

    describe("sortDataByDateDesc", () => {
      test("should sort data by date in descending order", () => {
        const data = [
          { date: new Date(2023, 4, 15) },
          { date: new Date(2021, 4, 15) },
          { date: new Date(2024, 4, 15) },
        ];
        const sortedData = [
          { date: new Date(2024, 4, 15) },
          { date: new Date(2023, 4, 15) },
          { date: new Date(2021, 4, 15) },
        ];

        expect(utils.sortDataByDateDesc(data)).toEqual(sortedData);
      });
    });
  });
});
