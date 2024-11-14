import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useLoaderContext } from '../../context/LoaderContext/LoaderContext.hook';
import { useRouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext.hook';
import { useCollections } from '../../features/collection/collection.hooks';
import {
  getRandomArrayIndex,
  replaceArrayItemAtIndex,
  shuffleArray,
} from '../../helpers/arrays';
import { getRandomIntFromInterval } from '../../helpers/random';
import { HomeLoader } from './HomeLoader';

export const Home = () => {
  const collections = useCollections();
  const { isRouteTransition } = useRouteTransitionContext();
  const { showLoader } = useLoaderContext();
  const [scope, animate] = useAnimate();

  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

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
    if (showLoader) return;

    const animationTimeout = setTimeout(() => {
      setIsAnimationActive(true);
    }, 200);

    return () => clearTimeout(animationTimeout);
  }, [showLoader]);

  useEffect(() => {
    if (!isAnimationActive) return;

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
      getRandomIntFromInterval(8, 20, 100),
    );

    return () => clearInterval(interval);
  }, [isAnimationActive, visibleThumbnails, hiddenThumbnails]);

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
    <>
      <AnimatePresence>
        {showLoader && <HomeLoader gridItemsCount={visibleThumbnailsCount} />}
      </AnimatePresence>
      <main className="flex grow items-center justify-center">
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
                  transition: {
                    duration:
                      showLoader ? 0.6
                      : isInitialAnimation ? 1
                      : 2,
                    delay:
                      showLoader ? getRandomIntFromInterval(8, 12, 0.1) : 0,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};
