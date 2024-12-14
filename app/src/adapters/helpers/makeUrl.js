function makeUrl(req ) {
    const fileUrl = `${req.protocol}://${req.get('host')}/`;
    return (pathFromRoot) => {
        return `${fileUrl}${pathFromRoot}`
    }
}

module.exports = makeUrl