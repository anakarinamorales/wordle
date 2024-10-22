type ComparisonResultType = {
  [Key: string]: string;
};

export default function compareWords(userAnswer: string, rightAnswer: string) {
  const allStringLetters = userAnswer.toLowerCase();
  const uniqueWordLetters = [...new Set(allStringLetters)];
  const comparisonResult = {} as ComparisonResultType;

  uniqueWordLetters.map((char: string, charIndex: number) => {
    const rightAnswerCharIndex = rightAnswer.indexOf(userAnswer[charIndex]);
    comparisonResult[char] =
      rightAnswerCharIndex !== -1
        ? rightAnswerCharIndex === charIndex
          ? 'var(--color-success)'
          : 'var(--color-warning)'
        : 'var(--color-text)';
  });

  return comparisonResult;
}
