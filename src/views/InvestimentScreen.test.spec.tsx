import { render } from '@testing-library/react-native';
import InvestimentScreen from './InvestimentScreen';

test('should render InvestimentScreen', () => {
  const { getByTestId } = render(<InvestimentScreen />);

  expect(getByTestId('investiment-screen')).toBeTruthy();
});
