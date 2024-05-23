import { render } from "@testing-library/react-native";
import ItemTotal from "./index";

test("should render ItemTotal", () => {
  const { getByTestId } = render(
    <ItemTotal
      testID="item-total-register"
      type="test"
      value={2000}
      eyeStatus={true}
    />
  );

  expect(getByTestId("item-total-register")).toBeTruthy();
});
