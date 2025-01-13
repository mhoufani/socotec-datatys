export const isNumber = (predicate: unknown) => !Number.isNaN(Number(predicate));

export const isBrowser = (): boolean => typeof window !== 'undefined'
