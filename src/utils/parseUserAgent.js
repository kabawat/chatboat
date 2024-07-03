function parseUserAgent() {
    const userAgentString = navigator.userAgent;
    const platform = navigator.platform;
    const result = {
        OS: "",
        browser: "",
        platform: platform
    };

    // Extracting OS information
    if (userAgentString.match(/Windows/i)) {
        result.OS = "Windows";
    } else if (userAgentString.match(/Macintosh|Mac OS X/i)) {
        result.OS = "Mac OS";
    } else if (userAgentString.match(/Android/i)) {
        result.OS = "Android";
    } else if (userAgentString.match(/iPhone|iPad|iPod/i)) {
        result.OS = "iOS";
    } else {
        result.OS = "Unknown";
    }

    // Extracting browser information
    if (userAgentString.match(/Edg/i)) {
        result.browser = "Edge";
    } else if (userAgentString.match(/OPR|Opera/i)) {
        result.browser = "Opera";
    } else if (userAgentString.match(/Firefox/i)) {
        result.browser = "Firefox";
    } else if (userAgentString.match(/Chrome/i) && userAgentString.match(/Safari/i) && !userAgentString.match(/OPR|Opera/i) && !userAgentString.match(/Edg/i)) {
        result.browser = "Chrome";
    } else if (userAgentString.match(/Safari/i) && !userAgentString.match(/Chrome/i)) {
        result.browser = "Safari";
    } else {
        result.browser = "Unknown";
    }
    return result;
}
export default parseUserAgent