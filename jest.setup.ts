// import '../i18n';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Returning the key as the translation for simplicity
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));
