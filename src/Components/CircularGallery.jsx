import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import "../assets/css/CircularGallery.css";

const CircularGallery = ({
  projects = [],
  bend = 1,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollEase = 0.05,
  font = "bold 30px Orbitron",
  scrollSpeed = 2,
}) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const radius = projects.length > 0 ? (projects.length * 280) / (2 * Math.PI) : 400;
  const angleStep = 360 / projects.length;

  useEffect(() => {
    if (isDragging || hoveredIndex !== null) return;
    let animationFrameId;
    let currentRotation = rotation;

    const rotate = () => {
      currentRotation -= scrollSpeed * 0.1;
      setRotation(currentRotation);
      animationFrameId = requestAnimationFrame(rotate);
    };

    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, hoveredIndex, rotation, scrollSpeed]);

  const handleDrag = (event, info) => {
    setRotation((prev) => prev + info.delta.x * 0.5 * scrollSpeed);
  };

  return (
    <div
      className="circular-gallery-container"
      ref={containerRef}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="circular-gallery-scene"
        drag="x"
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={handleDrag}
        style={{
          transformStyle: "preserve-3d",
          rotateY: rotation,
        }}
      >
        {projects.map((project, i) => {
          const angle = i * angleStep;
          const isActive = false; // Add active logic if needed
          
          return (
            <motion.div
              key={project.id}
              className={`gallery-card-wrapper ${hoveredIndex === i ? 'hovered' : ''}`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="gallery-card-inner">
                {/* Front Side */}
                <div className="gallery-card-front" style={{ borderRadius: `${borderRadius * 100}px` }}>
                  <img src={project.image} alt={project.name} />
                  <div className="gallery-card-front-content">
                    <h3 style={{ color: textColor, font: font }}>{project.name}</h3>
                  </div>
                </div>

                {/* Back Side */}
                <div className="gallery-card-back" style={{ borderRadius: `${borderRadius * 100}px` }}>
                  <div className="gallery-card-back-content">
                    <h4>{project.category}</h4>
                    <p>{project.description}</p>
                    <div className="tech-stack">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} className="btn">
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CircularGallery;
