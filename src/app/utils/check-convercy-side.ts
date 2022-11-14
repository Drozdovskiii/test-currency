export enum IConvercySide {
    RIGHT = 'right',
    LEFT = 'left',
}

export const checkConvercySide = (fieldString: string): IConvercySide => {
    if (fieldString.includes(IConvercySide.LEFT)) return IConvercySide.LEFT
    if (fieldString.includes(IConvercySide.RIGHT)) return IConvercySide.RIGHT

    throw new Error('wrong side field');
}