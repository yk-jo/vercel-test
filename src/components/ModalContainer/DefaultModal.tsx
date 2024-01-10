"use client";
import { CSSProperties, ReactNode } from "react";
import { ModalPropsType } from "@/stores/modalStore";
import { Close } from "@/assets/icons";
import "./style.scss";

interface DefaultModalProps extends ModalPropsType {
  title: string;
  content: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
}
export default function DefaultModal({
  onClose,
  title,
  content,
  footer,
  style,
}: DefaultModalProps) {
  return (
    <div className="modal-wrapper">
      <div className="modal-body" style={style}>
        <div className="btn-close" onClick={onClose}>
          <Close />
        </div>
        {/* 제목 */}
        <div className="modal-title">
          <span>{title || "title"}</span>
        </div>
        {/* 내용 */}
        <div className="modal-content">{content}</div>
        {/* 푸터 */}
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
}
