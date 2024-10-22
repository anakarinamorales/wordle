import Letter from "@/components/letter";

import { PreviousAttemptsStyle } from "@/pages";

export default function UserAnswers({
  previousAnswers,
  wordStyleByLetter,
}: {
  previousAnswers: string[];
  wordStyleByLetter: PreviousAttemptsStyle[];
}) {
  return (
    <>
      {previousAnswers.map((word, wordIndex) => {
        return (
          <span key={`${word}${wordIndex}`}>
            {word.split('').map((letter, letterIndex) => {
              const letterColor = wordStyleByLetter[wordIndex][letterIndex];
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
