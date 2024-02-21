import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";

interface AButtonPropsType {
  type: string;
  btnType: "button" | "submit" | "reset";
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function AButton({
  type,
  children,
  disabled,
  btnType,
  onClick,
}: AButtonPropsType) {
  return (
    <>
      <Button
        variant={type}
        type={btnType}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
}

export default AButton;
