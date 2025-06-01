import { RoundSize } from "../../utils/type";

export interface PropsParent {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    title?: string;
    buttonClose?: boolean;
    styles?: {
        width?: RoundSize | 'min' | 'max' | 'fit'
        roundSize?: RoundSize
    }
    buttonPrimary?: {
        isShow?: boolean,
        title?: string,
        action: () => void
    }
    buttonSecondary?: {
        isShow?: boolean,
        title?: string,
        action?: () => void
    }
    children?: React.ReactNode;
}

export interface PropsMessage {
    meesage: string
}