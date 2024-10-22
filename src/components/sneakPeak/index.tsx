import { useState } from 'react';

import Button from '@/components/button';

export default function SneakPeak({ answer }: { answer: string }) {
  const [showAnswer, setShowAnswer] = useState(() => false);
  return (
    <>
      <Button type='button' onClick={() => setShowAnswer(!showAnswer)}>
        Show answer
      </Button>
      {showAnswer && <span>{answer}</span>}
    </>
  );
}
