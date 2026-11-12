import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const mime={'.woff':'font/woff','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
function data(file){return `data:${mime[path.extname(file)]||'application/octet-stream'};base64,${fs.readFileSync(file).toString('base64')}`}
html=html.replace(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g,(_,src)=>{
 let js=fs.readFileSync(path.join(dist,src),'utf8');
 for(const name of fs.readdirSync(path.join(dist,'images'))){js=js.replaceAll('/images/'+name,data(path.join(dist,'images',name)))}
 return '<script type="module">'+js.replaceAll('</script','<\\/script')+'</script>';
});
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,(_,src)=>{
 let css=fs.readFileSync(path.join(dist,src),'utf8');
 css=css.replace(/url\(([^)]+)\)/g,(whole,url)=>{url=url.replace(/["']/g,'');return (url.startsWith('/assets/')||url.startsWith('/fonts/'))?`url(${data(path.join(dist,url))})`:whole});
 return '<style>'+css+'</style>';
});
html=html.replace('href="/favicon.svg"',`href="${data(path.join(dist,'favicon.svg'))}"`);
fs.writeFileSync(path.join(root,'portfolio-preview.html'),html);
console.log('Created portfolio-preview.html ('+(Buffer.byteLength(html)/1024/1024).toFixed(2)+' MiB)');
