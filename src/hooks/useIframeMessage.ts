import { useEffect } from 'react';

export const useIframeMessage = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        window.location.origin,
        'http://localhost:5173',
        'http://localhost:3000'
      ];
      
      if (!allowedOrigins.includes(event.origin)) {
        console.log('Ignored message from unauthorized origin:', event.origin);
        return;
      }
      
      if (event.data && event.data.type === 'iframe-height') {
        // Handle iframe height adjustment if needed
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
};