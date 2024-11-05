import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string | undefined;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}