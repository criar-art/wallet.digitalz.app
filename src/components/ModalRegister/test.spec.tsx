import { render } from '@testing-library/react-native';
import ModalRegister from './index';

test('should render ModalRegister', () => {
  const { getByTestId } = render(<ModalRegister />);

  expect(getByTestId('modal-register')).toBeTruthy();
});
