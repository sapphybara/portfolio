import {
  Box,
  Card,
  CardMedia,
  Fab,
  Slide,
  Typography,
  styled,
} from "@mui/material";
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

const TextOverlay = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: theme.spacing(3),
  transform: "translateX(-50%)",
  color: theme.palette.common.white,
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(0.5),
  textAlign: "center",
}));

const ImageCarousel = ({ images }: { images: PortfolioItemImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "up" | "down"
  >("left");
  const [loadedImages, setLoadedImages] = useState<number[]>([0]);

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % images.length;
    setActiveIndex(newIndex);
    setSlideDirection("right");
    if (!loadedImages.includes(newIndex)) {
      setLoadedImages((prevLoadedImages) => [...prevLoadedImages, newIndex]);
    }
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(newIndex);
    setSlideDirection("left");
    if (!loadedImages.includes(newIndex)) {
      setLoadedImages((prevLoadedImages) => [...prevLoadedImages, newIndex]);
    }
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
      {images.map((image, index) => (
        <Slide
          direction={slideDirection}
          in={activeIndex === index}
          key={index}
          unmountOnExit
        >
          <Card>
            {loadedImages.includes(index) ? (
              <>
                <CardMedia component="img" {...image} />
                <TextOverlay>{image.description}</TextOverlay>
              </>
            ) : null}
          </Card>
        </Slide>
      ))}
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
