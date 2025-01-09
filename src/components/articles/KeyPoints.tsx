interface KeyPointsProps {
  points: string[];
}

export const KeyPoints = ({ points }: KeyPointsProps) => {
  return (
    <div className="bg-accent rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">What You Need to Know</h2>
      <ul className="space-y-2 text-gray-700">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};