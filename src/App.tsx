import React, { useEffect, useRef, useState } from 'react';
import { createDecartClient, models } from '@decartai/sdk';
import './App.css';

interface RealtimeClient {
  setPrompt: (prompt: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [prompt, setPrompt] = useState('Change the person\'s shirt to red');
  const [newPrompt, setNewPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const realtimeClientRef = useRef<RealtimeClient | null>(null);

  useEffect(() => {
    const initializeRealtimeEditor = async () => {
      try {
        // Check for API key
        const apiKey = process.env.REACT_APP_DECART_API_KEY;
        if (!apiKey) {
          throw new Error('REACT_APP_DECART_API_KEY environment variable is not set');
        }

        // Create Decart client
        const client = createDecartClient({ apiKey });

        // Get model configuration
        const model = models.realtime('lucy-2.5');

        // Get user media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: model.fps,
            width: model.width,
            height: model.height,
          },
        });

        // Connect to realtime service
        const realtimeClient = await client.realtime.connect(stream, {
          model,
          mirror: 'auto',
          onRemoteStream: (editedStream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = editedStream;
            }
          },
          initialState: {
            prompt: { text: prompt },
          },
        });

        realtimeClientRef.current = realtimeClient;
        setIsConnected(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize realtime editor';
        setError(errorMessage);
        console.error('Error initializing realtime editor:', err);
      }
    };

    initializeRealtimeEditor();

    return () => {
      if (realtimeClientRef.current) {
        realtimeClientRef.current.disconnect().catch(console.error);
      }
    };
  }, [prompt]);

  const handleUpdatePrompt = async () => {
    if (!realtimeClientRef.current || !newPrompt.trim()) {
      return;
    }

    try {
      await realtimeClientRef.current.setPrompt(newPrompt);
      setPrompt(newPrompt);
      setNewPrompt('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update prompt';
      setError(errorMessage);
      console.error('Error updating prompt:', err);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Decart AI Real-time Video Editor</h1>

        {error && <div className="error-banner">{error}</div>}

        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="video-element"
          />
          {!isConnected && <div className="loading">Connecting...</div>}
        </div>

        <div className="controls">
          <div className="current-prompt">
            <h2>Current Prompt</h2>
            <p>{prompt}</p>
          </div>

          <div className="prompt-input">
            <h2>Update Prompt</h2>
            <textarea
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Enter a new edit instruction..."
              disabled={!isConnected}
            />
            <button
              onClick={handleUpdatePrompt}
              disabled={!isConnected || !newPrompt.trim()}
              className="update-button"
            >
              Update Prompt
            </button>
          </div>
        </div>

        <div className="info">
          <p>Status: {isConnected ? '🟢 Connected' : '🟡 Connecting...'}</p>
          <p>Model: lucy-2.5</p>
        </div>
      </div>
    </div>
  );
};

export default App;
