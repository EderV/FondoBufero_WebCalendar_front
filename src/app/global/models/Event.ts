export interface Event {
  id: string,
  title: string,
  description: string,
  owner: string,
  logo: string,
  date: Date,
  duration: number,
  type: string,
  link: string,
  canceled: boolean,
  cancelReason: string,
  createdAt: Date
}
