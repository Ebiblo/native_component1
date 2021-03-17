/// <reference types="react" />
import type { Scrollable, ScrollableType } from '../types';
export declare const useScrollableInternal: (type: ScrollableType) => {
    scrollableRef: import("react").RefObject<Scrollable>;
    handleScrollEvent: (...args: any[]) => void;
    handleSettingScrollable: () => () => void;
};
