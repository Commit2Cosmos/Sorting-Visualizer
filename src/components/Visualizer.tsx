import { useState, useEffect } from "react";

const Visualizer = () => {

    const [arrSize, setArrSize] = useState(40);
    const [array, setArray] = useState(new Array(arrSize));
    const [algorithm, setAlgorithm] = useState(0);
    const [speed, setSpeed] = useState(200);
    const [loading, setLoading] = useState(false);

    
    const algorithms = [
        {name: 'Bubble', description: 'This is bubble sort'},
        {name: 'Quick', description: 'This is quick sort'},
        {name: 'Selection', description: 'This is selection sort'},
        {name: 'Insertion', description: 'This is insertion sort'},
        {name: 'Merge', description: 'This is merge sort'},
    ];

    
    //* Generate new array
    const randomize = () => {
        let arr: number[] = Array(arrSize);
        const min = 5;
        const max = 100;

        for (let i = 0; i < arrSize; i++) {
            const rand = Math.floor(Math.random() * (max - min + 1) + min);
            arr[i] = rand;
            const bar = document.getElementById(`${i}`)?.style;
            if (bar) bar.backgroundColor = `var(--bar-color)`;
        }
        setArray(arr);
    }

    // Shuffle array
    // const handleShuffle = () => {

    // }

    const handleAlgo = (index: number) => {
        // const group = document.getElementById("group")?.style;
        // console.log(group?.display);
        // group!.display = 'none';
        setAlgorithm(index);
    }

    // Generate new array on initial render
    useEffect(() => {
        randomize();
    }, [])

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
        }
        switch (algorithms[algorithm].name) {
            case 'Quick':
                bubbleSort();
                break
        }
    }

    // fake promise to inroduce delay between swaps
    const freeze = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const finishAnim = async () => {
        for (let i = 0; i < array.length; i++) {
            const bar = document.getElementById(`${i}`)?.style;
            bar!.backgroundColor = 'green';
            await freeze(speed);
        }
        setLoading(false);
    }

    // BUBBLE SORT
    const bubbleSort = async () => {
        let curr = array;
        let sorted = false;

        while (!sorted) {
            sorted = true;

            for (let i = 0; i < curr.length - 1; i++) {
                for (let j = 0; j < curr.length - i - 1; j++) {

                    let bar1 = document.getElementById(`${j}`)!.style
                    let bar2 = document.getElementById(`${j + 1}`)!.style

                    if (curr[j] > curr[j + 1]) {
                        let temp = curr[j]
                        curr[j] = curr[j + 1]
                        curr[j + 1] = temp
                        console.log(array)
                        setArray([...curr])
                        
                        // current element
                        bar1.backgroundColor = '#DC143C'
                        // next element
                        bar2.backgroundColor = '#6A5ACD'
            
                        await freeze(speed);
                        console.log(array)

                        bar1.backgroundColor = `var(--bar-color)`;
                        bar2.backgroundColor = `var(--bar-color)`;

                        await freeze(speed);
                        
                        

                        sorted = false
                    }
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
        
    const sorts = async (arr: number[], left: number, right: number) => {
        if (left < right) {
            let partitionIndex = partition(arr, left, right)
        
            setArray([...arr]);
            await freeze(speed);

            await sorts(arr, left, partitionIndex - 1)
            await sorts(arr, partitionIndex + 1, right)
        }
    }

    const partition = (arr: number[], left: number, right: number) => {
        let pivot = arr[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {

                i++;

                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                let bar1 = document.getElementById(`${i}`)!.style;
                let bar2 = document.getElementById(`${j}`)!.style;
                bar1.backgroundColor = '#DC143C';
                bar2.backgroundColor = '#6A5ACD';

                freeze(speed);

                bar1.backgroundColor = '#ff7f50';
                bar2.backgroundColor = '#ff7f50';
        
                setArray([...arr]);
            }
        }

        let temp = arr[i + 1];
        arr[i + 1] = arr[right];
        arr[right] = temp;
    
        return i + 1;
    }
    

    return (
        <div className="absolute w-full h-full flex flex-col items-center gap-10">
            <div className="mt-2 outline w-[90%] h-[70%] flex gap-10 items-center">
                {/*  */}
                <input className="vertical-bar h-52 outline w-6" type="range" min="20" max="100" value={array.length} disabled={loading} onChange={(e) => setArrSize(parseInt(e.target.value))} />
                {/* Bars */}
                <div className="w-full h-full flex gap-1">
                    {array.map((value, key) => (
                        <div
                        className="bg-[var(--bar-color)] self-end" 
                        id={`${key}`} 
                        key={key} 
                        style={{ height: `${value}%`, width: `${100/arrSize}%` }}
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
                    <p>20</p>
                    <input className="mx-5" type="range" min="20" max="300" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} />
                    <p>300</p>
                </div>
            </div>
        </div>
    )
}

export default Visualizer