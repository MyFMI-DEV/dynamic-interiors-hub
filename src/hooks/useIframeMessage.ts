import { useEffect } from 'react';

export const useIframeMessage = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the same origin
      if (event.origin !== window.location.origin) {
        console.log('Unauthorized origin:', event.origin);
        return;
      }

      if (event.data?.type === 'iframe-height') {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.style.height = `${event.data.height}px`;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
};