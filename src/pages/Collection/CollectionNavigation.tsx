import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { LeftArrowIcon } from '../../components/LeftArrowIcon';
import { RightArrowIcon } from '../../components/RightArrowIcon';

type CollectionNavigationProps = {
  picturesCount: number;
  setCurrentSpreadIndex: Dispatch<SetStateAction<number>>;
};

export const CollectionNavigation = ({
  picturesCount,
  setCurrentSpreadIndex,
}: CollectionNavigationProps) => {
  const showNextSpread = useCallback(() => {
    setCurrentSpreadIndex((prevIndex) => (prevIndex + 2) % picturesCount);
  }, [setCurrentSpreadIndex, picturesCount]);

  const showPreviousSpread = useCallback(() => {
    setCurrentSpreadIndex(
      (prevIndex) => (prevIndex - 2 + picturesCount) % picturesCount,
    );
  }, [setCurrentSpreadIndex, picturesCount]);

  return (
    <div className="grid grid-cols-2 gap-1 text-sm leading-none">
      <button
        onClick={showPreviousSpread}
        className="group flex overflow-hidden uppercase"
      >
        <span className="flex w-full -translate-x-[1.5rem] items-center gap-2 pb-4 pt-1 transition-transform duration-500 group-hover:translate-x-0">
          <LeftArrowIcon />
          Prev pictures
        </span>
      </button>
      <button
        onClick={showNextSpread}
        className="group flex justify-end overflow-hidden uppercase"
      >
        <span className="flex w-full translate-x-[1.5rem] items-center justify-end gap-2 pb-4 pt-1 transition-transform duration-500 group-hover:translate-x-0">
          Next pictures
          <RightArrowIcon />
        </span>
      </button>
    </div>
  );
};
