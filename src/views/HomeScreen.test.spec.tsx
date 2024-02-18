import { render } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

test('should render HomeScreen', () => {
  const { getByTestId } = render(<HomeScreen />);

  expect(getByTestId('home-screen')).toBeTruthy();
});
