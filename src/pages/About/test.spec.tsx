import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import AboutScreen from ".";

test("should render AboutScreen", () => {
  const { getByTestId, getByText } = render(
    <NavigationContainer>
      <AboutScreen />
    </NavigationContainer>
  );

  expect(getByTestId("about-screen")).toBeTruthy();

  // Check if the expected text content is present
  const text1 = getByText(
    "about.intro1"
  );
  const text2 = getByText(
    "about.intro2"
  );
  const text3 = getByText(
    "about.intro3"
  );

  expect(text1).toBeTruthy();
  expect(text2).toBeTruthy();
  expect(text3).toBeTruthy();

  // Check if the expected text content is present
  const privacy = getByText("common.privacy");
  const wallet = getByText("walletdigitalz.web.app");
  const criar = getByText("Criar.Art");

  expect(privacy).toBeTruthy();
  expect(wallet).toBeTruthy();
  expect(criar).toBeTruthy();
});
