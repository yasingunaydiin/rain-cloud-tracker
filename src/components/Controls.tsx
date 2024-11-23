'use client';

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const colorSchemes = [
  { value: 0, label: 'Black and White Values' },
  { value: 1, label: 'Original' },
  { value: 2, label: 'Universal Blue' },
  { value: 3, label: 'TITAN' },
  { value: 4, label: 'The Weather Channel' },
  { value: 5, label: 'Meteored' },
  { value: 6, label: 'NEXRAD Level-III' },
  { value: 7, label: 'RAINBOW @ SELEX-SI' },
  { value: 8, label: 'Dark Sky' },
  { value: 255, label: 'Raw Source' },
];

interface ControlsProps {
  options: {
    kind: string;
    colorScheme: number;
    // ... other options
  };
  onUpdateOptions: (options: any) => void;
  onPlayStop: () => void;
  onPrevFrame: () => void;
  onNextFrame: () => void;
  isPlaying: boolean;
}

export default function Controls({
  options,
  onUpdateOptions,
  onPlayStop,
  onPrevFrame,
  onNextFrame,
  isPlaying,
}: ControlsProps) {
  const handleColorSchemeChange = (value: string) => {
    onUpdateOptions({
      ...options,
      colorScheme: parseInt(value),
    });
  };

  return (
    <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50'>
      <div className='bg-background/80 backdrop-blur-lg rounded-full border border-border shadow-lg p-2 px-4'>
        <div className='flex items-center gap-4'>
          <RadioGroup
            defaultValue={options.kind}
            onValueChange={(value) =>
              onUpdateOptions({ ...options, kind: value })
            }
            className='flex items-center'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='radar' id='radar' />
              <label htmlFor='radar' className='text-sm'>
                Radar
              </label>
            </div>
            <div className='flex items-center space-x-2 ml-4'>
              <RadioGroupItem value='satellite' id='satellite' />
              <label htmlFor='satellite' className='text-sm'>
                Satellite
              </label>
            </div>
          </RadioGroup>

          <Separator orientation='vertical' className='h-6' />

          <Select
            value={options.colorScheme.toString()}
            onValueChange={handleColorSchemeChange}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select color scheme' />
            </SelectTrigger>
            <SelectContent>
              {colorSchemes.map((scheme) => (
                <SelectItem key={scheme.value} value={scheme.value.toString()}>
                  {scheme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation='vertical' className='h-6' />

          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={onPrevFrame}
              className='h-8 w-8'
            >
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={onPlayStop}
              className='h-8 w-8'
            >
              {isPlaying ? (
                <PauseIcon className='h-4 w-4' />
              ) : (
                <PlayIcon className='h-4 w-4' />
              )}
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={onNextFrame}
              className='h-8 w-8'
            >
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='m15 18-6-6 6-6' />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <polygon points='5 3 19 12 5 21 5 3' />
    </svg>
  );
}

function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <rect width='4' height='16' x='6' y='4' />
      <rect width='4' height='16' x='14' y='4' />
    </svg>
  );
}
