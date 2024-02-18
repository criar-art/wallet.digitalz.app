import { render } from '@testing-library/react-native';
import App from './App';

test('should render App', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('app-container')).toBeTruthy();
});
