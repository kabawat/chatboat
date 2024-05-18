// scrol to end 
export const _scrollToEndSmoothly = (mainRef) => {
    const element = mainRef.current;
    if (!element) return;

    const start = element.scrollTop;
    const end = element.scrollHeight;
    const duration = 500; // Duration in milliseconds
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const r = progress / duration;
        const ease = r < 0.5 ? 2 * r * r : -1 + (4 - 2 * r) * r; // Ease-in-out function
        element.scrollTop = start + (end - start) * ease;
        if (progress < duration) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
};
export const _scrollToEnd = (mainRef) => {
    if (mainRef.current) {
        mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
};