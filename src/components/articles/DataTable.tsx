interface DataTableProps {
  data: Array<{ key: string; value: string }>;
}

export const DataTable = ({ data }: DataTableProps) => {
  if (data.length === 0) return null;
  
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-6 py-3 text-left">Key Points</th>
            <th className="px-6 py-3 text-left">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-accent transition-colors">
              <td className="px-6 py-4 font-medium">{row.key}</td>
              <td className="px-6 py-4">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};