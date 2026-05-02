const fs = require('fs');

const html = fs.readFileSync('index_backup.html', 'utf8');

// Extract CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if(cssMatch) {
    fs.mkdirSync('public', {recursive:true});
    fs.writeFileSync('public/style.css', cssMatch[1]);
    console.log("Extracted CSS");
}

// Extract JS
const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if(jsMatch) {
    fs.mkdirSync('public', {recursive:true});
    // Add logic to clear the cart visually if needed
    fs.writeFileSync('public/main.js', jsMatch[1]);
    console.log("Extracted JS");
}
