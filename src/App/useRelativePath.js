function useRelativePath() {
    const location = { pathname: ''};
    const validPaths = ['/buy-and-sell-crypto'];
    const validPath = validPaths.find(path => window.location.pathname.startsWith(path))
    if(validPath) location.pathname = validPath;

    return {
        location,
    }
}

export { useRelativePath };
