!(function(){'use strict';var t;function n(t,n,i){var r=i?'queryAction':'executeAction';return new Promise((function(i,o){context[r]('ridesetstatus',{ride:t.id,status:n},e(i,o))}))}function i(t,n){var i=n?'queryAction':'executeAction';return new Promise((function(n,r){context[i]('ridedemolish',{ride:t.id,modifyType:1},e(n,r))}))}function e(t,n){return function(i){0===i.error?t(i):n(i)}}function r(t,n){park.postMessage({type:'attraction',text:n,subject:t.id})}!(function(t){t[t.RIDE_TYPE_MAZE=20]='RIDE_TYPE_MAZE',t[t.RIDE_TYPE_MINI_GOLF=67]='RIDE_TYPE_MINI_GOLF',t[t.RIDE_TYPE_CROOKED_HOUSE=71]='RIDE_TYPE_CROOKED_HOUSE'})(t||(t={}));var o=function(){return o=Object.assign||function(t){for(var n,i=1,e=arguments.length;i<e;i++)for(var r in n=arguments[i])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t},o.apply(this,arguments)},u=function(t,n){return u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])},u(t,n)};function a(t,n){if('function'!=typeof n&&null!==n)throw new TypeError('Class extends value '+n+' is not a constructor or null');function i(){this.constructor=t}u(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}function s(t){return void 0===t}function c(t){return Array.isArray(t)}function h(t){return l(t,'function')}function f(t){return l(t,'object')}function l(t,n){return typeof t===n}var d='redraw',p=[4,0],v=[1,2],g=[0,0],y={top:g,right:g,bottom:g,left:g};function w(t){s(t.height)&&(t.height=14)}var m=Math.floor(1048575*Math.random())<<10;function b(){return(m++).toString(36)}function x(t,n){return t.subscribe(n)}var C=function(t,n,i,e){this.Ia=t,this.Ja=n,this.Ka=i,this.La=x(n,e)};function I(t){if(!t||!f(t))return!1;var n=t;return h(n.get)&&h(n.subscribe)}function O(t){return!(!t||!f(t))&&!(!(n=t.twoway)||!f(n))&&I(n)&&h(n.set);var n}var M=(function(){function t(){this.Ma=[],this.za=null}return t.prototype.add=function(t,n,i,e){this.on(t,i,(function(t,i){var r=e?e(i):i;t[n]=r}))},t.prototype.callback=function(t,n,i,e,r){O(i)?t[n]=function(t,n){var o=r?r(t,n):t;i.twoway.set(o),e&&e(o)}:e&&(t[n]=r?function(t,n){return e(r(t,n))}:e)},t.prototype.twoway=function(t,n,i,e,r){this.add(t,n,e),this.callback(t,i,e,r)},t.prototype.on=function(t,n,i){var e=(function(t){return O(t)?t.twoway:t})(n);if(I(e)){var r=this.Aa(t,e,i);this.Ma.push(r),i(t,e.get())}else s(e)||i(t,e)},t.prototype.Na=function(){this.za=null},t.prototype.Oa=function(){return this.Ma.length>0},t})(),R=(function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return a(n,t),n.prototype.ya=function(t){var n=t.ga;n&&this.Ba(n),this.za=t},n.prototype.Aa=function(t,n,i){var e=this;return new C('',n,i,(function(t){var n=e.za;n&&n.ua&&i(n.ua,t)}))},n.prototype.Ba=function(t){var n=this.Ma;if(n)for(var i=0,e=n;i<e.length;i++){var r=e[i];r.Ka(t,r.Ja.get())}},n})(M);function E(t,n){n||(n={});for(var i=0,e=t;i<e.length;i++){var r=e[i],o=r.name;o&&!(o in n)&&(n[o]=r)}return n}function _(t){return k(t,0)}function P(t){return k(t,1)}function A(t){return k(t,2)}function k(t,n){return t[1]===n}function D(t){throw Error(t)}function S(t){if(s(t))return t;if((function(t){return l(t,'number')})(t))return[t,0];var n=t.trim(),i=n.length;if(i>1){var e=i-1,r=void 0,o=n[e];if('w'===o?r=2:'%'===o?r=1:i>2&&(e--,'x'===o&&'p'===n[e]&&(r=0)),!s(r))return[parseFloat(n.substring(0,e)),r]}D('Value \''+t+'\' is not a valid scale.')}function T(t,n){return S(t)||n}function z(t){return T(t,g)}function W(t,n,i,e){switch(t[1]){case 2:return(i?t[0]/i:1)*n*(100-e)*.01;case 1:return.01*t[0]*n;default:return t[0]}}var F=['y','x'],G=['height','width'],U=['top','left'],j=['bottom','right'];function Y(t,n,i,e){var r=G[n],o=e[U[n]],u=e[j[n]],a=t[r]-N(i,o,u,_),s=N(i,o,u,P),c=N(i,o,u,A),h=W(i,a,c,s);return t[r]=h,H(t,n,e,a,c,s)}function H(t,n,i,e,r,o){return(function(t,n,i,e,r,o,u,a,s){var c=W(n[a],i,e,r),h=W(n[s],i,e,r);return t[o]+=c,c+t[u]+h})(t,i,e,r,o,F[n],G[n],U[n],j[n])}function N(t,n,i,e){var r=0;return e(t)&&(r+=t[0]),e(n)&&(r+=n[0]),e(i)&&(r+=i[0]),r}var B='inherit',L='auto',V=['minHeight','minWidth'],K=['maxHeight','maxWidth'];function X(t,n,i){if(l(i,'string'))return L;var e=i,r=e.value||i;return q(t,n,r,e.min||r,e.max||r),r}function Z(t,n,i,e,r){var o=G[n],u=e[U[n]],a=e[j[n]],s=i[o]+u[0]+a[0]+r;return _(u)&&_(a)||D('Padding for '+o+' must be absolute for auto window resize.'),q(t,n,s,s,s),s}function q(t,n,i,e,r){t[G[n]]=i,t[V[n]]=e,t[K[n]]=r}var J=(function(){function t(t){var n=this,i=t.width,e=t.height,r=t.position,o=new R,u={classification:'fui-'+b(),title:'',colours:t.colours,onUpdate:function(){n.ha(),n.c((function(t){return t.update()}))},onClose:function(){n.m()}},a=X(u,1,i),s=X(u,0,e);this.qa(a,s),o.add(u,'title',t.title),this.ea=o.Oa()?o:null,this.fa=r,this.ga=u}return t.prototype.ha=function(){var t=this.ua,n=this.t,i=this.w;if(t&&n){if(!(4&i)){var e=t.width,r=t.height,o=2&i||this.ra==e,u=1&i||this.sa==r;if(o&&u)return;this.ra=e,this.sa=r}this.d(t,n),this.w&=-5}},t.prototype.ma=function(t,n){return{x:0,y:n,width:2&t?L:this.ra,height:1&t?L:this.sa-n}},t.prototype.na=function(t,n,i,e){var r=this.w;2&r&&(this.ra=Z(t,1,n,e,0)),1&r&&(this.sa=Z(t,0,n,e,i))},t.prototype.qa=function(t,n){var i=this.w;t==L?i|=2:(i&=-3,this.ra=t),n==L?i|=1:(i&=-2,this.sa=n),this.w=i},t.prototype.l=function(t,n){this.d(t,this.a),(function(t,n){n&&'default'!==n&&('center'===n?(t.x=ui.width/2-t.width/2,t.y=ui.height/2-t.height/2):(t.x=n.x,t.y=n.y))})(t,this.fa),n&&n.ya(this);var i=ui.openWindow(t),e=E(i.widgets);this.ua=i,this.t=e,this.c((function(t){return t.open(i,e)}))},t.prototype.m=function(){this.c((function(t){return t.close()}));var t=this.ea;t&&t.Na(),this.ua=null,this.t=null},t.prototype.open=function(){if(this.ua)this.focus();else{var t=this.ga,n=this.ea;this.l(t,n)}},t.prototype.close=function(){this.ua&&this.ua.close()},t.prototype.focus=function(){this.ua&&this.ua.bringToFront()},t.prototype.redraw=function(){this.w|=4},t})(),$=function(t,n){this.position=t.parse(n),this.xa=t};function Q(t){return(tt(t.width)?1:0)|(tt(t.height)?2:0)}function tt(t){return s(t)||t===L}function nt(t,n,i,e,r){return it(t,n,(function(t){return(function(t,n,i,e){var r,o,u=i===e,a=0;if(u&&!_(n))return null;for(var s=G[e],c=U[e],h=j[e],f=-1,l=0,d=t;l<d.length;l++){var p=d[l],v=p.position,g=v[s],y=v.padding,w=y[c],m=y[h];if(!rt(g,w,m))return null;p.skip||(r=a,o=g[0]+w[0]+m[0],a=u?r+o:r<o?o:r,f++)}return u&&(a+=n[0]*f),a})(i,e,r,t)}))}function it(t,n,i){return!!(3&n&&et(t,1&n,1,i)|et(t,2&n,0,i))}function et(t,n,i,e){var r;if(n&&!(function(t){return null===t})(r=e(i))){var o=G[i],u=t[o];if(u[0]!==r||!_(u))return t[o]=[r,0],1}return 0}function rt(t,n,i){return _(t)&&_(n)&&_(i)}function ot(t,n,i){var e=t[0]*i;A(t)?n.D+=e:_(t)?n.H+=e:P(t)&&(n.T+=e)}function ut(t,n){var i;if(n||(n=y),s(t))i=t;else if(c(t)){var e=t.length;if(2===e){var r=z(t[0]),o=z(t[1]);i=st(r,o,r,o)}else 4===e?i=st(z(t[0]),z(t[1]),z(t[2]),z(t[3])):D('Padding array of unknown length: '+e+'. Only lengths of 2 or 4 are supported.')}else if(f(t))i=st(at(U[0],t,n),at(j[1],t,n),at(j[0],t,n),at(U[1],t,n));else{var u=z(t);i=st(u,u,u,u)}return i||n}function at(t,n,i){var e=n[t];return T(s(e)?n.rest:e,i[t])}function st(t,n,i,e){return{top:t,right:n,bottom:i,left:e}}function ct(t,n){return{width:T(t.width,v),height:T(t.height,v),padding:ut(t.padding,n)}}function ht(t){return t.direction=1,lt(t)}function ft(t){return t.direction=0,lt(t)}function lt(t){return function(n,i){return new dt(n,i,t)}}var dt=(function(t){function n(n,i,e){var r=t.call(this,n,e)||this;r.parse=ct,r.L=e.direction||0,r.M=S(e.spacing)||p;for(var o=Q(e),u=c(e)?e:e.content,a=u.length,s=Array(a),h=0;h<a;h++){var f=u[h];s[h]=f(r,i)}return r.w=4|o,r.v=s,i.on(d,(function(){var t=r.w;if(4&t){r.w&=-5;var n=r.v,i=n.filter((function(t){return!t.skip}));nt(r.position,t,n,r.M,r.L),r.N=i,r.O=i.map((function(t){return t.position}))}})),r}return a(n,t),n.prototype.recalculate=function(){this.w|=4,3&this.w&&this.xa.recalculate()},n.prototype.layout=function(t,n){var i=this;!(function(t,n,i,e,r){var o=t.length;if(o)for(var u=1==i?0:1,a=(function(t,n,i,e){var r=t.length,o={S:Array(r),H:0,T:0,D:0};ot(n,o,r-1);for(var u=0;u<r;u++){var a=t[u],s=a.padding,c={R:a[G[i]],rr:a[G[e]],h:s};o.S[u]=c;var h=c.R,f=c.h[U[i]],l=c.h[j[i]];ot(h,o,1),ot(f,o,1),ot(l,o,1)}return o})(t,e,i,u),s=n[G[i]]-a.H,c=a.D,h=a.T,f=W(e,s,c,h),l=0,d=0;d<o;d++){var p=a.S[d],v=l+n[F[i]],g=W(p.R,s,c,h),y=p.h,w={};w[F[i]]=v,w[G[i]]=g,w[F[u]]=n[F[u]],w[G[u]]=n[G[u]],l+=H(w,i,y,s,c,h),Y(w,u,p.rr,y),r(d,w),l+=f}})(this.O,n,this.L,this.M,(function(n,e){i.N[n].layout(t,e)}))},n})($),pt=(function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return a(n,t),n.prototype.ya=function(t){var n=t.Fa;n&&this.Ba(n),this.za=t},n.prototype.Aa=function(t,n,i){var e=this,r=t.name||(t.name=b());return new C(r,n,i,(function(t){var n=e.za;if(n&&n.isOpen()){var o=n.getWidget(r);o&&i(o,t)}}))},n.prototype.Ba=function(t){var n=this.Ma;if(n)for(var i=0,e=n;i<e.length;i++){var r=e[i];r.Ka(t[r.Ia],r.Ja.get())}},n})(M);function vt(t,n){for(var i=0,e=t.length;i<e;i++)t[i](n)}var gt=(function(){function t(t,n,i,e,r,o,u){this.width=t,this.height=n,this.xa=i,this.l=e,this.Ca=r,this.Da=o,this.m=u,this.recalculate=this.redraw}return t.prototype.layout=function(t,n){vt(this.Da,this);var i=this.j,e=i.position,r=yt(t,this.width,e,1),o=yt(t,this.height,e,0);return i.layout(n,t),{width:r,height:o}},t.prototype.redraw=function(){this.Fa&&this.xa.redraw()},t.prototype.parse=function(t){return{width:v,height:v,h:ut(t.padding)}},t.prototype.getWidget=function(t){var n,i=this.Fa;return i&&(n=i[t]),n||null},t.prototype.isOpen=function(){return!!this.Fa},t.prototype.open=function(t,n){X(t,1,this.width),X(t,0,this.height),this.Fa=n;var i=this.B;i&&i.ya(this),vt(this.l,this)},t.prototype.update=function(){vt(this.Ca,this)},t.prototype.close=function(){vt(this.m,this);var t=this.B;t&&t.Na(),this.Fa=void 0},t})();function yt(t,n,i,e){var r=G[e],o=t[r],u=i[r],a=i.h,s=n==B;return s&&o==L||n==L?(_(u)||D('Window body '+r+' must resolve to absolute size for "auto" window size.'),u[0]+(function(t,n,i){var e=n[U[i]],r=n[j[i]];return _(e)&&_(r)||D('Window padding must be absolute for "auto" window size.'),t[F[i]]+=e[0],e[0]+r[0]})(t,a,e)):(Y(t,e,u,a),s?o:u[0])}var wt=(function(){function t(t,n,i){this.va=[];var e=[],r=[],o=[],u=[],a=new gt(i.width||B,i.height||B,t,e,r,o,u),s=new pt,c=n.onOpen,h=n.onUpdate,f=n.onClose;this.open=e,this.update=r,this.redraw=o,this.close=u,this.binder=s,this.context=a,a.j=new dt(a,this,i),a.B=s.Oa()?s:null,c&&e.push(c),h&&r.push(h),f&&u.push(f)}return t.prototype.add=function(t){this.va.push(t)},t.prototype.on=function(t,n){this[t].push(n)},t})(),mt=(function(t){function n(n){var i=t.call(this,n)||this,e=new wt(i,n,n),r=e.va;return i.ga.widgets=r,i.a=E(r),i.b=e.context,i}return a(n,t),n.prototype.c=function(t){t(this.b)},n.prototype.d=function(t,n){var i=this.ma(this.w,15),e=this.b.layout(i,n);this.na(t,e,15,y)},n})(J),bt=(function(){function t(t){this.U=t}return t.prototype.get=function(){return this.U},t.prototype.subscribe=function(t){this.Ga?this.Ga.push(t):this.Ga=[t];var n=this.Ga;return function(){var i=n.indexOf(t);-1!==i&&n.splice(i,1)}},t.prototype.Ha=function(t){this.Ga&&vt(this.Ga,t)},t})(),xt=(function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return a(n,t),n.prototype.set=function(t){this.U!==t&&(this.U=t,this.Ha(t))},n})(bt);function Ct(t){return new xt(t)}function It(t){return I(t)?t.get():t}var Ot=Array.prototype.slice;function Mt(){for(var t=arguments,n=Ot.call(t,0,-1),i=n.length,e=t[i],r=Ct(Rt(n,e)),o=0;o<i;)x(n[o++],(function(){var t=Rt(n,e);return r.set(t)}));return r}function Rt(t,n){var i=t.map((function(t){return t.get()}));return n.apply(void 0,i)}function Et(t,n){I(t)?(x(t,n),n(t.get())):s(t)||n(t)}var _t=Math.round;function Pt(t,n,i){var e=t[n];e.x=_t(i.x),e.y=_t(i.y),e.width=_t(i.width-.1),e.height=_t(i.height-.1)}var At=(function(t){function n(n,i,e,r){var o=t.call(this,i,r)||this;o.name=b(),o.type=n,o.x=o.y=o.width=o.height=0;var u=e.binder,a=e.context,s=r.visibility;return u.add(o,'tooltip',r.tooltip),u.add(o,'isDisabled',r.disabled),u.add(o,'isVisible',s,(function(t){return'visible'===t})),Et(s,(function(t){var n=o.skip,e='none'===t;o.skip=e,(n||e)&&(i.recalculate(),a.redraw())})),e.add(o),o}return a(n,t),n.prototype.layout=function(t,n){Pt(t,this.name,n)},n})($);function kt(t){return function(n,i){return new Dt(n,i,t)}}var Dt=(function(t){function n(n,i,e){var r,o=this,u='groupbox',a='content',s=Q(e);if(a in e){o=t.call(this,u,n,i,e)||this,r=e[a];var c=i.binder,h=e.text;c.add(o,'text',h),s|=h?8:0}else o=t.call(this,u,n,i,{})||this,r=e;o.w=4|s;var f=r(o,i);return o.z=f,i.on(d,(function(){4&o.w&&(o.w&=-5,(function(t,n,i){it(t,n,(function(t){return(function(t,n){var i=t[G[n]],e=t.padding,r=e[U[n]],o=e[j[n]];return rt(i,r,o)?i[0]+r[0]+o[0]:null})(i,t)}))})(o.position,o.w,o.z.position))})),o}return a(n,t),n.prototype.parse=function(t){var n=ut(6);return 8&this.w&&(n.top=[15,0]),ct(t,n)},n.prototype.recalculate=function(){this.w|=4,3&this.w&&this.xa.recalculate()},n.prototype.layout=function(n,i){var e=8&this.w?0:4;i.y-=e,i.height+=e,t.prototype.layout.call(this,n,i),i.y+=e,i.height-=e;var r=this.z,o=r.position;(function(t,n,i,e){Y(t,1,n,e),Y(t,0,i,e)})(i,o.width,o.height,o.padding),r.layout(n,i)},n})(At),St=(function(t){function n(n,i,e){var r=t.call(this,'button',n,i,e)||this,o=i.binder;return o.add(r,'text',e.text),o.add(r,'image',e.image),o.add(r,'border',e.border),o.add(r,'isPressed',e.isPressed),r.onClick=e.onClick,r}return a(n,t),n})(At),Tt=(function(t){function n(n,i,e){var r=t.call(this,'checkbox',n,i,e)||this,o=i.binder;return o.add(r,'text',e.text),o.twoway(r,'isChecked','onChange',e.isChecked,e.onChange),r}return a(n,t),n.prototype.layout=function(n,i){i.y+=1,t.prototype.layout.call(this,n,i)},n})(At),zt=(function(t){function n(n,i,e){var r=t.call(this,'dropdown',n,i,e)||this;r.items=[],r.selectedIndex=0;var o,u=e.items,a=e.disabled,s=e.disabledMessage,c=e.onChange,h='empty'===(o=e.autoDisable)?0:'single'===o?1:-1,f=e.selectedIndex,l=function(t){r.C(t,It(u),It(a),h,s)},d=i.binder,p=l;I(u)&&(p=function(t,n){l(t),r.F(t,n),r.A=n}),d.on(r,u,p),d.on(r,f,(function(t,n){r.G=n,l(t)})),d.on(r,a,l);var v=(function(t,n,i){return n?function(e){t.E||(i?i(e,n):n(e))}:n})(r,c,(function(t,n){return n(t<0?0:t)}));return d.callback(r,'onChange',f,v),r}return a(n,t),n.prototype.C=function(t,n,i,e,r){this.E=!0;var o=i||!n||n.length<=e;o&&r?t.items=[r]:(t.items=n,t.selectedIndex=this.G||0),t.isDisabled=o,this.E=!1},n.prototype.F=function(t,n){var i=this.A;if(i){var e=i[t.selectedIndex||0],r=n.indexOf(e);r<0&&(r=0),this.G!==r&&(this.G=r,t.selectedIndex=r)}},n})(At);function Wt(t){return w(t),function(n,i){return new Ft(n,i,t)}}var Ft=(function(t){function n(n,i,e){var r=t.call(this,'spinner',n,i,e)||this;r.V=1,r.W=-2147483648,r.X=2147483647;var o=e.value,u=O(o)?o.twoway:(function(t){if(I(t)){var n=Ct(t.get());return x(t,(function(t){return n.set(t)})),n}return Ct(t)})(o||0),a=e.format||function(t){return t.toString()},s=i.binder,c=e.disabledMessage,h=e.minimum,f=e.maximum;if(c){var l=e.disabled;s.add(r,'text',l,(function(t){return t?c:a(u.get())}));var d=a;a=function(t){return It(l)?c:d(t)}}return r.U=u,s.add(r,'text',u,a),Et(e.step,(function(t){return r.V=t})),Et(h,(function(t){var n=u.get();r.W=t,n<t&&r._(t,t-n)})),Et(f,(function(t){var n=u.get();r.X=t,n>t&&r._(t,t-n)})),r.Y=e.wrapMode||'clamp',r.Z=e.onChange,r.onIncrement=function(){return r.$(1)},r.onDecrement=function(){return r.$(-1)},r.W>r.X&&D('Spinner: minimum '+r.W+' is larger than maximum '+r.X),r}return a(n,t),n.prototype.$=function(t){var n=this.W,i=this.X;if(!(n>=i)){var e,r=this.V*t,o=this.U.get(),u=o+r,a=this.Y;e='wrap'===a||'clampThenWrap'===a&&(u<n&&o===n||u>i&&o===i)?(function(t,n,i){return t<n?t=i:t>i&&(t=n),t})(u,n,i):(function(t,n,i){return t<n?t=n:t>i&&(t=i),t})(u,n,i),this._(e,r)}},n.prototype._=function(t,n){this.U.set(t),this.Z&&this.Z(t,n)},n})(At);function Gt(t){return w(t),function(n,i){return new Ut(n,i,t)}}var Ut=(function(t){function n(n,i,e){var r=t.call(this,'label',n,i,e)||this;r.text='';var o=i.binder;return o.add(r,'text',e.text),o.add(r,'textAlign',e.alignment),r}return a(n,t),n.prototype.layout=function(n,i){i.y+=2,t.prototype.layout.call(this,n,i)},n})(At);

