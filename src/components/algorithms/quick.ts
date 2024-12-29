// QUICK SORT
const quickSort = async (array, barsRef, freeze, speedRef, changeColour, setArray, finishAnim) => {
    let curr = [...array];

    const extraArgs = { barsRef, freeze, speedRef, changeColour, setArray, finishAnim };

    await sorts(curr, 0, curr.length - 1, extraArgs);
    finishAnim();
}
    
const sorts = async (arr, left, right, extraArgs) => {
    if (left < right) {
        let partitionIndex = await partition(arr, left, right, extraArgs);

        const { setArray } = extraArgs;
    
        setArray([...arr]);

        await sorts(arr, partitionIndex + 1, right, extraArgs)
        await sorts(arr, left, partitionIndex - 1, extraArgs)
    }
}

const partition = async (arr: number[], left: number, right: number, extraArgs) => {
    const { barsRef, changeColour, freeze, speedRef, setArray } = extraArgs;
    
    let pivot = arr[right];
    let pivotBar = barsRef.current![right];
    changeColour(pivotBar, "#4d88ff");
    await freeze(speedRef.current);

    let i = left - 1;


    for (let j = left; j < right; j++) {

        let [bar1, bar2] = [barsRef.current![j], barsRef.current![j+1]];

        changeColour(bar1, "#6A5ACD");
        changeColour(bar2, "#DC143C");

        await freeze(speedRef.current);

        if (arr[j] < pivot) {

            i++;

            [arr[i], arr[j]] = [arr[j], arr[i]];

            setArray([...arr]);

            changeColour(bar1, "#DC143C");
            changeColour(bar2, "#6A5ACD");

            await freeze(speedRef.current);
        }

        changeColour(bar1);
        changeColour(bar2);
        
        await freeze(speedRef.current);
    }

    changeColour(pivotBar);
    await freeze(speedRef.current);

    [arr[i+1], arr[right]] = [arr[right], arr[i+1]];

    return i + 1;
}

export default quickSort;