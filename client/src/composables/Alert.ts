import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const UseAlert = (
  show: boolean,
  message: string,
  icon: "warning" | "error" | "success" | "info" | "question"
) => {
  if (show) {
    withReactContent(Swal).fire({
      title: message,
      showConfirmButton: true,
      icon: icon,
    });
  } else {
    return;
  }
};
