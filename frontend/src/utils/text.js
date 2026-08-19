function getInitials(name) {
    const words = name.trim().split(/\s+/).filter(Boolean)

    if (words.length === 1 && words[0].length <= 6) {
        return words[0].toUpperCase()
    }

    return words.map(word => word[0].toUpperCase()).join('')
}

export {
    getInitials,
}
