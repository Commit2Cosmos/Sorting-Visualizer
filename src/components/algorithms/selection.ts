// SELECTION SORT

import { changeColour, freeze, colors } from "../utils";

const selectionSort = async (array, barsRef, speedRef, setArray, finishAnim) => {
    let curr = [...array];

    for (let left = 0; left < curr.length-1; left++) {
        let [minVal, minIdx] = [curr[left], left];
        let barLeft = barsRef.current[left];
        changeColour(barLeft, colors.green);
        await freeze(speedRef.current)

        let barMin;

        for (let right = left+1; right < curr.length; right++) {
            let barRight = barsRef.current[right];

            changeColour(barRight, colors.blue);
            await freeze(speedRef.current)
            
            while (speedRef.current === 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            if (curr[right] < minVal) {
                minVal = curr[right];
                minIdx = right;

                if (!barMin) {
                    changeColour(barLeft, colors.lightBlue);
                } else {
                    changeColour(barMin);
                }

                barMin = barsRef.current[right];
                changeColour(barMin, colors.green);
                await freeze(speedRef.current);
            } else {
                changeColour(barRight);
                await freeze(speedRef.current);
            }
        }
        if (barMin) {
            changeColour(barMin, colors.red);
            changeColour(barLeft, colors.red);
            
            [curr[left], curr[minIdx]] = [curr[minIdx], curr[left]];
            setArray([...curr]);
            await freeze(speedRef.current);

            changeColour(barMin);
        }
        changeColour(barLeft);
    }
    finishAnim();
}


export default selectionSort;