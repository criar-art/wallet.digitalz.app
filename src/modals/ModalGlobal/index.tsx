import ModalRegister from "../ModalRegister";
import ModalAlert from "../ModalDelete";
import ModalInfo from "../ModalInfo";

export default function ModalGlobal() {
  return (
    <>
      <ModalRegister />
      <ModalAlert />
      <ModalInfo />
    </>
  );
}
