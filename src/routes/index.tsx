import {component$, useSignal, useVisibleTask$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {createChart} from 'lightweight-charts';
import {getBars} from 'modules/chart';

export default component$(() => {
  const chartRef = useSignal<HTMLElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!chartRef.value) {
      return;
    }

    const chart = createChart(
      chartRef.value,
      chartRef.value.getBoundingClientRect(),
    );

    const candlestickSeries = chart.addCandlestickSeries({
      borderVisible: false,
      downColor: '#EF5350',
      upColor: '#26A69A',
      wickDownColor: '#EF5350',
      wickUpColor: '#26A69A',
    });

    getBars().then(candlestickSeries.setData.bind(candlestickSeries));
  });

  return <div ref={chartRef} class="h-full w-full" />;
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
