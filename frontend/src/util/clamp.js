export function clamp(minVal, maxVal, val) {
    if (val < minVal) return minVal;
    if (val > maxVal) return maxVal;
    return val;
}
