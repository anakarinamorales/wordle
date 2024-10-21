import Letter from '@/components/letter';
import WordConfiguration from '@/components/wordConfig';
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
  const [wordStyleByLetter, setWordStyleByLetter] = useState<{
    [key: number]: string;
  }>(() => ({}));

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
    setPreviousAttempts([]);
  };

  const compareWords = (currentWord: string) => {
    const result: { [key: number]: string } = {};
    for (let i = 0; i < currentWord.length; i++) {
      const letterIndex = apiWord.indexOf(currentWord[i]);
      result[i] =
        letterIndex !== -1 ? (letterIndex === i ? 'green' : 'orange') : 'black';
    }

    return result;
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
      const result = compareWords(currentWord);
      setWordStyleByLetter(result);
      return true;
    }
  };

  return (
    <main>
      <h1>WORDLE</h1>
      
      {!apiWord && <WordConfiguration setApiWord={setApiWord} />}

      <form onSubmit={handleAttempt}>
        <br />
        {previousAttempts &&
          previousAttempts.map((item, wordIndex) => {
            return (
              <span key={`${item}${wordIndex}`}>
                {item.split('').map((letter, letterIndex) => {
                  const letterColor = wordStyleByLetter[letterIndex];
                  return (
                    <Letter
                      key={letter + letterIndex}
                      color={letterColor}
                      letter={letter}
                    />
                  );
                })}
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
    </main>
  );
}