import { Box, Card, CardMedia, Fab, Slide } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState, useRef } from "react";
import { type Image } from "types/global";

const ImageCarousel = ({ images }: { images: Image[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "up" | "down"
  >("left");
  const slideContainerRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSlideDirection("left");
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setSlideDirection("right");
  };

  return (
    <Box className="relative" ref={slideContainerRef}>
      <Fab
        aria-label="previous slide"
        className="absolute"
        color="primary"
        style={{ position: "absolute", top: "50%", left: "10px" }}
        onClick={prevSlide}
      >
        <ArrowBack color="action" />
      </Fab>
      <Slide
        container={slideContainerRef.current}
        direction={slideDirection}
        in={true}
        key={activeIndex}
      >
        <Card>
          <CardMedia component="img" {...images[activeIndex]} />
        </Card>
      </Slide>
      <Fab
        aria-label="next slide"
        className="absolute"
        color="primary"
        style={{ position: "absolute", top: "50%", right: "10px" }}
        onClick={nextSlide}
      >
        <ArrowForward color="action" />
      </Fab>
    </Box>
  );
};

export default ImageCarousel;
