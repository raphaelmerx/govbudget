export const measureText = (font, text) => {
    // create an invisible canvas element on the DOM
    let canvas;
    if (!document.getElementById('measurement-canvas-wrapper')) {
        const appWrapper = document.getElementById('app');
        const canvasDiv = document.createElement('div');
        canvasDiv.classList.add('hide');
        canvasDiv.setAttribute('id', 'measurement-canvas-wrapper');
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'measurement-canvas');
        canvasDiv.appendChild(canvas);

        appWrapper.appendChild(canvasDiv);
    }
    else {
        canvas = document.getElementById('measurement-canvas');
    }

    if (!canvas) {
        // something went wrong and the canvas isn't on the DOM
        return 0;
    }

    // iterate through the provided columns and measure their titles
    const context = canvas.getContext('2d');
    context.font = font;
    return Math.ceil(context.measureText(text).width);
};
