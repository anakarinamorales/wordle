export const getWord = async (size: string | number) => {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${size}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const word = await response.json();
  return word;
};
