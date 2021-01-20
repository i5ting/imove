import { useRef, useEffect, MutableRefObject } from 'react';

type EventType = MouseEvent | TouchEvent;
type TargetElement = HTMLElement | Element | Document | Window;
type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

const defaultEvent = 'click';

const getTargetElement = (
  target: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null => {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;
  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
};

const useClickAway = (
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent,
): void => {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];
      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement;
          return !targetElement || targetElement?.contains(event.target);
        })
      ) {
        return;
      }
      onClickAwayRef.current(event);
    };
    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
};

export default useClickAway;
