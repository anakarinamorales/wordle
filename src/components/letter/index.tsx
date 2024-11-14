import { STATE_OPTIONS } from '@/utils/wordle';

type ColorOptions = Record<number, string>;

const COLOR_OPTIONS = {
  [STATE_OPTIONS.DEFAULT]: 'unset',
  [STATE_OPTIONS.EXISTS]: 'var(--color-warning)',
  [STATE_OPTIONS.CORRECT]: 'var(--color-success)',
} as ColorOptions;


export default function GridLetter({
  style,
  char,
}: {
  char: string;
  style: number;
  }) {
  const letterStyle = { color: COLOR_OPTIONS[style] };
  
  return <span style={letterStyle}>{char}</span>;
}
