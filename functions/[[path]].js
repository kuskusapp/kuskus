var manifest = {
	"/*404": [
	{
		type: "script",
		href: "/assets/_...404_-6a821d95.js"
	},
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	}
],
	"/auth": [
	{
		type: "script",
		href: "/assets/auth-007a71f7.js"
	},
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	},
	{
		type: "script",
		href: "/assets/Icon-0a2669a9.js"
	},
	{
		type: "script",
		href: "/assets/auth-6cc20653.js"
	}
],
	"/home": [
	{
		type: "script",
		href: "/assets/home-0b6ff198.js"
	},
	{
		type: "script",
		href: "/assets/LandingPage-644b6646.js"
	},
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	},
	{
		type: "script",
		href: "/assets/Icon-0a2669a9.js"
	}
],
	"/": [
	{
		type: "script",
		href: "/assets/index-394cfe03.js"
	},
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	},
	{
		type: "script",
		href: "/assets/auth-6cc20653.js"
	},
	{
		type: "script",
		href: "/assets/Icon-0a2669a9.js"
	},
	{
		type: "script",
		href: "/assets/LandingPage-644b6646.js"
	}
],
	"/login/google": [
	{
		type: "script",
		href: "/assets/google-0c976266.js"
	},
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	},
	{
		type: "script",
		href: "/assets/auth-6cc20653.js"
	}
],
	"entry-client": [
],
	"index.html": [
	{
		type: "script",
		href: "/assets/index-5f28dea9.js"
	},
	{
		type: "style",
		href: "/assets/index-8a40fa25.css"
	}
]
};

const sharedConfig = {};

var I$1=(c=>(c[c.AggregateError=1]="AggregateError",c[c.ArrayPrototypeValues=2]="ArrayPrototypeValues",c[c.ArrowFunction=4]="ArrowFunction",c[c.BigInt=8]="BigInt",c[c.ErrorPrototypeStack=16]="ErrorPrototypeStack",c[c.Map=32]="Map",c[c.MethodShorthand=64]="MethodShorthand",c[c.ObjectAssign=128]="ObjectAssign",c[c.Promise=256]="Promise",c[c.Set=512]="Set",c[c.Symbol=1024]="Symbol",c[c.TypedArray=2048]="TypedArray",c[c.BigIntTypedArray=4096]="BigIntTypedArray",c))(I$1||{});

I$1.AggregateError
| I$1.BigInt
| I$1.BigIntTypedArray;
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function resolveSSRNode(node, top) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let prev = {};
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) {
      if (!top && typeof prev !== "object" && typeof node[i] !== "object") mapped += `<!--!$-->`;
      mapped += resolveSSRNode(prev = node[i]);
    }
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}

