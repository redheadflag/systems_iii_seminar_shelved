function hashString(str) {
    // using djb2 Hash Function
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i)
    }
    return Math.abs(hash)
}

function colorFromString(str) {
    const hash = hashString(str)
    const hue = hash % 360
    const lightness = 25 + (Math.floor(hash / 360) % 21)
    return `hsl(${hue}, 35%, ${lightness}%)`
}

function pastelColorFromString(str) {
    const hash = hashString(str)
    const hue = hash % 360
    return `hsl(${hue}, 65%, 88%)`
}

function pastelTextColorFromString(str) {
    const hash = hashString(str)
    const hue = hash % 360
    return `hsl(${hue}, 45%, 32%)`
}

export {
    colorFromString,
    pastelColorFromString,
    pastelTextColorFromString,
}
