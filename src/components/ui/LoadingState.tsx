import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

const LoadingState = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <Progress value={progress} className="w-full" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-[200px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingState;