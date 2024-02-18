const { join } = require("path");
const { readFileSync } = require("hexo-fs");
const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html>`, { runScripts: "dangerously" });

hexo.extend.filter.register("before_post_render", (data) => {
    const div = dom.window.document.createElement("div");
    div.innerHTML = data.content;
    dom.window.document.body.appendChild(div);

    let path = join(hexo.theme_dir, hexo.theme.config.source.path, "/lib/katex/dist/katex.min.js");
    const katex = readFileSync(path, { encoding: "utf-8" });
    let script = dom.window.document.createElement("script");
    script.textContent = katex;
    dom.window.document.body.appendChild(script);

    path = join(hexo.theme_dir, hexo.theme.config.source.path, "/lib/katex/dist/contrib/auto-render.min.js");
    const autoRender = readFileSync(path, { encoding: "utf-8" });
    script = dom.window.document.createElement("script");
    script.textContent = autoRender;
    dom.window.document.body.appendChild(script);

    dom.window.eval(`renderMathInElement(document.querySelector("div"), {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false
    });`)

    data.content = dom.window.document.querySelector("div").innerHTML;
    return data;
});
