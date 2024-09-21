import useGreetingText from "../../customHooks/useGreetingText";

export default function Greeting() {
  const { greetingText } = useGreetingText();

  return (
    <p className="mb-5 text-3xl tracking-wide lg:text-5xl">
      <strong>{greetingText}</strong>
    </p>
  );
}
