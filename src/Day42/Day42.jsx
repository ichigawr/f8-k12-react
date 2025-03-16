import useCounter from "./hooks/useCounter";

function Day42() {
  const [count, increase] = useCounter(10);

  return <button onClick={increase}>Count is {count}</button>;
}

export default Day42;
