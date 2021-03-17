"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _bottomSheetModal = _interopRequireDefault(require("../bottomSheetModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BottomSheetModalContainerComponent = /*#__PURE__*/(0, _react.forwardRef)((_, ref) => {
  //#region state
  const [sheets, setSheets] = (0, _react.useState)({});
  const currentPresentedSheet = (0, _react.useRef)(null);
  const previousPresentedSheet = (0, _react.useRef)([]);
  const didHandleRestorePreviousSheet = (0, _react.useRef)(false); //#endregion
  //#region methods

  const unmountSheet = (0, _react.useCallback)(uniqueId => {
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
  const handleSnapTo = (0, _react.useCallback)((uniqueId, index) => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$;

      (_sheets$uniqueId$ref$ = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$ === void 0 ? void 0 : _sheets$uniqueId$ref$.snapTo(index);
    }
  }, [sheets]);
  const handleExpand = (0, _react.useCallback)(uniqueId => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$2;

      (_sheets$uniqueId$ref$2 = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$2 === void 0 ? void 0 : _sheets$uniqueId$ref$2.expand();
    }
  }, [sheets]);
  const handleCollapse = (0, _react.useCallback)(uniqueId => {
    if (sheets[uniqueId]) {
      var _sheets$uniqueId$ref$3;

      (_sheets$uniqueId$ref$3 = sheets[uniqueId].ref.current) === null || _sheets$uniqueId$ref$3 === void 0 ? void 0 : _sheets$uniqueId$ref$3.collapse();
    }
  }, [sheets]);
  const handlePresent = (0, _react.useCallback)((uniqueId, content, configs) => {
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
          ref: /*#__PURE__*/(0, _react.createRef)(),
          content,
          configs
        }
      }));
    }
  }, [sheets]);
  const handleDismiss = (0, _react.useCallback)(uniqueId => {
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
  const handleDismissAll = (0, _react.useCallback)(() => {
    Object.keys(sheets).map(key => {
      sheets[key].ref.current.close();
    });
  }, [sheets]); //#endregion

  (0, _react.useImperativeHandle)(ref, () => ({
    present: handlePresent,
    dismiss: handleDismiss,
    dismissAll: handleDismissAll,
    snapTo: handleSnapTo,
    expand: handleExpand,
    collapse: handleCollapse
  })); //#region renders

  const renderSheets = (0, _react.useCallback)(() => {
    return Object.keys(sheets).map(key => /*#__PURE__*/_react.default.createElement(_bottomSheetModal.default, {
      key: key,
      ref: sheets[key].ref,
      content: sheets[key].content,
      configs: sheets[key].configs,
      unmount: () => unmountSheet(key)
    }));
  }, [sheets, unmountSheet]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderSheets()); //#endregion
});
const BottomSheetModalContainer = /*#__PURE__*/(0, _react.memo)(BottomSheetModalContainerComponent, _lodash.default);
var _default = BottomSheetModalContainer;
exports.default = _default;
//# sourceMappingURL=BottomSheetModalContainer.js.map