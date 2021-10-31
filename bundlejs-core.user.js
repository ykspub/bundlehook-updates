// ==UserScript==
// @name         Bundlejs-Core
// @namespace    http://tampermonkey.net/
// @version      0.7.00
// @description  Core module to hook bundle.js
// @author       The Big Daddy
// @match        *://*.moomoo.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/ykspub/bundlehook-updates/raw/main/bundlejs-core.user.js
// @updateURL    https://github.com/ykspub/bundlehook-updates/raw/main/bundlejs-core.user.js
// ==/UserScript==

var kd = new MutationObserver(function(e) {
    if (document.body) {
        document.body.querySelectorAll('script').forEach(bundle => {
            if (bundle.src.includes('bundle')) {
                bundle.remove();
                var urmumgae = new XMLHttpRequest();
                urmumgae.open("GET", "bundle.js", false);
                urmumgae.send();
                if ((urmumgae.status == 200) && (urmumgae.readyState == 4)) {
                    let bundlejs = urmumgae.responseText;
                    if (window.bundleHookModules) {
                        for (let j = 0; j < window.bundleHookModules.length; j++) {
                            bundlejs = window.bundleHookModules[j](bundlejs);
                        }
                    }
                    var newBundle = document.createElement("script");
                    newBundle.text = bundlejs;
                    document.body.appendChild(newBundle);

                    kd.disconnect();
                }
            }
            else if ((bundle.src.length != 0) && (!bundle.src.includes("jquery")) && (!bundle.src.includes("captcha"))) {
                //bundle.remove();
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', function() {
    kd.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
    });
});

if (localStorage.getItem("COREMODULEINSTALLED") != "true") {
    alert("Core module installed!");
    localStorage.setItem("COREMODULEINSTALLED", "true");
}

if (localStorage.getItem("UPDATE700") != "true") {
    alert("Updated to 7.00. Applying fix for issue where script sometimes doesn't load (and requires tons of reloads to make it work). Also, fixed bug where moomoo won't load if no modules are loaded");
    localStorage.setItem("UPDATE700", "true");
}
