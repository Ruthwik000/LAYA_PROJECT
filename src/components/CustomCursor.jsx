import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isOnModal, setIsOnModal] = useState(false);
  
  // Position refs for smoothing
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseOver = (e) => {
      // Check for triggers
      const target = e.target.closest('a, button, .hover-trigger, [role="button"], .project-card');
      
      // Check if inside modal
      const modal = e.target.closest('.modal-content, .modal-overlay');
      setIsOnModal(!!modal);

      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
        setIsEnlarged(!!text);
      } else {
        setIsHovered(false);
        setCursorText('');
        setIsEnlarged(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation loop for smoothing
    const animate = () => {
      const easing = 0.15; // Lower = smoother/slower
      
      const dx = mouseX.current - cursorX.current;
      const dy = mouseY.current - cursorY.current;
      
      cursorX.current += dx * easing;
      cursorY.current += dy * easing;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX.current}px, ${cursorY.current}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovered ? 'hovered' : ''} ${isEnlarged ? 'enlarged' : ''} ${isOnModal ? 'on-modal' : ''}`} 
      ref={cursorRef}
    >
      {cursorText && <span className="cursor-label">{cursorText}</span>}
    </div>
  );
};

export default CustomCursor;
