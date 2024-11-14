// import Letter from '@/components/letter';

import { useWordContext } from '@/context/useWord';
import Letter from '../letter';

export default function OldAnswers() {
  const { oldAnswers, userAnswerStyle } = useWordContext();

  return (
    <>
      {oldAnswers.map((word, wordIndex) => {
        return (
          <span key={`${word}${wordIndex}`}>
            {[...word].map((letter, letterIndex) => {
              const wordStyle = userAnswerStyle[wordIndex];
              return (
                <Letter
                  key={letter + letterIndex}
                  style={wordStyle[letterIndex]}
                  char={letter}
                />
              );
            })}
            <br />
          </span>
        );
      })}
    </>
  );
}
