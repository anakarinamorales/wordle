import { useForm } from 'react-hook-form';
import Link from 'next/link';

import Button from '@/components/button';
import SneakPeak from '@/components/sneakPeak';
import OldAnswers from '@/components/oldAnswers';
import NewWordSetup from '@/components/newWordSetup/newWordSetup.context';

import wordle from '@/utils/wordle';

import styles from '@/styles/containers.module.css';
import { useWordContext } from '@/context/useWord';

type FormInputs = {
  userAnswer: string;
};

export type PreviousAttemptsStyle = { [key: string]: string };

export default function Home(): React.ReactElement {
  const {
    maxGuesses,
    numberOfAttempts,
    oldAnswers,
    rightAnswer,
    setOldAnswers,
    setRightAnswer,
    setUserAnswerStyle,
    userAnswerStyle,
  } = useWordContext();

  const {
    getValues,
    handleSubmit,
    register,
    reset: resetFormState,
    resetField,
  } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });


  const resetGame = () => {
    setRightAnswer('');
    setOldAnswers([]);
    setUserAnswerStyle([]);
    resetFormState({ userAnswer: '' });
  };

  const onSubmit = () => {
    const values = getValues('userAnswer');
    const userAnswer = values?.toLowerCase();

    // whole word matches
    if (userAnswer === rightAnswer.toLowerCase()) {
      alert(`You won! Number of attempts: ${numberOfAttempts}`);
      resetGame();
      return true;
    }

    // Check if it's last try
    if (numberOfAttempts >= maxGuesses) {
      alert(
        `You lost :( . The word was ${rightAnswer}. Number of attempts: ${numberOfAttempts}.`
      );
      resetGame();
      return false;
    }

    // if it's not last try
    setOldAnswers([...oldAnswers, userAnswer]);
    const wordleResult = wordle(userAnswer, rightAnswer);
    setUserAnswerStyle([...userAnswerStyle, wordleResult]);
    resetField('userAnswer');
    return true;
  };

  return (
    <main className={styles.mainContent}>
      <h1>
        <Link href='/'>WORDLE</Link>
      </h1>

      {!rightAnswer && <NewWordSetup />}

      {rightAnswer && (
        <>
          {oldAnswers && <OldAnswers />}

          <form className={styles.wordForm} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='userAnswer' hidden>
              Your answer
            </label>
            <input
              {...register('userAnswer', {
                maxLength: {
                  value: rightAnswer.length,
                  message: `This word exceeds word size. Word size is ${rightAnswer?.length}`,
                },
                minLength: {
                  value: rightAnswer.length,
                  message: `This word is smaller than the right word size. The right word has ${
                    rightAnswer?.length
                  } letters`,
                },
                required: 'Your attempt cannot be empty.',
              })}
              defaultValue=''
              disabled={numberOfAttempts > maxGuesses}
              type='text'
              pattern={`[a-zA-Z]*`}
              title='Only characters from A to Z. No symbols or numbers allowed'
            />

            {/* No button on design, but added it for accessibility */}
            <Button type='submit'>Check word</Button>
          </form>

          <SneakPeak answer={rightAnswer} />

          <Button type='button' onClick={resetGame}>
            Change word
          </Button>
        </>
      )}
    </main>
  );
}
