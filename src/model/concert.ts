export interface Concert {
  id: string;
  artists: string[];
  cancelled: boolean;
  dateStart: number;
  dateEnd: number;
  festival: boolean;
  name: string;
  venue: string;
  province: string;
  genres: string[];
  startTime: string;
  ticketPrice: string;
  buyLink: string;
  facebookLink: string;
}
