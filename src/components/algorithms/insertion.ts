// INSERTION SORT

import { changeColour, freeze } from "../utils";

const insertionSort = async (array, barsRef, speedRef, setArray, finishAnim) => {
    let curr = [...array];

    for (let right = 1; right < curr.length; right++) {
        
        let temp = right;
        let barRight = barsRef.current[temp];
        changeColour(barRight, "#0000FF");
        await freeze(speedRef.current);

        for (let left = right-1; left >= 0; left--) {
            if (curr[temp] < curr[left]) {
                [curr[temp], curr[left]] = [curr[left], curr[temp]];
                setArray([...curr]);
                
                changeColour(barRight);
                temp -= 1;
                barRight = barsRef.current[temp];
                changeColour(barRight, "#0000FF");
                await freeze(speedRef.current);
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