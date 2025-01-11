import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface KeyPoint {
  label: string;
  value: string;
}

interface KeyPointsSectionProps {
  points: KeyPoint[];
  title?: string;
}

const KeyPointsSection = ({ points, title = "Key Points" }: KeyPointsSectionProps) => {
  return (
    <div className="bg-[#EDF6F9] p-8 rounded-xl my-12 shadow-sm">
      <h3 className="text-3xl font-semibold text-[#006D77] mb-8">{title}</h3>
      <Table>
        <TableBody>
          {points.map((point, index) => (
            <TableRow key={index} className="border-0">
              <TableCell className="font-semibold text-[#006D77] pl-0 w-1/3 align-top">
                {point.label}
              </TableCell>
              <TableCell className="text-muted-foreground pl-6">
                {point.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KeyPointsSection;