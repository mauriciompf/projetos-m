import useRealTime from "../../customHooks/useRealTime";
import useUpdateTime from "../../customHooks/useUpdateTime";

export default function CurrentTime() {
  const { realTimeText } = useRealTime();
  useUpdateTime();

  return <p>{realTimeText}</p>;
}
