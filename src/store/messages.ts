export const messages: Record<string, Message> = {
  saveStorage: {
    success: 'Values successfully saved in storage!',
    fail: 'Saving failed!',
  },
};

export interface Message {
  success: string;
  fail: string;
  info?: string;
}
