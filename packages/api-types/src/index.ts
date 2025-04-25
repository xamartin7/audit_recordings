import { z } from 'zod';

export const RecordingSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  url: z.string().url(),
  createdAt: z.string().datetime(),
});

export type Recording = z.infer<typeof RecordingSchema>;