var CHROMA_NS = 'rgbChroma.values';

var OPENRCT2_COLORS = [
    { id: 0, name: '0: Black' },
    { id: 1, name: '1: Grey' },
    { id: 2, name: '2: White' },
    { id: 3, name: '3: Dark Purple' },
    { id: 4, name: '4: Light Purple' },
    { id: 5, name: '5: Bright Purple' },
    { id: 6, name: '6: Dark Blue' },
    { id: 7, name: '7: Light Blue' },
    { id: 8, name: '8: Icy Blue' },
    { id: 9, name: '9: Teal' },
    { id: 10, name: '10: Aquamarine' },
    { id: 11, name: '11: Intense Green' },
    { id: 12, name: '12: Dark Green' },
    { id: 13, name: '13: Moss Green' },
    { id: 14, name: '14: Olive Green' },
    { id: 15, name: '15: Amber' },
    { id: 16, name: '16: Light Orange' },
    { id: 17, name: '17: Bright Red' },
    { id: 18, name: '18: Dark Red' },
    { id: 19, name: '19: Bright Pink' },
    { id: 20, name: '20: Deep Pink' },
    { id: 21, name: '21: Dark Pink' },
    { id: 22, name: '22: Lavender' },
    { id: 23, name: '23: Burgundy' },
    { id: 24, name: '24: Light Peach' },
    { id: 25, name: '25: Yellow' },
    { id: 26, name: '26: Olive' },
    { id: 27, name: '27: Bronze' },
    { id: 28, name: '28: Pastel Green' },
    { id: 29, name: '29: Coral' },
    { id: 30, name: '30: Light Coral' },
    { id: 31, name: '31: Light Indigo' }
];

