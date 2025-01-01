// SELECTION SORT

import { changeColour, freeze } from "../utils";

const selectionSort = async (array, barsRef, speedRef, setArray, finishAnim) => {
    let curr = [...array];

    for (let left = 0; left < curr.length-1; left++) {
        let [minVal, minIdx] = [curr[left], left];
        let barLeft = barsRef.current![left];
        changeColour(barLeft, "#33ff3c");
        await freeze(speedRef.current)

        let barMin;

        for (let right = left+1; right < curr.length; right++) {
            let barRight = barsRef.current![right];

            changeColour(barRight, "#6A5ACD");
            await freeze(speedRef.current)

            if (curr[right] < minVal) {
                minVal = curr[right];
                minIdx = right;

                if (!barMin) {
                    changeColour(barLeft, "#4d88ff");
                } else {
                    changeColour(barMin);
                }

                barMin = barsRef.current![right];
                changeColour(barMin, "#33ff3c");
                await freeze(speedRef.current);
            } else {
                changeColour(barRight);
                await freeze(speedRef.current);
            }
        }
        if (barMin) {
            changeColour(barMin, "#DC143C");
            changeColour(barLeft, "#DC143C");
            
            [curr[left], curr[minIdx]] = [curr[minIdx], curr[left]];
            setArray([...curr]);
            await freeze(speedRef.current);

            changeColour(barMin);
            changeColour(barLeft);
        } else {
            changeColour(barLeft);
        }
    }

    finishAnim();
}


export default selectionSort;