import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorToast(message: string, error: any) {
  toast.error(message, {
    description: error?.message,
  });
}
