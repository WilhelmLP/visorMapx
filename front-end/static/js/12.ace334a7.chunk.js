(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[12],{586:function(e,c,i){"use strict";c.a=i.p+"static/media/inactivo.c25580cd.svg"},587:function(e,c,i){"use strict";i.d(c,"a",(function(){return r}));var s=i(1),n=i(8),t=i(82),a=(i(588),i(2)),r={TARJETA:0,ELEMENTO:1,PROYECTO:2};c.b=function(e){var c=e.activo,i=void 0===c?0:c,d=e.tipo,l=void 0===d?r.ELEMENTO:d,o=e.history,j=e.direccion,b=Object(s.useContext)(t.a),h=Object(s.useMemo)((function(){var e=[];switch(l){case r.TARJETA:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"tinformacion"}),void 0!=b&&(b.includes("TC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"tconfiguracion"}),(b.includes("TGI")||b.includes("TGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"}),b.includes("TE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"}));break;case r.ELEMENTO:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"einformacion"}),void 0!=b&&(b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"econfiguracion"}),(b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"egraficas"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"}));break;case r.PROYECTO:void 0!=b&&((b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"pinformacion"}),b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"pconfiguracion"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"}),e.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"}))}return e}),[b,l]);return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(n.f,{className:"navegacion py-1",children:Object(a.jsx)("div",{className:"panel d-flex justify-content-end",children:Object(a.jsx)(n.J,{variant:"tabs",children:h.map((function(e,c){return Object(a.jsx)(n.K,{children:e.id==i?Object(a.jsx)(n.L,{className:"link",active:!0,children:e.titulo}):Object(a.jsx)(n.L,{className:"link",onClick:function(){return function(e){switch(l){case r.TARJETA:o.push("/tarjetas/".concat(j,"/").concat(h[e].direccion));break;case r.ELEMENTO:o.push("/elementos/".concat(j,"/").concat(h[e].direccion));break;case r.PROYECTO:o.push("/proyectos/".concat(j,"/").concat(h[e].direccion))}}(c)},children:e.titulo})},e.key)}))})})})})}},588:function(e,c,i){},658:function(e,c,i){},797:function(e,c,i){"use strict";i.r(c);var s=i(7),n=i.n(s),t=i(34),a=i(11),r=i(33),d=i(1),l=i(8),o=i(43),j=i(75),b=i(586),h=(i(658),i(2)),x=function(e){var c,i,s=e.sensor,n=s.estado[0].toUpperCase()+s.estado.substring(1),t="activo"==s.estado,a=t?j.a:b.a,r=(null===(c=s.peligrosidad)||void 0===c?void 0:c.tendencia[0])+(null===(i=s.peligrosidad)||void 0===i?void 0:i.tendencia[1]);return Object(h.jsx)(l.k,{sm:"12",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{children:s.nombre})}),null!==s.basica&&t?Object(h.jsxs)(l.g,{children:[Object(h.jsxs)("div",{className:"container-fluid d-flex align-items-center my-4",children:[Object(h.jsx)("img",{src:a,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:n})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Basica"})}),Object(h.jsxs)(l.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(s.basica.actual.toFixed(4)," ").concat(s.unidades)}),Object(h.jsx)("li",{children:"Minimo   : ".concat(s.basica.min.toFixed(4)," ").concat(s.unidades)}),Object(h.jsx)("li",{children:"Promedio : ".concat(s.basica.promedio.toFixed(4)," ").concat(s.unidades)}),Object(h.jsx)("li",{children:"Maximo   : ".concat(s.basica.max.toFixed(4)," ").concat(s.unidades)})]}),Object(h.jsx)("h6",{className:"my-2",children:"Nivel"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Nivel Actual   : ".concat(s.basica.nivelactual.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel Minimo   : ".concat(s.basica.nivelmin.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel Promedio : ".concat(s.basica.nivelpromedio.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel M\xe1ximo   : ".concat(s.basica.nivelmax.toFixed(4))})]}),Object(h.jsx)("h6",{className:"my-2",children:"General"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Paquetes   : ".concat(s.basica.paquetes)}),Object(h.jsx)("li",{children:"Eficiencia : ".concat((100*s.basica.eficiencia).toFixed(4)," %")})]})]})]})}),Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Niveles"})}),Object(h.jsxs)(l.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(s.landmarks.actual.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo   : ".concat(s.landmarks.min.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio : ".concat(s.landmarks.promedio.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(s.landmarks.max.toFixed(4))})]}),Object(h.jsx)("h6",{className:"my-2",children:"Cambio [ t ]"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(s.landmarks.deltai.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Minimo   : ".concat(s.landmarks.deltaimin.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Promedio : ".concat(s.landmarks.deltaipromedio.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(s.landmarks.deltaimax.toFixed(4)/2," min")})]}),Object(h.jsx)("h6",{className:"my-2",children:"Cambio [ f(t) ]"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual     : ".concat(s.landmarks.deltay.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo     : ".concat(s.landmarks.deltaymin.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio   : ".concat(s.landmarks.deltaypromedio.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo     : ".concat(s.landmarks.deltaymax.toFixed(4))}),Object(h.jsx)("hr",{}),Object(h.jsx)("li",{children:"Paquetes   : ".concat(s.landmarks.paquetes)}),Object(h.jsx)("li",{children:"Marca      : ".concat(s.landmarks.landmark?"\ud83d\udd35":"\u26aa")})]})]})]})}),Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Tendencia"})}),Object(h.jsxs)(l.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(s.peligrosidad.actual.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo   : ".concat(s.peligrosidad.min.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio : ".concat(s.peligrosidad.promedio.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(s.peligrosidad.max.toFixed(4))})]}),Object(h.jsx)("h6",{className:"my-2",children:"Tendencia"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Baja  : ".concat(0!=r?(100*s.peligrosidad.tendencia[0]/r).toFixed(4):0," %")}),Object(h.jsx)("li",{children:"Alta  : ".concat(0!=r?(100*s.peligrosidad.tendencia[1]/r).toFixed(4):0," %")}),Object(h.jsx)("hr",{}),Object(h.jsx)("li",{children:"Paquetes   : ".concat(s.peligrosidad.paquetes)}),Object(h.jsx)("li",{children:"Marca      : ".concat(s.landmarks.landmark?"\ud83d\udd35":"\u26aa")})]})]})]})})]})]}):Object(h.jsxs)(l.g,{className:"shadow",children:[Object(h.jsxs)("div",{className:"container-fluid d-flex align-items-center my-4",children:[Object(h.jsx)("img",{src:a,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:n})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"B\xe1sica"})}),Object(h.jsx)(l.g,{children:"Informaci\xf3n no disponible"})]})}),Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Niveles"})}),Object(h.jsx)(l.g,{children:"Informaci\xf3n no disponible"})]})}),Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Tendencia"})}),Object(h.jsx)(l.g,{children:"Informaci\xf3n no disponible"})]})})]})]})]})})},O=function(e){var c=e.sensores;return Object(h.jsx)(l.M,{children:c.valores.map((function(e,c){return Object(h.jsx)(x,{sensor:e},c)}))})},m=i(189),u=i(587);c.default=function(e){var c=e.match.params.idProyecto,i=e.history,s=Object(d.useState)({nombre:"",descripcion:"",tipo:"",estado:"inactivo",icono:b.a}),f=Object(r.a)(s,2),p=f[0],k=f[1],g=Object(d.useState)([]),v=Object(r.a)(g,2),N=v[0],y=v[1],E=Object(d.useState)([]),M=Object(r.a)(E,2),I=M[0],F=M[1],T=Object(d.useState)(!1),C=Object(r.a)(T,2),P=C[0],A=C[1],w=localStorage.getItem("token"),G=c,S=function(){var e=Object(a.a)(n.a.mark((function e(){var c,i,s,a,r,d,l,h,x,O,m,u,f,p,g,v,N,E,M,I,T;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.k)(w,G);case 2:return c=e.sent,i=c.nombre,s=c.identificador,a=c.descripcion,r=c.area,d=c.linea,l=c.proceso,h=c.tipo,x=c.estado,O=c.graficas,m=c.sensores,u="",m.length>0&&(u=m[0].direccion.substr(0,5)),e.next=17,Object(o.n)(u,w);case 17:return f=e.sent,p=f.sensores,g=[],m.forEach((function(e){g.push("".concat(e.direccion))})),e.next=23,Object(o.s)(g,w);case 23:v=e.sent,N=v.sensores,E=[],m.map((function(e,c){var i=e.direccion,s=i.substring(i.indexOf(".")+2),n=p.find((function(e){return e.index===parseInt(s)}));E.push(Object(t.a)({nombre:n.nombre,alias:n.alias,estado:n.estado,unidades:n.unidades,clase:"S"},N[0][c]))})),y(E),M=[],0,O.forEach((function(e){var c=[];e.direcciones.forEach((function(e){if("S"===e[0]){var i=parseInt(e.substring(1)),s=m[i].direccion,n=s.slice(s.indexOf(".")+2,s.length),a=p.find((function(e){return e.index===parseInt(n)}));"activo"===a.estado&&(c.push(Object(t.a)({nombre:a.nombre,alias:a.alias,estado:a.estado,unidades:a.unidades,clase:"S"},N[0][i])),1)}})),c.length>0&&M.push({nombre:e.nombre,datos:{tipo:"sensores",valores:c}})})),I="activo"==x?j.a:b.a,T=x[0].toUpperCase()+x.substring(1),k({nombre:i,identificador:s,descripcion:a,area:r,linea:d,proceso:l,tipo:h,estado:T,icono:I}),F(M);case 35:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.useEffect)(Object(a.a)(n.a.mark((function e(){var c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),e.next=3,S();case 3:return c=setInterval(S,3e4),A(!1),e.abrupt("return",(function(){return clearInterval(c)}));case 6:case"end":return e.stop()}}),e)}))),[]),P?Object(h.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(h.jsx)(m.a,{height:"10vh"})}):Object(h.jsxs)(l.m,{fluid:!0,children:[Object(h.jsx)(u.b,{activo:2,tipo:u.a.PROYECTO,history:i,direccion:G}),Object(h.jsx)(l.M,{children:Object(h.jsx)(l.k,{sm:"12",children:Object(h.jsx)(l.f,{className:"shadow",children:Object(h.jsx)(l.g,{children:Object(h.jsxs)(l.M,{className:"justify-content-between",children:[Object(h.jsxs)(l.k,{className:"col-3 d-flex align-items-center",children:[Object(h.jsx)("img",{src:p.icono,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:p.estado})]}),Object(h.jsxs)(l.k,{className:"col-9 text-right",children:[Object(h.jsx)("h5",{children:"Proyecto"}),Object(h.jsx)("h3",{children:"".concat(p.nombre)})]})]})})})})}),Object(h.jsx)(l.M,{children:Object(h.jsx)(l.k,{children:Object(h.jsxs)(l.f,{className:"shadow",children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera-principal",children:"General"}),Object(h.jsx)(l.g,{children:Object(h.jsxs)(l.H,{accent:!0,children:[Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Identificador :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.identificador})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Descripcion :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.descripcion})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Area :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.area})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Linea :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.linea})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Proceso :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.proceso})]}),Object(h.jsxs)(l.M,{children:[Object(h.jsx)(l.k,{sm:"4",children:Object(h.jsx)(l.I,{accent:"info",children:"Tipo :"})}),Object(h.jsx)(l.k,{sm:"4",className:"align-self-center",children:p.tipo})]})]})})]})})}),Object(h.jsx)(l.M,{children:Object(h.jsx)(l.k,{sm:"12",children:Object(h.jsxs)(l.f,{className:"shadow",children:[Object(h.jsx)(l.j,{className:"contenedor-cabecera-principal",children:"Sensores"}),Object(h.jsx)(l.g,{children:Object(h.jsxs)(l.Z,{activeTab:"grupos",children:[Object(h.jsx)(l.J,{variant:"tabs",children:Object(h.jsx)(l.K,{children:Object(h.jsx)(l.L,{"data-tab":"grupos",children:"Grupos"})})}),Object(h.jsxs)(l.X,{children:[Object(h.jsx)(l.Y,{"data-tab":"grupos",children:I.map((function(e,c){return Object(h.jsxs)("div",{className:"contenedor-cabecera-grafica",children:[Object(h.jsx)("h4",{className:"my-4",children:e.nombre}),Object(h.jsx)(O,{sensores:e.datos})]},c)}))}),Object(h.jsx)(l.Y,{"data-tab":"todos",children:Object(h.jsx)(l.M,{children:N.map((function(e,c){return Object(h.jsx)(x,{sensor:e},c)}))})})]})]})})]})})})]})}}}]);
//# sourceMappingURL=12.ace334a7.chunk.js.map