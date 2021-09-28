// ==UserScript==
// @name         Invis Fixer Module
// @namespace    http://tampermonkey.net/
// @version      0.5.20
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
//function pi(e,t){var n=di[e.id];if(!n||t){var i=document.createElement("canvas");i.width=i.height=2.5*e.scale+lt+(c.list[e.id].spritePadding||0);
window.bundleHookModules.push(function(bundlejs) {
    let fixerCode = 'if(typeof e.dir !== "undefined") {if (Math.abs(e.dir) > 50) {e.dir = 0;}}';
    return bundlejs.replace('function pi(e,t){', 'function pi(e,t){' + fixerCode);
});

if (localStorage.getItem("INVISFIXERINSTALLED") != "true") {
    alert("Invis fixer module installed!");
    localStorage.setItem("INVISFIXERINSTALLED", "true");
}
