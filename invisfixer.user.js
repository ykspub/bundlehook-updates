// ==UserScript==
// @name         Invis Fixer Module
// @namespace    http://tampermonkey.net/
// @version      0.4.20
// @description  Replacement module for invis fixer
// @author       The Big Daddy
// @match        *://*.moomoo.io/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://github.com/ykspub/bundlehook-updates/raw/main/invisfixer.user.js
// @updateURL    https://github.com/ykspub/bundlehook-updates/raw/main/invisfixer.user.js
// ==/UserScript==

if (!window.bundleHookModules) {
    window.bundleHookModules = [];
}

window.bundleHookModules.push(function(bundlejs) {
    let fixerCode = 'if(typeof e.dir !== "undefined") {if (Math.abs(e.dir) > 50) {e.dir = 0;}}';
    return bundlejs.replace('function ri(e,t){', 'function ri(e,t){' + fixerCode);
});

if (localStorage.getItem("INVISFIXERINSTALLED") != "true") {
    alert("Invis fixer module installed!");
    localStorage.setItem("INVISFIXERINSTALLED", "true");
}
