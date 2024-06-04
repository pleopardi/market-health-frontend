import {z} from 'zod';

export const getBarsResponseDto = z.array(
  z.object({
    close: z.number(),
    high: z.number(),
    low: z.number(),
    open: z.number(),
    time: z.string(),
    volume: z.number(),
  }),
);

export type GetBarsResponseDto = z.infer<typeof getBarsResponseDto>;
