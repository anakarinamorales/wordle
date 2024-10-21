import { getWord } from '@/utils/api';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
  size: number;
  language: string;
};

export default function WordConfiguration({
  setApiWord,
}: {
  setApiWord: Dispatch<SetStateAction<string>>;
}) {
  const {
    getValues,
    register,
  } = useForm<FormInputs>();

  const handleFetchWord = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { size } = getValues();
    const word = await getWord(size);

    if (word) {
      setApiWord(word[0]);
      alert(`Guess word:  ${word[0]}`);
    }
  };

  return (
    <section>
      <h2>Configure your word:</h2>
      <form onSubmit={handleFetchWord}>
        <input {...register('size')} type='number' defaultValue={5} />
        <button type='submit'>Get word</button>
      </form>
    </section>
  );
}
