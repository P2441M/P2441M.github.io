const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><div></div>`);
global.document = dom.window.document;
global.Node = dom.window.Node;
const renderMathInElement = require("katex/contrib/auto-render");

hexo.extend.filter.register("before_post_render", (data) => {
    const text = data.content;
    const elem = document.querySelector("div");
    elem.innerHTML = text;

    renderMathInElement(elem, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true },
        ],
        throwOnError: false,
    });
    data.content = elem.innerHTML;
    return data;
});
