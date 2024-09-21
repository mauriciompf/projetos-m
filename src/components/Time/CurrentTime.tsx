import useRealTime from "../../customHooks/useRealTime";
import useUpdateTime from "../../customHooks/useUpdateTime";

export default function CurrentTime() {
  const { realTimeText } = useRealTime();
  useUpdateTime();

  return (
    <p className="text-6xl md:text-8xl">
      <strong>{realTimeText}</strong>
    </p>
  );
}
