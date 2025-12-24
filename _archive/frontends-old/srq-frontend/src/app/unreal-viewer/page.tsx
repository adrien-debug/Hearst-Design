'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Power,
  PowerOff,
  RefreshCw,
  Maximize,
  ExternalLink,
  Monitor,
  Cpu,
  Gamepad2,
  Settings,
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  PanelRightClose,
  Plane,
  ArrowUp,
  ArrowDown,
  ArrowRight as ArrowRightIcon,
  Eye,
  Grid3X3,
  Thermometer,
  Box,
  Zap,
  Snowflake,
  WifiOff,
} from 'lucide-react';

// ============================================
// CONFIGURATION
// ============================================

const PIXEL_STREAMING_PLAYER = 'https://share.arcware.cloud/v1/share-42dc0370-359f-47e0-98e8-0aa265062dea';

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function UnrealViewerPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [streamActive, setStreamActive] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('4K Ultra');
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('aerial');
  const [selectedViewMode, setSelectedViewMode] = useState('normal');
  const [layers, setLayers] = useState({
    containers: true,
    powerBlocks: true,
    cooling: true,
    gridOverlay: false,
  });
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Simulate connection
  useEffect(() => {
    if (streamActive) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsConnected(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [streamActive]);

  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen?.();
    }
  };

  const handleDisconnect = () => {
    if (streamActive) {
      setStreamActive(false);
      setIsConnected(false);
    } else {
      setStreamActive(true);
      setIsLoading(true);
    }
  };

  const cameras = [
    { id: 'aerial', name: 'Aerial', icon: Plane },
    { id: 'north', name: 'North', icon: ArrowUp },
    { id: 'south', name: 'South', icon: ArrowDown },
    { id: 'east', name: 'East', icon: ArrowRightIcon },
  ];

  const viewModes = [
    { id: 'normal', name: 'Normal', active: true },
    { id: 'wireframe', name: 'Wireframe', active: false },
    { id: 'thermal', name: 'Thermal', active: false },
  ];

  return (
    <div className="h-screen bg-dark-900 flex flex-col overflow-hidden">
      {/* ============================================
          TOP BAR
          ============================================ */}
      <header className="flex-shrink-0 border-b border-grey-100 bg-dark-800/90 backdrop-blur-sm z-50">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left - Navigation */}
            <div className="flex items-center gap-3">
              <Link href="/" className="btn-secondary p-2">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="badge badge-success text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-hearst-green" />
                UE5
              </span>
              <span className="badge bg-info/20 text-info border border-info/30 text-[10px]">
                Arcware Cloud
              </span>
            </div>

            {/* Center - Title */}
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-hearst-green" />
              <h1 className="text-lg font-bold text-white">Mining Facility Qatar</h1>
              <span className="text-sm text-grey-400">3D Visualization</span>
            </div>

            {/* Right - Status & Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDisconnect}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  streamActive
                    ? 'bg-error/20 text-error hover:bg-error/30'
                    : 'bg-hearst-green/20 text-hearst-green hover:bg-hearst-green/30'
                }`}
              >
                {streamActive ? (
                  <>
                    <PowerOff className="w-4 h-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4" />
                    Start
                  </>
                )}
              </button>
              <span className={`badge ${isConnected ? 'badge-success' : 'badge-error'} text-[10px]`}>
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-hearst-green animate-pulse-green' : 'bg-error'}`} />
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Panel - Cameras & Layers */}
        <div 
          className={`flex-shrink-0 w-48 bg-dark-800/80 backdrop-blur-sm border-r border-grey-100 transition-all duration-300 ${
            showLeftPanel ? 'translate-x-0' : '-translate-x-full absolute left-0 h-full z-40'
          }`}
        >
          <div className="p-4 space-y-6">
            {/* Cameras */}
            <div>
              <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-3">Cameras</h3>
              <div className="grid grid-cols-2 gap-2">
                {cameras.map(cam => {
                  const Icon = cam.icon;
                  return (
                    <button
                      key={cam.id}
                      onClick={() => setSelectedCamera(cam.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                        selectedCamera === cam.id
                          ? 'bg-hearst-green text-black'
                          : 'bg-dark-700 text-grey-400 hover:text-white hover:bg-dark-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-medium">{cam.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Modes */}
            <div>
              <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-3">View Modes</h3>
              <div className="space-y-1">
                {viewModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedViewMode(mode.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedViewMode === mode.id
                        ? 'bg-hearst-green text-black font-medium'
                        : 'text-grey-400 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Layers */}
            <div>
              <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide mb-3">Layers</h3>
              <div className="space-y-2">
                {[
                  { id: 'containers', label: 'Containers', icon: Box },
                  { id: 'powerBlocks', label: 'Power Blocks', icon: Zap },
                  { id: 'cooling', label: 'Cooling', icon: Snowflake },
                  { id: 'gridOverlay', label: 'Grid Overlay', icon: Grid3X3 },
                ].map(layer => {
                  const Icon = layer.icon;
                  const isActive = layers[layer.id as keyof typeof layers];
                  return (
                    <label key={layer.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setLayers(prev => ({ ...prev, [layer.id]: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-hearst-green border-hearst-green' 
                          : 'border-grey-400 group-hover:border-white'
                      }`}>
                        {isActive && <span className="text-[10px] text-black font-bold">✓</span>}
                      </div>
                      <Icon className={`w-3 h-3 ${isActive ? 'text-hearst-green' : 'text-grey-400'}`} />
                      <span className={`text-sm ${isActive ? 'text-white' : 'text-grey-400'}`}>
                        {layer.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Video Stream */}
        <div className="flex-1 relative bg-dark-900">
          {/* Panel Toggle - Left */}
          <button
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-dark-700/80 backdrop-blur-sm rounded-lg text-grey-400 hover:text-white transition-all"
          >
            {showLeftPanel ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>

          {/* Panel Toggle - Right */}
          <button
            onClick={() => setShowRightPanel(!showRightPanel)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-dark-700/80 backdrop-blur-sm rounded-lg text-grey-400 hover:text-white transition-all"
          >
            {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
          </button>

          {/* Loading State */}
          {isLoading && streamActive && (
            <div className="absolute inset-0 z-30 bg-dark-900 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-hearst-green/30 border-t-hearst-green rounded-full animate-spin mb-4" />
              <p className="text-white font-medium">Connecting to Arcware Cloud...</p>
              <p className="text-sm text-grey-500 mt-1">Establishing WebRTC connection</p>
            </div>
          )}

          {/* Disconnected State */}
          {!streamActive && (
            <div className="absolute inset-0 z-30 bg-dark-900 flex flex-col items-center justify-center">
              <WifiOff className="w-16 h-16 text-grey-400 mb-4" />
              <p className="text-white font-medium">Stream stopped</p>
              <button
                onClick={handleDisconnect}
                className="mt-4 btn-primary"
              >
                Resume
              </button>
            </div>
          )}

          {/* Iframe */}
          {streamActive && (
            <iframe
              ref={iframeRef}
              src={PIXEL_STREAMING_PLAYER}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; microphone; camera"
              allowFullScreen
            />
          )}

          {/* Bottom Toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-dark-800/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-grey-100">
            <button
              onClick={handleRefresh}
              className="p-2 text-grey-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-grey-100" />
            <button
              onClick={handleFullscreen}
              className="p-2 text-grey-400 hover:text-white transition-colors"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-grey-100" />
            <a
              href={PIXEL_STREAMING_PLAYER}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-grey-400 hover:text-white transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="w-px h-6 bg-grey-100" />
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="bg-transparent text-sm text-white border-none outline-none cursor-pointer"
            >
              <option value="4K Ultra" className="bg-dark-700">4K Ultra</option>
              <option value="1080p" className="bg-dark-700">1080p</option>
              <option value="720p" className="bg-dark-700">720p</option>
              <option value="Auto" className="bg-dark-700">Auto</option>
            </select>
          </div>
        </div>

        {/* Right Panel - Info & Stats */}
        <div 
          className={`flex-shrink-0 w-48 bg-dark-800/80 backdrop-blur-sm border-l border-grey-100 transition-all duration-300 ${
            showRightPanel ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full z-40'
          }`}
        >
          <div className="p-4 space-y-6">
            {/* Server Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-4 h-4 text-hearst-green" />
                <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide">Server Info</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Host</span>
                  <span className="text-xs text-white font-mono">Arcware</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Resolution</span>
                  <span className="text-xs text-white font-mono">4K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">FPS</span>
                  <span className="text-xs text-hearst-green font-mono">60</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Latency</span>
                  <span className="text-xs text-hearst-green font-mono">~20ms</span>
                </div>
              </div>
            </div>

            {/* GPU Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-hearst-green" />
                <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide">GPU Info</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Model</span>
                  <span className="text-xs text-white font-mono">RTX 4090</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Usage</span>
                  <span className="text-xs text-hearst-green font-mono">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">VRAM</span>
                  <span className="text-xs text-white font-mono">12/24 GB</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="w-4 h-4 text-hearst-green" />
                <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide">Controls</h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-grey-300 font-mono text-[10px]">WASD</kbd>
                  <span className="text-grey-400">Move</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-grey-300 font-mono text-[10px]">Mouse</kbd>
                  <span className="text-grey-400">Look</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-grey-300 font-mono text-[10px]">F</kbd>
                  <span className="text-grey-400">Fullscreen</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-dark-600 rounded text-grey-300 font-mono text-[10px]">Esc</kbd>
                  <span className="text-grey-400">Exit</span>
                </div>
              </div>
            </div>

            {/* Scene Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-hearst-green" />
                <h3 className="text-xs font-semibold text-grey-400 uppercase tracking-wide">Scene Info</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Containers</span>
                  <span className="text-xs text-white font-mono">48</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Miners</span>
                  <span className="text-xs text-white font-mono">5,760</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-grey-500">Polygons</span>
                  <span className="text-xs text-white font-mono">2.4M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          BOTTOM STATUS BAR
          ============================================ */}
      <footer className="flex-shrink-0 border-t border-grey-100 bg-dark-800/90 backdrop-blur-sm">
        <div className="px-4 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-3 h-3 text-hearst-green" />
                <span className="text-grey-400">Pixel Streaming</span>
              </div>
              <div className="w-px h-3 bg-grey-100" />
              <span className="text-grey-400">Unreal Engine 5.4</span>
              <div className="w-px h-3 bg-grey-100" />
              <span className="text-grey-400">Lumen + Nanite</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-hearst-green animate-pulse-green' : 'bg-error'}`} />
              <span className={`text-xs ${isConnected ? 'text-hearst-green' : 'text-error'}`}>
                {isConnected ? 'Stream OK' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

