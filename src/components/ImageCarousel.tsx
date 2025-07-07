import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Stack, styled } from "@mui/material";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import type { PortfolioItemImage } from "types/global";

const EmblaContainer = styled("div")(({ theme }) => ({
  "&.embla": {
    overflow: "hidden",
  },
  ".embla__container": {
    display: "flex",
    width: "100%",
  },
  ".embla__slide": {
    "--embla-slide-width": "90%",
    flex: "0 0 var(--embla-slide-width)",
    minWidth: 0,
    marginRight: "1em",
  },
  ".embla__dots": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "8px",
    margin: 0,
    flex: 1,
  },
  ".embla__dot": {
    "--embla_dot": "12px",
    width: "var(--embla_dot)",
    height: "var(--embla_dot)",
    borderRadius: "calc(var(--embla_dot) / 2)",
    backgroundColor: theme.palette.grey[700],
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: theme.palette.grey[500],
    },
    "&.embla__dot--selected": {
      backgroundColor: theme.palette.grey[200],
    },
  },
}));

const ImageCarousel = ({ images }: { images: PortfolioItemImage[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

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

  return (
    <EmblaContainer className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, i) => (
            <div className="embla__slide" key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                width="100%"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
      <Stack direction="row" spacing={0.5}>
        <IconButton
          aria-label="Previous Slide"
          className="embla__prev"
          onClick={scrollPrev}
          sx={{ bgcolor: (theme) => theme.palette.grey[800] }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          aria-label="Next Slide"
          className="embla__next"
          onClick={scrollNext}
          sx={{ bgcolor: (theme) => theme.palette.grey[800] }}
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
      </Stack>
    </EmblaContainer>
  );
};

export default ImageCarousel;
