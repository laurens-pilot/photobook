declare module "page-flip" {
  interface PageFlipOptions {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showCover?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    startPage?: number;
    drawShadow?: boolean;
    autoSize?: boolean;
    startZIndex?: number;
    showPageCorners?: boolean;
    usePortrait?: boolean;
    clickEventForward?: boolean;
  }

  class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    loadFromHTML(elements: HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    on(event: string, callback: (e: any) => void): PageFlip;
    destroy(): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    flipNext(corner: "top" | "bottom"): void;
    flipPrev(corner: "top" | "bottom"): void;
    update(): void;
  }

  export { PageFlip };
  export type { PageFlipOptions };
}
