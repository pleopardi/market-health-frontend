import {getBarsResponseDto} from '../dtos';
import {type GetBars} from '../ports';
import {notFoundError, requestError, validationError} from 'utilities/error';
import {failure, success} from 'utilities/result';

const getBars: GetBars = async ({ticker, timeframe}) => {
  const result = await fetch(
    `http://localhost:8000/bars/${ticker}?timeframe=${timeframe}`,
  );

  if (result.status === 200) {
    const data = await result.json();

    try {
      getBarsResponseDto.parse(data);
    } catch (error) {
      return failure(validationError(error, 'getBars'));
    }

    return success(data);
  }

  if (result.status === 404) {
    return failure(notFoundError(`Ticker ${ticker} not found`, 'getBars'));
  }

  return failure(
    requestError(`Request failed with status ${result.status}`, 'getBars'),
  );
};

export default getBars;
