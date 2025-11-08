import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        {message}
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-2 text-red-700 underline hover:text-red-900"
          >
            Try again
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
}