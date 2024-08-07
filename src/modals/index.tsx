import ModalRegister from "./Register";
import ModalAlert from "./Delete";
import ModalPay from "./Pay";
import ModalInfo from "./Information";
import ModalFilter from "./Filter";
import ModalBudget from "./Budget";
import ModalBudgetTransaction from "./BudgetTransaction";

export default function ModalGlobal() {
  return (
    <>
      <ModalRegister />
      <ModalAlert />
      <ModalPay />
      <ModalInfo />
      <ModalFilter />
      <ModalBudget />
      <ModalBudgetTransaction />
    </>
  );
}
