import {
  Fullscreen,
  ChevronLeft,
  ChevronRight,
  FullscreenExit,
} from "@mui/icons-material";
import {
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { PortfolioItemImage } from "types/global";
import EmblaCarouselContainer from "./EmblaCarouselContainer";
import { toSentenceCase } from "@/utils/utils";

interface EmblaCarouselProps {
  ContentContainer?: React.ElementType; // todo
  ActionsContainer?: React.ElementType; // todo
  images: PortfolioItemImage[];
  isFullScreen?: boolean;
  toggleFullscreen: () => void;
}

const EmblaCarousel = ({
  ActionsContainer = Stack,
  ContentContainer = "div",
  images,
  isFullScreen = false,
  toggleFullscreen,
}: EmblaCarouselProps) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const onInit = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, []);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const isMiniUp = useMediaQuery("(min-width: 405px)");
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const buttonAndTagBgColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[300];

  const titleText =
    images[selectedIndex].src.split("/").pop()?.split(".")[0] || "Image";

  return (
    <Stack direction="column" alignItems="center" gap={1}>
      {isFullScreen && <DialogTitle>{toSentenceCase(titleText)}</DialogTitle>}
      <EmblaCarouselContainer className="embla">
        <ContentContainer className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image, i) => (
              <div className="embla__slide" key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <IconButton
                  aria-label={`${
                    isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"
                  }`}
                  className="embla__fullscreen"
                  sx={{ bgcolor: buttonAndTagBgColor }}
                  onClick={toggleFullscreen}
                >
                  {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
              </div>
            ))}
          </div>
        </ContentContainer>
        <ActionsContainer direction="row" spacing={0.5}>
          <IconButton
            aria-label="Previous Slide"
            className="embla__prev"
            onClick={scrollPrev}
            sx={{ bgcolor: buttonAndTagBgColor }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            aria-label="Next Slide"
            className="embla__next"
            onClick={scrollNext}
            sx={{ bgcolor: buttonAndTagBgColor }}
          >
            <ChevronRight />
          </IconButton>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`embla__dot ${
                  index === selectedIndex ? "embla__dot--selected" : ""
                }`}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </ActionsContainer>
      </EmblaCarouselContainer>
      <Typography
        variant="tag"
        width="98%"
        textAlign="center"
        my={1}
        p={1}
        justifyContent="center"
        height={isMdUp ? "3lh" : isSmUp ? "4lh" : isMiniUp ? "5lh" : "6lh"}
        bgcolor={buttonAndTagBgColor}
      >
        {images[selectedIndex].description}
      </Typography>
    </Stack>
  );
};

export default EmblaCarousel;
