# WORDLE

## Getting Started

Install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO list
- bug: fix behavior for letters that are present in the word but are used multiple times in the guess, only marking the letter in its correct position as green. Other occurrences shouldn't be indicated as valid, even if they're just not in their correct position.
- use contex to get word to avoid prop drilling
- check reusable css
- add language selector
