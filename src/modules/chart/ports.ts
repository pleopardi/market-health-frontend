import type {DataPoint} from './models';

export type GetDataPoints = () => Promise<DataPoint[]>;
