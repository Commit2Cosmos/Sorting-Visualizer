# Single-page Sorting Visualizer using Astro

Interactive, single-page sorting algorithm visualizer built with Astro. It animates common sorting algorithms on a bar chart, supports dynamic speed control while sorting, and provides an approachable way to learn and compare algorithms.

### Key Capabilities
- **Interactive visualization**: Bars animate during sorting to illustrate comparisons, swaps, and merges.
- **Live speed control**: Change the animation speed while an algorithm is running.
- **Multiple algorithms**: Bubble, Selection, Insertion, Merge, and Quick sort.


### Tech Stack
- **Astro**
- **React/TSX**
- **TypeScript**
- **Tailwind CSS**
- **Vite**

### Getting Started
```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Production build
npm run build
```

### How It Works
- **Algorithms** live in `src/components/algorithms/*.ts`. Each exports a function that performs the sort and emits steps/operations the UI can animate.
- **Visualizer UI** is implemented in `src/components/Visualizer.tsx`, rendering bars and reacting to algorithm steps, speed changes, and state.
- **Utilities** in `src/components/utils.ts` support shared logic across components and algorithms.


### Future Extensions

- Add more algorithms (Heap, Shell, Radix, Counting, Bucket)
- Step-by-step mode with pause/step-forward controls
- Compare mode: run two algorithms side-by-side with synchronized seeds
- Metrics overlay: comparisons, swaps, elapsed time
- Dark mode toggle and improved accessibility annotations
- Unit tests for algorithms and interaction tests for the visualizer


## TODO

- [ ] Ask AI to combine states

- [x] Add the rest of sorts
- [x] Ability to change speed while it's sorting
- [x] Add state management and move algorithms to separate files for clarity
- [x] Change algorithm to have a string -> name of algo
- [x] Follow [this](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom) to remove ref attribute from bars array
- [x] Change colour back to default after resetting the sorted array
- [x] CancelRef in quick & merge