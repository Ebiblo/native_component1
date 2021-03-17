import { ReactNode } from 'react';
import type { BottomSheetModalConfigs } from '../types';
export declare type BottomSheetModalContextType = {
    present: (uniqueId: string, content: ReactNode, configs: BottomSheetModalConfigs) => void;
    dismiss: (uniqueId: string) => void;
    dismissAll: () => void;
    snapTo: (uniqueId: string, index: number) => void;
    expand: (uniqueId: string) => void;
    collapse: (uniqueId: string) => void;
};
export declare const BottomSheetModalContext: import("react").Context<BottomSheetModalContextType>;
export declare const BottomSheetModalProvider: import("react").Provider<BottomSheetModalContextType>;
