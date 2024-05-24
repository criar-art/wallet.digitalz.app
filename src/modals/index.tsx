import ModalRegister from "./Register";
import ModalAlert from "./Delete";
import ModalInfo from "./Information";
import ModalFilter from "./Filter";

export default function ModalGlobal() {
  return (
    <>
      <ModalRegister />
      <ModalAlert />
      <ModalInfo />
      <ModalFilter />
    </>
  );
}
