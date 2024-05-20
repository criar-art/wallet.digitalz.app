import ModalRegister from "./Register";
import ModalAlert from "./Delete";
import ModalInfo from "./Information";

export default function ModalGlobal() {
  return (
    <>
      <ModalRegister />
      <ModalAlert />
      <ModalInfo />
    </>
  );
}
