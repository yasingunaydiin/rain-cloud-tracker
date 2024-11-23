'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Controls from './Controls';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function WeatherMapClient() {
  const [timestamp, setTimestamp] = useState(new Date().toString());
  const [apiData, setApiData] = useState<any>(null);
  const [mapFrames, setMapFrames] = useState<any[]>([]);
  const [animationPosition, setAnimationPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [options, setOptions] = useState({
    kind: 'radar',
    colorScheme: 2,
    tileSize: 256,
    smoothData: 1,
    snowColors: 1,
    extension: 'png',
  });

  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        initialize(data, options.kind);
      });
  }, []);

  const initialize = (api: any, kind: string) => {
    if (!api) return;

    let frames = [];
    if (kind === 'satellite' && api.satellite?.infrared) {
      frames = api.satellite.infrared;
      const lastPastFrame = frames.length - 1;
      setAnimationPosition(lastPastFrame);
    } else if (api.radar?.past) {
      frames = [...api.radar.past];
      if (api.radar.nowcast) {
        frames = frames.concat(api.radar.nowcast);
      }
      // Set position to the last past frame (current time)
      const lastPastFrame = api.radar.past.length - 1;
      setAnimationPosition(lastPastFrame);
    }
    setMapFrames(frames);
  };

  const handleUpdateOptions = (newOptions: Partial<typeof options>) => {
    setOptions((prev) => ({
      ...prev,
      ...newOptions,
      colorScheme: 2,
    }));
    if (apiData) {
      initialize(apiData, newOptions.kind || options.kind);
    }
  };

  return (
    <>
      <Controls
        options={options}
        onUpdateOptions={handleUpdateOptions}
        onPlayStop={() => setIsPlaying(!isPlaying)}
        onPrevFrame={() => setAnimationPosition((prev) => prev - 1)}
        onNextFrame={() => setAnimationPosition((prev) => prev + 1)}
        isPlaying={isPlaying}
      />
      <div className='absolute top-[50px] left-0 right-0 h-[30px] text-center'>
        {timestamp}
      </div>
      <Map
        apiData={apiData}
        mapFrames={mapFrames}
        options={options}
        animationPosition={animationPosition}
        isPlaying={isPlaying}
        onSetTimestamp={setTimestamp}
      />
    </>
  );
}
