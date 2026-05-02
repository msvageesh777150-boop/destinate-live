const fs = require('fs');

const path = 'views/pages/index.ejs';
let html = fs.readFileSync(path, 'utf8');

// Strip top header
const startNavIdx = html.indexOf('</nav>');
if(startNavIdx !== -1) {
    html = `<%- include('../partials/header') %>\n` + html.substring(startNavIdx + 6);
}

// Strip bottom footer
const startFooterIdx = html.indexOf('<footer>');
if(startFooterIdx !== -1) {
    html = html.substring(0, startFooterIdx) + `\n<%- include('../partials/footer') %>\n`;
}

fs.writeFileSync(path, html);
console.log("EJS Layout stripped successfully!");
