import React, { useCallback, useImperativeHandle, useState, useRef, forwardRef, createRef, memo } from 'react';
import isEqual from 'lodash.isequal';
import BottomSheetModal from '../bottomSheetModal';
const BottomSheetModalContainerComponent = /*#__PURE__*/forwardRef((_, ref) => {
  //#region state
  const [sheets, setSheets] = useState({});
  const currentPresentedSheet = useRef(null);
  const previousPresentedSheet = useRef([]);
  const didHandleRestorePreviousSheet = useRef(false); //#endregion
  //#region methods

  const unmountSheet = useCallback(uniqueId => {
    /**
     * dismissing the current sheet
     */
    if (uniqueId === currentPresentedSheet.current) {
      /**
       * no previous sheets presented.
       */
      if (previousPresentedSheet.current.length === 0) {
        // @ts-ignore
        currentPresentedSheet.current = null;
      } else if (previousPresentedSheet.current.length > 0) {
        // @ts-ignore
        currentPresentedSheet.current = previousPresentedSheet.current[0];
        previousPresentedSheet.current.splice(0, 1);

        if (!didHandleRestorePreviousSheet.current) {
          var _sheets$currentPresen;

          (_sheets$currentPresen = sheets[currentPresentedSheet.current].ref.current) === null || _sheets$currentPresen === void 0 ? void 0 : _sheets$currentPresen.restoreSheetPosition();
        }

        didHandleRestorePreviousSheet.current = false;
      }
    } else {
      /**
       * dismissing a sheet in the background.
       */
      const sheetIndex = previousPresentedSheet.current.indexOf(uniqueId);
      previousPresentedSheet.current.splice(sheetIndex, 1);
    }

    setSheets(_sheets => Object.keys(_sheets).reduce((object, key) => {
      if (key !== uniqueId) {
        object[key] = _sheets[key];
      }

      return object;
    }, {}));
  }, [sheets]);
  const handleSnapTo = useCallback((uniqueId, index) => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$;

      (_sheets$uniqueId$ref$ = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$ === void 0 ? void 0 : _sheets$uniqueId$ref$.snapTo(index);
    }
  }, [sheets]);
  const handleExpand = useCallback(uniqueId => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$2;

      (_sheets$uniqueId$ref$2 = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$2 === void 0 ? void 0 : _sheets$uniqueId$ref$2.expand();
    }
  }, [sheets]);
  const handleCollapse = useCallback(uniqueId => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$3;

      (_sheets$uniqueId$ref$3 = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$3 === void 0 ? void 0 : _sheets$uniqueId$ref$3.collapse();
    }
  }, [sheets]);
  const handlePresent = useCallback((uniqueId, content, configs) => {
    if (!sheets[uniqueId]) {
      if (currentPresentedSheet.current) {
        var _sheets$currentPresen2;

        // collapse current sheet
        (_sheets$currentPresen2 = sheets[currentPresentedSheet.current].ref.current) === null || _sheets$currentPresen2 === void 0 ? void 0 : _sheets$currentPresen2.temporaryCloseSheet(); // @ts-ignore

        previousPresentedSheet.current = [currentPresentedSheet.current, ...previousPresentedSheet.current];
      } // @ts-ignore


      currentPresentedSheet.current = uniqueId;
      setSheets(state => ({ ...state,
        [uniqueId]: {
          ref: /*#__PURE__*/createRef(),
          content,
          configs
        }
      }));
    }
  }, [sheets]);
  const handleDismiss = useCallback(uniqueId => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$4;

      (_sheets$uniqueId$ref$4 = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$4 === void 0 ? void 0 : _sheets$uniqueId$ref$4.close();
      /**
       * dismissing the current sheet
       */

      if (uniqueId === currentPresentedSheet.current && previousPresentedSheet.current.length > 0) {
        var _sheets$previousPrese;

        didHandleRestorePreviousSheet.current = true;
        (_sheets$previousPrese = sheets[previousPresentedSheet.current[0]].ref.current) === null || _sheets$previousPrese === void 0 ? void 0 : _sheets$previousPrese.restoreSheetPosition();
      }
    }
  }, [sheets]);
  const handleDismissAll = useCallback(() => {
    Object.keys(sheets).map(key => {
      sheets[key].ref.current.close();
    });
  }, [sheets]); //#endregion

  useImperativeHandle(ref, () => ({
    present: handlePresent,
    dismiss: handleDismiss,
    dismissAll: handleDismissAll,
    snapTo: handleSnapTo,
    expand: handleExpand,
    collapse: handleCollapse
  })); //#region renders

  const renderSheets = useCallback(() => {
    return Object.keys(sheets).map(key => /*#__PURE__*/React.createElement(BottomSheetModal, {
      key: key,
      ref: sheets[key].ref,
      content: sheets[key].content,
      configs: sheets[key].configs,
      unmount: () => unmountSheet(key)
    }));
  }, [sheets, unmountSheet]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderSheets()); //#endregion
});
const BottomSheetModalContainer = /*#__PURE__*/memo(BottomSheetModalContainerComponent, isEqual);
export default BottomSheetModalContainer;
//# sourceMappingURL=BottomSheetModalContainer.js.map