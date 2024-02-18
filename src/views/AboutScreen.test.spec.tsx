import { render } from '@testing-library/react-native';
import AboutScreen from './AboutScreen';

test('should render AboutScreen', () => {
  const { getByTestId } = render(<AboutScreen />);

  expect(getByTestId('about-screen')).toBeTruthy();
});
