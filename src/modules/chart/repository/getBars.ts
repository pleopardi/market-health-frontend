import {daily} from '../fixtures';
import {type GetBars} from '../ports';

const getBars: GetBars = () => Promise.resolve(daily);

export default getBars;
