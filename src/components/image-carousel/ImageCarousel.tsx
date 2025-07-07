import { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import type { PortfolioItemImage } from "types/global";
import EmblaCarousel from "./EmblaCarousel";

const ImageCarousel = ({ images }: { images: PortfolioItemImage[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFullscreen = () => setIsOpen((prev) => !prev);

  return (
    <Box>
      <EmblaCarousel images={images} toggleFullscreen={toggleFullscreen} />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <EmblaCarousel
          ActionsContainer={DialogActions}
          ContentContainer={DialogContent}
          images={images}
          isFullScreen
          toggleFullscreen={toggleFullscreen}
        />
      </Dialog>
    </Box>
  );
};

export default ImageCarousel;
