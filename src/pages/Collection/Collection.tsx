import { useState, useEffect, useCallback } from 'react';
import { getRouteApi, Link, useNavigate } from '@tanstack/react-router';
import { useAnimate } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { useRouteTransitionContext } from '../../context/RouteTransitionContext/RouteTransitionContext.hook';
import { useCollections } from '../../features/collection/collection.hooks';
import { CollectionNavigation } from './CollectionNavigation';
import { PictureContainer } from './PictureContainer';

const route = getRouteApi('/_layout/work/$collectionSlug');

export const Collection = () => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const { isRouteTransition } = useRouteTransitionContext();

  const collections = useCollections();
  const collection = route.useLoaderData({
    select: (loaderData) => loaderData.collection,
  });
  const { id, name, titleAndDate, pictures, picturesCount } = collection;

  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);

  const getPicture = (index: number) => ({
    small: pictures.small[index % picturesCount]!,
    medium: pictures.medium[index % picturesCount]!,
    large: pictures.large[index % picturesCount]!,
  });

  const leftPicture = getPicture(currentSpreadIndex);
  const rightPicture = getPicture(currentSpreadIndex + 1);

  const showNextSpread = useCallback(() => {
    setCurrentSpreadIndex((prevIndex) => (prevIndex + 2) % picturesCount);
  }, [picturesCount]);

  const showPreviousSpread = useCallback(() => {
    setCurrentSpreadIndex(
      (prevIndex) => (prevIndex - 2 + picturesCount) % picturesCount,
    );
  }, [picturesCount]);

  const getNextCollectionSlug = useCallback(() => {
    const nextCollectionIndex = (id - 1 + 1) % collections.length;
    return collections[nextCollectionIndex]!.slug;
  }, [id, collections]);

  const getPreviousCollectionSlug = useCallback(() => {
    const nextCollectionIndex =
      (id - 1 - 1 + collections.length) % collections.length;
    return collections[nextCollectionIndex]!.slug;
  }, [id, collections]);

  const showNextCollection = useCallback(() => {
    void navigate({
      to: '/work/$collectionSlug',
      params: { collectionSlug: getNextCollectionSlug() },
    });
  }, [navigate, getNextCollectionSlug]);

  const showPreviousCollection = useCallback(() => {
    void navigate({
      to: '/work/$collectionSlug',
      params: { collectionSlug: getPreviousCollectionSlug() },
    });
  }, [navigate, getPreviousCollectionSlug]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: showNextSpread,
    onSwipedRight: showPreviousSpread,
    onSwipedUp: showNextCollection,
    onSwipedDown: showPreviousCollection,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    setCurrentSpreadIndex(0);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          showNextSpread();
          break;
        case 'ArrowLeft':
          showPreviousSpread();
          break;
        case 'ArrowUp':
          showNextCollection();
          break;
        case 'ArrowDown':
          showPreviousCollection();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    navigate,
    showNextSpread,
    showPreviousSpread,
    showNextCollection,
    showPreviousCollection,
  ]);

  useEffect(() => {
    if (isRouteTransition) {
      void animate(scope.current, { opacity: 0 });
    }
  }, [isRouteTransition, animate, scope]);

  return (
    <main className="flex grow justify-center" ref={scope}>
      <div
        className="grid max-h-[calc(100vh-96px)] w-full grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr] items-center py-3 md:grid-rows-1"
        {...swipeHandlers}
      >
        <div className="col-start-2 row-start-2 flex flex-col md:row-start-1">
          <div className="flex flex-col gap-0.5 pb-1 text-sm uppercase leading-none">
            <p className="font-semibold">{name} /</p>
            <p>{titleAndDate}</p>
          </div>
          <div className="flex gap-1">
            <PictureContainer picture={leftPicture} />
            <PictureContainer picture={rightPicture} />
          </div>
          <CollectionNavigation
            picturesCount={picturesCount}
            setCurrentSpreadIndex={setCurrentSpreadIndex}
          />
        </div>
        <Link
          to="/work/$collectionSlug"
          params={{ collectionSlug: getNextCollectionSlug() }}
          className="hidden w-fit items-end justify-center justify-self-end p-3 text-sm uppercase leading-none md:col-start-3 md:flex md:[writing-mode:vertical-lr]"
        >
          Next collection
        </Link>
      </div>
    </main>
  );
};
