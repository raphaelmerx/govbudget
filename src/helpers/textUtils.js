export const measureText = (font, text) => {
    // create an invisible canvas element on the DOM
    let canvas;
    if (!document.getElementById('measurement-canvas-wrapper')) {
        const appWrapper = document.getElementById('app');
        const canvasDiv = document.createElement('div');
        canvasDiv.classList.add('hidden');
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

export const truncateText = (text, maxWidth) => {
    // calculate the text width of the full label
    let label = text;
    let labelWidth = measureText('16px Source Sans Pro, sans serif', text);

    // check to see if the full label will fit
    if (labelWidth > maxWidth) {
        // label won't fit, let's cut it down
        // determine the average character pixel width
        const characterWidth = Math.ceil(labelWidth / text.length);
        // give an additional 30px for the ellipsis
        const availableWidth = maxWidth - 30;
        let availableLength = Math.floor(availableWidth / characterWidth);
        if (availableLength < 1) {
            // we must show at least one character
            availableLength = 1;
        }

        // substring the label to this length
        if (availableLength < text.length) {
            label = `${label.substring(0, availableLength)}...`;
        }
    }
    return label;
}
