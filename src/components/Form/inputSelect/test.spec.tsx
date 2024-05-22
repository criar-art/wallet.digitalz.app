import { render } from "@testing-library/react-native";
import InputSelect from "./index";

const dataType = [
  { label: "Investimento", value: "investiment" },
  { label: "Entrada", value: "entry" },
  { label: "Despesa", value: "expense" },
  { label: "Veículo", value: "vehicle" },
];

test("should render InputSelect", () => {
  const { getByTestId } = render(
    <InputSelect
      testID="select-container"
      label="Test select"
      error={false}
      data={dataType}
      maxHeight={300}
      placeholder="Selecione o tipo"
      value={{ label: "Entrada", value: "entry" }}
      handleChangeObject="type"
      onChange={() => {}}
    />
  );

  expect(getByTestId("select-container")).toBeTruthy();
});
