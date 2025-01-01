import { useState, useEffect, useRef } from "react";
import bubbleSort from "./algorithms/bubble";
import quickSort from "./algorithms/quick";
import selectionSort from "./algorithms/selection";
import { freeze, changeColour } from "./utils";


const initAlgorithms = [
    'Selection',
    'Bubble',
    'Quick',
    // 'Insertion',
    // 'Merge',
];

const Visualizer = () => {

    const [arrSize, setArrSize] = useState(30);
    const [array, setArray] = useState(new Array(arrSize));
    const [algorithms, setAlgorithms] = useState(initAlgorithms);
    const [speed, setSpeed] = useState(50);
    const speedRef = useRef(speed);
    const [loading, setLoading] = useState(false);
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    //* Create a ref for each bar 
    const setBarRef = (el: HTMLDivElement | null, idx: number) => {
        barsRef.current[idx] = el;
    };

    
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
            const currentIndex = x.findIndex(c => c === algo_name);
            const updatedAlgorithms = [...x];

            [updatedAlgorithms[0], updatedAlgorithms[currentIndex]] = [updatedAlgorithms[currentIndex], updatedAlgorithms[0]];

            return updatedAlgorithms;
        });
    }


    //* Reset array if size is changed
    useEffect(() => {
        randomize();
    }, [arrSize])

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);


    //* Sort on click
    const handleSorting = () => {
        setLoading(true);
        switch (algorithms[0]) {
            case 'Bubble':
                bubbleSort(array, barsRef, speedRef, setArray, finishAnim);
                break
            case 'Quick':
                quickSort(array, barsRef, speedRef, setArray, finishAnim);
                break
            case 'Selection':
                selectionSort(array, barsRef, speedRef, setArray, finishAnim);
                break
        }
    }


    //* Run after sorting the array
    const finishAnim = async () => {
        for (let i = 0; i < array.length; i++) {
            const bar = barsRef.current[i];
            bar!.style.backgroundColor = 'green';
            await freeze(speedRef.current);
        }
        setLoading(false);
    }

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
                    <p className="p-2 text-center">{algorithms[0]} Sort</p>
                    <div className="absolute top-0 -translate-y-full hidden bg-[#f1f1f1] z-10 w-full group-hover:block" id="group">
                        {algorithms.filter(sort => sort !== algorithms[0]).map((alg, index) => {
                            return <button key={index} disabled={loading} className="w-full text-black p-2 block hover:bg-slate-600 hover:text-white" onClick={() => handleAlgo(alg)}>{alg} Sort</button>
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
                    <p className="dial">Slow</p>
                    <input className="mx-5 w-2/5" type="range" min={min_speed} max={max_speed} value={max_speed - (speed - min_speed)} onChange={(e) => setSpeed(max_speed - (parseInt(e.target.value) - min_speed))} />
                    <p className="dial">Fast</p>
                </div>
            </div>
        </div>
    )
}

export default Visualizer