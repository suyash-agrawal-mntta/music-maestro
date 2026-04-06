import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      
      // Throttle particle creation slightly to avoid DOM overload
      if (now - lastTime < 30) return;
      
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      
      // Only spawn particles if mouse moved a bit
      if (distance > 10) {
        setParticles((prev) => [
          ...prev,
          {
            id: `${now}-${Math.random()}`,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
          },
        ].slice(-30)); // Keep maximum 30 particles at once
        
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.8, x: p.x - p.size / 2, y: p.y - p.size / 2, rotate: p.rotation }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              y: p.y - 40, // Float upwards
              rotate: p.rotation + 90 // Spin slightly
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(0,255,136,0.8) 0%, rgba(0,51,204,0) 80%)`,
              boxShadow: "0 0 10px rgba(0,255,136,0.5)",
            }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
