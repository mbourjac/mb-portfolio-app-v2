import { motion } from 'framer-motion';
import { useWindowSize } from '../../hooks/use-window-size';

type CollectionPreviewProps = {
  thumbnails: string[];
  collectionIndex: number;
  hoveredCollectionIndex: number | null;
};

export const CollectionPreview = ({
  thumbnails,
  collectionIndex,
  hoveredCollectionIndex,
}: CollectionPreviewProps) => {
  const { windowWidth } = useWindowSize();

  const containerWidth = windowWidth - 0.75 * 16 * 2;
  const previewWidth = 2 * 16;
  const gapWidth = 0.25 * 16;

  const minThumbnailsCount = Math.ceil(
    (containerWidth + gapWidth) / (previewWidth + gapWidth),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity:
          (
            hoveredCollectionIndex === null ||
            hoveredCollectionIndex === collectionIndex
          ) ?
            1
          : 0.6,
        transition: { duration: 1 },
      }}
      className="flex h-14 gap-1"
    >
      {thumbnails.slice(0, minThumbnailsCount).map((preview, index) => (
        <div key={index} className="min-w-8">
          <img
            src={preview}
            alt=""
            className="relative bg-off-black transition-opacity"
          />
        </div>
      ))}
    </motion.div>
  );
};
