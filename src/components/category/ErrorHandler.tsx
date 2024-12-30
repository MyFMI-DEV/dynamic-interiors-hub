import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ErrorHandlerProps {
  errors: { error: any; message: string }[];
}

const ErrorHandler = ({ errors }: ErrorHandlerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    errors.forEach(({ error, message }) => {
      if (error) {
        console.error('ErrorHandler: Error occurred:', { message, error });
        toast({
          title: "Error",
          description: `${message}. Please try refreshing the page.`,
          variant: "destructive",
        });
      }
    });
  }, [errors, toast]);

  return null;
};

export default ErrorHandler;