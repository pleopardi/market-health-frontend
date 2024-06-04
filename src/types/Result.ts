declare global {
  type Success<Data> = {data: Data; error: null};
  type Failure<Error> = {data: null; error: Error};
  type Result<Data, Error> = Success<Data> | Failure<Error>;
  type AsyncResult<Data, Error> = Promise<Result<Data, Error>>;
}

export {};
