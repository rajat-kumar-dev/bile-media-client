import { toast } from "react-toastify";

export function toastAlert(msg) {
  toast(msg, {
    style: {
      backgroundColor: "#062263",
      boxShadow: "0 0 5px 2px #5bcbf5",
      color: "white",
    },
  });
}
//warning, error, success
