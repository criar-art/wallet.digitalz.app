import { render } from '@testing-library/react-native';
import ListRegisters from './index';

test('should render ListRegisters', () => {
  const { getByTestId } = render(<ListRegisters />);

  expect(getByTestId('list-register')).toBeTruthy();
});
