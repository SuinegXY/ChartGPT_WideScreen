// ==UserScript==
// @name         ChatGPT WideScreen
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Make the ChatGPT conversation window wider.
// @author       Xiong Yu
// @match        https://chat.openai.com/*
// @grant        none
// @home-url     https://greasyfork.org/zh-CN/scripts/473238
// @homepageURL  https://greasyfork.org/zh-CN/scripts/473238
// ==/UserScript==

(function() {
    'use strict';

    function updateStyle(element) {
        element.style.maxWidth = '95%';
    }
	
    var node1 = '#__next > div > div > div > main > div > div > div > div > div > div > div';
    var node2 = '#__next > div > div > main > div > div > div > div > div > div > div > div';

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                // 循环处理每个新增的节点
                mutation.addedNodes.forEach(addedNode => {
                    if (addedNode.nodeType === Node.ELEMENT_NODE) {
                        // 检查新增节点是否匹配目标选择器
                        if (addedNode.matches(node1) || addedNode.matches(node2)) {
                            updateStyle(addedNode);
                        } else {
                            // 如果新增节点包含目标选择器的子节点，则更新子节点的样式
                            const matchingChildren1 = addedNode.querySelectorAll(node1);
                            matchingChildren1.forEach(updateStyle);
                            const matchingChildren2 = addedNode.querySelectorAll(node2);
                            matchingChildren2.forEach(updateStyle);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document, { childList: true, subtree: true });
})();