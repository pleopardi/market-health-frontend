import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useOnWindow,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {publish} from 'brokers/notification';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import {
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type Time,
  type WhitespaceData,
  createChart,
} from 'lightweight-charts';
import {getBars} from 'modules/chart';

export default component$(() => {
  const candlestickSeries =
    useSignal<
      NoSerialize<
        ISeriesApi<
          'Candlestick',
          Time,
          CandlestickData<Time> | WhitespaceData<Time>
        >
      >
    >();
  const chartInstance = useSignal<NoSerialize<IChartApi>>();
  const chartElement = useSignal<HTMLElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!chartElement.value) {
      return;
    }

    chartInstance.value = noSerialize(
      createChart(
        chartElement.value,
        chartElement.value.getBoundingClientRect(),
      ),
    );

    if (!chartInstance.value) {
      return;
    }

    candlestickSeries.value = noSerialize(
      chartInstance.value.addCandlestickSeries({
        borderVisible: false,
        downColor: '#EF5350',
        upColor: '#26A69A',
        wickDownColor: '#EF5350',
        wickUpColor: '#26A69A',
      }),
    );

    getBars({ticker: 'AAPL', timeframe: 'day'}).then((response) => {
      if (response.data) {
        candlestickSeries.value?.setData(response.data);
      } else {
        publish('show', {
          description: response.error.message,
          title: 'Error fetching AAPL',
          type: 'failure',
        });
      }
    });
  });

  useOnWindow(
    'resize',
    $(() => {
      if (!chartElement.value || !chartInstance.value) {
        return;
      }
      const {height, width} = chartElement.value.getBoundingClientRect();

      chartInstance.value.resize(width, height);
    }),
  );

  const handleSubmit = $((event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const ticker = formData.get('ticker') as string;
    const timeframe = formData.get('timeframe') as string;

    if (!ticker || !timeframe) {
      return;
    }

    getBars({ticker, timeframe}).then((response) => {
      if (response.data) {
        candlestickSeries.value?.setData(response.data);
      } else {
        publish('show', {
          description: response.error.message,
          title: `Error fetching ${ticker}`,
          type: 'failure',
        });
      }
    });
  });

  return (
    <div class="flex h-full w-full flex-col">
      <form
        class="flex w-full items-center justify-center p-2 pb-4"
        onSubmit$={handleSubmit}
        preventdefault:submit>
        <Input
          name="ticker"
          placeholder="AAPL"
          required
          type="text"
          value="AAPL"
        />
        <div class="mx-2" />
        <Select
          name="timeframe"
          options={[
            {
              label: 'Daily',
              value: 'day',
            },
            {
              label: 'Weekly',
              value: 'week',
            },
          ]}
          required
        />
        <div class="mx-2" />
        <Button type="submit">Search</Button>
      </form>
      <div ref={chartElement} class="w-full flex-1" />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Market Health Chart',
  meta: [
    {
      name: 'description',
      content: 'Market Health Chart',
    },
  ],
};
