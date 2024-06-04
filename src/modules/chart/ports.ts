import type {Bar} from './models';
import type {
  NotFoundError,
  RequestError,
  ValidationError,
} from 'utilities/error';

export type GetBars = (params: {
  ticker: string;
  timeframe: string;
}) => AsyncResult<Bar[], NotFoundError | RequestError | ValidationError>;
