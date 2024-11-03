import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useRouteTransitionContext } from '../context/RouteTransitionContext/RouteTransitionContext.hook';
import { useCollections } from '../features/collection/collection.hooks';
import {
  getRandomArrayIndex,
  replaceArrayItemAtIndex,
  shuffleArray,
} from '../helpers/arrays';
import { getRandomIntFromInterval } from '../helpers/random';

export const Home = () => {
  const collections = useCollections();
  const { isRouteTransition } = useRouteTransitionContext();
  const [scope, animate] = useAnimate();

  const [isInitialAnimation, setIsInitialAnimation] = useState(true);

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

  useEffect(() => {
    if (isInitialAnimation) {
      setIsInitialAnimation(false);
    }
  }, [isInitialAnimation]);

  useEffect(() => {
    if (isRouteTransition) {
      void animate(scope.current, { opacity: 0 });
    }
  }, [isRouteTransition, scope, animate]);

  return (
    <main className="flex items-center justify-center">
      <div
        ref={scope}
        className="grid w-fit max-w-[653px] grid-cols-[repeat(30,minmax(0,1fr))] gap-[1px] p-3 opacity-80"
      >
        <AnimatePresence mode="popLayout">
          {visibleThumbnails.map((path) => (
            <motion.img
              key={path}
              src={path}
              alt=""
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: isInitialAnimation ? 1 : 2 },
              }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};
