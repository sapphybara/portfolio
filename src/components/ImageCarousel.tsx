import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Fab,
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

const CardImageContent = styled(CardContent)(() => ({
  padding: 0,
  "& .MuiCardMedia-root": {
    objectFit: "unset",
  },
}));

const ImageCarousel = ({ images }: { images: PortfolioItemImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const { description, ...image } = images[activeIndex];

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
      <Card>
        <CardImageContent>
          <CardMedia component="img" {...image} />
          <TextOverlay>{description}</TextOverlay>
        </CardImageContent>
      </Card>
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
