export interface ITicketSegment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface ITicket {
  price: number;
  carrier: string;
  segments: ITicketSegment[];
}

export enum ESortingTypes {
  QUICK,
  CHEAP,
}

export enum EFilterOptions {
  ALL,
  WITHOUT,
  ONE,
  TWO,
  THREE,
}
