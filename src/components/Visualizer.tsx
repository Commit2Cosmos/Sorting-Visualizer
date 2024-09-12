import { useState, useEffect, useRef } from "react";

const Visualizer = () => {

    const [arrSize, setArrSize] = useState(100);
    const [array, setArray] = useState(new Array(arrSize));
    const [algorithm, setAlgorithm] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [loading, setLoading] = useState(false);

    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    
    const algorithms = [
        {name: 'Bubble', description: 'This is bubble sort'},
        {name: 'Quick', description: 'This is quick sort'},
        {name: 'Selection', description: 'This is selection sort'},
        {name: 'Insertion', description: 'This is insertion sort'},
        {name: 'Merge', description: 'This is merge sort'},
    ];


    //* Create a ref for each bar 
    const setBarRef = (el: HTMLDivElement | null, idx: number) => {
        barsRef.current[idx] = el;
    };


    const changeColour = (bar: HTMLElement, color: string = "var(--bar-color)") => {
        bar!.style.backgroundColor = color;
    }

    
    //* Generate new array
    const randomize = () => {
        const min = 5;
        const max = 100;
        let arr: number[] = new Array(arrSize).fill(0).map(() => Math.floor(Math.random() * (max - min + 1) + min));
        setArray(arr);

        barsRef.current.forEach((bar) => {
            changeColour(bar!);
        });
    }


    //* Shuffle array
    // const handleShuffle = () => {

    // }


    const handleAlgo = (index: number) => {
        // const group = document.getElementById("group")?.style;
        // console.log(group?.display);
        // group!.display = 'none';
        setAlgorithm(index);
    }


    useEffect(() => {
        randomize();
    }, [arrSize])


    // Sort on click
    const handleSorting = () => {
        setLoading(true);
        switch (algorithms[algorithm].name) {
            case 'Bubble':
                bubbleSort();
                break
            case 'Quick':
                bubbleSort();
                break
        }
    }


    // fake promise to inroduce delay between swaps
    const freeze = (delay = speed) => {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }


    const finishAnim = async () => {
        for (let i = 0; i < array.length; i++) {
            const bar = barsRef.current[i];
            bar!.style.backgroundColor = 'green';
            await freeze();
        }
        setLoading(false);
    }


    //* BUBBLE SORT
    const bubbleSort = async () => {
        let curr = [...array];
        let sorted = false;

        while (!sorted) {
            
            for (let i = 0; i < curr.length - 1; i++) {
                sorted = true;
                for (let j = 0; j < curr.length - i - 1; j++) {

                    let bar1 = barsRef.current[j]!;
                    let bar2 = barsRef.current[j+1]!;

                    changeColour(bar1, "#6A5ACD");
                    changeColour(bar2, "#DC143C");

                    await freeze();

                    if (curr[j] > curr[j + 1]) {

                        [curr[j], curr[j + 1]] = [curr[j + 1], curr[j]];

                        setArray([...curr]);
                        
                        changeColour(bar1, "#DC143C");
                        changeColour(bar2, "#6A5ACD");
            
                        await freeze();
                        
                        sorted = false
                    }
                    
                    changeColour(bar1);
                    changeColour(bar2);

                    await freeze();
                }
            }
        }
        finishAnim();
    }

    
    // QUICK SORT
    // const quickSort = async () => {
    //     let curr = array;
    
    //     await sorts(curr, 0, curr.length - 1);
    //     finishAnim();
    // }
        
    // const sorts = async (arr: number[], left: number, right: number) => {
    //     if (left < right) {
    //         let partitionIndex = partition(arr, left, right)
        
    //         setArray([...arr]);
    //         await freeze();

    //         await sorts(arr, left, partitionIndex - 1)
    //         await sorts(arr, partitionIndex + 1, right)
    //     }
    // }

    // const partition = (arr: number[], left: number, right: number) => {
    //     let pivot = arr[right];
    //     let i = left - 1;

    //     for (let j = left; j < right; j++) {
    //         if (arr[j] < pivot) {

    //             i++;

    //             let temp = arr[i];
    //             arr[i] = arr[j];
    //             arr[j] = temp;

    //             let bar1 = document.getElementById(`${i}`)!.style;
    //             let bar2 = document.getElementById(`${j}`)!.style;
    //             bar1.backgroundColor = '#DC143C';
    //             bar2.backgroundColor = '#6A5ACD';

    //             freeze();

    //             bar1.backgroundColor = '#ff7f50';
    //             bar2.backgroundColor = '#ff7f50';
        
    //             setArray([...arr]);
    //         }
    //     }

    //     let temp = arr[i + 1];
    //     arr[i + 1] = arr[right];
    //     arr[right] = temp;
    
    //     return i + 1;
    // }
    

    return (
        <div className="absolute w-full h-full flex flex-col items-center gap-10">
            <div className="mt-2 outline w-[90%] h-[70%] flex gap-10 items-center">
                {/*  */}
                <input className="vertical-bar h-52 outline w-6" type="range" min="10" max="100" value={array.length} disabled={loading} onChange={(e) => setArrSize(parseInt(e.target.value))} />
                {/* Bars */}
                <div className="w-full h-full flex gap-1">
                    {array.map((value, key) => (
                        <div
                        className="bg-[var(--bar-color)] self-end" 
                        id={key.toString()}
                        key={key}
                        style={{ height: `${value}%`, width: `${100/arrSize}%` }}
                        ref={el => setBarRef(el, key)}
                        ></div>
                    ))}
                </div>
            </div>
            {/* Buttons after */}
            <div className="flex text-lg font-semibold text-white gap-10">
                {/* Dropdown selection */}
                <div className="relative bg-green-700 w-40 group hover:bg-emerald-500">
                    <p className="p-2 text-center">{algorithms[algorithm].name} Sort</p>
                    <div className="absolute top-0 -translate-y-44 hidden bg-[#f1f1f1] z-10 w-full group-hover:block" id="group">
                        {algorithms.map((alg, index) => {
                            if (index !== algorithm) {
                                return <button key={index} disabled={loading} className="text-black p-2 block hover:bg-slate-600 hover:text-white" onClick={() => handleAlgo(index)}>{alg.name} Sort</button>
                            }
                        })}
                    </div>
                </div>
                {/* Sort button */}
                <button className="p-2 bg-orange-600 text-white hover:opacity-80 w-40 disabled:opacity-60 disabled:hover:bg-orange-600" disabled={loading} onClick={handleSorting}>
                    Sort
                </button>
                {/* Reset button */}
                <button className="p-2 bg-lime-500 text-white hover:opacity-80 w-40 disabled:opacity-60 disabled:hover:bg-lime-500" disabled={loading} onClick={randomize}>
                    Reset
                </button>
            </div>
            <div className="w-full flex flex-col items-center">
                <p>Speed</p>
                <div className="w-full flex justify-center">
                    <p>1</p>
                    <input className="mx-5" type="range" min="1" max="500" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                    <p>500</p>
                </div>
            </div>
        </div>
    )
}

export default Visualizer