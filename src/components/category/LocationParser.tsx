import { useEffect } from 'react';

interface LocationParserProps {
  location: string | undefined;
  onLocationParsed: (mainLocation: string, subLocation: string) => void;
}

const LocationParser = ({ location, onLocationParsed }: LocationParserProps) => {
  useEffect(() => {
    if (location) {
      const parts = location.split('-');
      const mainLoc = parts[0];
      const subLoc = parts.slice(1).join(' ');
      onLocationParsed(mainLoc, subLoc);
    }
  }, [location, onLocationParsed]);

  return null;
};

export default LocationParser;