import useGreetingText from "../../customHooks/useGreetingText";

export default function Greeting() {
  const { greetingText } = useGreetingText();

  return <p>{greetingText}</p>;
}
