interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Please wait while we get the data for you",
}: LoadingSpinnerProps) {
  return (
    <div className="mx-auto flex min-h-[200px] flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
      <p className="animate-pulse text-lg font-medium text-gray-600">
        {message}
      </p>
    </div>
  );
}
