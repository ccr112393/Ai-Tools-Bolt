import { ToastQueue } from "@react-spectrum/toast";

const toastTimeout: number = 1500;
const toastTimeoutExtended: number = 2500;

export function postToast(
  variant: "positive" | "negative" | "info" | "neutral",
  message: string,
  persistant: boolean = false
) {
  switch (variant) {
    case "positive":
      ToastQueue.positive(
        message,
        !persistant ? { timeout: toastTimeout } : {}
      );
      break;
    case "negative":
      ToastQueue.negative(
        message,
        !persistant ? { timeout: toastTimeoutExtended } : {}
      );
      break;
    case "info":
      ToastQueue.info(message, !persistant ? { timeout: toastTimeout } : {});
      break;
    default:
      ToastQueue.neutral(message, !persistant ? { timeout: toastTimeout } : {});
      break;
  }
}
