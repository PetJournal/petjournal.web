export type ValidationFunction = (value: string) => string | undefined;

export interface UseInput {
  initialValue?: string;
  validate?: ValidationFunction;
}
