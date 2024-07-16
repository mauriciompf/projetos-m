import { Context, useContext } from "react";

type Nullable<T> = T | null;

export default function useCustomHookContext<T>(
  context: Context<Nullable<T>>,
  hookName: string,
  providerName: string,
): T {
  const contextValue = useContext(context);

  if (!contextValue || contextValue === undefined) {
    throw new Error(`${hookName} must be used within a ${providerName}`);
  }

  return contextValue;
}
