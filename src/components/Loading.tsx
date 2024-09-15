import gifImage from "../../assets/images/thinkingFaceThinking.gif";

export default function Loading(isLoading: { isLoading: boolean }) {
  return (
    isLoading && (
      <section className="mt-32 grid place-items-center">
        <img src={gifImage} className="size-32" alt="Loading..." />
      </section>
    )
  );
}
