import React from "react";

interface SparklesProps {
  isAnimating: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Sparkle animation component that creates sparkles radiating from button edges
 */
export function Sparkles({ isAnimating, buttonRef }: SparklesProps) {
  if (!isAnimating || !buttonRef.current) return null;
  
  const sparkles = [];
  const count = 30; // Medium number of sparkles
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 4 + 3; // Random size between 3-7px - medium size
    const duration = Math.random() * 0.5 + 0.5; // Random duration between 0.5-1.0s
    const delay = Math.random() * 0.2; // Random delay for staggered effect
    
    // Medium brightness colors
    const colors = [
      "#FFCC55", // Medium gold
      "#FF7799", // Medium pink
      "#66BBFF", // Medium blue
      "#AA99DD", // Medium purple
      "#77DDAA", // Medium green
      "#FFAA66", // Medium orange
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Position sparkles around the button border
    // Randomly choose which side of the button to start from
    let startPosition;
    let endPosition;
    
    // Determine starting position (on or near the button border)
    // Add more variety to starting positions - corners and edges
    const side = Math.floor(Math.random() * 8); // 0-1: top, 2-3: right, 4-5: bottom, 6-7: left
    
    switch (side) {
      case 0: // Top border - left half
        startPosition = {
          left: `${Math.random() * 50}%`,
          top: "0%",
        };
        endPosition = {
          x: (Math.random() - 0.8) * 100, // Mostly leftward
          y: -Math.random() * 60 - 20, // Always move upward from top
        };
        break;
      case 1: // Top border - right half
        startPosition = {
          left: `${50 + Math.random() * 50}%`,
          top: "0%",
        };
        endPosition = {
          x: (Math.random() + 0.3) * 100, // Mostly rightward
          y: -Math.random() * 60 - 20, // Always move upward from top
        };
        break;
      case 2: // Right border - top half
        startPosition = {
          left: "100%",
          top: `${Math.random() * 50}%`,
        };
        endPosition = {
          x: Math.random() * 60 + 20, // Always move rightward from right
          y: (Math.random() - 0.8) * 100, // Mostly upward
        };
        break;
      case 3: // Right border - bottom half
        startPosition = {
          left: "100%",
          top: `${50 + Math.random() * 50}%`,
        };
        endPosition = {
          x: Math.random() * 60 + 20, // Always move rightward from right
          y: (Math.random() + 0.3) * 100, // Mostly downward
        };
        break;
      case 4: // Bottom border - left half
        startPosition = {
          left: `${Math.random() * 50}%`,
          top: "100%",
        };
        endPosition = {
          x: (Math.random() - 0.8) * 100, // Mostly leftward
          y: Math.random() * 60 + 20, // Always move downward from bottom
        };
        break;
      case 5: // Bottom border - right half
        startPosition = {
          left: `${50 + Math.random() * 50}%`,
          top: "100%",
        };
        endPosition = {
          x: (Math.random() + 0.3) * 100, // Mostly rightward
          y: Math.random() * 60 + 20, // Always move downward from bottom
        };
        break;
      case 6: // Left border - top half
        startPosition = {
          left: "0%",
          top: `${Math.random() * 50}%`,
        };
        endPosition = {
          x: -Math.random() * 60 - 20, // Always move leftward from left
          y: (Math.random() - 0.8) * 100, // Mostly upward
        };
        break;
      case 7: // Left border - bottom half
      default:
        startPosition = {
          left: "0%",
          top: `${50 + Math.random() * 50}%`,
        };
        endPosition = {
          x: -Math.random() * 60 - 20, // Always move leftward from left
          y: (Math.random() + 0.3) * 100, // Mostly downward
        };
        break;
    }
    
    const style = {
      position: "absolute" as const,
      left: startPosition.left,
      top: startPosition.top,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: color,
      // No box-shadow for a cleaner look
      opacity: 0,
      zIndex: 1, // Above the button background but below the button content
      animation: `sparkle-${i} ${duration}s ease-out ${delay}s forwards`,
    };
    
    // Create a unique keyframe animation for each sparkle
    const keyframes = `
      @keyframes sparkle-${i} {
        0% {
          transform: scale(0.5);
          opacity: 0.8;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          transform: translate(${endPosition.x * 0.7}px, ${
      endPosition.y * 0.7
    }px) scale(0.9);
          opacity: 0;
        }
      }
    `;
    
    sparkles.push(
      <React.Fragment key={i}>
        <style>{keyframes}</style>
        <div style={style} />
      </React.Fragment>
    );
  }
  
  return <>{sparkles}</>;
}
