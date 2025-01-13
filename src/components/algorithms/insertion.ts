// INSERTION SORT

import { changeColour, freeze, colors } from "../utils";

const insertionSort = async (array, barsRef, speedRef, setArray, finishAnim, cancelRef) => {
    let curr = [...array];

    for (let right = 1; right < curr.length; right++) {
        
        let temp = right;
        let barRight = barsRef.current[temp];
        changeColour(barRight, colors.blue);
        await freeze(speedRef.current);

        for (let left = right-1; left >= 0; left--) {
            if (cancelRef.current) return;
            if (curr[temp] < curr[left]) {
                [curr[temp], curr[left]] = [curr[left], curr[temp]];
                setArray([...curr]);
                
                changeColour(barRight);
                temp -= 1;
                barRight = barsRef.current[temp];
                changeColour(barRight, colors.blue);
                await freeze(speedRef.current);
                while (speedRef.current === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            } else {
                break;
            }
        }
        
        changeColour(barRight);
        await freeze(speedRef.current);
    }
    finishAnim();
}

export default insertionSort;