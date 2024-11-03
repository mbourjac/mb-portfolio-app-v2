import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import defaultTheme from 'tailwindcss/defaultTheme';
import { useRouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext.hook';
import { useMediaQuery } from '../../hooks/use-media-query';
import { useWindowSize } from '../../hooks/use-window-size';

type PictureContainerProps = {
  picture: string;
};

export const PictureContainer = ({ picture }: PictureContainerProps) => {
  const [scope, animate] = useAnimate();
  const { isRouteTransition } = useRouteTransitionContext();
  const { windowWidth, windowHeight } = useWindowSize();
  const isSmallDevice = useMediaQuery(
    `(max-width: ${defaultTheme.screens.md})`,
  );

  const containerRatio = 3 / 4;
  const maxContainerWidth = (windowWidth - (isSmallDevice ? 28 : 88)) / 2;
  const maxContainerHeight = windowHeight - 48 * 2 - 12 * 2 - 34 * 2;
  const widthBasedOnHeight = maxContainerHeight * containerRatio;
  const heightBasedOnWidth = maxContainerWidth / containerRatio;

  const containerWidth =
    widthBasedOnHeight > maxContainerWidth ? maxContainerWidth : (
      widthBasedOnHeight
    );
  const containerHeight =
    heightBasedOnWidth > maxContainerHeight ? maxContainerHeight : (
      heightBasedOnWidth
    );

  useEffect(() => {
    if (isRouteTransition) {
      void animate(scope.current, { opacity: 0 });
    }
  }, [isRouteTransition, animate, scope]);

  return (
    <div
      className="flex aspect-[4/5] items-center justify-center"
      style={{
        height: `${String(containerHeight)}px`,
        width: `${String(containerWidth)}px`,
      }}
    >
      <motion.img
        ref={scope}
        src={picture}
        alt=""
        className="h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1 },
        }}
      />
    </div>
  );
};
