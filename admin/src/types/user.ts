export interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
  telegramChatId?: string;
}