const system = (() => {
    let inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
    let UA = inBrowser && window.navigator.userAgent.toLowerCase();
    let isIE = UA && /msie|trident/.test(UA);
    let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    let isEdge = UA && UA.indexOf('edge/') > 0;
    let isAndroid = UA && UA.indexOf('android') > 0;
    let isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    let isWeixin = UA && /micromessenger/.test(UA);
    return {
        inBrowser,
        isIE,
        isIE9,
        isEdge,
        isAndroid,
        isIOS,
        isWeixin
    }
})();
const DEBUG = process.env.NODE_ENV === "development";
const target = DEBUG ? "http://127.0.0.1:3000" : "http://xxx.com"
export {
    system,
    target,
    DEBUG
}