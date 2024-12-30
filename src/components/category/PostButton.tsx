import { Button } from "@/components/ui/button";

const PostButton = () => {
  return (
    <a 
      href="https://www.findmyinteriors.com" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <Button 
        variant="secondary" 
        size="lg"
        className="whitespace-nowrap"
      >
        Post Free Today
      </Button>
    </a>
  );
};

export default PostButton;