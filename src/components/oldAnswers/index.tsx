import Letter from "@/components/letter";

import { PreviousAttemptsStyle } from "@/pages";

export default function OldAnswers({
  previousAnswers,
  previousAnswersColors,
}: {
  previousAnswers: string[];
  previousAnswersColors: PreviousAttemptsStyle[];
}) {
  return (
    <>
      {previousAnswers.map((word, wordIndex) => {
        return (
          <span key={`${word}${wordIndex}`}>
            {[...word].map((letter, letterIndex) => {
              const letterColor = previousAnswersColors[wordIndex][letter];
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
    </>
  );
}
