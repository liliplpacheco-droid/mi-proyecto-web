var items=[
{id:1,c:"Fotografía",n:"Cámara Kodak PIXPRO",i:"cam",img:"img/camara.jpg",b:"Más rentado",s:"Zoom óptico de 52x, lente equivalente a 24-1248 mm.",p:180},
{id:2,c:"Cómputo",n:"Laptop ASUS 14 pulgadas",i:"laptop",img:"img/laptop.jpg",s:"Ligera y portátil, ideal para tareas y edición básica.",p:120},
{id:3,c:"Ciencias",n:"Microscopio binocular",i:"flask",img:"img/laboratorio.jpg",b:"Nuevo",s:"Revólver con varios objetivos y enfoque de precisión.",p:25},
{id:4,c:"Audio",n:"Micrófono Lewitt LCT 440",i:"mic",img:"img/microfono.jpg",s:"Condensador de estudio con araña antivibración.",p:70},
{id:5,c:"Cómputo",n:"Tableta gráfica HUION",i:"tablet",img:"img/tableta.jpg",s:"Pantalla con lápiz y soporte ajustable.",p:60},
{id:6,c:"Fotografía",n:"Kit de iluminación",i:"light",img:"img/iluminacion.jpg",s:"Luces, softbox y tripiés para foto y video.",p:85},
{id:7,c:"Audio",n:"Grabadora Tascam DR-05",i:"rec",img:"img/grabadora.jpg",s:"Grabadora PCM lineal con micrófonos estéreo.",p:50},
{id:8,c:"Cómputo",n:"Proyector Epson 3LCD",i:"proj",img:"img/proyector.jpg",s:"Tecnología 3LCD, ideal para exposiciones.",p:90}
];
var cat="all",picked={},grid=document.getElementById("grid"),cnt=document.getElementById("count"),toast=document.getElementById("toast"),tt;
function say(m){toast.textContent=m;toast.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("show")},2200)}
function render(){
  grid.innerHTML="";
  items.filter(function(x){return cat==="all"||x.c===cat}).forEach(function(x){
    var on=!!picked[x.id],a=document.createElement("article");a.className="card";
    a.innerHTML='<div class="pic"><img src="'+x.img+'" alt="'+x.n+'" loading="lazy" onerror="this.remove()">'+(x.b?'<span class="badge">'+x.b.toUpperCase()+'</span>':'')+
    '<div class="spec">'+x.s+'</div></div>'+
    '<div class="cb"><span class="mono">'+x.c+'</span><h3>'+x.n+'</h3>'+
    '<div class="row"><span class="price">$'+x.p+'<small>MXN POR DÍA</small></span>'+
    '<button class="rb" type="button" aria-pressed="'+on+'">'+(on?'Quitar':'Reservar')+'</button></div></div>';
    a.querySelector(".rb").addEventListener("click",function(){
      if(picked[x.id]){delete picked[x.id];say(x.n+" quitado de tus reservas")}else{picked[x.id]=1;say(x.n+" añadido a tus reservas")}
      cnt.textContent=Object.keys(picked).length;render();
    });
    grid.appendChild(a);
  });
}
document.querySelectorAll(".f").forEach(function(b){b.addEventListener("click",function(){
  cat=b.dataset.c;document.querySelectorAll(".f").forEach(function(o){o.setAttribute("aria-pressed",o===b)});render();
})});
document.getElementById("resnav").addEventListener("click",function(){
  var n=Object.keys(picked).length;
  if(!n){document.getElementById("catalogo").scrollIntoView();say("Elige un equipo del catálogo para reservar")}
  else say("Tienes "+n+(n===1?" equipo reservado":" equipos reservados"));
});
var ids=["inicio","servicios","catalogo","autores"],els=ids.map(function(i){return document.getElementById(i)}),
as=document.querySelectorAll(".links a,.mnav a");
function spy(){
  var y=window.scrollY+130,cur="inicio";
  ["inicio","servicios","catalogo"].forEach(function(i){if(document.getElementById(i).offsetTop<=y)cur=i});
  as.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur)});
}
window.addEventListener("scroll",spy,{passive:true});spy();render();
