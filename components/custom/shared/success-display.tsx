"use client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface SuccessDisplayProps {
  message: string;
}

export default function SuccessDisplay({ message }: SuccessDisplayProps) {
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Success",
        description: message,
        variant: "default",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [toast, message]);

  return (
    <div className="my-4 rounded-md border border-green-200 bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      </div>
    </div>
  );
}
