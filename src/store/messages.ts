import { Phrases } from '../locale/locale.types';

export const messages: Record<string, Message> = {
  saveStorage: {
    success: 'Values saved in storage',
    fail: 'Saving values failed',
  },
  clear: {
    success: 'Values cleared',
    fail: 'Values clear failed',
  },
};

export type Message = Record<'success' | 'fail', Phrases>;
