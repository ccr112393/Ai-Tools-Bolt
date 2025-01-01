import { ToastQueue } from "@react-spectrum/toast";

const toastTimeout: number = 1500;
const toastTimeoutExtended: number = 2500;

export function postToast(
  variant: "positive" | "negative" | "info" | "neutral",
  message: string
) {
  switch (variant) {
    case "positive":
      ToastQueue.positive(message, { timeout: toastTimeout });
      break;
    case "negative":
      ToastQueue.negative(message, { timeout: toastTimeoutExtended });
      break;
    case "info":
      ToastQueue.info(message, { timeout: toastTimeout });
      break;
    default:
      ToastQueue.neutral(message, { timeout: toastTimeout });
      break;
  }
}
