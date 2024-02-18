import { render } from '@testing-library/react-native';
import ContactScreen from './ContactScreen';

test('should render ContactScreen', () => {
  const { getByTestId } = render(<ContactScreen />);

  expect(getByTestId('contact-screen')).toBeTruthy();
});
