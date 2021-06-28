// ==UserScript==
// @name         Bundlejs-Core
// @namespace    http://tampermonkey.net/
// @version      0.4.20
// @description  Core module to hook bundle.js
// @author       The Big Daddy
// @match        *://*.moomoo.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

//console.log("ok");
var kd = new MutationObserver(function(e) {
    if (document.body) {
        //console.log("Nope, that's not the issue");
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
            else if (bundle.src.includes("captchaCallback")) {
                window.recaptchaCallbackURL = bundle.src;
                bundle.remove();
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
