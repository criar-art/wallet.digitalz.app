import '@testing-library/jest-native';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyle(style: Record<string, any>): R;
    }
  }
}
