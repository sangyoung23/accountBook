import { ReactNode } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const UseAlert = (
  show: boolean,
  children: ReactNode,
  icon: "warning" | "error" | "success" | "info" | "question"
) => {
  if (show) {
    withReactContent(Swal).fire({
      title: { children },
      showConfirmButton: true,
      icon: icon,
    });
  } else {
    return;
  }
};
