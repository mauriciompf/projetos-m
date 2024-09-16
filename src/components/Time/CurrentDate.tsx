import useFormattedDate from "../../customHooks/useFormattedDate";
import useUpdateDayWeek from "../../customHooks/useUpdateDayWeek";

export default function CurrentDate() {
  const { formattedDate } = useFormattedDate();
  const { currentDayWeek } = useUpdateDayWeek();

  return (
    <p className="first-letter:capitalize">
      {`${formattedDate}, ${currentDayWeek && `semana ${currentDayWeek}`}`}
    </p>
  );
}
