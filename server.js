import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const port=process.env.PORT||3000;
const root=path.join(__dirname,"public");
http.createServer((req,res)=>{
  if(req.url==="/health"){res.writeHead(200,{"Content-Type":"text/plain"});return res.end("ok");}
  let p=path.join(root,(req.url||"/").split("?")[0]==="/"?"index.html":(req.url||"").split("?")[0].replace(/^\//,""));
  if(!p.startsWith(root)) return res.writeHead(403).end();
  fs.readFile(p,(e,d)=>{
    if(e){p=path.join(root,"index.html");d=fs.readFileSync(p);}
    const ext=path.extname(p);
    const type=ext===".html"?"text/html; charset=utf-8":ext===".json"?"application/json":ext===".js"?"text/javascript":"text/plain";
    res.writeHead(200,{"Content-Type":type});res.end(d);
  });
}).listen(port,"0.0.0.0");