(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[19],{586:function(e,t,n){"use strict";t.a=n.p+"static/media/inactivo.c25580cd.svg"},777:function(e,t,n){},783:function(e,t,n){"use strict";n.r(t);var c=n(7),r=n.n(c),s=n(11),a=n(191),i=n(33),o=n(1),l=n(82),u=n(189),d=(n(777),n(75)),j=n(586),m=n(43),b=n(8),f=n(2);t.default=function(e){var t=e.history,n=localStorage.getItem("token"),c=Object(o.useContext)(l.a),h=Object(o.useState)(!0),p=Object(i.a)(h,2),O=p[0],x=p[1],y=Object(o.useState)([]),v=Object(i.a)(y,2),k=v[0],w=v[1],N=Object(o.useState)([]),g=Object(i.a)(N,2),C=g[0],_=g[1],P=function(){var e=Object(s.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(r.a.mark((function e(t){var c,a,i,o,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.u)(n);case 2:return c=e.sent,a=c.proyectos,i=a.map(function(){var e=Object(s.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(m.l)(n,t));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=7,Promise.all(i);case 7:o=e.sent,l=o.map((function(e){return{nombre:e.nombre,area:e.area,linea:e.linea,tipo:e.tipo,estado:e.estado,id:e._id}})),w(l),t(!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(e,n){t.push("/proyectos/".concat(e,"/").concat(n))};return Object(o.useEffect)(Object(s.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.next=3,P();case 3:return t=setInterval(P,3e4),x(!1),e.abrupt("return",(function(){return clearInterval(t)}));case 6:case"end":return e.stop()}}),e)}))),[]),O?Object(f.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(f.jsx)(u.a,{height:"10vh"})}):Object(f.jsx)(b.m,{fluid:!0,children:Object(f.jsx)(b.M,{children:Object(f.jsx)(b.k,{sm:"12",children:Object(f.jsxs)(b.f,{className:"shadow",children:[Object(f.jsx)(b.j,{className:"contenedor-cabecera",children:Object(f.jsx)("h4",{className:"m-0",children:"Proyectos"})}),Object(f.jsx)(b.g,{children:Object(f.jsx)(b.o,{items:k,fields:[{key:"nombre",_style:{width:"30%"}},{key:"area",_style:{width:"20%"}},{key:"linea",_style:{width:"20%"}},{key:"tipo",_style:{width:"20%"}},{key:"estado",_style:{width:"10%"}},{key:"show_details",label:"",_style:{width:"1%"},sorter:!1,filter:!1}],columnFilter:!0,itemsPerPage:5,sorter:!0,responsive:!0,pagination:!0,scopedSlots:{nombre:function(e){return Object(f.jsx)("div",{className:"mt-2 pt-1 cursor",onClick:function(){return I(e.id,"informacion")},children:e.nombre})},estado:function(e){var t="activo"==e.estado?d.a:j.a;return Object(f.jsx)("td",{children:Object(f.jsx)("img",{src:t,className:"icono"})})},show_details:function(e,t){return Object(f.jsx)("td",{className:"py-2",children:Object(f.jsx)(b.e,{className:"boton-elemento",size:"sm",onClick:function(){!function(e){var t=C.indexOf(e),n=C.slice();-1!==t?n.splice(t,1):n=[].concat(Object(a.a)(C),[e]),_(n)}(t)},children:C.includes(t)?"Ocultar":"Caracteristicas"})})},details:function(e,t){return Object(f.jsx)(b.l,{show:C.includes(t),children:Object(f.jsx)(b.g,{children:Object(f.jsxs)(b.M,{children:[Object(f.jsx)(b.k,{md:"3",className:"my-1",children:Object(f.jsx)(b.e,{className:"boton-elemento ",onClick:function(){return I(e.id,"informacion")},children:"Informaci\xf3n"})}),c.find((function(e){return"PC"===e}))?Object(f.jsx)(b.k,{md:"3",className:"my-1",children:Object(f.jsx)(b.e,{className:"boton-elemento",onClick:function(){return I(e.id,"configuracion")},children:"Configuraci\xf3n"})}):null,c.find((function(e){return"PE"===e}))?Object(f.jsx)(b.k,{md:"3",className:"my-1",children:Object(f.jsx)(b.e,{className:"boton-elemento",onClick:function(){return I(e.id,"estadistica")},children:"Estadisticas"})}):null,Object(f.jsx)(b.k,{md:"3",className:"my-1",children:Object(f.jsx)(b.e,{className:"boton-elemento",onClick:function(){return I(e.id,"elementos")},children:"Elementos"})})]})})})}}})})]})})})})}}}]);
//# sourceMappingURL=19.95546581.chunk.js.map