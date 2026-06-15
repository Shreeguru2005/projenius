import { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  List,
  Maximize,
  Minimize,
  Printer,
  Share2,
  StickyNote,
  Volume2,
  ZoomIn,
} from "lucide-react";

import magazineFile from "/magazine.pdf";
import flipSoundFile from "/page-flip-01a.mp3";

import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/css/MagazineSection.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_RATIO = 520 / 680;

const TOOLBAR_ACTIONS = [
  { id: "toc", icon: List, label: "Contents" },
  { id: "grid", icon: LayoutGrid, label: "Thumbnails" },
  { id: "share", icon: Share2, label: "Share" },
  { id: "download", icon: Download, label: "Download" },
  { id: "audio", icon: Volume2, label: "Audio" },
  { id: "print", icon: Printer, label: "Print" },
  { id: "zoom", icon: ZoomIn, label: "Zoom" },
  { id: "note", icon: StickyNote, label: "Add note" },
];

const DEFAULT_LAYOUT = {
  shellWidth: 1200,
  shellHeight: 780,
  pageWidth: 600,
  pageHeight: 785,
  isMobile: false,
};

const computeLayout = (areaWidth, areaHeight) => {
  if (areaWidth < 100 || areaHeight < 100) return null;

  const shellWidth = Math.floor(areaWidth * 0.88);
  const shellHeight = Math.floor(areaHeight * 0.94);
  const isMobile = areaWidth < 768;

  if (isMobile) {
    let pageWidth = Math.floor(shellWidth * 0.94);
    let pageHeight = Math.floor(pageWidth / PAGE_RATIO);

    if (pageHeight > shellHeight) {
      pageHeight = shellHeight;
      pageWidth = Math.floor(pageHeight * PAGE_RATIO);
    }

    return {
      shellWidth: pageWidth,
      shellHeight: pageHeight,
      pageWidth,
      pageHeight,
      isMobile: true,
    };
  }

  let pageWidth = Math.floor(shellWidth / 2);
  let pageHeight = Math.floor(pageWidth / PAGE_RATIO);

  if (pageHeight > shellHeight) {
    pageHeight = shellHeight;
    pageWidth = Math.floor(pageHeight * PAGE_RATIO);
  }

  return {
    shellWidth: pageWidth * 2,
    shellHeight: pageHeight,
    pageWidth,
    pageHeight,
    isMobile: false,
  };
};

const formatPageRange = (pageIndex, total) => {
  if (!total) return "— / —";
  if (pageIndex === 0) return `1 / ${total}`;
  if (pageIndex >= total - 1) return `${total} / ${total}`;

  const left = pageIndex + 1;
  const right = Math.min(pageIndex + 2, total);
  return `${left}-${right} / ${total}`;
};

const MagazinePageItem = forwardRef(({ pageNumber, width, height }, ref) => {
  return (
    <div
      className="magazine-sec-page-wrap"
      ref={ref}
      style={{ width, height }}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </div>
  );
});

MagazinePageItem.displayName = "MagazinePageItem";

