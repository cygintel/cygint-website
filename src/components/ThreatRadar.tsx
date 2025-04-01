import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Types for threat data
type Threat = {
  id: string;
  angle: number;
  distance: number; // 0-1 where 1 is the edge of the radar
  type: 'critical' | 'high' | 'medium' | 'low';
  name: string;
};

// Generate some sample threat data
const generateThreats = (count: number): Threat[] => {
  const threatTypes: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low'];
  const threats: Threat[] = [];
  
  const threatNames = [
    'SQL Injection',
    'Cross-site Scripting',
    'DDOS Attempt',
    'Brute Force',
    'Unauthorized Access',
    'Data Exfiltration',
    'Ransomware',
    'Privilege Escalation',
    'Insecure API',
    'Outdated Software'
  ];
  
  for (let i = 0; i < count; i++) {
    threats.push({
      id: `threat-${i}`,
      angle: Math.random() * 360,
      distance: 0.2 + Math.random() * 0.8, // Keep threats away from center
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      name: threatNames[Math.floor(Math.random() * threatNames.length)]
    });
  }
  
  return threats;
};

interface ThreatRadarProps {
  width?: number;
  height?: number;
  className?: string;
}

const ThreatRadar: React.FC<ThreatRadarProps> = ({
  width = 500,
  height = 500,
  className = '',
}) => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize threats
  useEffect(() => {
    // Start with some initial threats
    setThreats(generateThreats(8));
    
    // Periodically update threats
    intervalRef.current = setInterval(() => {
      setThreats(prev => {
        // Remove some threats
        const remainingThreats = prev
          .filter(() => Math.random() > 0.2) // 20% chance to remove a threat
          .map(threat => ({
            ...threat,
            // Move threats slightly
            angle: (threat.angle + (Math.random() * 10 - 5)) % 360,
            distance: Math.max(0.2, Math.min(1, threat.distance + (Math.random() * 0.1 - 0.05)))
          }));
        
        // Add new threats occasionally
        const newThreats = Math.random() > 0.6 ? generateThreats(1) : [];
        
        return [...remainingThreats, ...newThreats];
      });
    }, 2000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Get threat color based on type
  const getThreatColor = (type: Threat['type']) => {
    switch (type) {
      case 'critical': return 'rgba(239, 68, 68, 0.9)'; // red
      case 'high': return 'rgba(249, 115, 22, 0.9)'; // orange
      case 'medium': return 'rgba(234, 179, 8, 0.9)'; // yellow
      case 'low': return 'rgba(34, 197, 94, 0.9)'; // green
      default: return 'rgba(59, 130, 246, 0.9)'; // blue
    }
  };
  
  // Calculate position of a threat on the radar
  const getThreatPosition = (threat: Threat) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = (Math.min(width, height) / 2) * threat.distance;
    const angleInRadians = (threat.angle * Math.PI) / 180;
    
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Radar background */}
      <div className="absolute inset-0 rounded-full bg-background/40 backdrop-blur-sm border border-border"></div>
      
      {/* Radar circles */}
      {[0.25, 0.5, 0.75, 1].map((radius, i) => (
        <div 
          key={`circle-${i}`}
          className="absolute rounded-full border border-primary/20"
          style={{
            top: `${50 - radius * 50}%`,
            left: `${50 - radius * 50}%`,
            width: `${radius * 100}%`,
            height: `${radius * 100}%`
          }}
        ></div>
      ))}
      
      {/* Radar cross lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/20 -translate-x-px"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-primary/20 -translate-y-px"></div>
      </div>
      
      {/* Rotating radar line */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary/80 to-transparent origin-left"
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "linear"
        }}
        style={{ transformOrigin: 'left center' }}
      ></motion.div>
      
      {/* Threats */}
      {threats.map(threat => {
        const pos = getThreatPosition(threat);
        const isSelected = selectedThreat?.id === threat.id;
        
        return (
          <motion.div
            key={threat.id}
            className="absolute cursor-pointer"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedThreat(isSelected ? null : threat)}
          >
            <div 
              className="rounded-full shadow-glow"
              style={{ 
                width: isSelected ? 16 : 12, 
                height: isSelected ? 16 : 12, 
                backgroundColor: getThreatColor(threat.type),
                boxShadow: `0 0 10px ${getThreatColor(threat.type)}`
              }} 
            />
            
            {isSelected && (
              <div 
                className="absolute left-full ml-2 px-3 py-1.5 bg-card border border-border rounded-md shadow-md whitespace-nowrap text-xs"
                style={{ transform: 'translateY(-50%)' }}
              >
                <p className="font-medium">{threat.name}</p>
                <p className="text-muted-foreground capitalize">{threat.type} severity</p>
              </div>
            )}
          </motion.div>
        );
      })}
      
      {/* Center dot */}
      <div 
        className="absolute rounded-full bg-primary/80 animate-pulse"
        style={{
          width: 6,
          height: 6,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 text-xs bg-card/80 backdrop-blur-sm rounded-md border border-border p-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThreatColor('critical') }}></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThreatColor('high') }}></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThreatColor('medium') }}></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getThreatColor('low') }}></div>
            <span>Low</span>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-xs text-muted-foreground">
        Click on a threat to view details
      </div>
    </div>
  );
};

export default ThreatRadar;