const R="$FETCH";function b(t,e,s){const r=e.split("/").filter(Boolean);e:for(const n of t){const o=n.matchSegments;if(r.length<o.length||!n.wildcard&&r.length>o.length)continue;for(let i=0;i<o.length;i++){const u=o[i];if(u&&r[i]!==u)continue e}const c=n[s];if(c==="skip"||c===void 0)return;const a={};for(const{type:i,name:u,index:l}of n.params)i===":"?a[u]=r[l]:a[u]=r.slice(l).join("/");return {handler:c,params:a}}}let H;const C=t=>{H=t;};async function y(t,e,s={},r={}){if(t.startsWith("http"))return await fetch(t,e);let n=new URL(t,"http://internal");const o=new Request(n.href,e),c=b(H,n.pathname,o.method.toUpperCase());if(!c)throw new Error(`No handler found for ${o.method} ${o.url}`);let a=Object.freeze({request:o,params:c.params,clientAddress:"127.0.0.1",env:s,locals:r,$type:R,fetch:y});return await c.handler(a)}const L="x-solidstart-location",N="Location",m="content-type",d="x-solidstart-response-type",h="x-solidstart-content-type",p="x-solidstart-origin",U="application/json",$=new Set([204,301,302,303,307,308]);function A(t){return t&&t instanceof Response&&$.has(t.status)}class D extends Error{status;headers;name="ResponseError";ok;statusText;redirected;url;constructor(e){let s=JSON.stringify({$type:"response",status:e.status,message:e.statusText,headers:[...e.headers.entries()]});super(s),this.status=e.status,this.headers=new Map([...e.headers.entries()]),this.url=e.url,this.ok=e.ok,this.statusText=e.statusText,this.redirected=e.redirected,this.bodyUsed=!1,this.type=e.type,this.response=()=>e;}response;type;clone(){return this.response()}get body(){return this.response().body}bodyUsed;async arrayBuffer(){return await this.response().arrayBuffer()}async blob(){return await this.response().blob()}async formData(){return await this.response().formData()}async text(){return await this.response().text()}async json(){return await this.response().json()}}const J=[{GET:"skip",path:"/*404"},{GET:"skip",path:"/auth"},{GET:"skip",path:"/home"},{GET:"skip",path:"/"},{GET:"skip",path:"/login/google"}];function T(t){let e=/(\/?\:[^\/]+)\?/.exec(t);if(!e)return [t];let s=t.slice(0,e.index),r=t.slice(e.index+e[0].length);const n=[s,s+=e[1]];for(;e=/^(\/\:[^\/]+)\?/.exec(r);)n.push(s+=e[1]),r=r.slice(e[0].length);return T(r).reduce((o,c)=>[...o,...n.map(a=>a+c)],[])}function F(t){const e=t.path.split("/").filter(Boolean),s=[],r=[];let n=0,o=!1;for(const[c,a]of e.entries())if(a[0]===":"){const i=a.slice(1);n+=3,s.push({type:":",name:i,index:c}),r.push(null);}else a[0]==="*"?(n-=1,s.push({type:"*",name:a.slice(1),index:c}),o=!0):(n+=4,r.push(a));return {...t,score:n,params:s,matchSegments:r,wildcard:o}}const O=J.flatMap(t=>T(t.path).map(s=>({...t,path:s}))).map(F).sort((t,e)=>e.score-t.score);C(O);function M(t,e){return b(O,t.pathname,e.toUpperCase())}const B=({forward:t})=>async e=>{let s=M(new URL(e.request.url),e.request.method);if(s){let r=Object.freeze({request:e.request,clientAddress:e.clientAddress,locals:e.locals,params:s.params,env:e.env,$type:R,fetch:y});try{return await s.handler(r)}catch(n){return n instanceof Response?n:new Response(JSON.stringify(n),{status:500})}}return await t(e)};class j extends Error{constructor(e,{status:s,stack:r}={}){super(e),this.name="ServerError",this.status=s||400,r&&(this.stack=r);}}class G extends j{constructor(e,{fieldErrors:s={},form:r,fields:n,stack:o}={}){super(e,{stack:o}),this.formError=e,this.name="FormError",this.fields=n||Object.fromEntries(typeof r<"u"?r.entries():[])||{},this.fieldErrors=s;}}const f=t=>{throw new Error("Should be compiled away")};async function z(t){let e=t.request,s=e.headers.get(m),r=new URL(e.url).pathname,n=[];if(s)if(s===U){let o=await e.text();try{n=JSON.parse(o,(c,a)=>{if(!a)return a;if(a.$type==="headers"){let i=new Headers;return e.headers.forEach((u,l)=>i.set(l,u)),a.values.forEach(([u,l])=>i.set(u,l)),i}return a.$type==="request"?new Request(a.url,{method:a.method,headers:a.headers}):a});}catch{throw new Error(`Error parsing request body: ${o}`)}}else s.includes("form")&&(n=[await e.clone().formData(),t]);return [r,n]}function q(t,e,s){if(e instanceof D&&(e=e.clone()),e instanceof Response)if(A(e)&&t.headers.get(p)==="client"){let r=new Headers(e.headers);return r.set(p,"server"),r.set(L,e.headers.get(N)),r.set(d,s),r.set(h,"response"),new Response(null,{status:204,statusText:"Redirected",headers:r})}else {if(e.status===101)return e;{let r=new Headers(e.headers);return r.set(p,"server"),r.set(d,s),r.set(h,"response"),new Response(e.body,{status:e.status,statusText:e.statusText,headers:r})}}else {if(e instanceof G)return new Response(JSON.stringify({error:{message:e.message,stack:"",formError:e.formError,fields:e.fields,fieldErrors:e.fieldErrors}}),{status:400,headers:{[d]:s,[h]:"form-error"}});if(e instanceof j)return new Response(JSON.stringify({error:{message:e.message,stack:""}}),{status:e.status,headers:{[d]:s,[h]:"server-error"}});if(e instanceof Error)return console.error(e),new Response(JSON.stringify({error:{message:"Internal Server Error",stack:"",status:e.status}}),{status:e.status||500,headers:{[d]:s,[h]:"error"}});if(typeof e=="object"||typeof e=="string"||typeof e=="number"||typeof e=="boolean")return new Response(JSON.stringify(e),{status:200,headers:{[m]:"application/json",[d]:s,[h]:"json"}})}return new Response("null",{status:200,headers:{[m]:"application/json",[h]:"json",[d]:s}})}async function X(t){const e=new URL(t.request.url);if(f.hasHandler(e.pathname))try{let[s,r]=await z(t),n=f.getHandler(s);if(!n)throw {status:404,message:"Handler Not Found for "+s};const o=await n.call(t,...Array.isArray(r)?r:[r]);return q(t.request,o,"return")}catch(s){return q(t.request,s,"throw")}return null}const E=new Map;f.createHandler=(t,e,s)=>{let r=function(...n){let o;return typeof this=="object"?o=this:sharedConfig.context&&sharedConfig.context.requestContext?o=sharedConfig.context.requestContext:o={request:new URL(e,"http://localhost:3000").href,responseHeaders:new Headers},(async()=>{try{return s?t.call(o,n[0],o):t.call(o,...n)}catch(a){if(a instanceof Error&&/[A-Za-z]+ is not defined/.test(a.message)){const i=new Error(a.message+`
 You probably are using a variable defined in a closure in your server function.`);throw i.stack=a.stack,i}throw a}})()};return r.url=e,r.action=function(...n){return r.call(this,...n)},r};f.registerHandler=function(t,e){E.set(t,e);};f.getHandler=function(t){return E.get(t)};f.hasHandler=function(t){return E.has(t)};f.fetch=y;const I=({forward:t})=>async e=>{const s=new URL(e.request.url);if(f.hasHandler(s.pathname)){let n=e.request.headers.get(m),o=e.request.headers.get(p),c;if(n!=null&&n.includes("form")&&!(o!=null&&o.includes("client"))){let[l,w]=e.request.body.tee();c=new Request(e.request.url,{body:w,headers:e.request.headers,method:e.request.method,duplex:"half"}),e.request=new Request(e.request.url,{body:l,headers:e.request.headers,method:e.request.method,duplex:"half"});}let a=Object.freeze({request:e.request,clientAddress:e.clientAddress,locals:e.locals,fetch:y,$type:R,env:e.env});const i=await X(a);let u=i.headers.get(h);if(c&&u!==null&&u.includes("error")){let w=[...(await c.formData()).entries()];return new Response(null,{status:302,headers:{Location:new URL(e.request.headers.get("referer")||"").pathname+"?form="+encodeURIComponent(JSON.stringify({url:s.pathname,entries:w,...await i.json()}))}})}return i}return await t(e)};function W(t,e){return ()=>B({forward:I({async forward(s){{const r=s.env.getStaticHTML;return await r("/index")}}})})}const S=Object.values(Object.assign({}))[0];S&&S.default;const Y=t=>({forward:e})=>t.reduceRight((s,r)=>r({forward:s}),e);function P(...t){const e=Y(t);return async s=>await e({forward:async r=>new Response(null,{status:404})})(s)}ssr("<!DOCTYPE html>");const _=P(W());

const onRequestGet = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return _({
    request: request,
    clientAddress: request.headers.get('cf-connecting-ip'),
    locals: {},
    env
  });
};

const onRequestHead = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return _({
    request: request,
    env
  });
};

async function onRequestPost({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return _({
    request: request,
    env
  });
}

async function onRequestDelete({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return _({
    request: request,
    env
  });
}

async function onRequestPatch({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return _({
    request: request,
    env
  });
}

export { onRequestDelete, onRequestGet, onRequestHead, onRequestPatch, onRequestPost };
