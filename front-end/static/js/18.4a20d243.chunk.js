(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[18],{586:function(e,t,n){"use strict";t.a=n.p+"static/media/inactivo.c25580cd.svg"},776:function(e,t,n){},782:function(e,t,n){"use strict";n.r(t);var c=n(7),s=n.n(c),r=n(11),i=n(191),a=n(33),o=n(1),l=n(8),u=n(43),d=n(75),j=n(586),m=(n(776),n(82)),f=n(189),b=n(2);t.default=function(e){var t=e.history,n=localStorage.getItem("token"),c=Object(o.useContext)(m.a),h=Object(o.useState)(!0),O=Object(a.a)(h,2),p=O[0],x=O[1],v=Object(o.useState)([]),k=Object(a.a)(v,2),y=k[0],w=k[1],N=Object(o.useState)([]),g=Object(a.a)(N,2),C=g[0],E=g[1],I=function(){var e=Object(r.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(r.a)(s.a.mark((function e(t){var c,i,a,o,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=[],i=[],e.next=4,Object(u.u)(n);case 4:return a=e.sent,o=a.proyectos,l=a.elementos,e.next=9,Object(u.l)(n,o);case 9:e.sent.forEach(function(){var e=Object(r.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.elementos.forEach((function(e){if(l.includes(e.elemento)){var s=Object(u.d)(n,e.elemento);i.push(s),s.then((function(e){c.push({nombre:e.nombre,descripcion:e.descripcion,tipo:e.tipo,estado:e.estado,proyecto:t.nombre,id:e._id})}))}}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Promise.all(i).then((function(){w(c),t(!0)}));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(e,n){t.push("/elementos/".concat(e,"/").concat(n))};return Object(o.useEffect)(Object(r.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.next=3,I();case 3:return t=setInterval(I,3e4),x(!1),e.abrupt("return",(function(){return clearInterval(t)}));case 6:case"end":return e.stop()}}),e)}))),[]),p?Object(b.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(b.jsx)(f.a,{height:"10vh"})}):Object(b.jsx)(l.m,{fluid:!0,children:Object(b.jsx)(l.M,{children:Object(b.jsx)(l.k,{sm:"12",children:Object(b.jsxs)(l.f,{className:"shadow",children:[Object(b.jsx)(l.j,{className:"contenedor-cabecera",children:Object(b.jsx)("h4",{className:"m-0",children:"Elementos"})}),Object(b.jsx)(l.g,{children:Object(b.jsx)(l.o,{items:y,fields:[{key:"nombre",_style:{width:"60%"}},{key:"proyecto",_style:{width:"30%"}},{key:"estado",_style:{width:"10%"}},{key:"show_details",label:"",_style:{width:"1%"},sorter:!1,filter:!1}],columnFilter:!0,itemsPerPage:5,sorter:!0,responsive:!0,pagination:!0,onRowClick:function(e){return console.log(e)},scopedSlots:{nombre:function(e){return Object(b.jsx)("div",{className:"mt-2 pt-1 cursor",onClick:function(){return _(e.id,"informacion")},children:e.nombre})},estado:function(e){var t="activo"==e.estado?d.a:j.a;return Object(b.jsx)("td",{children:Object(b.jsx)("img",{src:t,className:"icono"})})},show_details:function(e,t){return Object(b.jsx)("td",{className:"py-2",children:Object(b.jsx)(l.e,{className:"boton-elemento",size:"sm",onClick:function(){!function(e){var t=C.indexOf(e),n=C.slice();-1!==t?n.splice(t,1):n=[].concat(Object(i.a)(C),[e]),E(n)}(t)},children:C.includes(t)?"Ocultar":"Caracteristicas"})})},details:function(e,t){return Object(b.jsx)(l.l,{show:C.includes(t),children:Object(b.jsxs)(l.g,{children:[Object(b.jsx)(l.M,{children:Object(b.jsx)(l.k,{className:"mb-4",children:Object(b.jsxs)("div",{className:"d-flex justify-content-center align-items-center flex-column w-100",children:[Object(b.jsx)("h4",{className:"m-0",children:"".concat(e.descripcion)}),Object(b.jsx)("h4",{className:"m-0",children:"".concat(e.tipo)})]})})}),Object(b.jsxs)(l.M,{children:[Object(b.jsx)(l.k,{sm:"3",className:"my-1",children:Object(b.jsx)(l.e,{className:"boton-elemento",onClick:function(){return _(e.id,"informacion")},children:"Informaci\xf3n"})}),c.find((function(e){return"EC"===e}))?Object(b.jsx)(l.k,{sm:"3",className:"my-1",children:Object(b.jsx)(l.e,{className:"boton-elemento",onClick:function(){return _(e.id,"configuracion")},children:"Configuraci\xf3n"})}):null,c.find((function(e){return"EGI"===e||"EGII"===e}))?Object(b.jsx)(l.k,{sm:"3",className:"my-1",children:Object(b.jsx)(l.e,{className:"boton-elemento",onClick:function(){return _(e.id,"graficas")},children:"Graficas"})}):null,c.find((function(e){return"EE"===e}))?Object(b.jsx)(l.k,{sm:"3",className:"my-1",children:Object(b.jsx)(l.e,{className:"boton-elemento",onClick:function(){return _(e.id,"estadistica")},children:"Estadisticas"})}):null]})]})})}}})})]})})})})}}}]);
//# sourceMappingURL=18.4a20d243.chunk.js.map