// 32-Step Smooth Serpentine "Breathing RGB" Spectrum (Exact OpenRCT2 Native Palette Grid Mapping)
var BREATHING_PALETTE = [
    // 1. Column 1 (Reds) - Down
    27, // Row 0: saturatedRed
    71, // Row 1: ruby
    28, // Row 2: brightRed
    31, // Row 3: lightPink

    // 2. Column 2 (Oranges) - Up
    49, // Row 3: pastelOrange
    20, // Row 2: lightOrange
    57, // Row 1: amber
    21, // Row 0: darkOrange

    // 3. Column 3 (Yellows) - Down
    19, // Row 0: darkYellow
    56, // Row 1: gold
    18, // Row 2: yellow
    17, // Row 3: brightYellow

    // 4. Column 4 (Forest / Olive Greens) - Up
    38, // Row 3: chartreuse
    13, // Row 2: mossGreen
    62, // Row 1: cactus
    37, // Row 0: forestGreen

    // 5. Column 5 (Saturated Greens) - Down
    11, // Row 0: saturatedGreen
    67, // Row 1: emerald
    14, // Row 2: brightGreen
    41, // Row 3: limeGreen

    // 6. Column 6 (Teal / Waters) - Up
    10, // Row 3: lightWater
    9,  // Row 2: darkWater
    66, // Row 1: darkerWater
    50, // Row 0: deepWater

    // 7. Column 7 (Blues) - Down
    72, // Row 0: deepBlue
    6,  // Row 1: darkBlue
    7,  // Row 2: lightBlue
    8,  // Row 3: icyBlue

    // 8. Column 8 (Purples / Violets) - Up
    48, // Row 3: lavender
    5,  // Row 2: brightPurple
    4,  // Row 1: lightPurple
    3   // Row 0: darkPurple
];

