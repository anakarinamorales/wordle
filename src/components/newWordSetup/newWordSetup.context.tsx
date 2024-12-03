import { useForm } from 'react-hook-form';

import Button from '@/components/button';

import { getWord } from '@/utils/api';

import styles from './newWordSetup.module.css';
import { useWordContext } from '@/context/useWord';

type FormInputs = {
  size: number;
  language: string;
};

export default function NewWordSetup() {
  const { register, handleSubmit, getValues } = useForm<FormInputs>({
    shouldUseNativeValidation: true,
  });
  const { setRightAnswer } = useWordContext();

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
        <label htmlFor="size" hidden>The size of the word you will have to guess</label>
        <input
          {...register('size', {
            required: 'Please, enter a size for the word.',
            min: { value: 2, message: 'Minimum word size is 2.' },
            valueAsNumber: true,
          })}
          type='number'
          defaultValue={5}
          pattern='[0-9]'
          title=''
        />
        <Button type='submit'>Get word</Button>
      </form>
    </section>
  );
}
