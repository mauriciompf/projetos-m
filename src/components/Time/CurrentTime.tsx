import useRealTime from "../../customHooks/useRealTime";
import useUpdateTime from "../../customHooks/useUpdateTime";

export default function CurrentTime() {
  const { realTimeText } = useRealTime();
  useUpdateTime();

  return (
    <p className="text-6xl lg:text-9xl">
      <strong>{realTimeText}</strong>
    </p>
  );
}
