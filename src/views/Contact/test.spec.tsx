import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import ContactScreen from "./Contact";

test("should render ContactScreen", () => {
  const { getByTestId, getByText } = render(
    <NavigationContainer>
      <ContactScreen />
    </NavigationContainer>
  );

  expect(getByTestId("contact-screen")).toBeTruthy();

  // Check if the expected text content is present
  const criar = getByText("criar.art");
  const emailText = getByText("contato@criar.art");
  const linkedinText = getByText("@lucasferreiralimax");

  expect(criar).toBeTruthy();
  expect(emailText).toBeTruthy();
  expect(linkedinText).toBeTruthy();
});
