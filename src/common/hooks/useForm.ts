import { entries, keys } from "@d-exclaimation/common";
import { useMemo, useReducer } from "react";
import { type ZodTypeAny, type z } from "zod";

type UseFormArgs<T extends ZodTypeAny> = {
  schema: T;
  initial: z.infer<T>;
};

type UseFormState<T extends ZodTypeAny> = {
  values: z.infer<T>;
  errors: {
    [Key in keyof z.infer<T>]?: string;
  };
};

type UseFormAction<T extends ZodTypeAny> = (values: z.infer<T>) => z.infer<T>;

function formReducer<T extends ZodTypeAny>(schema: T) {
  return (
    { values, errors }: UseFormState<T>,
    action: UseFormAction<T>
  ): UseFormState<T> => {
    const newValues = action(values);

    const res = schema.safeParse(newValues);
    if (res.success) {
      return {
        values: res.data,
        errors: {},
      };
    }

    return {
      values: newValues,
      errors: entries(res.error.formErrors.fieldErrors).reduce(
        (acc, [key, value]) => {
          acc[key as keyof z.infer<T>] = value?.[0] ?? undefined;
          return acc;
        },
        {} as typeof errors
      ),
    };
  };
}

export function useForm<T extends ZodTypeAny>({
  initial,
  schema,
}: UseFormArgs<T>) {
  const [state, update] = useReducer(formReducer(schema), {
    values: initial,
    errors: {},
  });

  const isValid = useMemo(
    () => keys(state.errors).length === 0,
    [state.errors]
  );

  return [{ ...state, isValid }, update] as const;
}
