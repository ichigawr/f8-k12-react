import { useState } from "react";

const useCounter = (initialValue) => {
  const [count, setCount] = useState(initialValue);

  const increase = () => {
    setCount(count + 1);
  };

  return [count, increase];
};

export default useCounter;
