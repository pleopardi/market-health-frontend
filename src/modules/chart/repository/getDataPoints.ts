import {daily} from '../fixtures';
import {type GetDataPoints} from '../ports';

const getDataPoints: GetDataPoints = () => Promise.resolve(daily);

export default getDataPoints;
