// import '../i18n';
import useOrientation from "@hooks/useOrientation";

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Returning the key as the translation for simplicity
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock("@hooks/useOrientation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

(useOrientation as jest.Mock).mockReturnValue({
  orientation: 1, // Provide a mock value for orientation
  landscape: false, // Mock landscape state
  portrait: true, // Mock portrait state
});
