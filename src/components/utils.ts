export const changeColour = (bar: HTMLElement, color: string = "var(--bar-color)") => {
    bar!.style.backgroundColor = color;
}

//* Fake promise to introduce delay between swaps
export const freeze = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const colors = {
    red: "red",
    blue: "blue",
    lightBlue: "#42a1ff",
    green: "#75f75e"
}