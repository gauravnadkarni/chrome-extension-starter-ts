(() => {
    const message:string = "This is a console statement from the content script";
    console.log(message);

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injected.js"); // Load the script from the extension
    document.documentElement.appendChild(script);
    script.onload = function () {
        script.remove(); // Clean up once the script is loaded
    };
})();