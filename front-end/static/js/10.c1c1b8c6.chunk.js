(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[10],{578:function(e,c,i){"use strict";c.a=i.p+"static/media/inactivo.c25580cd.svg"},579:function(e,c,i){"use strict";i.d(c,"a",(function(){return r}));var s=i(1),t=i(8),n=i(80),a=(i(580),i(2)),r={TARJETA:0,ELEMENTO:1,PROYECTO:2};c.b=function(e){var c=e.activo,i=void 0===c?0:c,o=e.tipo,j=void 0===o?r.ELEMENTO:o,l=e.history,d=e.direccion,b=Object(s.useContext)(n.a),h=Object(s.useMemo)((function(){var e=[];switch(j){case r.TARJETA:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"tinformacion"}),void 0!=b&&(b.includes("TC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"tconfiguracion"}),(b.includes("TGI")||b.includes("TGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"}),b.includes("TE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"}));break;case r.ELEMENTO:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"einformacion"}),void 0!=b&&(b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"econfiguracion"}),(b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"egraficas"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"}));break;case r.PROYECTO:void 0!=b&&((b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"pinformacion"}),b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"pconfiguracion"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"}),e.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"}))}return e}),[b,j]);return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(t.f,{className:"navegacion py-1",children:Object(a.jsx)("div",{className:"panel d-flex justify-content-end",children:Object(a.jsx)(t.J,{variant:"tabs",children:h.map((function(e,c){return Object(a.jsx)(t.K,{children:e.id==i?Object(a.jsx)(t.L,{className:"link",active:!0,children:e.titulo}):Object(a.jsx)(t.L,{className:"link",onClick:function(){return function(e){switch(j){case r.TARJETA:l.push("/tarjetas/".concat(d,"/").concat(h[e].direccion));break;case r.ELEMENTO:l.push("/elementos/".concat(d,"/").concat(h[e].direccion));break;case r.PROYECTO:l.push("/proyectos/".concat(d,"/").concat(h[e].direccion))}}(c)},children:e.titulo})},e.key)}))})})})})}},580:function(e,c,i){},649:function(e,c,i){},788:function(e,c,i){"use strict";i.r(c);var s=i(7),t=i.n(s),n=i(34),a=i(11),r=i(33),o=i(8),j=i(1),l=i(41),d=i(74),b=i(578),h=(i(649),i(2)),u=function(e){var c=e.tarjeta,i=e.sensor,s="activo"==i.estado?d.a:b.a,t=i.estado[0].toUpperCase()+i.estado.substring(1);return Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsxs)(o.f,{className:"shadow",children:[Object(h.jsx)(o.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{children:i.nombre})})," ","S"===i.clase?Object(h.jsxs)(o.g,{children:[Object(h.jsxs)("div",{className:"mb-4 d-flex align-items-center",children:[Object(h.jsx)("img",{src:s,className:"icono"}),Object(h.jsx)("h5",{className:"ml-2",children:t})]}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Direcci\xf3n : ".concat(c,".S").concat(i.index)}),Object(h.jsx)("li",{children:"Alias     : ".concat(i.alias)}),Object(h.jsx)("li",{children:"Unidades  : ".concat(i.unidades)}),Object(h.jsx)("li",{children:"Rango     : [".concat(i.parametros.rango[0].toFixed(4),", ").concat(i.parametros.rango[1].toFixed(4),"] ").concat(i.unidades)})]}),Object(h.jsx)("h6",{children:"Nivel"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Resoluci\xf3n (i)    : ".concat(i.parametros.resolucion[0].toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Resoluci\xf3n (f(i)) : ".concat(i.parametros.resolucion[1].toFixed(4))})]}),Object(h.jsx)("h6",{children:"Tendencia"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Funci\xf3n : Lineal"}),Object(h.jsx)("li",{children:"Filtro  : ".concat(i.parametros.peligrosidad)})]})]}):Object(h.jsxs)(o.g,{children:[Object(h.jsxs)("div",{className:"mb-4 d-flex align-items-center",children:[Object(h.jsx)("img",{src:s,className:"icono"}),Object(h.jsx)("h5",{className:"ml-2",children:t})]}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Direcci\xf3n : ".concat(i.proyecto,".").concat(i.clase).concat(i.index)}),Object(h.jsx)("li",{children:"Alias     : ".concat(i.alias)}),Object(h.jsx)("li",{children:"Unidades  : ".concat(i.unidades)}),Object(h.jsx)("li",{children:"Tipo      : ".concat(i.tipo)})]}),Object(h.jsx)("h6",{children:"Direcciones"}),Object(h.jsx)("hr",{}),Object(h.jsx)("pre",{children:i.direcciones.map((function(e,c){return Object(h.jsxs)("li",{children:["[",c,"] ",e]},c)}))})]})]})})},O=function(e){var c=e.tarjeta,i=e.sensores;return Object(h.jsx)("div",{children:Object(h.jsx)(o.M,{children:i.valores.map((function(e,i){return Object(h.jsx)(u,{tarjeta:c,sensor:e},i)}))})})},x=i(185),m=i(579);c.default=function(e){var c=e.match.params.idProyecto,i=e.history,s=Object(j.useState)({tarjeta:"",nombre:"",descripcion:"",area:"",linea:"",proceso:"",identificador:"",tipo:"",estado:"inactivo",icono:b.a}),f=Object(r.a)(s,2),p=f[0],g=f[1],v=Object(j.useState)(!0),k=Object(r.a)(v,2),E=k[0],N=k[1],y=Object(j.useState)([]),I=Object(r.a)(y,2),T=I[0],M=I[1],C=Object(j.useState)([]),w=Object(r.a)(C,2),S=w[0],G=w[1],R=localStorage.getItem("token"),A=c,L=function(){var e=Object(a.a)(t.a.mark((function e(){var c,i,s,a,r,o,j,h,u,O,x,m,f,p,v,k,E,N,y;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.k)(R,A);case 2:return c=e.sent,i=c.nombre,s=c.descripcion,a=c.area,r=c.linea,o=c.proceso,j=c.identificador,h=c.tipo,u=c.estado,O=c.graficas,x=c.variables,m=c.sensores,f="",m.length>0&&(f=m[0].direccion.substr(0,5)),e.next=18,Object(l.n)(f,R);case 18:p=e.sent,v=p.sensores,k=[],m.map((function(e){var c=e.direccion,i=c.slice(c.indexOf(".")+2,c.length),s=v.find((function(e){return e.index===parseInt(i)}));k.push(Object(n.a)({clase:"S"},s))})),x.forEach((function(e){k.push(Object(n.a)({clase:"V",elemento:A.substring(A.length-6)},e))})),G(k),E=[],O.forEach((function(e){var c=[];e.direcciones.forEach((function(e){if("V"==e[0]){var i=x.find((function(c){return c.index===parseInt(e.substring(1))}));"activo"===i.estado&&c.push(Object(n.a)({clase:"V",proyecto:A.substring(A.length-6)},i))}if("S"==e[0]){var s=m[parseInt(e.substring(1))].direccion,t=s.substring(s.indexOf(".")+2),a=v.find((function(e){return e.index===parseInt(t)}));"activo"===a.estado&&c.push(Object(n.a)({clase:"S"},a))}})),c.length>0&&E.push("V"===e.direcciones[0][0]?{nombre:e.nombre,datos:{tipo:"variables",valores:c}}:{nombre:e.nombre,datos:{tipo:"sensores",valores:c}})})),N="activo"==u?d.a:b.a,y=u[0].toUpperCase()+u.substring(1),g({nombre:i,identificador:j,descripcion:s,area:a,linea:r,proceso:o,tipo:h,estado:y,icono:N,tarjeta:f}),M(E);case 30:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(j.useEffect)(Object(a.a)(t.a.mark((function e(){var c;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.next=3,L();case 3:return c=setInterval(L,3e4),N(!1),e.abrupt("return",(function(){return clearInterval(c)}));case 6:case"end":return e.stop()}}),e)}))),[]),E?Object(h.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(h.jsx)(x.a,{height:"10vh"})}):Object(h.jsxs)(o.m,{fluid:!0,children:[Object(h.jsx)(m.b,{activo:1,tipo:m.a.PROYECTO,history:i,direccion:A}),Object(h.jsx)(o.M,{children:Object(h.jsx)(o.k,{sm:"12",children:Object(h.jsx)(o.f,{className:"shadow",children:Object(h.jsx)(o.g,{children:Object(h.jsxs)(o.M,{className:"justify-content-between",children:[Object(h.jsxs)(o.k,{className:"col-3 d-flex align-items-center",children:[Object(h.jsx)("img",{src:p.icono,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:p.estado})]}),Object(h.jsxs)(o.k,{className:"col-9 text-right",children:[Object(h.jsx)("h5",{children:"Proyecto"}),Object(h.jsx)("h3",{children:"".concat(p.nombre)})]})]})})})})}),Object(h.jsx)(o.M,{children:Object(h.jsx)(o.k,{children:Object(h.jsxs)(o.f,{className:"shadow",children:[Object(h.jsx)(o.j,{className:"contenedor-cabecera",children:"General"}),Object(h.jsx)(o.g,{children:Object(h.jsxs)(o.H,{accent:!0,children:[Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Identificador :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.identificador})]}),Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Descripcion :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.descripcion})]}),Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Area :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.area})]}),Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Linea :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.linea})]}),Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Proceso :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.proceso})]}),Object(h.jsxs)(o.M,{children:[Object(h.jsx)(o.k,{sm:"4",children:Object(h.jsx)(o.I,{accent:"info",children:"Tipo :"})}),Object(h.jsx)(o.k,{sm:"4",className:"align-self-center",children:p.tipo})]})]})})]})})}),Object(h.jsx)(o.M,{children:Object(h.jsx)(o.k,{sm:"12",children:Object(h.jsxs)(o.f,{className:"shadow",children:[Object(h.jsx)(o.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h4",{children:"Sensores/Variables"})}),Object(h.jsx)(o.g,{children:Object(h.jsxs)(o.Z,{activeTab:"grupos",children:[Object(h.jsx)(o.J,{variant:"tabs",children:Object(h.jsx)(o.K,{children:Object(h.jsx)(o.L,{"data-tab":"grupos",children:"Grupos"})})}),Object(h.jsxs)(o.X,{children:[Object(h.jsx)(o.Y,{"data-tab":"grupos",children:T.map((function(e,c){return Object(h.jsxs)("div",{className:"contenedor-cabecera-grafica",children:[Object(h.jsx)("h4",{className:"my-4",children:e.nombre}),Object(h.jsx)(O,{tarjeta:p.tarjeta,sensores:e.datos})]},c)}))}),Object(h.jsx)(o.Y,{"data-tab":"todos",className:"mt-4",children:Object(h.jsx)(o.M,{children:S.map((function(e,c){return Object(h.jsx)(u,{tarjeta:p.tarjeta,sensor:e},c)}))})})]})]})})]})})})]})}}}]);
//# sourceMappingURL=10.c1c1b8c6.chunk.js.map