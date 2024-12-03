import { STATE_OPTIONS } from '@/utils/wordle';

import styles from "./letter.module.css";

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
  const letterStyle = { backgroundColor: COLOR_OPTIONS[style] };
  const statusIconStyle = style !== STATE_OPTIONS.DEFAULT ? style === STATE_OPTIONS.CORRECT ? styles.checkmark : styles.circle : ''; 
  
  return (
    <span
      style={letterStyle}
      className={`${styles.letterContainer} ${styles.status} ${statusIconStyle}`}
    >
      {char}
    </span>
  );
}
