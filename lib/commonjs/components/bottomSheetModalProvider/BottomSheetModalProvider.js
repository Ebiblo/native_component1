"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _contexts = require("../../contexts");

var _bottomSheetModalContainer = _interopRequireDefault(require("../bottomSheetModalContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BottomSheetModalProviderWrapper = props => {
  // extract props
  const {
    children
  } = props; //#region refs

  const containerRef = (0, _react.useRef)(null); //#endregion
  //#region variables

  const contextVariables = (0, _react.useMemo)(() => ({
    present: (...args) => {
      var _containerRef$current;

      if ((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.present) {
        var _containerRef$current2;

        // @ts-ignore
        (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.present(...args);
      }
    },
    dismiss: (...args) => {
      var _containerRef$current3;

      if ((_containerRef$current3 = containerRef.current) === null || _containerRef$current3 === void 0 ? void 0 : _containerRef$current3.dismiss) {
        var _containerRef$current4;

        // @ts-ignore
        (_containerRef$current4 = containerRef.current) === null || _containerRef$current4 === void 0 ? void 0 : _containerRef$current4.dismiss(...args);
      }
    },
    dismissAll: (...args) => {
      var _containerRef$current5;

      if ((_containerRef$current5 = containerRef.current) === null || _containerRef$current5 === void 0 ? void 0 : _containerRef$current5.dismissAll) {
        var _containerRef$current6;

        // @ts-ignore
        (_containerRef$current6 = containerRef.current) === null || _containerRef$current6 === void 0 ? void 0 : _containerRef$current6.dismissAll(...args);
      }
    },
    snapTo: (...args) => {
      var _containerRef$current7;

      if ((_containerRef$current7 = containerRef.current) === null || _containerRef$current7 === void 0 ? void 0 : _containerRef$current7.snapTo) {
        var _containerRef$current8;

        // @ts-ignore
        (_containerRef$current8 = containerRef.current) === null || _containerRef$current8 === void 0 ? void 0 : _containerRef$current8.snapTo(...args);
      }
    },
    expand: (...args) => {
      var _containerRef$current9;

      if ((_containerRef$current9 = containerRef.current) === null || _containerRef$current9 === void 0 ? void 0 : _containerRef$current9.expand) {
        var _containerRef$current10;

        // @ts-ignore
        (_containerRef$current10 = containerRef.current) === null || _containerRef$current10 === void 0 ? void 0 : _containerRef$current10.expand(...args);
      }
    },
    collapse: (...args) => {
      var _containerRef$current11;

      if ((_containerRef$current11 = containerRef.current) === null || _containerRef$current11 === void 0 ? void 0 : _containerRef$current11.collapse) {
        var _containerRef$current12;

        // @ts-ignore
        (_containerRef$current12 = containerRef.current) === null || _containerRef$current12 === void 0 ? void 0 : _containerRef$current12.collapse(...args);
      }
    }
  }), []); //#endregion
  //#region renders

  return /*#__PURE__*/_react.default.createElement(_contexts.BottomSheetModalProvider, {
    value: contextVariables
  }, children, /*#__PURE__*/_react.default.createElement(_bottomSheetModalContainer.default, {
    ref: containerRef
  })); //#endregion
};

var _default = BottomSheetModalProviderWrapper;
exports.default = _default;
//# sourceMappingURL=BottomSheetModalProvider.js.map