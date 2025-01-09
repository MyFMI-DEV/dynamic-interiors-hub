interface TrendsChartProps {
  trends?: Array<{ label: string; value: number }>;
}

export const TrendsChart = ({ trends }: TrendsChartProps) => {
  if (!trends || trends.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-6">Interior Design Trends for 2025</h2>
      <div className="grid grid-cols-4 gap-4">
        {trends.map((trend, index) => (
          <div key={index} className="text-center">
            <div className="relative h-32 bg-accent rounded">
              <div
                className="absolute bottom-0 w-full bg-primary rounded-t"
                style={{ height: `${trend.value}%` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
                  {trend.value}%
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{trend.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};