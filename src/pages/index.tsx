import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

import Button from '@/components/button';
import SneakPeak from '@/components/sneakPeak';
import WordConfiguration from '@/components/wordConfig';

import compareWords from '@/utils/compareWords';

import styles from '@/styles/containers.module.css';
import UserAnswers from '@/components/userAnswers';

type FormInputs = {
  answer: string;
};

export type PreviousAttemptsStyle = { [key: string]: string };

export default function Home(): React.ReactElement {
  const [currentRow, setCurrentRow] = useState(() => 1);
  const [apiWord, setApiWord] = useState(() => '');
  const [previousAttempts, setPreviousAttempts] = useState<string[]>(() => []);
  const maxGuess = 5;
  const [wordStyleByLetter, setWordStyleByLetter] = useState<PreviousAttemptsStyle[]>(
    [] as PreviousAttemptsStyle[]
  );

  const {
    getValues,
    register,
    resetField,
    reset: resetFormState,
  } = useForm<FormInputs>();

  const resetGame = () => {
    setApiWord('');
    setCurrentRow(1);
    resetFormState({ answer: '' });
    setWordStyleByLetter([]);
    setPreviousAttempts([]);
  };

  const handleAttempt = (event: React.FormEvent) => {
    event?.preventDefault();
    const values = getValues('answer');
    const currentWord = values;

    // whole word matches
    if (currentWord && currentWord === apiWord) {
      console.log('WON!');
      alert(`You won! Number of attempts: ${currentRow}`);
      resetGame();
      return true;
    }

    // Whole word doesn't match
    if (currentWord && currentWord !== apiWord) {
      // Check if it's last possible attempt
      if (currentRow >= maxGuess) {
        alert(
          `You lost :( . The word was ${apiWord}. Number of attempts: ${currentRow}.`
        );
        resetGame();
        return false;
      }

      resetField('answer');
      setPreviousAttempts([...previousAttempts, currentWord]);
      setCurrentRow(currentRow + 1);
      const newStyles = wordStyleByLetter;
      const result = compareWords(currentWord, apiWord);
      newStyles.push(result);
      setWordStyleByLetter(newStyles);
      return true;
    }
  };

  return (
    <main className={styles.mainContent}>
      <h1>
        <Link href='/'>WORDLE</Link>
      </h1>

      {!apiWord && <WordConfiguration setApiWord={setApiWord} />}

      {apiWord && (
        <>
          {previousAttempts && (
            <UserAnswers
              previousAnswers={previousAttempts}
              wordStyleByLetter={wordStyleByLetter}
            />
          )}
          <form className={styles.mainForm} onSubmit={handleAttempt}>
            <input
              {...register('answer', {
                min: 1,
                max: apiWord.length,
              })}
              type='text'
              disabled={currentRow > maxGuess}
              defaultValue=''
            />

            {/* No button on design, but added it for accessibility */}
            <Button type='submit'>Check word</Button>
          </form>

          <SneakPeak answer={apiWord} />
        </>
      )}
    </main>
  );
}