const MagazineSection = () => {
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState(DEFAULT_LAYOUT);

  const flipBookRef = useRef(null);
  const viewerRef = useRef(null);
  const bookAreaRef = useRef(null);
  const activePageRef = useRef(0);

  activePageRef.current = activePage;

  const playFlipAudio = () => {
    const audio = new Audio(flipSoundFile);
    audio.play().catch(() => {});
  };

  const handleFlip = (e) => {
    setActivePage(e.data);
  };

  const handleFlipBookInit = () => {
    requestAnimationFrame(() => {
      flipBookRef.current?.pageFlip()?.turnToPage(activePageRef.current);
    });
  };

  const goNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
      playFlipAudio();
    }
  };

  const goPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
      playFlipAudio();
    }
  };

  const handleScrubberChange = (e) => {
    const page = Number(e.target.value);
    if (flipBookRef.current?.pageFlip()?.turnToPage) {
      flipBookRef.current.pageFlip().turnToPage(page - 1);
      setActivePage(page - 1);
    }
  };

  const handleDocumentLoad = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const backgroundPage = Math.min(
    Math.max(activePage + 1, 1),
    totalPages || 1
  );

  const scaledLayout = {
    shellWidth: Math.round(layout.shellWidth * zoomLevel),
    shellHeight: Math.round(layout.shellHeight * zoomLevel),
    pageWidth: Math.round(layout.pageWidth * zoomLevel),
    pageHeight: Math.round(layout.pageHeight * zoomLevel),
  };

  const toggleFullscreen = useCallback(async () => {
    if (!viewerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await viewerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen not supported */
    }
  }, []);

  const handleToolbarAction = (actionId) => {
    switch (actionId) {
      case "download":
        window.open(magazineFile, "_blank");
        break;
      case "share":
        if (navigator.share) {
          navigator
            .share({
              title: "Projenius Magazine",
              url: window.location.href,
            })
            .catch(() => {});
        }
        break;
      case "print":
        window.open(magazineFile, "_blank")?.print?.();
        break;
      case "zoom":
        setZoomLevel((prev) => (prev >= 1.15 ? 1 : Number((prev + 0.05).toFixed(2))));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 80,
      easing: "ease-in-out",
    });

    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  useEffect(() => {
    const el = bookAreaRef.current;
    if (!el) return undefined;

    let timeoutId;

    const updateLayout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const nextLayout = computeLayout(rect.width, rect.height);
        if (nextLayout) setLayout(nextLayout);
      }, 80);
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(el);
    window.addEventListener("resize", updateLayout);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <section className="magazine-sec-main-wrapper">
      <div
        className="magazine-viewer-container"
        ref={viewerRef}
        data-aos="fade-up"
      >
        <div className="magazine-bg-blur" aria-hidden="true">
          {totalPages && (
            <Document file={magazineFile}>
              <Page
                pageNumber={backgroundPage}
                width={1200}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          )}
        </div>

        <div className="magazine-toolbar">
          <div className="toolbar-brand toolbar-brand-left">
            <span className="toolbar-brand-title">PROJENIUS</span>
          </div>

          <div className="toolbar-actions">
            {TOOLBAR_ACTIONS.map(({ id, icon: Icon, label }) =>
              id === "download" ? (
                <a
                  key={id}
                  href={magazineFile}
                  download
                  className="toolbar-action-btn"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ) : (
                <button
                  key={id}
                  type="button"
                  className="toolbar-action-btn"
                  aria-label={label}
                  title={label}
                  onClick={() => handleToolbarAction(id)}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </button>
              )
            )}
          </div>

          <div className="toolbar-brand toolbar-brand-right">
            <span className="toolbar-brand-title">PROJENIUS</span>
            <span className="toolbar-brand-tagline">
              Innovate · Build · Grow
            </span>
          </div>
        </div>

        <div className="magazine-sec-book-area" ref={bookAreaRef}>
          <button
            type="button"
            className="magazine-side-arrow left"
            onClick={goPrevPage}
            aria-label="Previous page"
          >
            <ChevronLeft size={56} strokeWidth={1} />
          </button>

          <div className="magazine-sec-book-shadow">
            <div
              className="magazine-flipbook-shell"
              style={{
                width: scaledLayout.shellWidth,
                height: scaledLayout.shellHeight,
              }}
            >
              <Document file={magazineFile} onLoadSuccess={handleDocumentLoad}>
                {totalPages && (
                  <HTMLFlipBook
                    key={`${layout.pageWidth}-${layout.pageHeight}-${layout.isMobile}`}
                    width={layout.pageWidth}
                    height={layout.pageHeight}
                    minWidth={Math.max(240, Math.floor(layout.pageWidth * 0.5))}
                    maxWidth={layout.pageWidth}
                    minHeight={Math.max(320, Math.floor(layout.pageHeight * 0.5))}
                    maxHeight={layout.pageHeight}
                    size="stretch"
                    autoSize={true}
                    className="magazine-sec-flip-book"
                    ref={flipBookRef}
                    showCover={true}
                    usePortrait={layout.isMobile}
                    useMouseEvents={true}
                    onFlip={handleFlip}
                    onInit={handleFlipBookInit}
                    maxShadowOpacity={0.45}
                    drawShadow={true}
                    flippingTime={800}
                  >
                    {Array.from(new Array(totalPages), (_, index) => (
                      <MagazinePageItem
                        key={index}
                        pageNumber={index + 1}
                        width={layout.pageWidth}
                        height={layout.pageHeight}
                      />
                    ))}
                  </HTMLFlipBook>
                )}
              </Document>
            </div>
          </div>

          <button
            type="button"
            className="magazine-side-arrow right"
            onClick={goNextPage}
            aria-label="Next page"
          >
            <ChevronRight size={56} strokeWidth={1} />
          </button>
        </div>

        <div className="magazine-bottom-bar">
          <span className="magazine-page-number">
            {formatPageRange(activePage, totalPages)}
          </span>

          <div className="magazine-scrubber-wrap">
            <input
              type="range"
              className="magazine-scrubber"
              min="1"
              max={totalPages || 1}
              value={activePage + 1}
              onChange={handleScrubberChange}
              aria-label="Page scrubber"
            />
          </div>

          <button
            type="button"
            className="magazine-fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize size={20} strokeWidth={1.75} />
            ) : (
              <Maximize size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MagazineSection;
