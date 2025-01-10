// QUICK SORT

import { changeColour, freeze, colors } from "../utils";

const quickSort = async (array, barsRef, speedRef, setArray, finishAnim) => {
    let curr = [...array];

    const extraArgs = { barsRef, speedRef, setArray };

    await sorts(curr, 0, curr.length - 1, extraArgs);
    finishAnim();
}
    
const sorts = async (arr, left, right, extraArgs) => {
    if (left < right) {
        let partitionIndex = await partition(arr, left, right, extraArgs);    

        await sorts(arr, partitionIndex + 1, right, extraArgs)
        await sorts(arr, left, partitionIndex - 1, extraArgs)
    }
}

const partition = async (arr: number[], left: number, right: number, extraArgs) => {
    const { barsRef, speedRef, setArray } = extraArgs;
    
    let pivot = arr[right];
    let pivotBar = barsRef.current[right];
    changeColour(pivotBar, "#4d88ff");
    await freeze(speedRef.current);
    
    let i = left - 1;

    let barLeft = barsRef.current[i+1];
    
    for (let j = left; j < right; j++) {
        changeColour(barLeft, colors.blue);

        let barRight = barsRef.current[j];
        changeColour(barRight, colors.blue);
        await freeze(speedRef.current);

        while (speedRef.current === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (arr[j] < pivot) {
            
            i++;
            if (i!=j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);

                changeColour(barLeft, colors.red);
                changeColour(barRight, colors.red);
                await freeze(speedRef.current);
                changeColour(barLeft);
            }
            
            barLeft = barsRef.current[i+1];
        }
        changeColour(barLeft, colors.blue);
        changeColour(barRight);
        await freeze(speedRef.current);
    }

    changeColour(barLeft);

    if (i+1 != right) {
        [arr[i+1], arr[right]] = [arr[right], arr[i+1]];
        setArray([...arr]);
    
        changeColour(barLeft, colors.red);
        changeColour(pivotBar, colors.red);
        await freeze(speedRef.current);
        
        changeColour(barLeft);
        changeColour(pivotBar);
        await freeze(speedRef.current);
    }

    return i + 1;
}

export default quickSort;