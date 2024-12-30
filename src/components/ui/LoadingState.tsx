import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Navigation from "@/components/Navigation";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-[200px] w-full" />
      </main>
    </div>
  );
};

export default LoadingState;