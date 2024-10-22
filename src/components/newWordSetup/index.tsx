import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/button';

import { getWord } from '@/utils/api';

import styles from './newWordSetup.module.css';

type FormInputs = {
  size: number;
  language: string;
};

export default function NewWordSetup({
  setRightAnswer,
}: {
  setRightAnswer: Dispatch<SetStateAction<string>>;
}) {
  const { getValues, register, handleSubmit } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });

  const handleFetchWord = async () => {
    const { size } = getValues();
    const word = await getWord(size);

    if (word) {
      setRightAnswer(word[0]);
    }
  };

  return (
    <section className={styles.setupContainer}>
      <h2>Configure the size of your word:</h2>
      <form
        className={styles.wordSizeForm}
        onSubmit={handleSubmit(handleFetchWord)}
      >
        <input
          {...register('size', {
            min: { value: 2, message: 'Minimum word size is 2.' },
            required: 'Please, enter a size for the word.',
            valueAsNumber: true,
          })}
          type='number'
          defaultValue={5}
        />
        <Button type='submit'>Get word</Button>
      </form>
    </section>
  );
}
