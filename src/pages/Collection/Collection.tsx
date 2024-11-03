import { useState, useEffect, useCallback } from 'react';
import { getRouteApi, Link, useNavigate } from '@tanstack/react-router';
import { useCollections } from '../../features/collection/collection.hooks';
import { CollectionNavigation } from './CollectionNavigation';
import { PictureContainer } from './PictureContainer';

const route = getRouteApi('/_layout/work/$collectionSlug');

export const Collection = () => {
  const navigate = useNavigate();

  const collections = useCollections();
  const collection = route.useLoaderData({
    select: (loaderData) => loaderData.collection,
  });
  const { id, name, titleAndDate, pictures } = collection;

  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);

  const picturesCount = pictures.length;
  const leftPicture = pictures[currentSpreadIndex]!;
  const rightPicture = pictures[(currentSpreadIndex + 1) % picturesCount]!;

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
          void navigate({
            to: '/work/$collectionSlug',
            params: { collectionSlug: getNextCollectionSlug() },
          });
          break;
        case 'ArrowDown':
          void navigate({
            to: '/work/$collectionSlug',
            params: { collectionSlug: getPreviousCollectionSlug() },
          });
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
    getNextCollectionSlug,
    getPreviousCollectionSlug,
  ]);

  return (
    <main className="grid grid-cols-[1fr_auto_1fr] items-center p-3">
      <div className="col-start-2 flex flex-col">
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
        className="flex w-fit items-end justify-center justify-self-end text-sm uppercase [writing-mode:vertical-lr]"
      >
        Next collection
      </Link>
    </main>
  );
};
