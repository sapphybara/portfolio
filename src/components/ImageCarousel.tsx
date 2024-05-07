import { Box, Card, CardMedia, Fab, Slide, styled } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { type PortfolioItemImage } from "types/global";

const AbsoluteFab = styled(Fab)({
  position: "absolute",
  top: "50%",
  "& .MuiSvgIcon-root": {
    color: "black",
  },
});

const ImageCarousel = ({ images }: { images: PortfolioItemImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "up" | "down"
  >("left");

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
    <Box className="relative">
      <AbsoluteFab
        aria-label="previous slide"
        className="left-2.5"
        color="secondary"
        onClick={prevSlide}
      >
        <ArrowBack />
      </AbsoluteFab>
      <Slide direction={slideDirection} in={true} key={activeIndex}>
        <Card>
          <CardMedia component="img" {...images[activeIndex]} />
        </Card>
      </Slide>
      <AbsoluteFab
        aria-label="next slide"
        className="right-2.5"
        color="secondary"
        onClick={nextSlide}
      >
        <ArrowForward />
      </AbsoluteFab>
    </Box>
  );
};

export default ImageCarousel;
