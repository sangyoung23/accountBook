import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";

interface AButtonPropsType {
  type: string;
  children?: ReactNode;
}

function AButton({ type, children }: AButtonPropsType) {
  return (
    <>
      <Button variant={type}>{children}</Button>
    </>
  );
}

export default AButton;
