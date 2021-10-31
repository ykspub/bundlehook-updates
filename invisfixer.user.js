// ==UserScript==
// @name         Invis Fixer Module
// @namespace    http://tampermonkey.net/
// @version      0.6.20
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

//function ri(e,t){var n=ii[e.id];if(!n||t){var i=document.createElement("canvas");i.width=i.height=2.5*e.scale+5.5+(l.list[e.id].spritePadding||0);
window.bundleHookModules.push(function(bundlejs) {
    let fixerCode = 'if(typeof e.dir !== "undefined") {if (Math.abs(e.dir) > 50) {e.dir = 0;}} else {e.dir = 0;}';
    return bundlejs.replace('var n=ii[e.id];if(!n||t){', fixerCode + 'var n=ii[e.id];if(!n||t){');
});

if (localStorage.getItem("INVISFIXERINSTALLED2") != "true") {
    alert("Invis fixer module updated in light of new moomoo.io update");
    localStorage.setItem("INVISFIXERINSTALLED2", "true");
}
