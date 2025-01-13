// MERGE SORT

import { changeColour, freeze } from "../utils";

const mergeSort = async (array, barsRef, speedRef, setArray, finishAnim, cancelRef) => {
    let curr = [...array];

    const extraArgs = { barsRef, speedRef, setArray, finishAnim, cancelRef };

    await merge(curr, 0, curr.length, extraArgs);
    if (extraArgs.cancelRef.current) return;
    finishAnim();
}
    
const merge = async (arr: number[], start: number, finish: number, extraArgs) => {
    let len = finish - start;
    if (len == 1 || extraArgs.cancelRef.current) {
        return;
    }

    let mid = Math.floor((start + finish)/2);
    await merge(arr, start, mid, extraArgs);
    await merge(arr, mid, finish, extraArgs);

    await sort(arr, start, mid, finish, extraArgs);
}


const sort = async (arr: number[], start: number, mid: number, finish: number, extraArgs) => {
    const { barsRef, speedRef, setArray, cancelRef } = extraArgs;

    let left = arr.slice(start, mid);
    let right = arr.slice(mid, finish);

    let i = start, j = 0, k = 0;

    while (j < left.length && k < right.length) {
        if (cancelRef.current) return;

        let leftBar = barsRef.current[i];
        let rightBar = barsRef.current[i+left.length-j];
        changeColour(leftBar, "#4d88ff");
        changeColour(rightBar, "#DC143C");
        await freeze(speedRef.current);

        while (speedRef.current === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (left[j] <= right[k]) {
            arr[i++] = left[j++];
        } else {
            let last = arr[i+left.length-j];
            for (let q = i+left.length-j; q > i; q--) {
                arr[q] = arr[q - 1];
            }
            arr[i++] = last;
            k++;

            changeColour(rightBar);
            if (extraArgs.cancelRef.current) return;
            rightBar = barsRef.current[i];
            changeColour(rightBar, "#4d88ff");
            changeColour(leftBar, "#DC143C");
            setArray([...arr]);
            await freeze(speedRef.current);
        }

        changeColour(leftBar);
        changeColour(rightBar);
        await freeze(speedRef.current);
    }

    while (j < left.length) {
        arr[i++] = left[j++];
    }

    while (k < right.length) {
        arr[i++] = right[k++];
    }
}

export default mergeSort;