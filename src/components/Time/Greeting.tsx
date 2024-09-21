import useGreetingText from "../../customHooks/useGreetingText";

export default function Greeting() {
  const { greetingText } = useGreetingText();

  return (
    <p className="mb-[20px] text-3xl tracking-wide">
      <strong>{greetingText}</strong>
    </p>
  );
}
