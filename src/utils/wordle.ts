// type ComparisonResultType = {
//   [Key: string]: { [key: number]: string };
// };

export enum STATE_OPTIONS {
  DEFAULT = 0,
  EXISTS = 1,
  CORRECT = 2,
}

/**
 *
 * @param userAnswer the word typed by the user in the input.
 * @param rightAnswer the right word that needs to be matched.
 * @returns an array of integers representing the state of each character to be used as base for styling.
 * 0 for default color / wrong letter. 1 for right letter but not in the right place. 2 for right letter and place.
 */
export default function wordle(
  userAnswer: string,
  rightAnswer: string
): number[] {
  const lowerCaseUserAnswer = userAnswer.toLowerCase();
  const lowerCaseRightAnswer = rightAnswer.toLowerCase();
  const answerState = Array(userAnswer.length).fill(STATE_OPTIONS.DEFAULT);
  const charHighestState: Record<string, number> = {};
  lowerCaseUserAnswer
    .split('')
    .forEach((key) => (charHighestState[key] = STATE_OPTIONS.DEFAULT));

  // fills local validation not worrying with repeated letters
  for (let i = 0; i < userAnswer.length; i++) {
    const currentUserChar = userAnswer[i] as string;
    const currentRightChar = lowerCaseRightAnswer[i];
    const charExistsInTheAnswer =
      lowerCaseRightAnswer.indexOf(currentUserChar) >= 0;

    if (!charExistsInTheAnswer) {
      continue;
    }

    if (charExistsInTheAnswer) {
      if (currentRightChar === currentUserChar) {
        answerState[i] = STATE_OPTIONS.CORRECT;

        // Updates global state based on local state
        if (answerState[i] > charHighestState[currentUserChar]) {
          charHighestState[currentUserChar] = answerState[i];
        }

        continue;
      }

      answerState[i] = STATE_OPTIONS.EXISTS;
      // Updates global state based on local state
      if (answerState[i] > charHighestState[currentUserChar]) {
        charHighestState[currentUserChar] = answerState[i];
      }
    }
  }

  // fixing local state for repeated letters
  for (let i = 0; i < answerState.length; i++) {
    const currentUserChar = userAnswer[i];

    if (answerState[i] < charHighestState[currentUserChar]) {
      answerState[i] = STATE_OPTIONS.DEFAULT;
    } else if (answerState[i] === charHighestState[currentUserChar]) {
      if (charHighestState[currentUserChar] === STATE_OPTIONS.EXISTS) {
        charHighestState[currentUserChar] = STATE_OPTIONS.DEFAULT;
      }
    } else {
      answerState[i] = charHighestState[currentUserChar];
    }
  }

  return answerState;
}
