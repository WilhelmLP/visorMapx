(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[14],{586:function(e,c,i){"use strict";c.a=i.p+"static/media/inactivo.c25580cd.svg"},587:function(e,c,i){"use strict";i.d(c,"a",(function(){return r}));var s=i(1),t=i(8),a=i(82),n=(i(588),i(2)),r={TARJETA:0,ELEMENTO:1,PROYECTO:2};c.b=function(e){var c=e.activo,i=void 0===c?0:c,o=e.tipo,d=void 0===o?r.ELEMENTO:o,l=e.history,j=e.direccion,b=Object(s.useContext)(a.a),h=Object(s.useMemo)((function(){var e=[];switch(d){case r.TARJETA:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"tinformacion"}),void 0!=b&&(b.includes("TC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"tconfiguracion"}),(b.includes("TGI")||b.includes("TGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"}),b.includes("TE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"}));break;case r.ELEMENTO:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"einformacion"}),void 0!=b&&(b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"econfiguracion"}),(b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"egraficas"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"}));break;case r.PROYECTO:void 0!=b&&((b.includes("EGI")||b.includes("EGII"))&&e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"pinformacion"}),b.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"pconfiguracion"}),b.includes("EE")&&e.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"}),e.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"}))}return e}),[b,d]);return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(t.f,{className:"navegacion py-1",children:Object(n.jsx)("div",{className:"panel d-flex justify-content-end",children:Object(n.jsx)(t.J,{variant:"tabs",children:h.map((function(e,c){return Object(n.jsx)(t.K,{children:e.id==i?Object(n.jsx)(t.L,{className:"link",active:!0,children:e.titulo}):Object(n.jsx)(t.L,{className:"link",onClick:function(){return function(e){switch(d){case r.TARJETA:l.push("/tarjetas/".concat(j,"/").concat(h[e].direccion));break;case r.ELEMENTO:l.push("/elementos/".concat(j,"/").concat(h[e].direccion));break;case r.PROYECTO:l.push("/proyectos/".concat(j,"/").concat(h[e].direccion))}}(c)},children:e.titulo})},e.key)}))})})})})}},588:function(e,c,i){},611:function(e,c,i){},791:function(e,c,i){"use strict";i.r(c);var s=i(7),t=i.n(s),a=i(34),n=i(11),r=i(33),o=i(1),d=i(8),l=i(43),j=i(75),b=i(586),h=(i(611),i(2)),x=function(e){var c=e.sensor,i=c.estado[0].toUpperCase()+c.estado.substring(1),s="activo"==c.estado,t=s?j.a:b.a,a=0;return null!==c.peligrosidad&&(a=c.peligrosidad.tendencia[0]+c.peligrosidad.tendencia[1]),Object(h.jsx)(d.k,{sm:"12",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera card-head",children:Object(h.jsx)("h5",{children:c.nombre})}),null!==c.basica&&s?Object(h.jsxs)(d.g,{className:"shadow",children:[Object(h.jsxs)("div",{className:"container-fluid d-flex align-items-center my-4",children:[Object(h.jsx)("img",{src:t,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:i})]}),Object(h.jsxs)(d.M,{children:[Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"B\xe1sica"})}),Object(h.jsxs)(d.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(c.basica.actual.toFixed(4)," ").concat(c.unidades)}),Object(h.jsx)("li",{children:"Minimo   : ".concat(c.basica.min.toFixed(4)," ").concat(c.unidades)}),Object(h.jsx)("li",{children:"Promedio : ".concat(c.basica.promedio.toFixed(4)," ").concat(c.unidades)}),Object(h.jsx)("li",{children:"Maximo   : ".concat(c.basica.max.toFixed(4)," ").concat(c.unidades)})]}),Object(h.jsx)("br",{}),Object(h.jsx)("h6",{className:"my-2",children:"Nivel"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Nivel Actual   : ".concat(c.basica.nivelactual.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel Minimo   : ".concat(c.basica.nivelmin.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel Promedio : ".concat(c.basica.nivelpromedio.toFixed(4))}),Object(h.jsx)("li",{children:"Nivel M\xe1ximo   : ".concat(c.basica.nivelmax.toFixed(4))})]}),Object(h.jsx)("br",{}),Object(h.jsx)("h6",{className:"my-2",children:"General"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Paquetes   : ".concat(c.basica.paquetes)}),Object(h.jsx)("li",{children:"Eficiencia : ".concat((100*c.basica.eficiencia).toFixed(4)," %")})]})]})]})}),Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Niveles"})}),Object(h.jsxs)(d.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(c.landmarks.actual.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo   : ".concat(c.landmarks.min.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio : ".concat(c.landmarks.paquetes.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(c.landmarks.max.toFixed(4))})]}),Object(h.jsx)("br",{}),Object(h.jsx)("h6",{className:"my-2",children:"Cambio [ t ]"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(c.landmarks.deltai.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Minimo   : ".concat(c.landmarks.deltaimin.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"Promedio : ".concat(c.landmarks.deltaipromedio.toFixed(4)/2," min")}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(c.landmarks.deltaimax.toFixed(4)/2," min")})]}),Object(h.jsx)("br",{}),Object(h.jsx)("h6",{className:"my-2",children:"Cambio [ f(t) ]"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual     : ".concat(c.landmarks.deltay.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo     : ".concat(c.landmarks.deltaymin.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio   : ".concat(c.landmarks.deltaypromedio.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo     : ".concat(c.landmarks.deltaymax.toFixed(4))}),Object(h.jsx)("hr",{}),Object(h.jsx)("li",{children:"Paquetes   : ".concat(c.landmarks.paquetes)}),Object(h.jsx)("li",{children:"Marca      : ".concat(c.landmarks.landmark?"\ud83d\udd35":"\u26aa")})]})]})]})}),Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Tendencia"})}),Object(h.jsxs)(d.g,{children:[Object(h.jsx)("h6",{className:"my-2",children:"Valor"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Actual   : ".concat(c.peligrosidad.actual.toFixed(4))}),Object(h.jsx)("li",{children:"Minimo   : ".concat(c.peligrosidad.min.toFixed(4))}),Object(h.jsx)("li",{children:"Promedio : ".concat(c.peligrosidad.promedio.toFixed(4))}),Object(h.jsx)("li",{children:"M\xe1ximo   : ".concat(c.peligrosidad.max.toFixed(4))})]}),Object(h.jsx)("br",{}),Object(h.jsx)("h6",{className:"my-2",children:"Tendencia"}),Object(h.jsx)("hr",{}),Object(h.jsxs)("pre",{children:[Object(h.jsx)("li",{children:"Baja   : ".concat(0!=a?(100*c.peligrosidad.tendencia[0]/a).toFixed(4):0," %")}),Object(h.jsx)("li",{children:"Alta   : ".concat(0!=a?(100*c.peligrosidad.tendencia[1]/a).toFixed(4):0," %")}),Object(h.jsx)("hr",{}),Object(h.jsx)("li",{children:"Paquetes    : ".concat(c.peligrosidad.paquetes)}),Object(h.jsx)("li",{children:"Marca       : ".concat(c.peligrosidad.landmark?"\ud83d\udd35":"\u26aa")})]})]})]})})]})]}):Object(h.jsxs)(d.g,{className:"shadow",children:[Object(h.jsxs)("div",{className:"container-fluid d-flex align-items-center my-4",children:[Object(h.jsx)("img",{src:t,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:i})]}),Object(h.jsxs)(d.M,{children:[Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"B\xe1sica"})}),Object(h.jsx)(d.g,{children:"Informaci\xf3n no disponible"})]})}),Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Niveles"})}),Object(h.jsx)(d.g,{children:"Informaci\xf3n no disponible"})]})}),Object(h.jsx)(d.k,{sm:"4",children:Object(h.jsxs)(d.f,{children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h5",{className:"m-0",children:"Tendencia"})}),Object(h.jsx)(d.g,{children:"Informaci\xf3n no disponible"})]})})]})]})]})})},O=function(e){var c=e.sensores;return Object(h.jsx)(d.M,{children:c.map((function(e,c){return Object(h.jsx)(x,{sensor:e},c)}))})},m=i(189),u=i(587);c.default=function(e){var c=e.match.params.nombreTarjeta,i=e.history,s=Object(o.useState)([]),p=Object(r.a)(s,2),f=p[0],g=p[1],v=Object(o.useState)([]),N=Object(r.a)(v,2),k=N[0],E=N[1],y=Object(o.useState)({estado:"inactivo",icono:b.a}),F=Object(r.a)(y,2),T=F[0],M=F[1],I=Object(o.useState)(!0),w=Object(r.a)(I,2),A=w[0],C=w[1],P=Object(o.useState)(localStorage.getItem("token")),G=Object(r.a)(P,1)[0],J=c,L=function(){var e=Object(n.a)(t.a.mark((function e(){var c,i,s,n,r,o,d,h,x,O,m;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.r)(J,G);case 2:return c=e.sent,i=c.graficas,s=c.sensores,n=c.estado,r=[],s.forEach((function(e){r.push("".concat(J,".S").concat(e.index))})),e.next=10,Object(l.s)(r,G);case 10:for(o=e.sent,d=[],h=0;h<o.sensores[0].length;h++)d.push(Object(a.a)({nombre:s[h].nombre,alias:s[h].alias,estado:s[h].estado,unidades:s[h].unidades},o.sensores[0][h]));E(d),x=[],i.forEach((function(e){for(var c=[],i=function(i){var t=[];e.sensores.forEach((function(e){"activo"===s[e].estado&&t.push(Object(a.a)({nombre:s[e].nombre,alias:s[e].alias,estado:s[e].estado,unidades:s[e].unidades},o.sensores[i][e]))})),t.length>0&&c.push(t)},t=0;t<o.sensores.length;t++)i(t);c.length>0&&x.push({nombre:e.nombre,sensores:c})})),g(x),O="activo"==n?j.a:b.a,m=n[0].toUpperCase()+n.substring(1),M({estado:m,icono:O});case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)(Object(n.a)(t.a.mark((function e(){var c;return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L();case 2:return c=setInterval(Object(n.a)(t.a.mark((function e(){return t.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L();case 2:case"end":return e.stop()}}),e)}))),3e4),C(!1),e.abrupt("return",(function(){clearInterval(c)}));case 5:case"end":return e.stop()}}),e)}))),[]),A?Object(h.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(h.jsx)(m.a,{height:"10vh"})}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(u.b,{activo:3,tipo:u.a.TARJETA,history:i,direccion:J}),Object(h.jsx)(d.k,{sm:"12",children:Object(h.jsx)(d.f,{className:"shadow",children:Object(h.jsx)(d.g,{children:Object(h.jsxs)(d.M,{className:"justify-content-between",children:[Object(h.jsxs)(d.k,{className:"col-6 d-flex align-items-center",children:[Object(h.jsx)("img",{src:T.icono,className:"icono"}),Object(h.jsx)("h4",{className:"ml-2",children:T.estado})]}),Object(h.jsxs)(d.k,{className:"col-6 text-right",children:[Object(h.jsx)("h5",{children:"Tarjeta"}),Object(h.jsx)("h3",{children:J})]})]})})})}),Object(h.jsx)(d.m,{fluid:!0,children:Object(h.jsx)(d.M,{children:Object(h.jsx)(d.k,{sm:"12",children:Object(h.jsxs)(d.f,{className:"shadow",children:[Object(h.jsx)(d.j,{className:"contenedor-cabecera",children:Object(h.jsx)("h4",{children:"Sensores"})}),Object(h.jsx)(d.g,{children:Object(h.jsxs)(d.Z,{activeTab:"grupos",children:[Object(h.jsxs)(d.J,{variant:"tabs",children:[Object(h.jsx)(d.K,{children:Object(h.jsx)(d.L,{"data-tab":"grupos",children:"Graficas"})}),Object(h.jsx)(d.K,{children:Object(h.jsx)(d.L,{"data-tab":"todos",children:"Todos"})})]}),Object(h.jsxs)(d.X,{children:[Object(h.jsx)(d.Y,{"data-tab":"grupos",children:f.map((function(e,c){return Object(h.jsxs)("div",{className:"contenedor-cabecera-grafica",children:[Object(h.jsx)("h4",{className:"my-4",children:e.nombre}),Object(h.jsx)(O,{sensores:e.sensores[0]})]},c)}))}),Object(h.jsx)(d.Y,{"data-tab":"todos",className:"mt-4",children:Object(h.jsx)(d.M,{children:k.map((function(e,c){return Object(h.jsx)(x,{sensor:e},c)}))})})]})]})})]})})})})]})}}}]);
//# sourceMappingURL=14.c54c3cbe.chunk.js.map