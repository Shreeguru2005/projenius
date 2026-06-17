import { forwardRef, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import { Download } from "lucide-react";

import magazineFile from "/magazine.pdf";
import flipSoundFile from "/page-flip-01a.mp3";

import "../assets/css/MagazineSection.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 460;
const PAGE_HEIGHT = 602;
const MOBILE_PAGE_WIDTH = 320;
const MOBILE_PAGE_HEIGHT = 419;
const MagazinePageItem = forwardRef(
  ({ pageNumber, activePage, width, height }, ref) => {
    const shouldRenderPage = Math.abs(pageNumber - (activePage + 1)) <= 3;

    return (
      <div
        className="magazine-sec-page-wrap"
        ref={ref}
        style={{ width, height }}
      >
        {shouldRenderPage ? (
          <Page
            pageNumber={pageNumber}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ) : (
          <div className="magazine-page-placeholder" aria-hidden="true" />
        )}
      </div>
    );
  }
);

MagazinePageItem.displayName = "MagazinePageItem";

const MagazineSection = () => {
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const flipBookRef = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const pageSize = useMemo(
    () => ({
      width: isMobile ? MOBILE_PAGE_WIDTH : PAGE_WIDTH,
      height: isMobile ? MOBILE_PAGE_HEIGHT : PAGE_HEIGHT,
    }),
    [isMobile]
  );

  const playFlipAudio = () => {
    const audio = new Audio(flipSoundFile);
    audio.play().catch(() => {});
  };

  const handleFlip = (event) => {
    setActivePage(event.data);
  };

  const goNextPage = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
    playFlipAudio();
  };

  const goPrevPage = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
    playFlipAudio();
  };

  const handleDocumentLoad = ({ numPages }) => {
    setTotalPages(numPages);
  };

  return (
    <section className="magazine-sec-main-wrapper">
      <div className="magazine-viewer-container">
        <div className="magazine-sec-book-area">
          <div className="magazine-sec-book-shadow">
            <Document file={magazineFile} onLoadSuccess={handleDocumentLoad}>
              {totalPages && (
                <HTMLFlipBook
                  width={pageSize.width}
                  height={pageSize.height}
                  minWidth={260}
                  maxWidth={pageSize.width}
                  minHeight={340}
                  maxHeight={pageSize.height}
                  size="stretch"
                  className="magazine-sec-flip-book"
                  ref={flipBookRef}
                  showCover={true}
                  usePortrait={isMobile}
                  useMouseEvents={true}
                  onFlip={handleFlip}
                  maxShadowOpacity={0.35}
                  drawShadow={true}
                  flippingTime={650}
                >
                  {Array.from(new Array(totalPages), (_, index) => (
                    <MagazinePageItem
                      key={index}
                      pageNumber={index + 1}
                      activePage={activePage}
                      width={pageSize.width}
                      height={pageSize.height}
                    />
                  ))}
                </HTMLFlipBook>
              )}
            </Document>
          </div>

          <div className="magazine-controls-pill">
            <button
              type="button"
              className="magazine-nav-button"
              onClick={goPrevPage}
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="magazine-page-number">
              {activePage + 1} / {totalPages || 0}
            </span>
            <button
              type="button"
              className="magazine-nav-button"
              onClick={goNextPage}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>

        <div className="magazine-info-panel">
          <span id="sub-heading">Digital Magazine</span>
          <h2 className="section-title" id="title">
            We Create With Purpose
          </h2>
          <p className="section-desc">
            Explore Projenius through a lighter interactive magazine experience
            optimized for smoother browsing.
          </p>
          <a href={magazineFile} download className="magazine-download-btn">
            <Download size={18} strokeWidth={2} />
            Download Magazine
          </a>
        </div>
      </div>
    </section>
  );
};

export default MagazineSection;