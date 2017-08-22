interface Concert {
  id: string;
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
