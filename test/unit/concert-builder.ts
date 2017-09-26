import {Concert} from '../../src/model/concert';

export class ConcertBuilder {

  private static readonly JANUARY_2017: number = 1484438400;
  private static readonly FEBRUARY_2017: number = 1487116800;

  private id: string;
  private artists: string[];
  private cancelled: boolean;
  private dateStart: number;
  private dateEnd: number;
  private festival: boolean;
  private name: string;
  private venue: string;
  private province: string;
  private genres: string[];
  private startTime: string;
  private ticketPrice: string;
  private buyLink: string;
  private facebookLink: string;

  constructor(id: string, artists: string[], cancelled: boolean, dateStart: number, dateEnd: number, festival: boolean, name: string, venue: string, province: string, genres: string[], startTime: string, ticketPrice: string, buyLink: string, facebookLink: string) {
    this.id = id;
    this.artists = artists;
    this.cancelled = cancelled;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.festival = festival;
    this.name = name;
    this.venue = venue;
    this.province = province;
    this.genres = genres;
    this.startTime = startTime;
    this.ticketPrice = ticketPrice;
    this.buyLink = buyLink;
    this.facebookLink = facebookLink;
  }

  public static create(): ConcertBuilder {
    return new ConcertBuilder(
      'event-1',
      [],
      false,
      ConcertBuilder.JANUARY_2017,
      ConcertBuilder.FEBRUARY_2017,
      true,
      'Concert 1',
      'Venue 1',
      'province1',
      ['genre1', 'genre2'],
      '19:00',
      '100 DKK',
      'www',
      'http'
    );
  }

  public withId(id: string): ConcertBuilder {
    return new ConcertBuilder(
      id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withArtists(artists: string[]): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withCancelled(cancelled: boolean): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public startingAt(dateStart: number): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public endingAt(dateEnd: number): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withFestival(festival: boolean): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withName(name: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withVenue(venue: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public inProvince(province: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withGenres(genres: string[]): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withStartTime(startTime: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      startTime,
      this.ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withTicketPrice(ticketPrice: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      ticketPrice,
      this.buyLink,
      this.facebookLink
    );
  }

  public withBuyLink(buyLink: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      buyLink,
      this.facebookLink
    );
  }

  public withFacebookLink(facebookLink: string): ConcertBuilder {
    return new ConcertBuilder(
      this.id,
      this.artists,
      this.cancelled,
      this.dateStart,
      this.dateEnd,
      this.festival,
      this.name,
      this.venue,
      this.province,
      this.genres,
      this.startTime,
      this.ticketPrice,
      this.buyLink,
      facebookLink
    );
  }

  public build(): Concert {
    return <Concert>{
      id: this.id,
      artists: this.artists,
      cancelled: this.cancelled,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      festival: this.festival,
      name: this.name,
      venue: this.venue,
      province: this.province,
      genres: this.genres,
      startTime: this.startTime,
      ticketPrice: this.ticketPrice,
      buyLink: this.buyLink,
      facebookLink: this.facebookLink,
    };
  }
}
