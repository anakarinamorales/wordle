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
              console.log(1111, wordStyleByLetter[wordIndex]);
              const letterColor = wordStyleByLetter[wordIndex][letter];
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
