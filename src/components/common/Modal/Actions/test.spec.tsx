import { render } from "@testing-library/react-native";
import Actions from "./index";

describe("Actions Component", () => {
  test("should render Actions", () => {
    const mockCloseAction = jest.fn();
    const mockCancelAction = jest.fn();
    const mockConfirmAction = jest.fn();
    const mockCloseModal = jest.fn();
    const mockConfirmButton = { text: "Confirm", onPress: mockConfirmAction };
    const mockCancelButton = { text: "Cancel", onPress: mockCancelAction };

    const props = {
      testID: "modal-actions",
      twClass: "test-class",
      closeAction: mockCloseAction,
      cancelAction: mockCancelAction,
      confirmAction: mockConfirmAction,
      closeModal: mockCloseModal,
      confirmButton: mockConfirmButton,
      cancelButton: mockCancelButton,
    };

    const { getByTestId } = render(<Actions {...props} />);

    const mainContainer = getByTestId("modal-actions");
    expect(mainContainer).toBeTruthy();
  });
});
