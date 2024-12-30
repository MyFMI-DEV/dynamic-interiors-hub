import { Progress } from "@/components/ui/progress";
import LoadingState from "@/components/ui/LoadingState";

interface LoadingProgressProps {
  category: string | undefined;
  location: string | undefined;
  progress: number;
  loadingSteps: {
    cache: boolean;
    location: boolean;
    description: boolean;
    seo: boolean;
    image: boolean;
  };
}

const LoadingProgress = ({ 
  category, 
  location, 
  progress,
  loadingSteps 
}: LoadingProgressProps) => {
  console.log('LoadingProgress render:', { 
    category, 
    location, 
    progress, 
    loadingSteps 
  });

  const getLoadingMessage = () => {
    if (!loadingSteps.cache) return "Checking cache...";
    if (!loadingSteps.location) return "Verifying location...";
    if (!loadingSteps.description) return "Loading description...";
    if (!loadingSteps.seo) return "Loading SEO data...";
    if (!loadingSteps.image) return "Loading images...";
    return "Almost there...";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Progress value={progress} className="w-full max-w-md mb-4" />
      <p className="text-muted-foreground mb-2">
        {getLoadingMessage()}
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Loading {category} services in {location}...
      </p>
      <LoadingState />
    </div>
  );
};

export default LoadingProgress;