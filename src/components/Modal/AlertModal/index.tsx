import DefaultModal from "@/components/ModalContainer/DefaultModal";
import { ModalPropsType } from "@/stores/modalStore";
import "./style.scss";

interface AlertModalProps extends ModalPropsType {
  message: string;
}
export default function AlertModal({
  message,
  onClose,
  onSubmit,
}: AlertModalProps) {
  const Content = () => {
    return (
      <div className="alert-modal-content">
        <p style={{ textAlign: "center" }}>{message}</p>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="alert-modal-footer">
        <button onClick={onSubmit}>확인</button>
      </div>
    );
  };

  return (
    <DefaultModal
      title="알림"
      content={<Content />}
      footer={<Footer />}
      onClose={onClose}
    />
  );
}
