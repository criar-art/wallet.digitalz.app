import { render, waitFor } from "@testing-library/react-native";
import App from "./App";

test("should render App", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(() => {
    expect(getByTestId("app-container")).toBeTruthy();
  });
});
