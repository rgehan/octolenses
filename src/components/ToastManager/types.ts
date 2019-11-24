export interface INotification {
  id: string;
  message: string;
  type: NotificationType;
}

export type NotificationType = 'info' | 'error';
