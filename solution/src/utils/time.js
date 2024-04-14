
import { useRef, useEffect, useCallback } from 'react';

export const wait = time => new Promise(resolve => setTimeout(() => { resolve() }, time));

export const useDebounce = (perform, target, timeout) => {
    const callback = useCallback(() => { perform() }, [target]);

    useEffect(() => {
        const ref = setTimeout(() => { callback() }, timeout);
        return () => clearTimeout(ref);
    }, [callback]);
};

export const useDebouncedRequest = (request, update, target, timeout) => {
    const value = useRef(target);
    
    const perform = async () => {
        const result = await request();
        value.current === target && update(result);
    };

    const callback = useCallback(() => { perform() }, [target]);

    useEffect(() => {
        if (!target) {
            return;
        }

        value.current = target;
        const ref = setTimeout(() => { callback() }, timeout);
        return () => clearTimeout(ref);
    }, [callback]);
};
