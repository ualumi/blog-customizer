import { useEffect } from 'react';

type UseSidebarOutsideClickProps = {
  isOpen: boolean;
  rootRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const useSidebarOutsideClick = ({
  isOpen,
  rootRef,
  onClose,
}: UseSidebarOutsideClickProps): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, rootRef, onClose]);
};
