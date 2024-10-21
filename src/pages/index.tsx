import { getWord } from '@/utils/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
  answer: string;
};

export default function Home(): React.ReactElement {
  const [currentRow, setCurrentRow] = useState(() => 1);
  const [apiWord, setApiWord] = useState(() => '');
  const [previousAttempts, setPreviousAttempts] = useState<string[]>(() => []);
  const maxGuess = 5;

  const {
    getValues,
    register,
    resetField,
    reset: resetFormState,
  } = useForm<FormInputs>();

  const handleFetchWord = async () => {
    // event.preventDefault();
    const word = await getWord(5);

    if (word) {
      setApiWord(word[0]);
      alert(`Guess word:  ${word[0]}`);
    }
  };

  const resetGame = () => {
    setApiWord('');
    setCurrentRow(1);
    resetFormState({ answer: '' });
    handleFetchWord();
    setPreviousAttempts([]);
  };

  const handleAttempt = (event: React.FormEvent) => {
    event?.preventDefault();
    const values = getValues('answer');
    const currentWord = values;

    // check if word matches
    if (currentWord && currentWord === apiWord) {
      console.log('WON!');
      alert(`You won! Number of attempts: ${currentRow}`);
      resetGame();
      // reset form
    }

    // Word doesn't match
    if (currentWord && currentWord !== apiWord) {
      // If it's last attempt
      if (currentRow >= maxGuess) {
        console.log('LOST!');
        alert(
          `You lost :( . The word was ${apiWord}. Number of attempts: ${currentRow}.`
        );
        // reset game state
        resetGame();
        return false;
      }

      resetField('answer');
      console.log('TRY AGAIN!');
      setPreviousAttempts([...previousAttempts, currentWord]);
      setCurrentRow(currentRow + 1);
      return true;
    }
  };

  return (
    <>
      <button type='button' onClick={handleFetchWord}>
        Fetch word
      </button>

      <form onSubmit={handleAttempt}>
        <br />
        {previousAttempts &&
          previousAttempts.map((item, index) => {
            console.log(item, index);
            return (
              <span key={`${item}${index}`}>
                {item}
                <br />
              </span>
            );
          })}

        <br />
        <input
          {...register('answer')}
          type='text'
          disabled={currentRow > maxGuess}
          defaultValue=''
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
