import React, { useState, useEffect } from 'react';
import './AppLoader.css';

interface AppLoaderProps {
  type?: 'market' | 'network' | 'dashboard' | 'form' | 'general';
}

const contentMap = {
  market: [
    "Global Commerce, Connected and Redefined.",
    "The Birth of a Decentralized Market.",
    "Explore Endless Commerce Opportunities.",
    "Empowering Local and Global Trade with Every Pi.",
    "Browse and Trade across the New Digital Silk Road."
  ],
  network: [
    "Scanning the Decentralized Map Layers...",
    "Syncing with Global Pi Nodes.",
    "Discovering New Trade Quadrants."
  ],
  dashboard: [
    "Analyzing Your Merchant Performance...",
    "Securing Your Pi Balance Hub.",
    "Fetching Real-time Store Insights."
  ],
  form: [
    "Processing Secure Transaction...",
    "Validating Asset Integrity.",
    "Finalizing Your Trade Intent."
  ],
  general: [
    "MaplyPi: The Future of Commerce.",
    "Connecting the World via Pi Mainnet.",
    "Loading Your Digital Experience."
  ]
};

const AppLoader: React.FC<AppLoaderProps> = ({ type = 'general' }) => {
  const [textIndex, setTextIndex] = useState(0);
  const currentTexts = contentMap[type];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % currentTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentTexts]);

  return (
    <div className="app-loader-overlay">
      <div className="loader-glass-card">
        {/* الشعار الدائري الذي يلف حول نفسه */}
        <div className="loader-spinning-logo"></div>

        <div className="loader-text-wrapper">
          <p className="loader-dynamic-text" key={textIndex}>
            {currentTexts[textIndex]}
          </p>
        </div>

        <div className="loader-status-tag">
          Initializing {type} Modules
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
