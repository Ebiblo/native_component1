"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetModal = void 0;

var _react = require("react");

var _nonSecure = require("nanoid/non-secure");

var _modal = require("../contexts/modal");

const useBottomSheetModal = () => {
  // variable
  const uniqueId = (0, _react.useMemo)(() => (0, _nonSecure.nanoid)(), []); // hooks

  const {
    present,
    dismiss,
    dismissAll,
    snapTo,
    expand,
    collapse
  } = (0, _react.useContext)(_modal.BottomSheetModalContext); //#region callbacks

  const handlePresent = (0, _react.useCallback)((content, configs) => {
    requestAnimationFrame(() => {
      present(uniqueId, content, configs);
    });
  }, [present, uniqueId]);
  const handleDismiss = (0, _react.useCallback)(() => {
    dismiss(uniqueId);
  }, [dismiss, uniqueId]);
  const handleSnapTo = (0, _react.useCallback)(index => {
    snapTo(uniqueId, index);
  }, [snapTo, uniqueId]);
  const handleExpand = (0, _react.useCallback)(() => {
    expand(uniqueId);
  }, [expand, uniqueId]);
  const handleCollapse = (0, _react.useCallback)(() => {
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

exports.useBottomSheetModal = useBottomSheetModal;
//# sourceMappingURL=useBottomSheetModal.js.map