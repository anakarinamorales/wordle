import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,

  useState,
} from 'react';


export type AnswerStyle = number[];

type UseWordProps = {
  maxGuesses: number;
  numberOfAttempts: number;
  oldAnswers: string[];
  rightAnswer: string;
  setOldAnswers: Dispatch<SetStateAction<string[]>>;
  setRightAnswer: Dispatch<SetStateAction<string>>;
  setUserAnswer: Dispatch<SetStateAction<string>>;
  setUserAnswerStyle: Dispatch<SetStateAction<AnswerStyle[]>>;
  userAnswer: string;
  userAnswerStyle: AnswerStyle[];
};

const UseWordContex = createContext({} as UseWordProps);

UseWordContex.displayName = 'UseWordContext';

export function useWordContext(): UseWordProps {
  return useContext(UseWordContex);
}

export function WordProvider({ children }: { children: React.ReactNode }) {
  const [userAnswer, setUserAnswer] = useState(() => '');
  const [rightAnswer, setRightAnswer] = useState(() => '');
  const [userAnswerStyle, setUserAnswerStyle] = useState(
    () => [] as AnswerStyle[]
  );
  const [oldAnswers, setOldAnswers] = useState(() => [] as string[]);
  const numberOfAttempts = useMemo(() => oldAnswers.length + 1, [oldAnswers]);
  const maxGuesses = 5;



  const value: UseWordProps = {
    maxGuesses,
    numberOfAttempts,
    oldAnswers,
    rightAnswer,
    setOldAnswers,
    setRightAnswer,
    setUserAnswer,
    setUserAnswerStyle,
    userAnswer,
    userAnswerStyle,
  };

  return (
    <UseWordContex.Provider value={value}>{children}</UseWordContex.Provider>
  );
}
