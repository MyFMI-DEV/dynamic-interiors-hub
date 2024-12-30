interface BannerMessageProps {
  location: string;
  category: string;
}

const BannerMessage = ({ location, category }: BannerMessageProps) => {
  const formattedLocation = location.replace(/-/g, ' ');
  const formattedCategory = category.replace(/-/g, ' ');

  return (
    <div className="text-lg max-w-2xl">
      Looking for {formattedCategory} in{" "}
      <span className="font-bold">{formattedLocation}</span>?
      Post an image, URL, or description free today to find the best deals from Interiors experts in your area!
    </div>
  );
};

export default BannerMessage;