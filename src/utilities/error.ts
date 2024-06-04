import {ZodError} from 'zod';

type Type = 'not-found' | 'request' | 'validation';

const errorMessage = (error: unknown) => {
  if (!error) {
    return 'Errore sconosciuto';
  }

  if (error instanceof ZodError) {
    return error.issues[0].message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && 'message' in error) {
    return error.message as string;
  }

  return JSON.stringify(error);
};

export class CustomError extends Error {
  constructor(
    message: string,
    public readonly location: string,
    public readonly type: Type,
  ) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, location: string) {
    super(message, location, 'not-found');
  }
}

export const notFoundError = (error: unknown, location: string) =>
  new NotFoundError(errorMessage(error), location);

export class RequestError extends CustomError {
  constructor(message: string, location: string) {
    super(message, location, 'request');
  }
}

export const requestError = (error: unknown, location: string) =>
  new RequestError(errorMessage(error), location);

export class ValidationError extends CustomError {
  constructor(message: string, location: string) {
    super(message, location, 'validation');
  }
}

export const validationError = (error: unknown, location: string) =>
  new ValidationError(errorMessage(error), location);
