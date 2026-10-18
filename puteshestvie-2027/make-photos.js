// Собирает src/p5.js: фото из photos/*.jpg как data-URI + подписи авторов.
// Список фото: photos/photos.tsv. Запускается из build.sh.
const fs=require("fs");
const rows=fs.readFileSync("photos/photos.tsv","utf8").split("\n").filter(l=>l&&l[0]!=="#").map(l=>l.split("\t"));
const PIC={};
for(const [key,tok,name,user,id] of rows){
  const f="photos/"+tok+".jpg";
  if(!fs.existsSync(f)){console.error("нет файла",f);continue}
  PIC[key]={s:"data:image/jpeg;base64,"+fs.readFileSync(f).toString("base64"),n:name,u:user,i:id};
}
fs.writeFileSync("src/p5.js","/* создано make-photos.js, руками не править */\nconst PIC="+JSON.stringify(PIC)+";\n");
console.log("фото:",Object.keys(PIC).length);
