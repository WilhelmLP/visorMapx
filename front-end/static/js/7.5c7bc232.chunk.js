(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[7],{586:function(e,c,i){"use strict";c.a=i.p+"static/media/inactivo.c25580cd.svg"},587:function(e,c,i){"use strict";i.d(c,"a",(function(){return r}));var s=i(1),n=i(8),t=i(82),a=(i(588),i(2)),r={TARJETA:0,ELEMENTO:1,PROYECTO:2};c.b=function(e){var c=e.activo,i=void 0===c?0:c,o=e.tipo,j=void 0===o?r.ELEMENTO:o,d=e.history,l=e.direccion,b=Object(s.useContext)(t.a),h=Object(s.useMemo)((function(){var e=[];switch(j){case r.TARJETA:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"tinformacion"}),void 0!=b&&(b.includes("TC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"tconfiguracion"}),(b.includes("TGI")||b.includes("TGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"}),b.includes("TE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"}));break;case r.ELEMENTO:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"einformacion"}),void 0!=b&&(b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"econfiguracion"}),(b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"egraficas"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"}));break;case r.PROYECTO:void 0!=b&&((b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"pinformacion"}),b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"pconfiguracion"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"}),e.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"}))}return e}),[b,j]);return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(n.f,{className:"navegacion py-1",children:Object(a.jsx)("div",{className:"panel d-flex justify-content-end",children:Object(a.jsx)(n.J,{variant:"tabs",children:h.map((function(e,c){return Object(a.jsx)(n.K,{children:e.id==i?Object(a.jsx)(n.L,{className:"link",active:!0,children:e.titulo}):Object(a.jsx)(n.L,{className:"link",onClick:function(){return function(e){switch(j){case r.TARJETA:d.push("/tarjetas/".concat(l,"/").concat(h[e].direccion));break;case r.ELEMENTO:d.push("/elementos/".concat(l,"/").concat(h[e].direccion));break;case r.PROYECTO:d.push("/proyectos/".concat(l,"/").concat(h[e].direccion))}}(c)},children:e.titulo})},e.key)}))})})})})}},588:function(e,c,i){},653:function(e,c,i){},793:function(e,c,i){"use strict";i.r(c);var s=i(7),n=i.n(s),t=i(34),a=i(11),r=i(33),o=i(1),j=i(8),d=i(43),l=i(75),b=i(586),h=(i(653),i(2)),u=function(e){var c=e.tarjeta,i=e.sensor,s="activo"==i.estado?l.a:b.a,n=i.estado[0].toUpperCase()+i.estado.substring(1);return Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsxs)(j.f,{className:"shadow",children:[Object(h.jsx)(j.j,{className:"card-head contenedor-cabecera",children:Object(h.jsx)("h5",{children:i.nombre})})," ","S"===i.clase?Object(h.jsxs)(j.g,{children:[Object(h.jsxs)("div",{className:"mb-4 d-flex align-items-center",children:[Object(h.jsx)("img",{src:s,className:"icono"}),Object(h.jsx)("h5",{className:"ml-2",children:n})]}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Direcci\xf3n : ".concat(c,".S").concat(i.index)}),Object(h.jsx)("li",{children:"Alias     : ".concat(i.alias)}),Object(h.jsx)("li",{children:"Unidades  : ".concat(i.unidades)}),Object(h.jsx)("li",{children:"Rango     : [".concat(i.parametros.rango[0].toFixed(4),", ").concat(i.parametros.rango[1].toFixed(4),"] ").concat(i.unidades)})]}),Object(h.jsx)("h6",{children:"Nivel"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Resoluci\xf3n (i)    : ".concat(i.parametros.resolucion[0].toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Resoluci\xf3n (f(i)) : ".concat(i.parametros.resolucion[1].toFixed(4))})]}),Object(h.jsx)("h6",{children:"Tendencia"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Funci\xf3n : Lineal"}),Object(h.jsx)("li",{children:"Filtro  : ".concat(i.parametros.peligrosidad)})]})]}):Object(h.jsxs)(j.g,{children:[Object(h.jsxs)("div",{className:"mb-4 d-flex align-items-center",children:[Object(h.jsx)("img",{src:s,className:"icono"}),Object(h.jsx)("h5",{className:"ml-2",children:n})]}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Direcci\xf3n : ".concat(i.elemento,".").concat(i.clase).concat(i.index)}),Object(h.jsx)("li",{children:"Alias     : ".concat(i.alias)}),Object(h.jsx)("li",{children:"Unidades  : ".concat(i.unidades)}),Object(h.jsx)("li",{children:"Tipo      : ".concat(i.tipo)})]}),Object(h.jsx)("h6",{children:"Direcciones"}),Object(h.jsx)("hr",{}),Object(h.jsx)("pre",{children:i.direcciones.map((function(e,c){return Object(h.jsxs)("li",{children:["[",c,"] ",e]},c)}))})]})]})})},O=function(e){var c=e.tarjeta,i=e.sensores;return Object(h.jsx)("div",{children:Object(h.jsx)(j.M,{children:i.valores.map((function(e,i){return Object(h.jsx)(u,{tarjeta:c,sensor:e},i)}))})})},x=i(189),m=i(587);c.default=function(e){var c=e.match.params.idElemento,i=e.history,s=Object(o.useState)([]),f=Object(r.a)(s,2),p=f[0],g=f[1],v=Object(o.useState)([]),k=Object(r.a)(v,2),E=k[0],N=k[1],I=Object(o.useState)({tarjeta:"000000",nombre:"",identificador:"",descripcion:"",area:"",linea:"",tipo:"",proceso:"",estado:"inactivo",icono:b.a}),y=Object(r.a)(I,2),T=y[0],M=y[1],w=Object(o.useState)(!0),C=Object(r.a)(w,2),S=C[0],G=C[1],L=localStorage.getItem("token"),A=c,R=function(){var e=Object(a.a)(n.a.mark((function e(){var c,i,s,a,r,o,j,h,u,O,x,m,f,p,v,k,E,I,y;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.d)(L,A);case 2:return c=e.sent,i=c.nombre,s=c.identificador,a=c.descripcion,r=c.area,o=c.linea,j=c.proceso,h=c.tipo,u=c.estado,O=c.sensores,x=c.variables,m=c.graficas,f="",O.length>0&&(f=O[0].direccion.substr(0,5)),e.next=18,Object(d.n)(f,L);case 18:p=e.sent,v=p.sensores,k=[],O.forEach((function(e){var c=e.direccion,i=c.substring(c.indexOf(".")+2),s=v.find((function(e){return e.index===parseInt(i)}));k.push(Object(t.a)({clase:"S"},s))})),x.forEach((function(e){k.push(Object(t.a)({clase:"V",elemento:A.substring(A.length-6)},e))})),N(k),E=[],m.forEach((function(e){var c=[];e.direcciones.forEach((function(e){if("V"===e[0]){var i=x.find((function(c){return c.index===parseInt(e.substring(1))}));"activo"===i.estado&&c.push(Object(t.a)({clase:"V",elemento:A.substring(A.length-6)},i))}else{var s=O[parseInt(e.substring(1))].direccion,n=s.substring(s.indexOf(".")+2),a=v.find((function(e){return e.index===parseInt(n)}));"activo"===a.estado&&c.push(Object(t.a)({clase:"S"},a))}})),c.length>0&&E.push("V"===e.direcciones[0][0]?{nombre:e.nombre,datos:{tipo:"variables",valores:c}}:{nombre:e.nombre,datos:{tipo:"sensores",valores:c}})})),g(E),I="activo"===u.toString()?l.a:b.a,y=u[0].toUpperCase()+u.substring(1),M({nombre:i,identificador:s,descripcion:a,area:r,linea:o,tipo:h,proceso:j,icono:I,estado:y,tarjeta:f});case 30:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)(Object(a.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),e.next=3,R();case 3:G(!1);case 4:case"end":return e.stop()}}),e)}))),[c]),S?Object(h.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(h.jsx)(x.a,{height:"10vh"})}):Object(h.jsxs)(j.m,{fluid:!0,children:[Object(h.jsx)(m.b,{activo:1,tipo:m.a.ELEMENTO,history:i,direccion:A}),Object(h.jsx)(j.M,{children:Object(h.jsx)(j.k,{sm:"12",children:Object(h.jsx)(j.f,{className:"shadow",children:Object(h.jsx)(j.g,{children:Object(h.jsxs)(j.M,{className:"justify-content-between",children:[Object(h.jsxs)(j.k,{className:"col-3 d-flex align-items-center",children:[Object(h.jsx)("img",{src:T.icono,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:T.estado})]}),Object(h.jsxs)(j.k,{className:"col-9 text-right",children:[Object(h.jsx)("h5",{children:"Elemento"}),Object(h.jsx)("h3",{children:"".concat(T.nombre)})]})]})})})})}),Object(h.jsx)(j.M,{children:Object(h.jsx)(j.k,{children:Object(h.jsxs)(j.f,{className:"shadow",children:[Object(h.jsx)(j.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h4",{children:"General"})}),Object(h.jsx)(j.g,{children:Object(h.jsxs)(j.H,{accent:!0,children:[Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Identificador :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.identificador})]}),Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Descripci\xf3n :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.descripcion})]}),Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Area :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.area})]}),Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Linea :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.linea})]}),Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Proceso :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.proceso})]}),Object(h.jsxs)(j.M,{children:[Object(h.jsx)(j.k,{sm:"4",children:Object(h.jsx)(j.I,{accent:"info",children:"Tipo :"})}),Object(h.jsx)(j.k,{sm:"4",className:"align-self-center",children:T.tipo})]})]})})]})})}),Object(h.jsx)(j.M,{children:Object(h.jsx)(j.k,{sm:"12",children:Object(h.jsxs)(j.f,{className:"shadow",children:[Object(h.jsx)(j.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h4",{children:"Sensores/Variables"})}),Object(h.jsx)(j.g,{children:Object(h.jsxs)(j.Z,{activeTab:"graficas",children:[Object(h.jsx)(j.J,{variant:"tabs",children:Object(h.jsx)(j.K,{children:Object(h.jsx)(j.L,{"data-tab":"graficas",children:"Grupos"})})}),Object(h.jsxs)(j.X,{children:[Object(h.jsx)(j.Y,{"data-tab":"graficas",children:p.map((function(e,c){return Object(h.jsxs)("div",{className:"contenedor-cabecera-grafica",children:[Object(h.jsx)("h4",{className:"my-4",children:e.nombre}),Object(h.jsx)(O,{tarjeta:T.tarjeta,sensores:e.datos})]},c)}))}),Object(h.jsx)(j.Y,{"data-tab":"todos",className:"mt-4",children:Object(h.jsx)(j.M,{children:E.map((function(e,c){return Object(h.jsx)(u,{tarjeta:T.tarjeta,sensor:e},c)}))})})]})]})})]})})})]})}}}]);
//# sourceMappingURL=7.5c7bc232.chunk.js.map