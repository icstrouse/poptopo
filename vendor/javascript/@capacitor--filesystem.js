// @capacitor/filesystem@5.2.2 downloaded from https://ga.jspm.io/npm:@capacitor/filesystem@5.2.2/dist/esm/index.js

import{registerPlugin as e}from"@capacitor/core";export{Directory,Encoding,FilesystemDirectory,FilesystemEncoding}from"./definitions.js";const i=e("Filesystem",{web:()=>import("./web.js").then((e=>new e.FilesystemWeb))});export{i as Filesystem};

