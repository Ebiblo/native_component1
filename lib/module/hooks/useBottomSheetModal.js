import { useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { BottomSheetModalContext } from '../contexts/modal';
export const useBottomSheetModal = () => {
  // variable
  const uniqueId = useMemo(() => nanoid(), []); // hooks

  const {
    present,
    dismiss,
    dismissAll,
    snapTo,
    expand,
    collapse
  } = useContext(BottomSheetModalContext); //#region callbacks

  const handlePresent = useCallback((content, configs) => {
    requestAnimationFrame(() => {
      present(uniqueId, content, configs);
    });
  }, [present, uniqueId]);
  const handleDismiss = useCallback(() => {
    dismiss(uniqueId);
  }, [dismiss, uniqueId]);
  const handleSnapTo = useCallback(index => {
    snapTo(uniqueId, index);
  }, [snapTo, uniqueId]);
  const handleExpand = useCallback(() => {
    expand(uniqueId);
  }, [expand, uniqueId]);
  const handleCollapse = useCallback(() => {
    collapse(uniqueId);
  }, [collapse, uniqueId]); //#endregion

  return {
    present: handlePresent,
    dismiss: handleDismiss,
    dismissAll,
    snapTo: handleSnapTo,
    expand: handleExpand,
    collapse: handleCollapse
  };
};
//# sourceMappingURL=useBottomSheetModal.js.map