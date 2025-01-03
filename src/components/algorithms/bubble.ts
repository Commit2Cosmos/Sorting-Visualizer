// BUBBLE SORT

import { changeColour, freeze } from "../utils";

const bubbleSort = async (array, barsRef, speedRef, setArray, finishAnim) => {
    let curr = [...array];
    let sorted = false;

    while (!sorted) {
        
        for (let i = 0; i < curr.length - 1; i++) {
            sorted = true;
            for (let j = 0; j < curr.length - i - 1; j++) {

                let [bar1, bar2] = [barsRef.current[j], barsRef.current[j+1]];

                changeColour(bar1, "#6A5ACD");
                changeColour(bar2, "#6A5ACD");

                await freeze(speedRef.current);

                if (curr[j] > curr[j + 1]) {

                    [curr[j], curr[j + 1]] = [curr[j + 1], curr[j]];

                    setArray([...curr]);
                    
                    changeColour(bar1, "#DC143C");
                    changeColour(bar2, "#DC143C");
        
                    await freeze(speedRef.current);
                    
                    sorted = false
                }
                
                changeColour(bar1);
                changeColour(bar2);

                await freeze(speedRef.current);
            }
        }
    }
    finishAnim();
};

export default bubbleSort;