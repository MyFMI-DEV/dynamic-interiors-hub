import { useEffect } from 'react';

export const useIframeMessage = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message from:', event.origin);
      
      // Accept messages from any subdomain of lovable.dev or localhost
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://lovable.dev',
        window.location.origin
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.log('Unauthorized origin:', event.origin);
        return;
      }

      if (event.data?.type === 'iframe-height') {
        console.log('Processing iframe height message:', event.data.height);
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.style.height = `${event.data.height}px`;
          console.log('Updated iframe height to:', event.data.height);
        } else {
          console.log('No iframe found to update height');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      console.log('Cleaning up message listener');
      window.removeEventListener('message', handleMessage);
    };
  }, []);
};