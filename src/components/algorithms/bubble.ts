// BUBBLE SORT

import { changeColour, freeze, colors } from "../utils";

const bubbleSort = async (array, barsRef, speedRef, setArray, finishAnim, cancelRef) => {
    let curr = [...array];
        
    for (let i = 0; i < curr.length - 1; i++) {
        for (let j = 0; j < curr.length - i - 1; j++) {
            if (cancelRef.current) return;

            let [bar1, bar2] = [barsRef.current[j], barsRef.current[j+1]];

            changeColour(bar1, colors.blue);
            changeColour(bar2, colors.blue);
            await freeze(speedRef.current);


            while (speedRef.current === 0) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }


            if (curr[j] > curr[j + 1]) {

                [curr[j], curr[j + 1]] = [curr[j + 1], curr[j]];

                setArray([...curr]);
                
                changeColour(bar1, colors.red);
                changeColour(bar2, colors.red);
    
                await freeze(speedRef.current);
                
            }
            
            changeColour(bar1);
            changeColour(bar2);

            await freeze(speedRef.current);
        }
    }
    finishAnim();
};

export default bubbleSort;