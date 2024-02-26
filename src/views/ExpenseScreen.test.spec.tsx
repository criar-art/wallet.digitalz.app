import { render } from '@testing-library/react-native';
import ExpenseScreen from './ExpenseScreen';

test('should render ExpenseScreen', () => {
  const { getByTestId } = render(<ExpenseScreen />);

  expect(getByTestId('expense-screen')).toBeTruthy();
});
