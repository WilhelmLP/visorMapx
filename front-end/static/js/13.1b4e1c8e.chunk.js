(this.webpackJsonpvisormapx=this.webpackJsonpvisormapx||[]).push([[13],{586:function(e,c,t){"use strict";c.a=t.p+"static/media/inactivo.c25580cd.svg"},587:function(e,c,t){"use strict";t.d(c,"a",(function(){return r}));var i=t(1),s=t(8),n=t(82),a=(t(588),t(2)),r={TARJETA:0,ELEMENTO:1,PROYECTO:2};c.b=function(e){var c=e.activo,t=void 0===c?0:c,o=e.tipo,d=void 0===o?r.ELEMENTO:o,j=e.history,l=e.direccion,u=Object(i.useContext)(n.a),b=Object(i.useMemo)((function(){var e=[];switch(d){case r.TARJETA:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"tinformacion"}),void 0!=u&&(u.includes("TC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"tconfiguracion"}),(u.includes("TGI")||u.includes("TGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"tgraficas"}),u.includes("TE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"testadistica"}));break;case r.ELEMENTO:e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"einformacion"}),void 0!=u&&(u.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"econfiguracion"}),(u.includes("EGI")||u.includes("EGII"))&&e.push({titulo:"Graficas",id:2,direccion:"graficas",key:"egraficas"}),u.includes("EE")&&e.push({titulo:"Estadistica",id:3,direccion:"estadistica",key:"3estadistica"}));break;case r.PROYECTO:void 0!=u&&((u.includes("EGI")||u.includes("EGII"))&&e.push({titulo:"Informaci\xf3n",id:0,direccion:"informacion",key:"pinformacion"}),u.includes("EC")&&e.push({titulo:"Configuraci\xf3n",id:1,direccion:"configuracion",key:"pconfiguracion"}),u.includes("EE")&&e.push({titulo:"Estadistica",id:2,direccion:"estadistica",key:"pestadistica"}),e.push({titulo:"Elementos",id:3,direccion:"elementos",key:"pelementos"}))}return e}),[u,d]);return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(s.f,{className:"navegacion py-1",children:Object(a.jsx)("div",{className:"panel d-flex justify-content-end",children:Object(a.jsx)(s.J,{variant:"tabs",children:b.map((function(e,c){return Object(a.jsx)(s.K,{children:e.id==t?Object(a.jsx)(s.L,{className:"link",active:!0,children:e.titulo}):Object(a.jsx)(s.L,{className:"link",onClick:function(){return function(e){switch(d){case r.TARJETA:j.push("/tarjetas/".concat(l,"/").concat(b[e].direccion));break;case r.ELEMENTO:j.push("/elementos/".concat(l,"/").concat(b[e].direccion));break;case r.PROYECTO:j.push("/proyectos/".concat(l,"/").concat(b[e].direccion))}}(c)},children:e.titulo})},e.key)}))})})})})}},588:function(e,c,t){},630:function(e,c,t){},790:function(e,c,t){"use strict";t.r(c);var i=t(7),s=t.n(i),n=t(34),a=t(11),r=t(33),o=t(1),d=t.n(o),j=t(24),l=t(8),u=t(43),b=t(75),h=t(586),O=(t(630),t(2)),x=function(e){var c=e.tarjeta,t=e.sensor,i="activo"==t.estado?b.a:h.a,s=t.estado[0].toUpperCase()+t.estado.substring(1);return Object(O.jsx)(l.k,{sm:"4",children:Object(O.jsxs)(l.f,{className:"shadow",children:[Object(O.jsx)(l.j,{className:"card-head contenedor-cabecera ",children:Object(O.jsx)("h5",{children:t.nombre})})," ",Object(O.jsxs)(l.g,{children:[Object(O.jsxs)("div",{className:"mb-4 d-flex align-items-center",children:[Object(O.jsx)("img",{src:i,className:"icono"}),Object(O.jsx)("h5",{className:"ml-2",children:s})]}),Object(O.jsxs)("pre",{children:[Object(O.jsx)("li",{children:"Direcci\xf3n : ".concat(c,".S").concat(t.index)}),Object(O.jsx)("li",{children:"Alias     : ".concat(t.alias)}),Object(O.jsx)("li",{children:"Unidades  : ".concat(t.unidades)}),Object(O.jsx)("li",{children:"Rango     : [".concat(t.parametros.rango[0].toFixed(4),", ").concat(t.parametros.rango[1].toFixed(4),"] ").concat(t.unidades)})]}),Object(O.jsx)("br",{}),Object(O.jsx)("h6",{children:"Nivel"}),Object(O.jsx)("hr",{}),Object(O.jsxs)("pre",{children:[Object(O.jsx)("li",{children:"Resoluci\xf3n t    : ".concat(t.parametros.resolucion[0].toFixed(4)/2," min")}),Object(O.jsx)("li",{children:"Resoluci\xf3n f(t) : ".concat(t.parametros.resolucion[1].toFixed(4))})]}),Object(O.jsx)("br",{}),Object(O.jsx)("h6",{children:"Tendencia"}),Object(O.jsx)("hr",{}),Object(O.jsxs)("pre",{children:[Object(O.jsx)("li",{children:"Funci\xf3n : Lineal"}),Object(O.jsx)("li",{children:"Filtro  : ".concat(t.parametros.peligrosidad)})]})]})]})})},m=d.a.memo(x),f=function(e){var c=e.tarjeta,t=e.sensores;return Object(O.jsx)("div",{children:Object(O.jsx)(l.M,{children:t.map((function(e,t){return Object(O.jsx)(m,{tarjeta:c,sensor:e},t)}))})})},p=t(189),v=t(587);c.default=function(e){var c=e.match.params.nombreTarjeta,t=e.history,i=Object(o.useState)([]),d=Object(r.a)(i,2),x=d[0],g=d[1],E=Object(o.useState)([]),k=Object(r.a)(E,2),y=k[0],N=k[1],T=Object(o.useState)({estado:"Inactivo",icono:h.a}),I=Object(r.a)(T,2),C=I[0],w=I[1],M=Object(o.useState)(!0),R=Object(r.a)(M,2),A=R[0],G=R[1],L=localStorage.getItem("token"),J=c,F=function(){var e=Object(a.a)(s.a.mark((function e(){var c,t,i,a,r,o,d;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!=J){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Object(u.r)(J,L);case 4:c=e.sent,t=c.graficas,i=c.sensores,a=c.estado,N(i),r=[],t.forEach((function(e){var c=[],t=[];e.sensores.forEach((function(e){t.push(Object(n.a)({},i[e]))})),c.push.apply(c,t),r.push({nombre:e.nombre,sensores:c})})),g(r),o="activo"==a?b.a:h.a,d=a[0].toUpperCase()+a.substring(1),w({estado:d,icono:o});case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)(Object(a.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),e.next=3,F();case 3:G(!1);case 4:case"end":return e.stop()}}),e)}))),[]),void 0==c?Object(O.jsx)(j.a,{to:"/"}):A?Object(O.jsx)("div",{style:{display:"grid",placeItems:"center",height:"40vh"},children:Object(O.jsx)(p.a,{height:"10vh"})}):Object(O.jsxs)(l.m,{fluid:!0,children:[Object(O.jsx)(v.b,{activo:1,tipo:v.a.TARJETA,history:t,direccion:J}),Object(O.jsx)(l.M,{children:Object(O.jsx)(l.k,{sm:"12",children:Object(O.jsx)(l.f,{className:"shadow",children:Object(O.jsx)(l.g,{children:Object(O.jsxs)(l.M,{className:"justify-content-between",children:[Object(O.jsxs)(l.k,{className:"col-6 d-flex align-items-center",children:[Object(O.jsx)("img",{src:C.icono,className:"icono"}),Object(O.jsx)("h4",{className:"ml-2",children:C.estado})]}),Object(O.jsxs)(l.k,{className:"col-6 text-right",children:[Object(O.jsx)("h5",{children:"Tarjeta"}),Object(O.jsx)("h3",{children:J})]})]})})})})}),Object(O.jsx)(l.M,{children:Object(O.jsx)(l.k,{sm:"12",children:Object(O.jsxs)(l.f,{className:"shadow",children:[Object(O.jsx)(l.j,{className:"contenedor-cabecera",children:Object(O.jsx)("h4",{children:"Sensores"})}),Object(O.jsx)(l.g,{children:Object(O.jsxs)(l.Z,{activeTab:"grupos",children:[Object(O.jsxs)(l.J,{variant:"tabs",children:[Object(O.jsx)(l.K,{children:Object(O.jsx)(l.L,{"data-tab":"grupos",children:"Grupos"})}),Object(O.jsx)(l.K,{children:Object(O.jsx)(l.L,{"data-tab":"todos",children:"Todos"})})]}),Object(O.jsxs)(l.X,{children:[Object(O.jsx)(l.Y,{"data-tab":"grupos",children:x.map((function(e,c){return Object(O.jsxs)("div",{className:"contenedor-cabecera-grafica",children:[Object(O.jsx)("h4",{className:"my-4",children:e.nombre}),Object(O.jsx)(f,{tarjeta:J,sensores:e.sensores})]},c)}))}),Object(O.jsx)(l.Y,{"data-tab":"todos",className:"mt-4",children:Object(O.jsx)(l.M,{children:y.map((function(e,c){return Object(O.jsx)(m,{tarjeta:J,sensor:e},c)}))})})]})]})})]})})})]})}}}]);
//# sourceMappingURL=13.1b4e1c8e.chunk.js.map