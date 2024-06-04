export const failure = <Error>(error: Error): Failure<Error> => ({
  data: null,
  error,
});

export const success = <Data>(data: Data): Success<Data> => ({
  data,
  error: null,
});
