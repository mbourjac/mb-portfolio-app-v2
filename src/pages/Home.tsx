import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCollections } from '../features/collection/collection.hooks';
import {
  getRandomArrayIndex,
  replaceArrayItemAtIndex,
  shuffleArray,
} from '../helpers/arrays';
import { getRandomIntFromInterval } from '../helpers/random';

export const Home = () => {
  const collections = useCollections();

  const allThumbnails = [
    ...collections.map((collection) => collection.thumbnails).flat(),
  ];
  const shuffledThumbnails = shuffleArray(allThumbnails);
  const visibleThumbnailsCount = 120;

  const [visibleThumbnails, setVisibleThumbnails] = useState<string[]>(
    shuffledThumbnails.slice(0, visibleThumbnailsCount),
  );
  const [hiddenThumbnails, setHiddenThumbnails] = useState<string[]>(
    shuffledThumbnails.slice(visibleThumbnailsCount),
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        const randomVisibleThumbnailIndex =
          getRandomArrayIndex(visibleThumbnails);
        const randomHiddenThumbnailIndex =
          getRandomArrayIndex(hiddenThumbnails);

        setVisibleThumbnails((prev) =>
          replaceArrayItemAtIndex(
            prev,
            randomVisibleThumbnailIndex,
            hiddenThumbnails[randomHiddenThumbnailIndex]!,
          ),
        );

        setHiddenThumbnails((prevHiddenThumbnails) =>
          replaceArrayItemAtIndex(
            prevHiddenThumbnails,
            randomHiddenThumbnailIndex,
            visibleThumbnails[randomVisibleThumbnailIndex]!,
          ),
        );
      },
      getRandomIntFromInterval(1, 20, 100),
    );

    return () => clearInterval(interval);
  }, [visibleThumbnails, hiddenThumbnails]);

  return (
    <main className="flex items-center justify-center">
      <div className="grid w-fit grid-cols-[repeat(30,20px)] gap-[1px] opacity-80">
        <AnimatePresence mode="popLayout">
          {visibleThumbnails.map((path) => (
            <motion.img
              key={path}
              src={path}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 2 } }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
