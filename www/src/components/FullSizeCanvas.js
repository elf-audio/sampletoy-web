import React, { useEffect, useRef } from 'react';

const FullSizeCanvas = ({ draw = (ctx,w,h) => {}, ...props }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const onResize = (entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      draw(ctx, width, height);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Initialize the canvas size and draw on mount.
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    draw(ctx, width, height);

    // Set up the ResizeObserver.
    resizeObserverRef.current = new ResizeObserver(onResize);
    resizeObserverRef.current.observe(container);

    return () => {
      // Clean up the ResizeObserver when the component is unmounted.
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} {...props} />
    </div>
  );
};

export default FullSizeCanvas