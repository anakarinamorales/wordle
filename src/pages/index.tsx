import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/button';
import SneakPeak from '@/components/sneakPeak';
import OldAnswers from '@/components/oldAnswers';
import NewWordSetup from '@/components/newWordSetup';

import wordle from '@/utils/wordle';

import styles from '@/styles/containers.module.css';

type FormInputs = {
  userAnswer: string;
};

export type PreviousAttemptsStyle = { [key: string]: string };

export default function Home(): React.ReactElement {
  const [rightAnswer, setRightAnswer] = useState(() => '');
  const [previousAnswers, setPreviousAnswers] = useState<string[]>(() => []);
  const [previousAnswersColors, setPreviousAnswersColors] = useState<
    PreviousAttemptsStyle[]
    >([] as PreviousAttemptsStyle[]);  
  const {
    getValues,
    register,
    resetField,
    reset: resetFormState,
    handleSubmit,
  } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });
  const numberOfTries = useMemo(
    () => previousAnswers.length + 1,
    [previousAnswers]
  );
  const maxGuesses = 5;

  const resetGame = () => {
    setRightAnswer('');
    setPreviousAnswers([]);
    setPreviousAnswersColors([]);
    resetFormState({ userAnswer: '' });
  };

  const onSubmit = () => {
    const values = getValues('userAnswer');
    const userAnswer = values;

    // whole word matches
    if (userAnswer && userAnswer === rightAnswer) {
      alert(`You won! Number of attempts: ${numberOfTries}`);
      resetGame();
      return true;
    }

        if (userAnswer && userAnswer !== rightAnswer) {
      // Check if it's last try
      if (numberOfTries >= maxGuesses) {
        alert(
          `You lost :( . The word was ${rightAnswer}. Number of attempts: ${numberOfTries}.`
        );
        resetGame();
        return false;
      }

      // if it's not last try
      setPreviousAnswers([...previousAnswers, userAnswer]);
      const answersColors = wordle(userAnswer, rightAnswer);
      setPreviousAnswersColors([...previousAnswersColors, answersColors]);
      resetField('userAnswer');
      return true;
    }
  };

  return (
    <main className={styles.mainContent}>
      <h1>
        <Link href='/'>WORDLE</Link>
      </h1>

      {!rightAnswer && <NewWordSetup setRightAnswer={setRightAnswer} />}

      {rightAnswer && (
        <>
          {previousAnswers && (
            <OldAnswers
              previousAnswers={previousAnswers}
              previousAnswersColors={previousAnswersColors}
            />
          )}
          <form className={styles.wordForm} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='userAnswer' hidden>
              Your answer
            </label>
            <input
              {...register('userAnswer', {
                maxLength: {
                  value: rightAnswer.length,
                  message: `This input exceed word size. Word size is ${rightAnswer.length}`,
                },
                minLength: 1,
                required: 'Word cannot be empty.',
              })}
              defaultValue=''
              disabled={numberOfTries > maxGuesses}
              type='text'
            />

            {/* No button on design, but added it for accessibility */}
            <Button type='submit'>Check word</Button>
          </form>

          <SneakPeak answer={rightAnswer} />

          <Button type='button' onClick={resetGame}>Change word</Button>
        </>
      )}
    </main>
  );
}
