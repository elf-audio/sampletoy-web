import React, { useEffect, useRef } from 'react';

const FullSizeSVG = ({ createSVGContent, ...props }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const onResize = (entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      const svg = svgRef.current;

      svg.setAttribute('width', width);
      svg.setAttribute('height', height);

      const svgContent = createSVGContent(width, height);
      svg.innerHTML = svgContent;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    // Initialize the SVG size and content on mount.
    const { width, height } = container.getBoundingClientRect();
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    const svgContent = createSVGContent(width, height);
    svg.innerHTML = svgContent;

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
      <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0 }} {...props} />
    </div>
  );
};

export default FullSizeSVG;