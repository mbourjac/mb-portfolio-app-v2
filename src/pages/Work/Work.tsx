import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAnimate } from 'framer-motion';
import { RightArrowIcon } from '../../components/RightArrowIcon';
import { useRouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext.hook';
import { useCollections } from '../../features/collection/collection.hooks';
import { CollectionPreview } from './CollectionPreview';

export const Work = () => {
  const [scope, animate] = useAnimate();
  const { isRouteTransition } = useRouteTransitionContext();
  const collections = useCollections();

  const [hoveredCollectionIndex, setHoveredCollectionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (isRouteTransition) {
      void animate(scope.current, { opacity: 0 });
    }
  }, [scope, isRouteTransition, animate]);

  return (
    <main className="grow p-3" ref={scope}>
      <div className="flex w-[calc(100vw-1.5rem)] flex-col gap-3 overflow-x-hidden">
        {collections
          .slice()
          .reverse()
          .map(({ fullInfo, name, titleAndDate, slug, thumbnails }, index) => {
            return (
              <Link
                key={index}
                to="/work/$collectionSlug"
                params={{ collectionSlug: slug }}
              >
                <article
                  className="group flex flex-col gap-1 border-b border-off-black transition-opacity dark:border-white"
                  onMouseEnter={() => setHoveredCollectionIndex(index)}
                  onMouseLeave={() => setHoveredCollectionIndex(null)}
                >
                  <h2 className="flex -translate-x-[1.5rem] items-center gap-2 transition-transform duration-500 group-hover:translate-x-0">
                    <RightArrowIcon />
                    <span className="hidden sm:block">{fullInfo}</span>
                    <span className="sm:hidden">
                      {name}, {titleAndDate}
                    </span>
                  </h2>
                  <CollectionPreview
                    thumbnails={thumbnails}
                    collectionIndex={index}
                    hoveredCollectionIndex={hoveredCollectionIndex}
                  />
                </article>
              </Link>
            );
          })}
      </div>
    </main>
  );
};
