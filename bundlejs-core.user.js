// ==UserScript==
// @name         Bundlejs-Core
// @namespace    http://tampermonkey.net/
// @version      0.4.21
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
                    for (let j = 0; j < window.bundleHookModules.length; j++) {
                        bundlejs = window.bundleHookModules[j](bundlejs);
                    }
                    var newBundle = document.createElement("script");
                    newBundle.text = bundlejs;
                    document.body.appendChild(newBundle);

                    kd.disconnect();
                }
            }
            else if ((bundle.src.length != 0) && (!bundle.src.includes("jquery")) && (!bundle.src.includes("captcha"))) {
                bundle.remove();
            }
        });
    }
});

var c = document.documentElement;

kd.observe(c, {
    childList: true,
    subtree: true,
});

if (localStorage.getItem("COREMODULEINSTALLED") != "true") {
    alert("Core module installed!");
    localStorage.setItem("COREMODULEINSTALLED", "true");
}

if (localStorage.getItem("UPDATE421") != "true") {
    alert("Updated to 4.21. All this does is fix a typo that has no impact on functionality, but bothers me anyways");
    localStorage.setItem("UPDATE421", "true");
}
