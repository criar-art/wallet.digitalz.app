import { render } from '@testing-library/react-native';
import AboutScreen from './AboutScreen';

test('should render AboutScreen', () => {
  const { getByTestId, getByText } = render(<AboutScreen />);

  expect(getByTestId('about-screen')).toBeTruthy();

  // Check if the expected text content is present
  const text1 = getByText('Wallet Digitalz foi desenvolvido com o objetivo de auxiliá-lo na organização das suas finanças.');
  const text2 = getByText('Proporcionamos uma maneira simplificada para que você registre suas despesas e valores.');
  const text3 = getByText('Tenha a liberdade de criar seus registros de forma intuitiva, com a flexibilidade de deletá-los e atualizá-los conforme necessário.');

  expect(text1).toBeTruthy();
  expect(text2).toBeTruthy();
  expect(text3).toBeTruthy();
});