// 9-Step Continuous Vibrant Rainbow Spectrum for Chroma Mode
var RAINBOW_PALETTE = [
    17, // Bright Red
    16, // Light Orange
    25, // Yellow
    11, // Intense Green
    10, // Aquamarine
    7,  // Light Blue
    6,  // Dark Blue
    4,  // Light Purple
    19  // Bright Pink
];

var DEFAULT_CHROMA_STATE = {
    enableChroma: false,
    chromaMode: 0,        // 0 = Breathing RGB, 1 = Classic Rainbow
    chromaSpeed: 1,       // 0 = Slow, 1 = Normal, 2 = Fast
    chromaTarget: 1,      // 0 = Selected Ride Only, 1 = All Park Rides
    targetRideIndex: 0,
    chromaVehicleMode: 0, // 0 = Per Car, 1 = Per Train, 2 = All Same
    chromaVehicles: true,
    chromaTrack: true,
    chromaBalloons: true,
    chromaGuests: true,
    rides: []
};

function getChromaStore() {
    var loaded = null;
    if (typeof context !== 'undefined' && context.getParkStorage) {
        loaded = context.getParkStorage().get(CHROMA_NS, null);
    }
    var merged = {};
    for (var k in DEFAULT_CHROMA_STATE) {
        merged[k] = DEFAULT_CHROMA_STATE[k];
    }
    if (loaded && typeof loaded === 'object') {
        for (var k2 in loaded) {
            merged[k2] = loaded[k2];
        }
    }
    return Ct(merged);
}

