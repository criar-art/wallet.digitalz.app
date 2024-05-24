import { render } from "@testing-library/react-native";
import Actions from "./index";

describe("Actions Component", () => {
  test("should render Actions", () => {
    const { getByTestId } = render(<Actions testID="modal-actions" />);

    const mainContainer = getByTestId("modal-actions");
    expect(mainContainer).toBeTruthy();
  });
});
