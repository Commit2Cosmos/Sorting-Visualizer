import { useState, useEffect, useRef } from "react";


const initAlgorithms = [
    {name: 'Bubble', description: 'This is bubble sort'},
    {name: 'Quick', description: 'This is quick sort'},
    {name: 'Selection', description: 'This is selection sort'},
    {name: 'Insertion', description: 'This is insertion sort'},
    {name: 'Merge', description: 'This is merge sort'},
];

const Visualizer = () => {

    const [arrSize, setArrSize] = useState(10);
    const [array, setArray] = useState(new Array(arrSize));
    const [algorithms, setAlgorithms] = useState(initAlgorithms);
    const [speed, setSpeed] = useState(1);
    const speedRef = useRef(speed);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    const barsRef = useRef<(HTMLDivElement | null)[]>([]);


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
            if (bar) {
                changeColour(bar);
            }
        });
    }


    const handleAlgo = (algo_name: string) => {
        setAlgorithms(x => {
            const currentIndex = x.findIndex(c => c.name === algo_name);
            const updatedAlgorithms = [...x];

            [updatedAlgorithms[0], updatedAlgorithms[currentIndex]] = [updatedAlgorithms[currentIndex], updatedAlgorithms[0]];

            return updatedAlgorithms;
        });
    }


    //* Reset array if size is changed
    useEffect(() => {
        randomize();
    }, [arrSize])


    //* Sort on click
    const handleSorting = () => {
        setLoading(true);
        switch (algorithms[0].name) {
            case 'Bubble':
                bubbleSort();
                break
            case 'Quick':
                bubbleSort();
                break
        }
    }


    //* Fake promise to inroduce delay between swaps
    const freeze = (delay = speedRef.current) => {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }


    //* Run after sorting the array
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

                    let [bar1, bar2] = [barsRef.current[j]!, barsRef.current[j+1]!];

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

    //* bar number range
    const min_bars = 10;
    const max_bars = 100;


    //* speed range (ms)
    const min_speed = 1;
    const max_speed = 500;
    

    return (
        <div className="absolute w-full h-full flex flex-col items-center gap-10">
            <div className="mt-2 w-[90%] h-[70%] flex gap-10 outline-all">
                {/* Number of bars */}
                <div className="h-full flex flex-col justify-center items-center gap-2">
                    <p className="dial">More</p>
                    <input className="vertical-bar h-2/3 w-10" type="range" min={min_bars} max={max_bars} value={array.length} disabled={loading} onChange={(e) => setArrSize(parseInt(e.target.value))} />
                    <p className="dial">Less</p>
                </div>

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
                    <p className="p-2 text-center">{algorithms[0].name} Sort</p>
                    <div className="absolute top-0 -translate-y-full hidden bg-[#f1f1f1] z-10 w-full group-hover:block" id="group">
                        {algorithms.filter(sort => sort.name !== algorithms[0].name).map((alg, index) => {
                            return <button key={index} disabled={loading} className="w-full text-black p-2 block hover:bg-slate-600 hover:text-white" onClick={() => handleAlgo(alg.name)}>{alg.name} Sort</button>
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
                    <p className="dial">Fast</p>
                    <input className="mx-5 w-2/5" type="range" min={min_speed} max={max_speed} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                    <p className="dial">Slow</p>
                </div>
            </div>
        </div>
    )
}

export default Visualizer