var chromaStore = getChromaStore();

function updateChromaState(patch) {
    var cur = chromaStore.get();
    var updated = {};
    for (var k in cur) {
        updated[k] = cur[k];
    }
    for (var p in patch) {
        updated[p] = patch[p];
    }
    chromaStore.set(updated);
    if (typeof context !== 'undefined' && context.getParkStorage) {
        context.getParkStorage().set(CHROMA_NS, {
            enableChroma: updated.enableChroma,
            chromaMode: updated.chromaMode,
            chromaSpeed: updated.chromaSpeed,
            chromaTarget: updated.chromaTarget,
            targetRideIndex: updated.targetRideIndex,
            chromaVehicleMode: updated.chromaVehicleMode,
            chromaVehicles: updated.chromaVehicles,
            chromaTrack: updated.chromaTrack,
            chromaBalloons: updated.chromaBalloons,
            chromaGuests: updated.chromaGuests
        });
    }
}

function getRides() {
    try {
        if (typeof map !== 'undefined' && map.rides) {
            return map.rides.filter(function(r) { return r.classification === 'ride'; });
        }
    } catch (e) {}
    return [];
}

function getStalls() {
    try {
        if (typeof map !== 'undefined' && map.rides) {
            return map.rides.filter(function(r) {
                if (!r || r.classification !== 'stall') return false;
                try {
                    if (r.object && r.object.flags !== undefined) {
                        // (1 << 19) = 524288 is disableColourTab (skip fixed food stalls)
                        if ((r.object.flags & 524288) !== 0) {
                            return false;
                        }
                    }
                } catch (e) {}
                return true;
            });
        }
    } catch (e) {}
    return [];
}

function isFlatRide(ride) {
    try {
        if (ride && ride.object && ride.object.carsPerFlatRide !== undefined) {
            return ride.object.carsPerFlatRide !== 255 && ride.object.carsPerFlatRide > 0;
        }
    } catch (e) {}
    return false;
}

function syncRideList() {
    var rList = getRides();
    updateChromaState({ rides: rList });
}

// Snapshot & Restore for original park colors
var savedSnapshot = null;

function captureParkSnapshot() {
    var snap = { rides: {}, stalls: {}, staff: [] };
    try {
        if (typeof map !== 'undefined' && map.rides) {
            for (var i = 0; i < map.rides.length; i++) {
                var r = map.rides[i];
                if (!r) continue;
                if (r.classification === 'ride') {
                    snap.rides[r.id] = {
                        colourSchemes: r.colourSchemes ? JSON.parse(JSON.stringify(r.colourSchemes)) : [],
                        vehicleColours: r.vehicleColours ? JSON.parse(JSON.stringify(r.vehicleColours)) : []
                    };
                } else if (r.classification === 'stall') {
                    snap.stalls[r.id] = {
                        colourSchemes: r.colourSchemes ? JSON.parse(JSON.stringify(r.colourSchemes)) : [],
                        vehicleColours: r.vehicleColours ? JSON.parse(JSON.stringify(r.vehicleColours)) : []
                    };
                }
            }
        }
        var allStaff = map.getAllEntities('staff');
        for (var s = 0; s < allStaff.length; s++) {
            var stf = allStaff[s];
            if (stf) {
                snap.staff.push({ id: stf.id, colour: stf.colour, tShirtColour: stf.tShirtColour, trousersColour: stf.trousersColour });
            }
        }
    } catch (e) {}
    return snap;
}

function restoreParkSnapshot(snap) {
    if (!snap) return;
    try {
        if (typeof map !== 'undefined' && map.rides) {
            for (var i = 0; i < map.rides.length; i++) {
                var r = map.rides[i];
                if (!r) continue;
                var saved = (r.classification === 'ride') ? snap.rides[r.id] : snap.stalls[r.id];
                if (saved) {
                    if (saved.colourSchemes) {
                        for (var csIdx = 0; csIdx < saved.colourSchemes.length; csIdx++) {
                            var cs = saved.colourSchemes[csIdx];
                            if (cs) {
                                context.executeAction('ridesetappearance', { ride: r.id, type: 0, value: cs.main, index: csIdx }, function() {});
                                context.executeAction('ridesetappearance', { ride: r.id, type: 1, value: cs.additional, index: csIdx }, function() {});
                                context.executeAction('ridesetappearance', { ride: r.id, type: 2, value: cs.supports, index: csIdx }, function() {});
                            }
                        }
                    }
                    if (saved.vehicleColours) {
                        for (var vcIdx = 0; vcIdx < saved.vehicleColours.length; vcIdx++) {
                            var vc = saved.vehicleColours[vcIdx];
                            if (vc) {
                                context.executeAction('ridesetappearance', { ride: r.id, type: 3, value: vc.body, index: vcIdx }, function() {});
                                context.executeAction('ridesetappearance', { ride: r.id, type: 4, value: vc.trim, index: vcIdx }, function() {});
                                context.executeAction('ridesetappearance', { ride: r.id, type: 5, value: vc.tertiary, index: vcIdx }, function() {});
                            }
                        }
                    }
                }
            }
        }
        for (var s = 0; s < snap.staff.length; s++) {
            var savedStf = snap.staff[s];
            var entity = map.getEntity(savedStf.id);
            if (entity && entity.type === 'staff') {
                try { entity.colour = savedStf.colour; } catch (e1) {}
                try { entity.tShirtColour = savedStf.tShirtColour; entity.trousersColour = savedStf.trousersColour; } catch (e2) {}
            }
        }
    } catch (e) {}
}

// ==================== ULTRA HIGH-PERFORMANCE RGB CHROMA ENGINE ====================
var chromaSubscription = null;
var chromaTickCounter = 0;
var chromaStep = 0;
var lastSyncVehicleMode = -1;

