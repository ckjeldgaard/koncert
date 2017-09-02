export class FixedHeaders {

  private static readonly MEDIA_TINY_WIDTH = 520;
  private static readonly MOBILE_HEADER_HEIGHT= 48;

  private readonly headers: NodeListOf<Element>;

  constructor(headers: NodeListOf<Element>) {
    this.headers = headers;
  }

  public cloneHeaderRow(): void {
    let clonedHeaderRow;
    for (let i = 0, len = this.headers.length; i < len; i++) {
      clonedHeaderRow = this.headers[i].querySelector('.subtitle');
      clonedHeaderRow.parentNode.insertBefore(
        clonedHeaderRow.cloneNode(true),
        clonedHeaderRow
      );
      this.addClass(clonedHeaderRow, 'floating-header');
    }
  }

  public updateFixedHeaders(): void {
    const mobileHeaderHeight: number = (window.screen.width <= FixedHeaders.MEDIA_TINY_WIDTH) ? FixedHeaders.MOBILE_HEADER_HEIGHT : 0;
    for (let i = 0, len = this.headers.length; i < len; i++) {

      const el: Element = this.headers[i];
      const offsetTop: number = el.getBoundingClientRect().top + document.body.scrollTop;
      const scrollTop: number = document.body.scrollTop + mobileHeaderHeight;
      const floatingHeader: HTMLElement = <HTMLElement>this.headers[i].querySelector('.floating-header');

      if ((scrollTop > offsetTop) && (scrollTop < offsetTop + el.getBoundingClientRect().height)) {
        floatingHeader.style.visibility = 'visible';
      } else {
        floatingHeader.style.visibility = 'hidden';
      }
    }
  }

  private addClass(el: HTMLElement, className: string) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
}
