import { toast } from "react-toastify";

export function toastAlert(msg) {
  toast(msg, {
    style: {
      backgroundColor: "#062263",
      boxShadow: "0 0 5px #5bcbf588,0 0 5px 2px #062263",
      color: "white",
      borderRadius: "10px",
      fontSize: "14px",
      // border: "1px solid red",
    },
  });
}
//warning, error, success
