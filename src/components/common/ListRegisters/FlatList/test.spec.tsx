import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import FlatListRegisters from "./index";

test("should render FlatListRegisters", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <FlatListRegisters
          testID="test-flatlist"
          keyProp="flatlist-registers-1"
          keyExtractor={(item: any) => "_" + item.id}
          type="test"
          numColumns={1}
          isNotEmpetyRegisters={() => false}
        />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("test-flatlist")).toBeTruthy();
});
