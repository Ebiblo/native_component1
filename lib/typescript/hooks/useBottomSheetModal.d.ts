import { ReactNode } from 'react';
import type { BottomSheetModalConfigs } from '../types';
export declare const useBottomSheetModal: () => {
    present: (content: ReactNode, configs: BottomSheetModalConfigs) => void;
    dismiss: () => void;
    dismissAll: () => void;
    snapTo: (index: number) => void;
    expand: () => void;
    collapse: () => void;
};
