const { readFileSync } = require("hexo-fs");
const { join } = require("path");

function readQuotes(path) {
    try {
        const fullPath = join(hexo.theme_dir, hexo.theme.config.source.path, path);
        const content = readFileSync(fullPath, { encoding: "utf-8" });
        const lines = content.split("\n");
        const cnt = parseInt(lines[0]);
        if (!cnt) return [];
        let quotes = [];
        for (let i = 0; i < cnt; ++i)
            quotes.push({
                author: lines[i * 3 + 1],
                origin: lines[i * 3 + 2],
                content: lines[i * 3 + 3]
            });
        return quotes;
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

/**
 * Generates random number in a range of [0, x).
 * @param x The top bound.
 */
function randomInt(x) {
    return Math.floor(Math.random() * x);
}

hexo.extend.helper.register("random_daily_quote", function (path) {
    const quotes = readQuotes(path);
    return quotes.length ? quotes[randomInt(quotes.length)] : null;
});