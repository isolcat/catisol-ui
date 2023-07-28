function mo(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let s = 0; s < o.length; s++)
    n[o[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function _t(e) {
  if (y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = L(o) ? vo(o) : _t(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (L(e))
      return e;
    if (R(e))
      return e;
  }
}
const go = /;(?![^(]*\))/g, _o = /:(.+)/;
function vo(e) {
  const t = {};
  return e.split(go).forEach((n) => {
    if (n) {
      const o = n.split(_o);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function vt(e) {
  let t = "";
  if (L(e))
    t = e;
  else if (y(e))
    for (let n = 0; n < e.length; n++) {
      const o = vt(e[n]);
      o && (t += o + " ");
    }
  else if (R(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const A = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Eo = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Et = () => {
}, bo = () => !1, yo = /^on[^a-z]/, wo = (e) => yo.test(e), F = Object.assign, No = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Co = Object.prototype.hasOwnProperty, N = (e, t) => Co.call(e, t), y = Array.isArray, ve = (e) => Ye(e) === "[object Map]", So = (e) => Ye(e) === "[object Set]", V = (e) => typeof e == "function", L = (e) => typeof e == "string", bt = (e) => typeof e == "symbol", R = (e) => e !== null && typeof e == "object", xo = (e) => R(e) && V(e.then) && V(e.catch), Oo = Object.prototype.toString, Ye = (e) => Oo.call(e), Nn = (e) => Ye(e).slice(8, -1), Vo = (e) => Ye(e) === "[object Object]", yt = (e) => L(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, $o = /-(\w)/g, Ue = wt((e) => e.replace($o, (t, n) => n ? n.toUpperCase() : "")), $e = wt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Do = wt((e) => e ? `on${$e(e)}` : ""), De = (e, t) => !Object.is(e, t), To = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Io = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ht;
const Ro = () => Ht || (Ht = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function kt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ao;
function Fo(e, t = Ao) {
  t && t.active && t.effects.push(e);
}
const Te = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Cn = (e) => (e.w & ne) > 0, Sn = (e) => (e.n & ne) > 0, Po = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ne;
}, Mo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      Cn(s) && !Sn(s) ? s.delete(e) : t[n++] = s, s.w &= ~ne, s.n &= ~ne;
    }
    t.length = n;
  }
}, ot = /* @__PURE__ */ new WeakMap();
let Ne = 0, ne = 1;
const st = 30;
let T;
const ae = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), rt = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class xn {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Fo(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = T, n = te;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = T, T = this, te = !0, ne = 1 << ++Ne, Ne <= st ? Po(this) : jt(this), this.fn();
    } finally {
      Ne <= st && Mo(this), ne = 1 << --Ne, T = this.parent, te = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    T === this ? this.deferStop = !0 : this.active && (jt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function jt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let te = !0;
const On = [];
function Nt() {
  On.push(te), te = !1;
}
function Ct() {
  const e = On.pop();
  te = e === void 0 ? !0 : e;
}
function M(e, t, n) {
  if (te && T) {
    let o = ot.get(e);
    o || ot.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || o.set(n, s = Te());
    const r = process.env.NODE_ENV !== "production" ? { effect: T, target: e, type: t, key: n } : void 0;
    it(s, r);
  }
}
function it(e, t) {
  let n = !1;
  Ne <= st ? Sn(e) || (e.n |= ne, n = !Cn(e)) : n = !e.has(T), n && (e.add(T), T.deps.push(e), process.env.NODE_ENV !== "production" && T.onTrack && T.onTrack(Object.assign({ effect: T }, t)));
}
function oe(e, t, n, o, s, r) {
  const i = ot.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && y(e))
    i.forEach((f, d) => {
      (d === "length" || d >= o) && c.push(f);
    });
  else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        y(e) ? yt(n) && c.push(i.get("length")) : (c.push(i.get(ae)), ve(e) && c.push(i.get(rt)));
        break;
      case "delete":
        y(e) || (c.push(i.get(ae)), ve(e) && c.push(i.get(rt)));
        break;
      case "set":
        ve(e) && c.push(i.get(ae));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: s, oldTarget: r } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? ge(c[0], a) : ge(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? ge(Te(f), a) : ge(Te(f));
  }
}
function ge(e, t) {
  const n = y(e) ? e : [...e];
  for (const o of n)
    o.computed && Kt(o, t);
  for (const o of n)
    o.computed || Kt(o, t);
}
function Kt(e, t) {
  (e !== T || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(F({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Bo = /* @__PURE__ */ mo("__proto__,__v_isRef,__isVue"), Vn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(bt)
), zo = /* @__PURE__ */ St(), Lo = /* @__PURE__ */ St(!0), Ho = /* @__PURE__ */ St(!0, !0), Ut = /* @__PURE__ */ ko();
function ko() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = _(this);
      for (let r = 0, i = this.length; r < i; r++)
        M(o, "get", r + "");
      const s = o[t](...n);
      return s === -1 || s === !1 ? o[t](...n.map(_)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Nt();
      const o = _(this)[t].apply(this, n);
      return Ct(), o;
    };
  }), e;
}
function St(e = !1, t = !1) {
  return function(o, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? Rn : In : t ? ss : Tn).get(o))
      return o;
    const i = y(o);
    if (!e && i && N(Ut, s))
      return Reflect.get(Ut, s, r);
    const c = Reflect.get(o, s, r);
    return (bt(s) ? Vn.has(s) : Bo(s)) || (e || M(o, "get", s), t) ? c : I(c) ? i && yt(s) ? c : c.value : R(c) ? e ? Fn(c) : An(c) : c;
  };
}
const jo = /* @__PURE__ */ Ko();
function Ko(e = !1) {
  return function(n, o, s, r) {
    let i = n[o];
    if (pe(i) && I(i) && !I(s))
      return !1;
    if (!e && !pe(s) && (ct(s) || (s = _(s), i = _(i)), !y(n) && I(i) && !I(s)))
      return i.value = s, !0;
    const c = y(n) && yt(o) ? Number(o) < n.length : N(n, o), a = Reflect.set(n, o, s, r);
    return n === _(r) && (c ? De(s, i) && oe(n, "set", o, s, i) : oe(n, "add", o, s)), a;
  };
}
function Uo(e, t) {
  const n = N(e, t), o = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && oe(e, "delete", t, void 0, o), s;
}
function Wo(e, t) {
  const n = Reflect.has(e, t);
  return (!bt(t) || !Vn.has(t)) && M(e, "has", t), n;
}
function qo(e) {
  return M(e, "iterate", y(e) ? "length" : ae), Reflect.ownKeys(e);
}
const Jo = {
  get: zo,
  set: jo,
  deleteProperty: Uo,
  has: Wo,
  ownKeys: qo
}, $n = {
  get: Lo,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && kt(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && kt(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Go = /* @__PURE__ */ F({}, $n, {
  get: Ho
}), xt = (e) => e, Xe = (e) => Reflect.getPrototypeOf(e);
function Me(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const s = _(e), r = _(t);
  n || (t !== r && M(s, "get", t), M(s, "get", r));
  const { has: i } = Xe(s), c = o ? xt : n ? $t : Ie;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, r))
    return c(e.get(r));
  e !== s && e.get(t);
}
function Be(e, t = !1) {
  const n = this.__v_raw, o = _(n), s = _(e);
  return t || (e !== s && M(o, "has", e), M(o, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ze(e, t = !1) {
  return e = e.__v_raw, !t && M(_(e), "iterate", ae), Reflect.get(e, "size", e);
}
function Wt(e) {
  e = _(e);
  const t = _(this);
  return Xe(t).has.call(t, e) || (t.add(e), oe(t, "add", e, e)), this;
}
function qt(e, t) {
  t = _(t);
  const n = _(this), { has: o, get: s } = Xe(n);
  let r = o.call(n, e);
  r ? process.env.NODE_ENV !== "production" && Dn(n, o, e) : (e = _(e), r = o.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), r ? De(t, i) && oe(n, "set", e, t, i) : oe(n, "add", e, t), this;
}
function Jt(e) {
  const t = _(this), { has: n, get: o } = Xe(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Dn(t, n, e) : (e = _(e), s = n.call(t, e));
  const r = o ? o.call(t, e) : void 0, i = t.delete(e);
  return s && oe(t, "delete", e, void 0, r), i;
}
function Gt() {
  const e = _(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? ve(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && oe(e, "clear", void 0, void 0, n), o;
}
function Le(e, t) {
  return function(o, s) {
    const r = this, i = r.__v_raw, c = _(i), a = t ? xt : e ? $t : Ie;
    return !e && M(c, "iterate", ae), i.forEach((f, d) => o.call(s, a(f), a(d), r));
  };
}
function He(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = _(s), i = ve(r), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = s[e](...o), d = n ? xt : t ? $t : Ie;
    return !t && M(r, "iterate", a ? rt : ae), {
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Y(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${$e(e)} operation ${n}failed: target is readonly.`, _(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Yo() {
  const e = {
    get(r) {
      return Me(this, r);
    },
    get size() {
      return ze(this);
    },
    has: Be,
    add: Wt,
    set: qt,
    delete: Jt,
    clear: Gt,
    forEach: Le(!1, !1)
  }, t = {
    get(r) {
      return Me(this, r, !1, !0);
    },
    get size() {
      return ze(this);
    },
    has: Be,
    add: Wt,
    set: qt,
    delete: Jt,
    clear: Gt,
    forEach: Le(!1, !0)
  }, n = {
    get(r) {
      return Me(this, r, !0);
    },
    get size() {
      return ze(this, !0);
    },
    has(r) {
      return Be.call(this, r, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Le(!0, !1)
  }, o = {
    get(r) {
      return Me(this, r, !0, !0);
    },
    get size() {
      return ze(this, !0);
    },
    has(r) {
      return Be.call(this, r, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Le(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = He(r, !1, !1), n[r] = He(r, !0, !1), t[r] = He(r, !1, !0), o[r] = He(r, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Xo, Zo, Qo, es] = /* @__PURE__ */ Yo();
function Ot(e, t) {
  const n = t ? e ? es : Qo : e ? Zo : Xo;
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(N(n, s) && s in o ? n : o, s, r);
}
const ts = {
  get: /* @__PURE__ */ Ot(!1, !1)
}, ns = {
  get: /* @__PURE__ */ Ot(!0, !1)
}, os = {
  get: /* @__PURE__ */ Ot(!0, !0)
};
function Dn(e, t, n) {
  const o = _(n);
  if (o !== n && t.call(e, o)) {
    const s = Nn(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Tn = /* @__PURE__ */ new WeakMap(), ss = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap();
function rs(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function is(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : rs(Nn(e));
}
function An(e) {
  return pe(e) ? e : Vt(e, !1, Jo, ts, Tn);
}
function Fn(e) {
  return Vt(e, !0, $n, ns, In);
}
function ke(e) {
  return Vt(e, !0, Go, os, Rn);
}
function Vt(e, t, n, o, s) {
  if (!R(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const i = is(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? o : n);
  return s.set(e, c), c;
}
function ue(e) {
  return pe(e) ? ue(e.__v_raw) : !!(e && e.__v_isReactive);
}
function pe(e) {
  return !!(e && e.__v_isReadonly);
}
function ct(e) {
  return !!(e && e.__v_isShallow);
}
function lt(e) {
  return ue(e) || pe(e);
}
function _(e) {
  const t = e && e.__v_raw;
  return t ? _(t) : e;
}
function cs(e) {
  return To(e, "__v_skip", !0), e;
}
const Ie = (e) => R(e) ? An(e) : e, $t = (e) => R(e) ? Fn(e) : e;
function Pn(e) {
  te && T && (e = _(e), process.env.NODE_ENV !== "production" ? it(e.dep || (e.dep = Te()), {
    target: e,
    type: "get",
    key: "value"
  }) : it(e.dep || (e.dep = Te())));
}
function Mn(e, t) {
  e = _(e), e.dep && (process.env.NODE_ENV !== "production" ? ge(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : ge(e.dep));
}
function I(e) {
  return !!(e && e.__v_isRef === !0);
}
function j(e) {
  return ls(e, !1);
}
function ls(e, t) {
  return I(e) ? e : new as(e, t);
}
class as {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : _(t), this._value = n ? t : Ie(t);
  }
  get value() {
    return Pn(this), this._value;
  }
  set value(t) {
    t = this.__v_isShallow ? t : _(t), De(t, this._rawValue) && (this._rawValue = t, this._value = this.__v_isShallow ? t : Ie(t), Mn(this, t));
  }
}
function Bn(e) {
  return I(e) ? e.value : e;
}
const us = {
  get: (e, t, n) => Bn(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return I(s) && !I(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function fs(e) {
  return ue(e) ? e : new Proxy(e, us);
}
class ds {
  constructor(t, n, o, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new xn(t, () => {
      this._dirty || (this._dirty = !0, Mn(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o;
  }
  get value() {
    const t = _(this);
    return Pn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function ps(e, t, n = !1) {
  let o, s;
  const r = V(e);
  r ? (o = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Et) : (o = e.get, s = e.set);
  const i = new ds(o, s, r || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const fe = [];
function hs(e) {
  fe.push(e);
}
function ms() {
  fe.pop();
}
function w(e, ...t) {
  Nt();
  const n = fe.length ? fe[fe.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = gs();
  if (o)
    de(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: r }) => `at <${lo(n, r.type)}>`).join(`
`),
      s
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ..._s(s)), console.warn(...r);
  }
  Ct();
}
function gs() {
  let e = fe[fe.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function _s(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...vs(n));
  }), t;
}
function vs({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${lo(e.component, e.type, o)}`, r = ">" + n;
  return e.props ? [s, ...Es(e.props), r] : [s + r];
}
function Es(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...zn(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function zn(e, t, n) {
  return L(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : I(t) ? (t = zn(e, _(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : V(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = _(t), n ? t : [`${e}=`, t]);
}
const Dt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function de(e, t, n, o) {
  let s;
  try {
    s = o ? e(...o) : e();
  } catch (r) {
    Ln(r, t, n);
  }
  return s;
}
function Re(e, t, n, o) {
  if (V(e)) {
    const r = de(e, t, n, o);
    return r && xo(r) && r.catch((i) => {
      Ln(i, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(Re(e[r], t, n, o));
  return s;
}
function Ln(e, t, n, o = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Dt[n] : n;
    for (; r; ) {
      const f = r.ec;
      if (f) {
        for (let d = 0; d < f.length; d++)
          if (f[d](e, i, c) === !1)
            return;
      }
      r = r.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      de(a, null, 10, [e, i, c]);
      return;
    }
  }
  bs(e, n, s, o);
}
function bs(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Dt[t];
    if (n && hs(n), w(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && ms(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let We = !1, at = !1;
const B = [];
let Q = 0;
const Se = [];
let he = null, ie = 0;
const xe = [];
let J = null, ce = 0;
const Hn = /* @__PURE__ */ Promise.resolve();
let Tt = null, ut = null;
const ys = 100;
function ws(e) {
  const t = Tt || Hn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ns(e) {
  let t = Q + 1, n = B.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Ae(B[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function kn(e) {
  (!B.length || !B.includes(e, We && e.allowRecurse ? Q + 1 : Q)) && e !== ut && (e.id == null ? B.push(e) : B.splice(Ns(e.id), 0, e), jn());
}
function jn() {
  !We && !at && (at = !0, Tt = Hn.then(Wn));
}
function Kn(e, t, n, o) {
  y(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? o + 1 : o)) && n.push(e), jn();
}
function Cs(e) {
  Kn(e, he, Se, ie);
}
function Un(e) {
  Kn(e, J, xe, ce);
}
function It(e, t = null) {
  if (Se.length) {
    for (ut = t, he = [...new Set(Se)], Se.length = 0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ie = 0; ie < he.length; ie++)
      process.env.NODE_ENV !== "production" && Rt(e, he[ie]) || he[ie]();
    he = null, ie = 0, ut = null, It(e, t);
  }
}
function Ss(e) {
  if (It(), xe.length) {
    const t = [...new Set(xe)];
    if (xe.length = 0, J) {
      J.push(...t);
      return;
    }
    for (J = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), J.sort((n, o) => Ae(n) - Ae(o)), ce = 0; ce < J.length; ce++)
      process.env.NODE_ENV !== "production" && Rt(e, J[ce]) || J[ce]();
    J = null, ce = 0;
  }
}
const Ae = (e) => e.id == null ? 1 / 0 : e.id;
function Wn(e) {
  at = !1, We = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), It(e), B.sort((n, o) => Ae(n) - Ae(o));
  const t = process.env.NODE_ENV !== "production" ? (n) => Rt(e, n) : Et;
  try {
    for (Q = 0; Q < B.length; Q++) {
      const n = B[Q];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        de(n, null, 14);
      }
    }
  } finally {
    Q = 0, B.length = 0, Ss(e), We = !1, Tt = null, (B.length || Se.length || xe.length) && Wn(e);
  }
}
function Rt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > ys) {
      const o = t.ownerInstance, s = o && Mt(o.type);
      return w(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const me = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ro().__VUE_HMR_RUNTIME__ = {
  createRecord: Ze(xs),
  rerender: Ze(Os),
  reload: Ze(Vs)
});
const qe = /* @__PURE__ */ new Map();
function xs(e, t) {
  return qe.has(e) ? !1 : (qe.set(e, {
    initialDef: Oe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Oe(e) {
  return ao(e) ? e.__vccOpts : e;
}
function Os(e, t) {
  const n = qe.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Oe(o.type).render = t), o.renderCache = [], o.update();
  }));
}
function Vs(e, t) {
  const n = qe.get(e);
  if (!n)
    return;
  t = Oe(t), Yt(n.initialDef, t);
  const o = [...n.instances];
  for (const s of o) {
    const r = Oe(s.type);
    me.has(r) || (r !== n.initialDef && Yt(r, t), me.add(r)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (me.add(r), s.ceReload(t.styles), me.delete(r)) : s.parent ? (kn(s.parent.update), s.parent.type.__asyncLoader && s.parent.ceReload && s.parent.ceReload(t.styles)) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Un(() => {
    for (const s of o)
      me.delete(Oe(s.type));
  });
}
function Yt(e, t) {
  F(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ze(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let ee = null, $s = null;
const Ds = (e) => e.__isSuspense;
function Ts(e, t) {
  t && t.pendingBranch ? y(e) ? t.effects.push(...e) : t.effects.push(e) : Un(e);
}
const Xt = {};
function qn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !V(t) && w("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Jn(e, t, n);
}
function Jn(e, t, { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: i } = A) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && w('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && w('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (b) => {
    w("Invalid watch source: ", b, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = K;
  let f, d = !1, l = !1;
  if (I(e) ? (f = () => e.value, d = ct(e)) : ue(e) ? (f = () => e, o = !0) : y(e) ? (l = !0, d = e.some((b) => ue(b) || ct(b)), f = () => e.map((b) => {
    if (I(b))
      return b.value;
    if (ue(b))
      return _e(b);
    if (V(b))
      return de(b, a, 2);
    process.env.NODE_ENV !== "production" && c(b);
  })) : V(e) ? t ? f = () => de(e, a, 2) : f = () => {
    if (!(a && a.isUnmounted))
      return u && u(), Re(e, a, 3, [p]);
  } : (f = Et, process.env.NODE_ENV !== "production" && c(e)), t && o) {
    const b = f;
    f = () => _e(b());
  }
  let u, p = (b) => {
    u = C.onStop = () => {
      de(b, a, 4);
    };
  }, h = l ? [] : Xt;
  const g = () => {
    if (!!C.active)
      if (t) {
        const b = C.run();
        (o || d || (l ? b.some((G, U) => De(G, h[U])) : De(b, h))) && (u && u(), Re(t, a, 3, [
          b,
          h === Xt ? void 0 : h,
          p
        ]), h = b);
      } else
        C.run();
  };
  g.allowRecurse = !!t;
  let S;
  s === "sync" ? S = g : s === "post" ? S = () => nn(g, a && a.suspense) : S = () => Cs(g);
  const C = new xn(f, S);
  return process.env.NODE_ENV !== "production" && (C.onTrack = r, C.onTrigger = i), t ? n ? g() : h = C.run() : s === "post" ? nn(C.run.bind(C), a && a.suspense) : C.run(), () => {
    C.stop(), a && a.scope && No(a.scope.effects, C);
  };
}
function Is(e, t, n) {
  const o = this.proxy, s = L(e) ? e.includes(".") ? Rs(o, e) : () => o[e] : e.bind(o, o);
  let r;
  V(t) ? r = t : (r = t.handler, n = t);
  const i = K;
  gt(this);
  const c = Jn(s, r.bind(o), n);
  return i ? gt(i) : co(), c;
}
function Rs(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
function _e(e, t) {
  if (!R(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), I(e))
    _e(e.value, t);
  else if (y(e))
    for (let n = 0; n < e.length; n++)
      _e(e[n], t);
  else if (So(e) || ve(e))
    e.forEach((n) => {
      _e(n, t);
    });
  else if (Vo(e))
    for (const n in e)
      _e(e[n], t);
  return e;
}
function As() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return eo(() => {
    e.isMounted = !0;
  }), Ms(() => {
    e.isUnmounting = !0;
  }), e;
}
const P = [Function, Array], Fs = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: P,
    onEnter: P,
    onAfterEnter: P,
    onEnterCancelled: P,
    onBeforeLeave: P,
    onLeave: P,
    onAfterLeave: P,
    onLeaveCancelled: P,
    onBeforeAppear: P,
    onAppear: P,
    onAfterAppear: P,
    onAppearCancelled: P
  },
  setup(e, { slots: t }) {
    const n = sr(), o = As();
    let s;
    return () => {
      const r = t.default && Xn(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        let g = !1;
        for (const S of r)
          if (S.type !== Ve) {
            if (process.env.NODE_ENV !== "production" && g) {
              w("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = S, g = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const c = _(e), { mode: a } = c;
      if (process.env.NODE_ENV !== "production" && a && a !== "in-out" && a !== "out-in" && a !== "default" && w(`invalid <transition> mode: ${a}`), o.isLeaving)
        return Qe(i);
      const f = Zt(i);
      if (!f)
        return Qe(i);
      const d = ft(f, c, o, n);
      dt(f, d);
      const l = n.subTree, u = l && Zt(l);
      let p = !1;
      const { getTransitionKey: h } = f.type;
      if (h) {
        const g = h();
        s === void 0 ? s = g : g !== s && (s = g, p = !0);
      }
      if (u && u.type !== Ve && (!to(f, u) || p)) {
        const g = ft(u, c, o, n);
        if (dt(u, g), a === "out-in")
          return o.isLeaving = !0, g.afterLeave = () => {
            o.isLeaving = !1, n.update();
          }, Qe(i);
        a === "in-out" && f.type !== Ve && (g.delayLeave = (S, C, b) => {
          const G = Yn(o, u);
          G[String(u.key)] = u, S._leaveCb = () => {
            C(), S._leaveCb = void 0, delete d.delayedLeave;
          }, d.delayedLeave = b;
        });
      }
      return i;
    };
  }
}, Gn = Fs;
function Yn(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function ft(e, t, n, o) {
  const { appear: s, mode: r, persisted: i = !1, onBeforeEnter: c, onEnter: a, onAfterEnter: f, onEnterCancelled: d, onBeforeLeave: l, onLeave: u, onAfterLeave: p, onLeaveCancelled: h, onBeforeAppear: g, onAppear: S, onAfterAppear: C, onAppearCancelled: b } = t, G = String(e.key), U = Yn(n, e), W = (E, x) => {
    E && Re(E, o, 9, x);
  }, Pe = (E, x) => {
    const $ = x[1];
    W(E, x), y(E) ? E.every((k) => k.length <= 1) && $() : E.length <= 1 && $();
  }, be = {
    mode: r,
    persisted: i,
    beforeEnter(E) {
      let x = c;
      if (!n.isMounted)
        if (s)
          x = g || c;
        else
          return;
      E._leaveCb && E._leaveCb(!0);
      const $ = U[G];
      $ && to(e, $) && $.el._leaveCb && $.el._leaveCb(), W(x, [E]);
    },
    enter(E) {
      let x = a, $ = f, k = d;
      if (!n.isMounted)
        if (s)
          x = S || a, $ = C || f, k = b || d;
        else
          return;
      let m = !1;
      const O = E._enterCb = (q) => {
        m || (m = !0, q ? W(k, [E]) : W($, [E]), be.delayedLeave && be.delayedLeave(), E._enterCb = void 0);
      };
      x ? Pe(x, [E, O]) : O();
    },
    leave(E, x) {
      const $ = String(e.key);
      if (E._enterCb && E._enterCb(!0), n.isUnmounting)
        return x();
      W(l, [E]);
      let k = !1;
      const m = E._leaveCb = (O) => {
        k || (k = !0, x(), O ? W(h, [E]) : W(p, [E]), E._leaveCb = void 0, U[$] === e && delete U[$]);
      };
      U[$] = e, u ? Pe(u, [E, m]) : m();
    },
    clone(E) {
      return ft(E, t, n, o);
    }
  };
  return be;
}
function Qe(e) {
  if (Zn(e))
    return e = Ee(e), e.children = null, e;
}
function Zt(e) {
  return Zn(e) ? e.children ? e.children[0] : void 0 : e;
}
function dt(e, t) {
  e.shapeFlag & 6 && e.component ? dt(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Xn(e, t = !1, n) {
  let o = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === At ? (i.patchFlag & 128 && s++, o = o.concat(Xn(i.children, t, c))) : (t || i.type !== Ve) && o.push(c != null ? Ee(i, { key: c }) : i);
  }
  if (s > 1)
    for (let r = 0; r < o.length; r++)
      o[r].patchFlag = -2;
  return o;
}
function H(e) {
  return V(e) ? { setup: e, name: e.name } : e;
}
const Zn = (e) => e.type.__isKeepAlive;
function Ps(e, t, n = K, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Nt(), gt(n);
      const c = Re(t, n, e, i);
      return co(), Ct(), c;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = Do(Dt[e].replace(/ hook$/, ""));
    w(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const Qn = (e) => (t, n = K) => Ps(e, t, n), eo = Qn("m"), Ms = Qn("bum");
function Bs(e, t) {
  return process.env.NODE_ENV !== "production" && w("withDirectives can only be used inside render functions."), e;
}
const pt = "components";
function zs(e, t) {
  return Hs(pt, e, !0, t) || e;
}
const Ls = Symbol();
function Hs(e, t, n = !0, o = !1) {
  const s = K;
  if (s) {
    const r = s.type;
    if (e === pt) {
      const c = Mt(r, !1);
      if (c && (c === t || c === Ue(t) || c === $e(Ue(t))))
        return r;
    }
    const i = Qt(s[e] || r[e], t) || Qt(s.appContext[e], t);
    if (!i && o)
      return r;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === pt ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      w(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && w(`resolve${$e(e.slice(0, -1))} can only be used in render() or setup().`);
}
function Qt(e, t) {
  return e && (e[t] || e[Ue(t)] || e[$e(Ue(t))]);
}
const ht = (e) => e ? rr(e) ? cr(e) || e.proxy : ht(e.parent) : null, Je = /* @__PURE__ */ F(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? ke(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? ke(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? ke(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? ke(e.refs) : e.refs,
  $parent: (e) => ht(e.parent),
  $root: (e) => ht(e.root),
  $emit: (e) => e.emit,
  $options: (e) => Ks(e),
  $forceUpdate: (e) => e.f || (e.f = () => kn(e.update)),
  $nextTick: (e) => e.n || (e.n = ws.bind(e.proxy)),
  $watch: (e) => Is.bind(e)
}), ks = (e) => e === "_" || e === "$", js = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && o !== A && o.__isScriptSetup && N(o, t))
      return o[t];
    let f;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (o !== A && N(o, t))
          return i[t] = 1, o[t];
        if (s !== A && N(s, t))
          return i[t] = 2, s[t];
        if ((f = e.propsOptions[0]) && N(f, t))
          return i[t] = 3, r[t];
        if (n !== A && N(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = Je[t];
    let l, u;
    if (d)
      return t === "$attrs" && (M(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== A && N(n, t))
      return i[t] = 4, n[t];
    if (u = a.config.globalProperties, N(u, t))
      return u[t];
    process.env.NODE_ENV !== "production" && ee && (!L(t) || t.indexOf("__v") !== 0) && (s !== A && ks(t[0]) && N(s, t) ? w(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === ee && w(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return s !== A && N(s, t) ? (s[t] = n, !0) : o !== A && N(o, t) ? (o[t] = n, !0) : N(e.props, t) ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r } }, i) {
    let c;
    return !!n[i] || e !== A && N(e, i) || t !== A && N(t, i) || (c = r[0]) && N(c, i) || N(o, i) || N(Je, i) || N(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (js.ownKeys = (e) => (w("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Ks(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, c = r.get(t);
  let a;
  return c ? a = c : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach((f) => Ge(a, f, i, !0)), Ge(a, t, i)), r.set(t, a), a;
}
function Ge(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Ge(e, r, n, !0), s && s.forEach((i) => Ge(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && w('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Us[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Us = {
  data: en,
  props: le,
  emits: le,
  methods: le,
  computed: le,
  beforeCreate: D,
  created: D,
  beforeMount: D,
  mounted: D,
  beforeUpdate: D,
  updated: D,
  beforeDestroy: D,
  beforeUnmount: D,
  destroyed: D,
  unmounted: D,
  activated: D,
  deactivated: D,
  errorCaptured: D,
  serverPrefetch: D,
  components: le,
  directives: le,
  watch: qs,
  provide: en,
  inject: Ws
};
function en(e, t) {
  return t ? e ? function() {
    return F(V(e) ? e.call(this, this) : e, V(t) ? t.call(this, this) : t);
  } : t : e;
}
function Ws(e, t) {
  return le(tn(e), tn(t));
}
function tn(e) {
  if (y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function D(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function le(e, t) {
  return e ? F(F(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function qs(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = F(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = D(e[o], t[o]);
  return n;
}
function Js() {
  return {
    app: null,
    config: {
      isNativeTag: bo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const nn = Ts, Gs = (e) => e.__isTeleport, At = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Ys = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Ve = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const je = [];
let z = null;
function Xs(e = !1) {
  je.push(z = e ? null : []);
}
function Zs() {
  je.pop(), z = je[je.length - 1] || null;
}
function Qs(e) {
  return e.dynamicChildren = z || Eo, Zs(), z && z.push(e), e;
}
function er(e, t, n, o, s, r) {
  return Qs(so(e, t, n, o, s, r, !0));
}
function mt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function to(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && me.has(t.type) ? !1 : e.type === t.type && e.key === t.key;
}
const tr = (...e) => ro(...e), no = "__vInternal", oo = ({ key: e }) => e != null ? e : null, Ke = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? L(e) || I(e) || V(e) ? { i: ee, r: e, k: t, f: !!n } : e : null;
function so(e, t = null, n = null, o = 0, s = null, r = e === At ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && oo(t),
    ref: t && Ke(t),
    scopeId: $s,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null
  };
  return c ? (Pt(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= L(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && w("VNode created with invalid key (NaN). VNode type:", a.type), !i && z && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && z.push(a), a;
}
const v = process.env.NODE_ENV !== "production" ? tr : ro;
function ro(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === Ls) && (process.env.NODE_ENV !== "production" && !e && w(`Invalid vnode type when creating vnode: ${e}.`), e = Ve), mt(e)) {
    const c = Ee(e, t, !0);
    return n && Pt(c, n), !r && z && (c.shapeFlag & 6 ? z[z.indexOf(e)] = c : z.push(c)), c.patchFlag |= -2, c;
  }
  if (ao(e) && (e = e.__vccOpts), t) {
    t = nr(t);
    let { class: c, style: a } = t;
    c && !L(c) && (t.class = vt(c)), R(a) && (lt(a) && !y(a) && (a = F({}, a)), t.style = _t(a));
  }
  const i = L(e) ? 1 : Ds(e) ? 128 : Gs(e) ? 64 : R(e) ? 4 : V(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && lt(e) && (e = _(e), w("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), so(e, t, n, o, s, i, r, !0);
}
function nr(e) {
  return e ? lt(e) || no in e ? F({}, e) : e : null;
}
function Ee(e, t, n = !1) {
  const { props: o, ref: s, patchFlag: r, children: i } = e, c = t ? or(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && oo(c),
    ref: t && t.ref ? n && s ? y(s) ? s.concat(Ke(t)) : [s, Ke(t)] : Ke(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && r === -1 && y(i) ? i.map(io) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== At ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ee(e.ssContent),
    ssFallback: e.ssFallback && Ee(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function io(e) {
  const t = Ee(e);
  return y(e.children) && (t.children = e.children.map(io)), t;
}
function Ft(e = " ", t = 0) {
  return v(Ys, null, e, t);
}
function Pt(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (y(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Pt(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(no in t) ? t._ctx = ee : s === 3 && ee && (ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    V(t) ? (t = { default: t, _ctx: ee }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Ft(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function or(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = vt([t.class, o.class]));
      else if (s === "style")
        t.style = _t([t.style, o.style]);
      else if (wo(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(y(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else
        s !== "" && (t[s] = o[s]);
  }
  return t;
}
Js();
let K = null;
const sr = () => K || ee, gt = (e) => {
  K = e, e.scope.on();
}, co = () => {
  K && K.scope.off(), K = null;
};
function rr(e) {
  return e.vnode.shapeFlag & 4;
}
let ir = !1;
function cr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(fs(cs(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Je)
          return Je[n](e);
      }
    }));
}
const lr = /(?:^|[-_])(\w)/g, ar = (e) => e.replace(lr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Mt(e, t = !0) {
  return V(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function lo(e, t, n = !1) {
  let o = Mt(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e && e.parent) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return o ? ar(o) : n ? "App" : "Anonymous";
}
function ao(e) {
  return V(e) && "__vccOpts" in e;
}
const on = (e, t) => ps(e, t, ir);
function ur(e, t, n) {
  const o = arguments.length;
  return o === 2 ? R(t) && !y(t) ? mt(t) ? v(e, null, [t]) : v(e, t) : v(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && mt(n) && (n = [n]), v(e, t, n));
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function et(e) {
  return !!(e && e.__v_isShallow);
}
function fr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, s = {
    header(l) {
      return R(l) ? l.__isVue ? ["div", e, "VueInstance"] : I(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : ue(l) ? [
        "div",
        {},
        ["span", e, et(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${pe(l) ? " (readonly)" : ""}`
      ] : pe(l) ? [
        "div",
        {},
        ["span", e, et(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...r(l.$)
        ];
    }
  };
  function r(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", _(l.props))), l.setupState !== A && u.push(i("setup", l.setupState)), l.data !== A && u.push(i("data", _(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const h = a(l, "inject");
    return h && u.push(i("injected", h)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = F({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((p) => [
          "div",
          {},
          ["span", o, p + ": "],
          c(u[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", o, l] : R(l) ? ["object", { object: u ? _(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (V(p))
      return;
    const h = {};
    for (const g in l.ctx)
      f(p, g, u) && (h[g] = l.ctx[g]);
    return h;
  }
  function f(l, u, p) {
    const h = l[p];
    if (y(h) && h.includes(u) || R(h) && u in h || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((g) => f(g, u, p)))
      return !0;
  }
  function d(l) {
    return et(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const X = "transition", ye = "animation", Bt = (e, { slots: t }) => ur(Gn, dr(e), t);
Bt.displayName = "Transition";
const uo = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Bt.props = /* @__PURE__ */ F({}, Gn.props, uo);
const se = (e, t = []) => {
  y(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, sn = (e) => e ? y(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function dr(e) {
  const t = {};
  for (const m in e)
    m in uo || (t[m] = e[m]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: o, duration: s, enterFromClass: r = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: a = r, appearActiveClass: f = i, appearToClass: d = c, leaveFromClass: l = `${n}-leave-from`, leaveActiveClass: u = `${n}-leave-active`, leaveToClass: p = `${n}-leave-to` } = e, h = pr(s), g = h && h[0], S = h && h[1], { onBeforeEnter: C, onEnter: b, onEnterCancelled: G, onLeave: U, onLeaveCancelled: W, onBeforeAppear: Pe = C, onAppear: be = b, onAppearCancelled: E = G } = t, x = (m, O, q) => {
    re(m, O ? d : c), re(m, O ? f : i), q && q();
  }, $ = (m, O) => {
    m._isLeaving = !1, re(m, l), re(m, p), re(m, u), O && O();
  }, k = (m) => (O, q) => {
    const zt = m ? be : b, Lt = () => x(O, m, q);
    se(zt, [O, Lt]), rn(() => {
      re(O, m ? a : r), Z(O, m ? d : c), sn(zt) || cn(O, o, g, Lt);
    });
  };
  return F(t, {
    onBeforeEnter(m) {
      se(C, [m]), Z(m, r), Z(m, i);
    },
    onBeforeAppear(m) {
      se(Pe, [m]), Z(m, a), Z(m, f);
    },
    onEnter: k(!1),
    onAppear: k(!0),
    onLeave(m, O) {
      m._isLeaving = !0;
      const q = () => $(m, O);
      Z(m, l), _r(), Z(m, u), rn(() => {
        !m._isLeaving || (re(m, l), Z(m, p), sn(U) || cn(m, o, S, q));
      }), se(U, [m, q]);
    },
    onEnterCancelled(m) {
      x(m, !1), se(G, [m]);
    },
    onAppearCancelled(m) {
      x(m, !0), se(E, [m]);
    },
    onLeaveCancelled(m) {
      $(m), se(W, [m]);
    }
  });
}
function pr(e) {
  if (e == null)
    return null;
  if (R(e))
    return [tt(e.enter), tt(e.leave)];
  {
    const t = tt(e);
    return [t, t];
  }
}
function tt(e) {
  const t = Io(e);
  return process.env.NODE_ENV !== "production" && hr(t), t;
}
function hr(e) {
  typeof e != "number" ? w(`<transition> explicit duration is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && w("<transition> explicit duration is NaN - the duration expression might be incorrect.");
}
function Z(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function re(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function rn(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let mr = 0;
function cn(e, t, n, o) {
  const s = e._endId = ++mr, r = () => {
    s === e._endId && o();
  };
  if (n)
    return setTimeout(r, n);
  const { type: i, timeout: c, propCount: a } = gr(e, t);
  if (!i)
    return o();
  const f = i + "end";
  let d = 0;
  const l = () => {
    e.removeEventListener(f, u), r();
  }, u = (p) => {
    p.target === e && ++d >= a && l();
  };
  setTimeout(() => {
    d < a && l();
  }, c + 1), e.addEventListener(f, u);
}
function gr(e, t) {
  const n = window.getComputedStyle(e), o = (h) => (n[h] || "").split(", "), s = o(X + "Delay"), r = o(X + "Duration"), i = ln(s, r), c = o(ye + "Delay"), a = o(ye + "Duration"), f = ln(c, a);
  let d = null, l = 0, u = 0;
  t === X ? i > 0 && (d = X, l = i, u = r.length) : t === ye ? f > 0 && (d = ye, l = f, u = a.length) : (l = Math.max(i, f), d = l > 0 ? i > f ? X : ye : null, u = d ? d === X ? r.length : a.length : 0);
  const p = d === X && /\b(transform|all)(,|$)/.test(n[X + "Property"]);
  return {
    type: d,
    timeout: l,
    propCount: u,
    hasTransform: p
  };
}
function ln(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, o) => an(n) + an(e[o])));
}
function an(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function _r() {
  return document.body.offsetHeight;
}
const vr = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : we(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), we(e, !0), o.enter(e)) : o.leave(e, () => {
      we(e, !1);
    }) : we(e, t));
  },
  beforeUnmount(e, { value: t }) {
    we(e, t);
  }
};
function we(e, t) {
  e.style.display = t ? e._vod : "none";
}
function Er() {
  fr();
}
process.env.NODE_ENV !== "production" && Er();
const br = {
  size: {
    type: String,
    default: "medium"
  },
  color: {
    type: String,
    default: "blue"
  },
  round: {
    type: Boolean,
    default: !1
  },
  plain: {
    type: Boolean,
    default: !1
  },
  icon: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  }
}, un = H({
  name: "CButton",
  props: br,
  setup(e, {
    slots: t
  }) {
    const n = {
      small: {
        x: "2",
        y: "1",
        text: "sm"
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base"
      },
      large: {
        x: "4",
        y: "2",
        text: "lg"
      }
    };
    return () => v("button", {
      disabled: e.disabled,
      onClick: () => {
        e.disabled;
      },
      class: `
          py-${n[e.size].y}
          px-${n[e.size].x}
          ${e.round ? "rounded-full" : "rounded-lg"}
          bg-${e.color}-${e.plain ? "100" : "500"}
          hover:bg-${e.color}-400
          border-${e.color}-${e.plain, "500"}
          cursor-pointer
          border-solid
          text-${e.plain ? e.color + "-500" : "white"}
          text-${n[e.size].text}
          hover:text-white
          transition duration-300 ease-in-out transform hover:scale-105
          mx-1
          ${e.disabled ? "cursor-not-allowed opacity-50" : ""}
          `
    }, [e.icon !== "" ? v("i", {
      class: `i-ic-baseline-${e.icon} p-3`
    }, null) : "", t.default ? t.default() : ""]);
  }
}), fn = H({
  name: "CInput",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return () => v("div", {
      class: "op80 text-lg fw300 m1"
    }, [v("input", {
      type: "text",
      placeholder: "Please Input",
      class: "b-rd-1",
      disabled: e.disabled
    }, null)]);
  }
}), yr = {
  type: {
    type: String,
    default: "default"
  },
  color: {
    type: String,
    default: "black"
  },
  plain: {
    type: Boolean,
    default: !0
  },
  href: {
    type: String,
    required: !0
  },
  disabled: {
    type: Boolean,
    default: !1
  }
}, dn = H({
  name: "CLink",
  props: yr,
  setup(e, {
    slots: t
  }) {
    return () => v("a", {
      class: `
        text-${e.plain ? e.color + "-500" : "white"}
        hover:text-${e.color}-400
        cursor-pointer
        text-lg
        ${e.disabled ? "" : "hover:text-white transition duration-300 ease-in-out transform hover:scale-105"}
        mx-1
        decoration-none
        `,
      href: e.href,
      disabled: e.disabled,
      onClick: (n) => {
        e.disabled && n.preventDefault();
      }
    }, [t.default ? t.default() : "Link"]);
  }
}), wr = {
  size: {
    type: String,
    default: "medium"
  },
  color: {
    type: String,
    default: "blue"
  },
  text: {
    type: String,
    default: ""
  }
}, pn = H({
  name: "CTitle",
  props: wr,
  setup(e, {
    slots: t
  }) {
    const n = {
      small: {
        x: "4",
        text: "sm"
      },
      medium: {
        x: "2",
        text: "base"
      },
      large: {
        x: "3",
        text: "lg"
      }
    };
    return () => v("p", {
      class: `
          text-${e.color}-500
          text-${n[e.size].x}xl
          `
    }, [e.text, t.default ? t.default() : ""]);
  }
}), Nr = {
  size: {
    type: String,
    default: "medium"
  },
  text: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  selectableDisabled: {
    type: Boolean,
    default: !1
  }
}, hn = H({
  name: "Checkbox",
  props: Nr,
  setup(e, {
    slots: t
  }) {
    const n = j(!1), o = {
      small: {
        x: "2",
        y: "1",
        text: "sm"
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base"
      },
      large: {
        x: "4",
        y: "2",
        text: "lg"
      }
    };
    return () => v("div", null, [v("input", {
      ref: n,
      type: "checkbox",
      class: `
            ${o[e.size].text}
            ${e.disabled || e.selectableDisabled ? "cursor-not-allowed opacity-50" : ""}
          `,
      style: {
        width: `${o[e.size].x}rem`,
        height: `${o[e.size].y}rem`
      },
      disabled: e.disabled && !e.selectableDisabled,
      onClick: () => {
        e.disabled || (n.value = !n.value);
      }
    }, null), v("label", {
      class: `
            ${o[e.size].text}
            ${e.disabled || e.selectableDisabled ? "cursor-not-allowed opacity-50" : ""}
          `
    }, [e.text, t.default ? t.default() : ""])]);
  }
}), Cr = {
  name: "SFCButton"
}, Sr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
};
function xr(e, t, n, o, s, r) {
  return Xs(), er("button", null, "SFC Button");
}
const mn = /* @__PURE__ */ Sr(Cr, [["render", xr]]), gn = H({
  name: "JSXButton",
  render() {
    return v("button", null, [Ft("JSX Button")]);
  }
}), Or = {
  shape: {
    type: String,
    default: "rounded-full"
  },
  size: {
    type: String,
    default: "medium"
  },
  src: {
    type: String,
    required: !0
  }
}, _n = H({
  name: "CAvatar",
  props: Or,
  setup(e) {
    const t = {
      small: {
        width: "2rem",
        height: "2rem"
      },
      medium: {
        width: "3rem",
        height: "3rem"
      },
      large: {
        width: "4rem",
        height: "4rem"
      }
    };
    return () => v("div", null, [v("img", {
      src: e.src,
      class: `avatar ${e.shape} ${e.size}`,
      style: {
        width: t[e.size].width,
        height: t[e.size].height
      }
    }, null)]);
  }
});
const Vr = {
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  checked: {
    type: Boolean,
    default: !1
  }
}, vn = H({
  name: "CSwitch",
  props: Vr,
  setup(e, {
    slots: t
  }) {
    const n = j(e.checked);
    return () => v("div", null, [v("input", {
      type: "checkbox",
      class: `switch ${e.size}
                `,
      disabled: e.disabled,
      checked: n.value,
      onClick: () => {
        n.value = !n.value;
      }
    }, null)]);
  }
});
const $r = {
  disabled: {
    type: Boolean,
    default: !1
  },
  placeholder: {
    type: String,
    default: ""
  },
  maxLength: {
    type: Number,
    default: 1 / 0
  }
}, En = H({
  name: "CTextarea",
  props: $r,
  setup(e, {
    slots: t
  }) {
    const n = j(null), o = j(!1), s = () => {
      o.value = !0;
    }, r = () => {
      o.value = !1;
    }, i = () => {
      const c = n.value;
      let a = c.value;
      a.length > e.maxLength && (a = a.slice(0, e.maxLength), c.value = a);
    };
    return () => v("div", {
      class: "ctextarea"
    }, [v("textarea", {
      ref: n,
      class: {
        "w-full h-32 outline-none bg-gray-200 p-2 rounded-lg text-lg": !0,
        "hover:bg-gray-300": !o.value,
        "focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out": !e.disabled && !o.value,
        "cursor-not-allowed": e.disabled
      },
      style: {
        resize: "vertical"
      },
      disabled: e.disabled,
      placeholder: e.placeholder,
      maxlength: e.maxLength,
      onInput: i,
      onFocus: s,
      onBlur: r
    }, null)]);
  }
});
const bn = H({
  name: "CUpload",
  setup() {
    const e = j(null), t = () => {
      e.value.files[0];
    };
    return () => v("div", {
      class: "upload"
    }, [v("label", {
      for: "my-file",
      class: "upload-label"
    }, [Ft("\u4E0A\u4F20\u6587\u4EF6")]), v("input", {
      id: "my-file",
      type: "file",
      class: "inputFile",
      ref: e,
      style: "display: none;",
      onChange: t
    }, null)]);
  }
}), Dr = {
  modelValue: {
    type: String || Number,
    default: () => ""
  },
  filterOn: {
    type: Boolean,
    default: () => !1
  },
  option: {
    type: Array,
    default: () => []
  }
}, Tr = {
  "update:modelValue": (e) => !!e,
  change: (e) => !!e
};
function fo(e) {
  return typeof e == "function" ? e() : Bn(e);
}
const Fe = typeof window < "u", po = () => {
}, Ir = /* @__PURE__ */ Rr();
function Rr() {
  var e;
  return Fe && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && /* @__PURE__ */ /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function Ce(e) {
  var t;
  const n = fo(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const ho = Fe ? window : void 0;
Fe && window.document;
Fe && window.navigator;
Fe && window.location;
function nt(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = ho) : [t, n, o, s] = e, !t)
    return po;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const r = [], i = () => {
    r.forEach((d) => d()), r.length = 0;
  }, c = (d, l, u, p) => (d.addEventListener(l, u, p), () => d.removeEventListener(l, u, p)), a = qn(
    () => [Ce(t), fo(s)],
    ([d, l]) => {
      i(), d && r.push(
        ...n.flatMap((u) => o.map((p) => c(d, u, p, l)))
      );
    },
    { immediate: !0, flush: "post" }
  );
  return () => {
    a(), i();
  };
}
let yn = !1;
function Ar(e, t, n = {}) {
  const { window: o = ho, ignore: s = [], capture: r = !0, detectIframe: i = !1 } = n;
  if (!o)
    return;
  Ir && !yn && (yn = !0, Array.from(o.document.body.children).forEach((u) => u.addEventListener("click", po)));
  let c = !0;
  const a = (u) => s.some((p) => {
    if (typeof p == "string")
      return Array.from(o.document.querySelectorAll(p)).some((h) => h === u.target || u.composedPath().includes(h));
    {
      const h = Ce(p);
      return h && (u.target === h || u.composedPath().includes(h));
    }
  }), d = [
    nt(o, "click", (u) => {
      const p = Ce(e);
      if (!(!p || p === u.target || u.composedPath().includes(p))) {
        if (u.detail === 0 && (c = !a(u)), !c) {
          c = !0;
          return;
        }
        t(u);
      }
    }, { passive: !0, capture: r }),
    nt(o, "pointerdown", (u) => {
      const p = Ce(e);
      p && (c = !u.composedPath().includes(p) && !a(u));
    }, { passive: !0 }),
    i && nt(o, "blur", (u) => {
      setTimeout(() => {
        var p;
        const h = Ce(e);
        ((p = o.document.activeElement) == null ? void 0 : p.tagName) === "IFRAME" && !(h != null && h.contains(o.document.activeElement)) && t(u);
      }, 0);
    })
  ].filter(Boolean);
  return () => d.forEach((u) => u());
}
const wn = H({
  name: "CSelect",
  props: Dr,
  emits: Tr,
  setup(e, {
    emit: t
  }) {
    const n = j(e.modelValue), o = j([]), s = j(!1), r = j(null), i = j(!1);
    eo(() => {
      Ar(r.value, (h) => {
        const g = h.target.classList;
        !(g != null && g.contains("CSelect__input")) && !g.contains("ik-icon") && !g.contains("CSelect__inner") && (s.value = !1);
      });
    });
    const c = (h) => {
      t("update:modelValue", h), n.value = h, s.value = !1;
    }, a = () => {
      s.value = !0;
    };
    qn(() => e.modelValue, (h) => t("change", h));
    const f = (h) => {
      if (typeof h.target.value == "string" && h.target.value) {
        const g = e.option.filter((S) => S.includes(h.target.value));
        o.value = g || [];
      } else
        o.value = e.option;
    }, d = () => {
      i.value = !0;
    }, l = () => {
      i.value = !1;
    }, u = on(() => o.value.length ? o.value : e.option), p = on(() => ["CSelect__inner", {
      "select--focus": i.value
    }]);
    return () => v("div", {
      class: "CSelect"
    }, [v("div", {
      class: p.value,
      onClick: a
    }, [v("input", {
      placeholder: "\u8BF7\u9009\u62E9",
      class: "CSelect__input",
      value: n.value,
      readonly: !e.filterOn,
      type: "text",
      onInput: f,
      onFocus: d,
      onBlur: l
    }, null), v(zs("ik-icon"), {
      class: "CSelect--clear",
      name: "arrow-right",
      size: 18
    }, null)]), v(Bt, {
      name: "slide-fade__select"
    }, {
      default: () => [Bs(v("div", {
        class: "CSelect--options",
        ref: r
      }, [u.value.map((g, S) => v("div", {
        class: {
          "CSelect--item": !0,
          "CSelect--item__active": g === e.modelValue
        },
        key: S,
        onClick: () => c(g)
      }, [g]))]), [[vr, s.value]])]
    })]);
  }
}), Fr = {
  install(e) {
    e.component(un.name, un), e.component(mn.name, mn), e.component(gn.name, gn), e.component(dn.name, dn), e.component(fn.name, fn), e.component(pn.name, pn), e.component(hn.name, hn), e.component(_n.name, _n), e.component(vn.name, vn), e.component(En.name, En), e.component(bn.name, bn), e.component(wn.name, wn);
  }
};
export {
  _n as Avatar,
  hn as CheckBox,
  fn as Input,
  gn as JSXButton,
  dn as Link,
  un as MyButton,
  mn as SFCButton,
  wn as Select,
  En as Textarea,
  bn as Upload,
  Fr as default
};
