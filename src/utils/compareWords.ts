export default function compareWords(typedWord: string, rightAnswer: string) {
  const result: { [key: number]: string } = {};
  for (let i = 0; i < typedWord.length; i++) {
    const letterIndex = rightAnswer.indexOf(typedWord[i]);
    result[i] =
      letterIndex !== -1 ? (letterIndex === i ? 'var(--color-success)' : 'var(--color-warning)') : 'var(--color-text)';
  }

  return result;
};
