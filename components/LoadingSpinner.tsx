import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  fullScreen = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} text-agri-500 animate-spin`} />
      {text && (
        <p className={`${textSizeClasses[size]} text-white font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-earth-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard() {
  return (
    <div className="bg-earth-900 rounded-lg p-6 animate-pulse border border-earth-700">
      <div className="h-4 bg-earth-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-earth-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-earth-700 rounded w-2/3"></div>
    </div>
  );
}

// Skeleton loader for table rows
export function SkeletonTableRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-earth-700 rounded w-24"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-earth-700 rounded w-32"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-earth-700 rounded w-20"></div></td>
      <td className="px-6 py-4"><div className="h-4 bg-earth-700 rounded w-16"></div></td>
    </tr>
  );
}