function onChromaTick() {
    var st = chromaStore.get();
    if (!st.enableChroma) {
        if (chromaSubscription) {
            chromaSubscription.dispose();
            chromaSubscription = null;
        }
        lastSyncVehicleMode = -1;
        return;
    }

    var isBreathing = (st.chromaMode === 0 || st.chromaMode === undefined);
    var activePalette = isBreathing ? BREATHING_PALETTE : RAINBOW_PALETTE;
    var stepCount = activePalette.length;

    // Timing intervals: Breathing takes ~3.2s per breath cycle at Normal; Classic rotates fast
    var speedIntervals = isBreathing ? [7, 4, 2] : [10, 6, 3];
    var interval = speedIntervals[st.chromaSpeed !== undefined ? st.chromaSpeed : 1] || (isBreathing ? 4 : 6);
    chromaTickCounter++;
    if (chromaTickCounter % interval !== 0) {
        return;
    }

    chromaStep = (chromaStep + 1) % stepCount;

    var allRides = getRides();
    var selRide = null;
    if (st.targetRideIndex >= 0 && st.targetRideIndex < allRides.length) {
        selRide = allRides[st.targetRideIndex];
    } else if (allRides.length > 0) {
        selRide = allRides[0];
    }

    // Classify into track rides and flat rides once per tick
    var trackRides = [];
    var flatRides = [];
    for (var i = 0; i < allRides.length; i++) {
        var rItem = allRides[i];
        if (isFlatRide(rItem)) {
            flatRides.push(rItem);
        } else {
            trackRides.push(rItem);
        }
    }

    // 1. Vehicles (Coasters, Go-Karts, and Flat Rides: Carousel, Enterprise, Ferris Wheel, etc.)
    if (st.chromaVehicles) {
        var vehBaseStep = (chromaStep + 8) % stepCount;
        var ridesForVehicles = (st.chromaTarget === 0) ? (selRide ? [selRide] : []) : allRides;
        var vehMode = (st.chromaVehicleMode !== undefined) ? st.chromaVehicleMode : 0; // 0 = Per Car, 1 = Per Train, 2 = All Same

        // Sync OpenRCT2 vehicleColourScheme mode once when changed (type 6: 2 = Per Car, 1 = Per Train, 0 = All Same)
        var targetScheme = (vehMode === 0) ? 2 : ((vehMode === 1) ? 1 : 0);
        if (lastSyncVehicleMode !== targetScheme) {
            lastSyncVehicleMode = targetScheme;
            for (var sIdx = 0; sIdx < ridesForVehicles.length; sIdx++) {
                var rSync = ridesForVehicles[sIdx];
                if (rSync && !isFlatRide(rSync)) {
                    context.executeAction('ridesetappearance', {
                        ride: rSync.id,
                        type: 6,
                        value: targetScheme,
                        index: 0
                    }, function() {});
                }
            }
        }

        // 1A. Track Rides with moving cars (Direct In-Memory - 0% LAG, 0 GameActions!)
        var targetTrackRides = (st.chromaTarget === 0) ? (selRide && !isFlatRide(selRide) ? [selRide] : []) : trackRides;
        for (var trIdx = 0; trIdx < targetTrackRides.length; trIdx++) {
            var vRide = targetTrackRides[trIdx];
            if (!vRide) continue;

            var rVehOffset = (st.chromaTarget === 0) ? 0 : (trIdx * 3);
            var trainVehicles = vRide.vehicles;
            if (trainVehicles && trainVehicles.length > 0) {
                var isSingleCarRides = (trainVehicles.length > 4);

                for (var tIdx = 0; tIdx < trainVehicles.length; tIdx++) {
                    var currentCarId = trainVehicles[tIdx];
                    var carPos = 0;

                    var trainShift = 0;
                    if (vehMode === 1) {
                        trainShift = tIdx * (isBreathing ? 4 : 5);
                    } else if (vehMode === 0 && isSingleCarRides) {
                        trainShift = tIdx * (isBreathing ? 2 : 3);
                    }

                    while (currentCarId !== null && currentCarId !== undefined) {
                        var car = map.getEntity(currentCarId);
                        if (!car || car.type !== 'car') {
                            break;
                        }

                        var carShift = 0;
                        if (vehMode === 0) {
                            carShift = carPos * 1;
                        }

                        // Notice '- carShift': As vehBaseStep increments, color from Car k pushes backward to Car k+1!
                        var cStep = (vehBaseStep + rVehOffset + trainShift - carShift + stepCount * 100) % stepCount;
                        var cBody = activePalette[cStep];
                        var cTrim = isBreathing ? activePalette[(cStep + 1) % stepCount] : activePalette[(cStep + 2) % stepCount];
                        var cTert = isBreathing ? activePalette[(cStep + stepCount - 1) % stepCount] : activePalette[(cStep + 4) % stepCount];

                        // DIRECT MEMORY SET - 100% Zero-Lag for moving trains!
                        car.colours = { body: cBody, trim: cTrim, tertiary: cTert };

                        currentCarId = car.nextCarOnTrain;
                        carPos++;
                    }
                }
            }
        }

        // 1B. Flat Rides & Tower Rides (Carousel, Enterprise, Ferris Wheel, Top Spin, Launched Freefall, etc.)
        var targetFlatRides = (st.chromaTarget === 0) ? (selRide && isFlatRide(selRide) ? [selRide] : []) : flatRides;
        for (var fIdx = 0; fIdx < targetFlatRides.length; fIdx++) {
            var fRide = targetFlatRides[fIdx];
            if (!fRide) continue;

            var fStep = (vehBaseStep + fIdx * 3) % stepCount;
            var fBody = activePalette[fStep];
            var fTrim = isBreathing ? activePalette[(fStep + 1) % stepCount] : activePalette[(fStep + 2) % stepCount];
            var fTert = isBreathing ? activePalette[(fStep + stepCount - 1) % stepCount] : activePalette[(fStep + 4) % stepCount];

            context.executeAction('ridesetappearance', { ride: fRide.id, type: 3, value: fBody, index: 0 }, function() {});
            context.executeAction('ridesetappearance', { ride: fRide.id, type: 4, value: fTrim, index: 0 }, function() {});
            context.executeAction('ridesetappearance', { ride: fRide.id, type: 5, value: fTert, index: 0 }, function() {});

            // Direct in-memory car entity update for flat/tower rides that have car entities
            if (fRide.vehicles && fRide.vehicles.length > 0) {
                for (var vIdx = 0; vIdx < fRide.vehicles.length; vIdx++) {
                    var fCar = map.getEntity(fRide.vehicles[vIdx]);
                    if (fCar && fCar.type === 'car') {
                        fCar.colours = { body: fBody, trim: fTrim, tertiary: fTert };
                    }
                }
            }
        }
    }

    // 2. Guests & Staff (Direct In-Memory, executed every 2 intervals to maintain 60 FPS)
    if (st.chromaGuests || st.chromaBalloons) {
        if (chromaTickCounter % (interval * 2) === 0) {
            try {
                var guests = map.getAllEntities('guest');
                for (var gIdx = 0; gIdx < guests.length; gIdx++) {
                    var g = guests[gIdx];
                    var offset = (g.id || gIdx);
                    if (isBreathing) {
                        var gPhase = (offset % 4);
                        if (st.chromaGuests) {
                            g.tshirtColour = activePalette[(chromaStep + gPhase) % stepCount];
                            g.hatColour = activePalette[(chromaStep + gPhase + 1) % stepCount];
                        }
                        if (st.chromaBalloons) {
                            g.balloonColour = activePalette[(chromaStep + gPhase + 2) % stepCount];
                            g.umbrellaColour = activePalette[(chromaStep + gPhase) % stepCount];
                        }
                    } else {
                        var gPhaseClassic = (offset % stepCount);
                        if (st.chromaGuests) {
                            g.tshirtColour = activePalette[(chromaStep + gPhaseClassic) % stepCount];
                            g.hatColour = activePalette[(chromaStep + gPhaseClassic + 4) % stepCount];
                        }
                        if (st.chromaBalloons) {
                            g.balloonColour = activePalette[(chromaStep + gPhaseClassic + 2) % stepCount];
                            g.umbrellaColour = activePalette[(chromaStep + gPhaseClassic + 6) % stepCount];
                        }
                    }
                }
            } catch (e) {}

            // Staff (Handyman, Mechanic, Security) Uniform RGB Cycle
            if (st.chromaGuests) {
                try {
                    var staffMembers = map.getAllEntities('staff');
                    for (var smIdx = 0; smIdx < staffMembers.length; smIdx++) {
                        var staff = staffMembers[smIdx];
                        if (!staff) continue;
                        var sTypeOffset = (staff.staffType === 'handyman') ? 0
                            : ((staff.staffType === 'mechanic') ? (isBreathing ? 2 : 3)
                            : ((staff.staffType === 'security') ? (isBreathing ? 4 : 5) : 0));
                        var staffCol = activePalette[(chromaStep + sTypeOffset) % stepCount];
                        try { staff.colour = staffCol; } catch (e1) {}
                        try { staff.tShirtColour = staffCol; staff.trousersColour = staffCol; } catch (e2) {}
                    }

                    // Synchronize park-wide staff uniform presets
                    var hCol = activePalette[chromaStep % stepCount];
                    var mCol = activePalette[(chromaStep + (isBreathing ? 2 : 3)) % stepCount];
                    var secCol = activePalette[(chromaStep + (isBreathing ? 4 : 5)) % stepCount];
                    context.executeAction('staffsetcolour', { staffType: 0, colour: hCol }, function() {});
                    context.executeAction('staffsetcolour', { staffType: 1, colour: mCol }, function() {});
                    context.executeAction('staffsetcolour', { staffType: 2, colour: secCol }, function() {});
                } catch (e) {}
            }
        }
    }

    // 3. Tracks & Ride Structures (Coasters, Towers, and Flat Ride Frames shifting forward simultaneously at full speed!)
    if (st.chromaTrack && allRides.length > 0) {
        var ridesToProcess = (st.chromaTarget === 0)
            ? (selRide ? [selRide] : [])
            : allRides;

        for (var rIdx = 0; rIdx < ridesToProcess.length; rIdx++) {
            var ride = ridesToProcess[rIdx];
            if (!ride) continue;

            var rBasePhase = (st.chromaTarget === 0) ? 0 : (isBreathing ? (rIdx % 4) : (rIdx % stepCount));
            var rideBaseStep = (chromaStep + rBasePhase) % stepCount;

            // Update all 4 Schemes (0: Main, 1: Alt 1, 2: Alt 2, 3: Alt 3)
            for (var sIdx = 0; sIdx < 4; sIdx++) {
                var sStep = (rideBaseStep + sIdx) % stepCount;
                var sSpine, sRails, sSupports;

                if (isBreathing) {
                    sSpine     = activePalette[sStep];
                    sRails     = activePalette[(sStep + 1) % stepCount];
                    sSupports  = activePalette[(sStep + stepCount - 1) % stepCount];
                } else {
                    sSpine     = activePalette[sStep];
                    sRails     = activePalette[(sStep + 2) % stepCount];
                    sSupports  = activePalette[(sStep + 4) % stepCount];
                }

                // Dispatch ridesetappearance for all 3 color types (Spine/Lattice/Frame=0, Rails/Stripes=1, Supports/Foundation=2)
                context.executeAction('ridesetappearance', { ride: ride.id, type: 0, value: sSpine, index: sIdx }, function() {});
                context.executeAction('ridesetappearance', { ride: ride.id, type: 1, value: sRails, index: sIdx }, function() {});
                context.executeAction('ridesetappearance', { ride: ride.id, type: 2, value: sSupports, index: sIdx }, function() {});
            }
        }
    }

    // 4. Stalls & Shops (Balloon Stalls, Souvenir Stalls, Hat Stalls, T-Shirt Stalls, Info Kiosks, etc.)
    if (st.chromaBalloons) {
        var stalls = getStalls();
        for (var stIdx = 0; stIdx < stalls.length; stIdx++) {
            var stall = stalls[stIdx];
            if (!stall) continue;

            var sObj = stall.object;
            var sItem = sObj ? sObj.shopItem : -1;
            var sItem2 = sObj ? sObj.shopItemSecondary : -1;

            var itemPhase = 0;
            if (sItem === 0 || sItem2 === 0) {
                // Balloon: synchronized with guest balloon phase
                itemPhase = isBreathing ? 2 : 2;
            } else if (sItem === 4 || sItem2 === 4) {
                // Umbrella: synchronized with guest umbrella phase
                itemPhase = isBreathing ? 0 : 6;
            } else if (sItem === 18 || sItem2 === 18) {
                // Hat: synchronized with guest hat phase
                itemPhase = isBreathing ? 1 : 4;
            } else if (sItem === 20 || sItem2 === 20) {
                // T-shirt: synchronized with guest t-shirt phase
                itemPhase = 0;
            } else {
                itemPhase = (stIdx * 3) % stepCount;
            }

            var stallStep = (chromaStep + itemPhase) % stepCount;
            var stallMain = activePalette[stallStep];
            var stallAdd  = isBreathing ? activePalette[(stallStep + 1) % stepCount] : activePalette[(stallStep + 2) % stepCount];
            var stallSup  = isBreathing ? activePalette[(stallStep + stepCount - 1) % stepCount] : activePalette[(stallStep + 4) % stepCount];

            // Type 0: Main item/merchandise colour (changes balloons on stall, umbrellas, hats, t-shirts!)
            context.executeAction('ridesetappearance', { ride: stall.id, type: 0, value: stallMain, index: 0 }, function() {});
            // Type 1: Additional / stall awning & counter trim
            context.executeAction('ridesetappearance', { ride: stall.id, type: 1, value: stallAdd, index: 0 }, function() {});
            // Type 2: Supports / foundation
            context.executeAction('ridesetappearance', { ride: stall.id, type: 2, value: stallSup, index: 0 }, function() {});
            // Type 3: Vehicle body / structure
            context.executeAction('ridesetappearance', { ride: stall.id, type: 3, value: stallMain, index: 0 }, function() {});
            // Type 4: Vehicle trim
            context.executeAction('ridesetappearance', { ride: stall.id, type: 4, value: stallAdd, index: 0 }, function() {});
        }
    }
}

