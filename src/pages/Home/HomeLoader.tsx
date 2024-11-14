import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { getRandomIntFromInterval } from '../../helpers/random';

type HomeLoaderProps = {
  gridItemsCount: number;
};

export const HomeLoader = ({ gridItemsCount }: HomeLoaderProps) => {
  return createPortal(
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <motion.div
        className="grid w-full max-w-[653px] grid-cols-[repeat(30,minmax(0,1fr))] gap-[1px] bg-white p-3 dark:bg-off-black"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.6,
          },
        }}
      >
        {Array.from({ length: gridItemsCount }).map((_, index) => (
          <AnimatePresence key={index}>
            <motion.div
              className="aspect-[1/5] w-full bg-off-black dark:bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.2,
                transition: {
                  delay: getRandomIntFromInterval(6, 12, 0.1),
                  duration: 0.6,
                },
              }}
            ></motion.div>
          </AnimatePresence>
        ))}
      </motion.div>
    </div>,
    document.getElementById('root')!,
  );
};
