import ModalRegister from "./Register";
import ModalDelete from "./Delete";
import ModalPay from "./Pay";
import ModalInfo from "./Information";
import ModalFilter from "./Filter";
import ModalBudget from "./Budget";
import ModalBudgetTransaction from "./BudgetTransaction";
import ModalDuplicate from "./Duplicate";

export default function ModalGlobal() {
  return (
    <>
      <ModalRegister />
      <ModalDelete />
      <ModalPay />
      <ModalDuplicate />
      <ModalInfo />
      <ModalFilter />
      <ModalBudget />
      <ModalBudgetTransaction />
    </>
  );
}