function startChroma() {
    if (!savedSnapshot) {
        savedSnapshot = captureParkSnapshot();
    }
    updateChromaState({ enableChroma: true });
    if (!chromaSubscription && typeof context !== 'undefined' && context.subscribe) {
        chromaSubscription = context.subscribe('interval.tick', onChromaTick);
    }
}

function stopChroma(restore) {
    if (chromaSubscription) {
        chromaSubscription.dispose();
        chromaSubscription = null;
    }
    updateChromaState({ enableChroma: false });
    if (restore) {
        if (savedSnapshot) {
            restoreParkSnapshot(savedSnapshot);
            savedSnapshot = null;
        }
    }
}

function updateChromaHook() {
    var st = chromaStore.get();
    if (st.enableChroma) {
        startChroma();
    } else {
        stopChroma(false);
    }
}

// ==================== DEDICATED STANDALONE CHROMA WINDOW ====================
var chromaWindow = (function(wConfig) {
    return s(wConfig.padding) && (wConfig.padding = 5), new mt(wConfig);
})({
    title: 'RGB Chroma (v1.0.0)',
    width: { value: 320, min: 320, max: 320 },
    height: { value: 315, min: 315, max: 315 },
    onOpen: syncRideList,
    content: [
        kt({
            text: 'Rainbow RGB Chroma FX',
            content: ft({
                content: [
                    (function(c) { return w(c), function(n, i) { return new Tt(n, i, c); }; })({
                        text: 'Enable Real-Time Rainbow RGB Cycle',
                        isChecked: Mt(chromaStore, function(st) { return st.enableChroma; }),
                        onChange: function(val) {
                            if (val) {
                                startChroma();
                            } else {
                                stopChroma(false);
                            }
                        }
                    }),
                    ht({
                        content: [
                            Gt({ text: 'FX Mode:', width: '30%' }),
                            (function(c) { return w(c), function(n, i) { return new zt(n, i, c); }; })({
                                items: ['Breathing RGB (Snake Wave)', 'Classic Rainbow Spectrum'],
                                width: '70%',
                                selectedIndex: Mt(chromaStore, function(st) { return st.chromaMode !== undefined ? st.chromaMode : 0; }),
                                onChange: function(idx) { updateChromaState({ chromaMode: idx }); }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            Gt({ text: 'Target:', width: '30%' }),
                            (function(c) { return w(c), function(n, i) { return new zt(n, i, c); }; })({
                                items: ['Selected Ride Only', 'All Park Rides'],
                                width: '70%',
                                selectedIndex: Mt(chromaStore, function(st) { return st.chromaTarget; }),
                                onChange: function(idx) {
                                    updateChromaState({ chromaTarget: idx });
                                    lastSyncVehicleMode = -1;
                                }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            Gt({ text: 'Ride:', width: '30%' }),
                            (function(c) { return w(c), function(n, i) { return new zt(n, i, c); }; })({
                                items: Mt(chromaStore, function(st) {
                                    var rList = (st.rides && st.rides.length > 0) ? st.rides : getRides();
                                    return rList.map(function(r) { return r.name; });
                                }),
                                width: '70%',
                                selectedIndex: Mt(chromaStore, function(st) { return st.targetRideIndex; }),
                                disabled: Mt(chromaStore, function(st) { return st.chromaTarget === 1; }),
                                onChange: function(idx) {
                                    updateChromaState({ targetRideIndex: idx });
                                    lastSyncVehicleMode = -1;
                                }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            Gt({ text: 'Vehicle Style:', width: '35%' }),
                            (function(c) { return w(c), function(n, i) { return new zt(n, i, c); }; })({
                                items: [
                                    'Per Car (Rainbow Cars)',
                                    'Per Train (Distinct Trains)',
                                    'All Same (Synchronized)'
                                ],
                                width: '65%',
                                selectedIndex: Mt(chromaStore, function(st) { return st.chromaVehicleMode !== undefined ? st.chromaVehicleMode : 0; }),
                                disabled: Mt(chromaStore, function(st) { return !st.chromaVehicles; }),
                                onChange: function(idx) {
                                    updateChromaState({ chromaVehicleMode: idx });
                                    lastSyncVehicleMode = -1;
                                    var targetRides = (chromaStore.get().chromaTarget === 0)
                                        ? [getRides()[chromaStore.get().targetRideIndex || 0]]
                                        : getRides();
                                    var targetScheme = (idx === 0) ? 2 : ((idx === 1) ? 1 : 0);
                                    for (var i = 0; i < targetRides.length; i++) {
                                        var r = targetRides[i];
                                        if (r && !isFlatRide(r)) {
                                            context.executeAction('ridesetappearance', {
                                                ride: r.id,
                                                type: 6,
                                                value: targetScheme,
                                                index: 0
                                            }, function() {});
                                        }
                                    }
                                }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            (function(c) { return w(c), function(n, i) { return new Tt(n, i, c); }; })({
                                text: 'Vehicles (Cars & Flat)',
                                width: '50%',
                                isChecked: chromaStore.get().chromaVehicles,
                                onChange: function(val) { updateChromaState({ chromaVehicles: val }); }
                            }),
                            (function(c) { return w(c), function(n, i) { return new Tt(n, i, c); }; })({
                                text: 'Tracks (Wave)',
                                width: '50%',
                                isChecked: chromaStore.get().chromaTrack,
                                onChange: function(val) { updateChromaState({ chromaTrack: val }); }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            (function(c) { return w(c), function(n, i) { return new Tt(n, i, c); }; })({
                                text: 'Balloons & Shops',
                                width: '50%',
                                isChecked: chromaStore.get().chromaBalloons,
                                onChange: function(val) { updateChromaState({ chromaBalloons: val }); }
                            }),
                            (function(c) { return w(c), function(n, i) { return new Tt(n, i, c); }; })({
                                text: 'Guests & Staff Clothes',
                                width: '50%',
                                isChecked: chromaStore.get().chromaGuests,
                                onChange: function(val) { updateChromaState({ chromaGuests: val }); }
                            })
                        ]
                    }),
                    ht({
                        content: [
                            Gt({ text: 'Speed:', width: '30%' }),
                            (function(c) { return w(c), function(n, i) { return new zt(n, i, c); }; })({
                                items: ['Slow (Chill Wave)', 'Normal (Classic Chroma)', 'Fast (Hyper Gamer RGB)'],
                                width: '70%',
                                selectedIndex: Mt(chromaStore, function(st) { return st.chromaSpeed; }),
                                onChange: function(idx) { updateChromaState({ chromaSpeed: idx }); }
                            })
                        ]
                    }),
                    (function(c) { return function(n, i) { return new St(n, i, c); }; })({
                        text: 'Stop RGB & Restore Colors',
                        height: '24px',
                        onClick: function() {
                            stopChroma(true);
                        }
                    }),
                    (function(c) { return function(n, i) { return new St(n, i, c); }; })({
                        text: Mt(chromaStore, function(st) {
                            return st.enableChroma ? 'Stop RGB (Keep Colors)' : 'Restart RGB';
                        }),
                        height: '24px',
                        onClick: function() {
                            var curActive = chromaStore.get().enableChroma;
                            if (curActive) {
                                stopChroma(false);
                            } else {
                                startChroma();
                            }
                        }
                    })
                ]
            })
        })
    ]
});

registerPlugin({
    name: 'RGBChroma',
    version: '1.0.0',
    authors: ['ReaLFoxy', 'Google Gemini 3.8 Flash (High)'],
    type: 'local',
    licence: 'MIT',
    targetApiVersion: 111,
    main: function() {
        if (typeof ui !== 'undefined') {
            ui.registerMenuItem('RGB Chroma', function() {
                chromaWindow.open();
            });
        }
    }
});
})();
