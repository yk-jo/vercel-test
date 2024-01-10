"use client";
import { ModalPropsType, useModalStore } from "@/stores/modalStore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer() {
  const { modals, close } = useModalStore();
  const [portal, setPortal] = useState<Element | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("modal"));
  }, []);

  return (
    portal &&
    createPortal(
      modals.map((m) => {
        const { Component, props, key } = m;
        const { onSubmit = () => {}, onClose = () => {}, ...restProps } = props;

        const handleClose = async () => {
          await onClose?.();
          close(key);
        };

        const handleSubmit = async (_props?: ModalPropsType) => {
          await onSubmit?.(_props);
          close(key);
        };

        return (
          <Component
            key={key}
            onSubmit={handleSubmit}
            onClose={handleClose}
            {...restProps}
          />
        );
      }),
      portal
    )
  );
}
