import { Progress } from "@/components/ui/progress";
import LoadingState from "@/components/ui/LoadingState";

interface LoadingProgressProps {
  category: string | undefined;
  location: string | undefined;
  progress: number;
}

const LoadingProgress = ({ category, location, progress }: LoadingProgressProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Progress value={progress} className="w-full max-w-md mb-4" />
      <p className="text-muted-foreground text-sm">
        Loading {category} services in {location}...
      </p>
      <LoadingState />
    </div>
  );
};

export default LoadingProgress;