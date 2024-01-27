function go(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let s = 0; s < o.length; s++)
    n[o[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function bt(e) {
  if (w(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = k(o) ? vo(o) : bt(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (k(e))
      return e;
    if (R(e))
      return e;
  }
}
const _o = /;(?![^(]*\))/g, bo = /:(.+)/;
function vo(e) {
  const t = {};
  return e.split(_o).forEach((n) => {
    if (n) {
      const o = n.split(bo);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function vt(e) {
  let t = "";
  if (k(e))
    t = e;
  else if (w(e))
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
}, wo = () => !1, yo = /^on[^a-z]/, No = (e) => yo.test(e), F = Object.assign, Co = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, So = Object.prototype.hasOwnProperty, N = (e, t) => So.call(e, t), w = Array.isArray, be = (e) => Xe(e) === "[object Map]", xo = (e) => Xe(e) === "[object Set]", V = (e) => typeof e == "function", k = (e) => typeof e == "string", wt = (e) => typeof e == "symbol", R = (e) => e !== null && typeof e == "object", Oo = (e) => R(e) && V(e.then) && V(e.catch), Vo = Object.prototype.toString, Xe = (e) => Vo.call(e), Sn = (e) => Xe(e).slice(8, -1), $o = (e) => Xe(e) === "[object Object]", yt = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, To = /-(\w)/g, We = Nt((e) => e.replace(To, (t, n) => n ? n.toUpperCase() : "")), $e = Nt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Do = Nt((e) => e ? `on${$e(e)}` : ""), Te = (e, t) => !Object.is(e, t), Io = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ro = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ht;
const Ao = () => Ht || (Ht = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Fo;
function Po(e, t = Fo) {
  t && t.active && t.effects.push(e);
}
const De = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, xn = (e) => (e.w & ne) > 0, On = (e) => (e.n & ne) > 0, Mo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ne;
}, Bo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      xn(s) && !On(s) ? s.delete(e) : t[n++] = s, s.w &= ~ne, s.n &= ~ne;
    }
    t.length = n;
  }
}, st = /* @__PURE__ */ new WeakMap();
let Ne = 0, ne = 1;
const rt = 30;
let D;
const ae = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), it = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Vn {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Po(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = D, n = te;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = D, D = this, te = !0, ne = 1 << ++Ne, Ne <= rt ? Mo(this) : Kt(this), this.fn();
    } finally {
      Ne <= rt && Bo(this), ne = 1 << --Ne, D = this.parent, te = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    D === this ? this.deferStop = !0 : this.active && (Kt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Kt(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let te = !0;
const $n = [];
function Ct() {
  $n.push(te), te = !1;
}
function St() {
  const e = $n.pop();
  te = e === void 0 ? !0 : e;
}
function M(e, t, n) {
  if (te && D) {
    let o = st.get(e);
    o || st.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || o.set(n, s = De());
    const r = process.env.NODE_ENV !== "production" ? { effect: D, target: e, type: t, key: n } : void 0;
    ct(s, r);
  }
}
function ct(e, t) {
  let n = !1;
  Ne <= rt ? On(e) || (e.n |= ne, n = !xn(e)) : n = !e.has(D), n && (e.add(D), D.deps.push(e), process.env.NODE_ENV !== "production" && D.onTrack && D.onTrack(Object.assign({ effect: D }, t)));
}
function oe(e, t, n, o, s, r) {
  const i = st.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && w(e))
    i.forEach((f, d) => {
      (d === "length" || d >= o) && c.push(f);
    });
  else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        w(e) ? yt(n) && c.push(i.get("length")) : (c.push(i.get(ae)), be(e) && c.push(i.get(it)));
        break;
      case "delete":
        w(e) || (c.push(i.get(ae)), be(e) && c.push(i.get(it)));
        break;
      case "set":
        be(e) && c.push(i.get(ae));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: s, oldTarget: r } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? ge(c[0], a) : ge(c[0]));
  else {
    const f = [];
    for (const d of c)
      d && f.push(...d);
    process.env.NODE_ENV !== "production" ? ge(De(f), a) : ge(De(f));
  }
}
function ge(e, t) {
  const n = w(e) ? e : [...e];
  for (const o of n)
    o.computed && Ut(o, t);
  for (const o of n)
    o.computed || Ut(o, t);
}
function Ut(e, t) {
  (e !== D || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(F({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const zo = /* @__PURE__ */ go("__proto__,__v_isRef,__isVue"), Tn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(wt)
), Lo = /* @__PURE__ */ xt(), ko = /* @__PURE__ */ xt(!0), Ho = /* @__PURE__ */ xt(!0, !0), Wt = /* @__PURE__ */ jo();
function jo() {
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
      Ct();
      const o = _(this)[t].apply(this, n);
      return St(), o;
    };
  }), e;
}
function xt(e = !1, t = !1) {
  return function(o, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? Fn : An : t ? rs : Rn).get(o))
      return o;
    const i = w(o);
    if (!e && i && N(Wt, s))
      return Reflect.get(Wt, s, r);
    const c = Reflect.get(o, s, r);
    return (wt(s) ? Tn.has(s) : zo(s)) || (e || M(o, "get", s), t) ? c : I(c) ? i && yt(s) ? c : c.value : R(c) ? e ? Mn(c) : Pn(c) : c;
  };
}
const Ko = /* @__PURE__ */ Uo();
function Uo(e = !1) {
  return function(n, o, s, r) {
    let i = n[o];
    if (pe(i) && I(i) && !I(s))
      return !1;
    if (!e && !pe(s) && (lt(s) || (s = _(s), i = _(i)), !w(n) && I(i) && !I(s)))
      return i.value = s, !0;
    const c = w(n) && yt(o) ? Number(o) < n.length : N(n, o), a = Reflect.set(n, o, s, r);
    return n === _(r) && (c ? Te(s, i) && oe(n, "set", o, s, i) : oe(n, "add", o, s)), a;
  };
}
function Wo(e, t) {
  const n = N(e, t), o = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && oe(e, "delete", t, void 0, o), s;
}
function qo(e, t) {
  const n = Reflect.has(e, t);
  return (!wt(t) || !Tn.has(t)) && M(e, "has", t), n;
}
function Jo(e) {
  return M(e, "iterate", w(e) ? "length" : ae), Reflect.ownKeys(e);
}
const Go = {
  get: Lo,
  set: Ko,
  deleteProperty: Wo,
  has: qo,
  ownKeys: Jo
}, Dn = {
  get: ko,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && jt(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && jt(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Yo = /* @__PURE__ */ F({}, Dn, {
  get: Ho
}), Ot = (e) => e, Ze = (e) => Reflect.getPrototypeOf(e);
function Me(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const s = _(e), r = _(t);
  n || (t !== r && M(s, "get", t), M(s, "get", r));
  const { has: i } = Ze(s), c = o ? Ot : n ? Tt : Ie;
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
function qt(e) {
  e = _(e);
  const t = _(this);
  return Ze(t).has.call(t, e) || (t.add(e), oe(t, "add", e, e)), this;
}
function Jt(e, t) {
  t = _(t);
  const n = _(this), { has: o, get: s } = Ze(n);
  let r = o.call(n, e);
  r ? process.env.NODE_ENV !== "production" && In(n, o, e) : (e = _(e), r = o.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), r ? Te(t, i) && oe(n, "set", e, t, i) : oe(n, "add", e, t), this;
}
function Gt(e) {
  const t = _(this), { has: n, get: o } = Ze(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && In(t, n, e) : (e = _(e), s = n.call(t, e));
  const r = o ? o.call(t, e) : void 0, i = t.delete(e);
  return s && oe(t, "delete", e, void 0, r), i;
}
function Yt() {
  const e = _(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? be(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && oe(e, "clear", void 0, void 0, n), o;
}
function Le(e, t) {
  return function(o, s) {
    const r = this, i = r.__v_raw, c = _(i), a = t ? Ot : e ? Tt : Ie;
    return !e && M(c, "iterate", ae), i.forEach((f, d) => o.call(s, a(f), a(d), r));
  };
}
function ke(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = _(s), i = be(r), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = s[e](...o), d = n ? Ot : t ? Tt : Ie;
    return !t && M(r, "iterate", a ? it : ae), {
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
function Xo() {
  const e = {
    get(r) {
      return Me(this, r);
    },
    get size() {
      return ze(this);
    },
    has: Be,
    add: qt,
    set: Jt,
    delete: Gt,
    clear: Yt,
    forEach: Le(!1, !1)
  }, t = {
    get(r) {
      return Me(this, r, !1, !0);
    },
    get size() {
      return ze(this);
    },
    has: Be,
    add: qt,
    set: Jt,
    delete: Gt,
    clear: Yt,
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
    e[r] = ke(r, !1, !1), n[r] = ke(r, !0, !1), t[r] = ke(r, !1, !0), o[r] = ke(r, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Zo, Qo, es, ts] = /* @__PURE__ */ Xo();
function Vt(e, t) {
  const n = t ? e ? ts : es : e ? Qo : Zo;
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(N(n, s) && s in o ? n : o, s, r);
}
const ns = {
  get: /* @__PURE__ */ Vt(!1, !1)
}, os = {
  get: /* @__PURE__ */ Vt(!0, !1)
}, ss = {
  get: /* @__PURE__ */ Vt(!0, !0)
};
function In(e, t, n) {
  const o = _(n);
  if (o !== n && t.call(e, o)) {
    const s = Sn(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Rn = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new WeakMap();
function is(e) {
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
function cs(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : is(Sn(e));
}
function Pn(e) {
  return pe(e) ? e : $t(e, !1, Go, ns, Rn);
}
function Mn(e) {
  return $t(e, !0, Dn, os, An);
}
function He(e) {
  return $t(e, !0, Yo, ss, Fn);
}
function $t(e, t, n, o, s) {
  if (!R(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const i = cs(e);
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
function lt(e) {
  return !!(e && e.__v_isShallow);
}
function at(e) {
  return ue(e) || pe(e);
}
function _(e) {
  const t = e && e.__v_raw;
  return t ? _(t) : e;
}
function ls(e) {
  return Io(e, "__v_skip", !0), e;
}
const Ie = (e) => R(e) ? Pn(e) : e, Tt = (e) => R(e) ? Mn(e) : e;
function Bn(e) {
  te && D && (e = _(e), process.env.NODE_ENV !== "production" ? ct(e.dep || (e.dep = De()), {
    target: e,
    type: "get",
    key: "value"
  }) : ct(e.dep || (e.dep = De())));
}
function zn(e, t) {
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
  return as(e, !1);
}
function as(e, t) {
  return I(e) ? e : new us(e, t);
}
class us {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : _(t), this._value = n ? t : Ie(t);
  }
  get value() {
    return Bn(this), this._value;
  }
  set value(t) {
    t = this.__v_isShallow ? t : _(t), Te(t, this._rawValue) && (this._rawValue = t, this._value = this.__v_isShallow ? t : Ie(t), zn(this, t));
  }
}
function Ln(e) {
  return I(e) ? e.value : e;
}
const fs = {
  get: (e, t, n) => Ln(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return I(s) && !I(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ds(e) {
  return ue(e) ? e : new Proxy(e, fs);
}
class ps {
  constructor(t, n, o, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new Vn(t, () => {
      this._dirty || (this._dirty = !0, zn(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o;
  }
  get value() {
    const t = _(this);
    return Bn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function hs(e, t, n = !1) {
  let o, s;
  const r = V(e);
  r ? (o = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Et) : (o = e.get, s = e.set);
  const i = new ps(o, s, r || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const fe = [];
function ms(e) {
  fe.push(e);
}
function gs() {
  fe.pop();
}
function y(e, ...t) {
  Ct();
  const n = fe.length ? fe[fe.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = _s();
  if (o)
    de(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: r }) => `at <${uo(n, r.type)}>`).join(`
`),
      s
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...bs(s)), console.warn(...r);
  }
  St();
}
function _s() {
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
function bs(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...vs(n));
  }), t;
}
function vs({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${uo(e.component, e.type, o)}`, r = ">" + n;
  return e.props ? [s, ...Es(e.props), r] : [s + r];
}
function Es(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...kn(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function kn(e, t, n) {
  return k(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : I(t) ? (t = kn(e, _(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : V(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = _(t), n ? t : [`${e}=`, t]);
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
    Hn(r, t, n);
  }
  return s;
}
function Re(e, t, n, o) {
  if (V(e)) {
    const r = de(e, t, n, o);
    return r && Oo(r) && r.catch((i) => {
      Hn(i, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(Re(e[r], t, n, o));
  return s;
}
function Hn(e, t, n, o = !0) {
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
  ws(e, n, s, o);
}
function ws(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = Dt[t];
    if (n && ms(n), y(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && gs(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let qe = !1, ut = !1;
const z = [];
let Q = 0;
const Se = [];
let he = null, ie = 0;
const xe = [];
let J = null, ce = 0;
const jn = /* @__PURE__ */ Promise.resolve();
let It = null, ft = null;
const ys = 100;
function Ns(e) {
  const t = It || jn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Cs(e) {
  let t = Q + 1, n = z.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Ae(z[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function Kn(e) {
  (!z.length || !z.includes(e, qe && e.allowRecurse ? Q + 1 : Q)) && e !== ft && (e.id == null ? z.push(e) : z.splice(Cs(e.id), 0, e), Un());
}
function Un() {
  !qe && !ut && (ut = !0, It = jn.then(Jn));
}
function Wn(e, t, n, o) {
  w(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? o + 1 : o)) && n.push(e), Un();
}
function Ss(e) {
  Wn(e, he, Se, ie);
}
function qn(e) {
  Wn(e, J, xe, ce);
}
function Rt(e, t = null) {
  if (Se.length) {
    for (ft = t, he = [...new Set(Se)], Se.length = 0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ie = 0; ie < he.length; ie++)
      process.env.NODE_ENV !== "production" && At(e, he[ie]) || he[ie]();
    he = null, ie = 0, ft = null, Rt(e, t);
  }
}
function xs(e) {
  if (Rt(), xe.length) {
    const t = [...new Set(xe)];
    if (xe.length = 0, J) {
      J.push(...t);
      return;
    }
    for (J = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), J.sort((n, o) => Ae(n) - Ae(o)), ce = 0; ce < J.length; ce++)
      process.env.NODE_ENV !== "production" && At(e, J[ce]) || J[ce]();
    J = null, ce = 0;
  }
}
const Ae = (e) => e.id == null ? 1 / 0 : e.id;
function Jn(e) {
  ut = !1, qe = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Rt(e), z.sort((n, o) => Ae(n) - Ae(o));
  const t = process.env.NODE_ENV !== "production" ? (n) => At(e, n) : Et;
  try {
    for (Q = 0; Q < z.length; Q++) {
      const n = z[Q];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        de(n, null, 14);
      }
    }
  } finally {
    Q = 0, z.length = 0, xs(e), qe = !1, It = null, (z.length || Se.length || xe.length) && Jn(e);
  }
}
function At(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > ys) {
      const o = t.ownerInstance, s = o && Bt(o.type);
      return y(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const me = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ao().__VUE_HMR_RUNTIME__ = {
  createRecord: Qe(Os),
  rerender: Qe(Vs),
  reload: Qe($s)
});
const Je = /* @__PURE__ */ new Map();
function Os(e, t) {
  return Je.has(e) ? !1 : (Je.set(e, {
    initialDef: Oe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Oe(e) {
  return fo(e) ? e.__vccOpts : e;
}
function Vs(e, t) {
  const n = Je.get(e);
  !n || (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Oe(o.type).render = t), o.renderCache = [], o.update();
  }));
}
function $s(e, t) {
  const n = Je.get(e);
  if (!n)
    return;
  t = Oe(t), Xt(n.initialDef, t);
  const o = [...n.instances];
  for (const s of o) {
    const r = Oe(s.type);
    me.has(r) || (r !== n.initialDef && Xt(r, t), me.add(r)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (me.add(r), s.ceReload(t.styles), me.delete(r)) : s.parent ? (Kn(s.parent.update), s.parent.type.__asyncLoader && s.parent.ceReload && s.parent.ceReload(t.styles)) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  qn(() => {
    for (const s of o)
      me.delete(Oe(s.type));
  });
}
function Xt(e, t) {
  F(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Qe(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let ee = null, Ts = null;
const Ds = (e) => e.__isSuspense;
function Is(e, t) {
  t && t.pendingBranch ? w(e) ? t.effects.push(...e) : t.effects.push(e) : qn(e);
}
const Zt = {};
function Gn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !V(t) && y("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Yn(e, t, n);
}
function Yn(e, t, { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: i } = A) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && y('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && y('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (E) => {
    y("Invalid watch source: ", E, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = K;
  let f, d = !1, l = !1;
  if (I(e) ? (f = () => e.value, d = lt(e)) : ue(e) ? (f = () => e, o = !0) : w(e) ? (l = !0, d = e.some((E) => ue(E) || lt(E)), f = () => e.map((E) => {
    if (I(E))
      return E.value;
    if (ue(E))
      return _e(E);
    if (V(E))
      return de(E, a, 2);
    process.env.NODE_ENV !== "production" && c(E);
  })) : V(e) ? t ? f = () => de(e, a, 2) : f = () => {
    if (!(a && a.isUnmounted))
      return u && u(), Re(e, a, 3, [h]);
  } : (f = Et, process.env.NODE_ENV !== "production" && c(e)), t && o) {
    const E = f;
    f = () => _e(E());
  }
  let u, h = (E) => {
    u = C.onStop = () => {
      de(E, a, 4);
    };
  }, p = l ? [] : Zt;
  const g = () => {
    if (!!C.active)
      if (t) {
        const E = C.run();
        (o || d || (l ? E.some((G, U) => Te(G, p[U])) : Te(E, p))) && (u && u(), Re(t, a, 3, [
          E,
          p === Zt ? void 0 : p,
          h
        ]), p = E);
      } else
        C.run();
  };
  g.allowRecurse = !!t;
  let S;
  s === "sync" ? S = g : s === "post" ? S = () => on(g, a && a.suspense) : S = () => Ss(g);
  const C = new Vn(f, S);
  return process.env.NODE_ENV !== "production" && (C.onTrack = r, C.onTrigger = i), t ? n ? g() : p = C.run() : s === "post" ? on(C.run.bind(C), a && a.suspense) : C.run(), () => {
    C.stop(), a && a.scope && Co(a.scope.effects, C);
  };
}
function Rs(e, t, n) {
  const o = this.proxy, s = k(e) ? e.includes(".") ? As(o, e) : () => o[e] : e.bind(o, o);
  let r;
  V(t) ? r = t : (r = t.handler, n = t);
  const i = K;
  _t(this);
  const c = Yn(s, r.bind(o), n);
  return i ? _t(i) : ao(), c;
}
function As(e, t) {
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
  else if (w(e))
    for (let n = 0; n < e.length; n++)
      _e(e[n], t);
  else if (xo(e) || be(e))
    e.forEach((n) => {
      _e(n, t);
    });
  else if ($o(e))
    for (const n in e)
      _e(e[n], t);
  return e;
}
function Fs() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return no(() => {
    e.isMounted = !0;
  }), Bs(() => {
    e.isUnmounting = !0;
  }), e;
}
const P = [Function, Array], Ps = {
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
    const n = rr(), o = Fs();
    let s;
    return () => {
      const r = t.default && Qn(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        let g = !1;
        for (const S of r)
          if (S.type !== Ve) {
            if (process.env.NODE_ENV !== "production" && g) {
              y("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = S, g = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const c = _(e), { mode: a } = c;
      if (process.env.NODE_ENV !== "production" && a && a !== "in-out" && a !== "out-in" && a !== "default" && y(`invalid <transition> mode: ${a}`), o.isLeaving)
        return et(i);
      const f = Qt(i);
      if (!f)
        return et(i);
      const d = dt(f, c, o, n);
      pt(f, d);
      const l = n.subTree, u = l && Qt(l);
      let h = !1;
      const { getTransitionKey: p } = f.type;
      if (p) {
        const g = p();
        s === void 0 ? s = g : g !== s && (s = g, h = !0);
      }
      if (u && u.type !== Ve && (!oo(f, u) || h)) {
        const g = dt(u, c, o, n);
        if (pt(u, g), a === "out-in")
          return o.isLeaving = !0, g.afterLeave = () => {
            o.isLeaving = !1, n.update();
          }, et(i);
        a === "in-out" && f.type !== Ve && (g.delayLeave = (S, C, E) => {
          const G = Zn(o, u);
          G[String(u.key)] = u, S._leaveCb = () => {
            C(), S._leaveCb = void 0, delete d.delayedLeave;
          }, d.delayedLeave = E;
        });
      }
      return i;
    };
  }
}, Xn = Ps;
function Zn(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function dt(e, t, n, o) {
  const { appear: s, mode: r, persisted: i = !1, onBeforeEnter: c, onEnter: a, onAfterEnter: f, onEnterCancelled: d, onBeforeLeave: l, onLeave: u, onAfterLeave: h, onLeaveCancelled: p, onBeforeAppear: g, onAppear: S, onAfterAppear: C, onAppearCancelled: E } = t, G = String(e.key), U = Zn(n, e), W = (v, x) => {
    v && Re(v, o, 9, x);
  }, Pe = (v, x) => {
    const $ = x[1];
    W(v, x), w(v) ? v.every((H) => H.length <= 1) && $() : v.length <= 1 && $();
  }, Ee = {
    mode: r,
    persisted: i,
    beforeEnter(v) {
      let x = c;
      if (!n.isMounted)
        if (s)
          x = g || c;
        else
          return;
      v._leaveCb && v._leaveCb(!0);
      const $ = U[G];
      $ && oo(e, $) && $.el._leaveCb && $.el._leaveCb(), W(x, [v]);
    },
    enter(v) {
      let x = a, $ = f, H = d;
      if (!n.isMounted)
        if (s)
          x = S || a, $ = C || f, H = E || d;
        else
          return;
      let m = !1;
      const O = v._enterCb = (q) => {
        m || (m = !0, q ? W(H, [v]) : W($, [v]), Ee.delayedLeave && Ee.delayedLeave(), v._enterCb = void 0);
      };
      x ? Pe(x, [v, O]) : O();
    },
    leave(v, x) {
      const $ = String(e.key);
      if (v._enterCb && v._enterCb(!0), n.isUnmounting)
        return x();
      W(l, [v]);
      let H = !1;
      const m = v._leaveCb = (O) => {
        H || (H = !0, x(), O ? W(p, [v]) : W(h, [v]), v._leaveCb = void 0, U[$] === e && delete U[$]);
      };
      U[$] = e, u ? Pe(u, [v, m]) : m();
    },
    clone(v) {
      return dt(v, t, n, o);
    }
  };
  return Ee;
}
function et(e) {
  if (eo(e))
    return e = ve(e), e.children = null, e;
}
function Qt(e) {
  return eo(e) ? e.children ? e.children[0] : void 0 : e;
}
function pt(e, t) {
  e.shapeFlag & 6 && e.component ? pt(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Qn(e, t = !1, n) {
  let o = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === Ft ? (i.patchFlag & 128 && s++, o = o.concat(Qn(i.children, t, c))) : (t || i.type !== Ve) && o.push(c != null ? ve(i, { key: c }) : i);
  }
  if (s > 1)
    for (let r = 0; r < o.length; r++)
      o[r].patchFlag = -2;
  return o;
}
function B(e) {
  return V(e) ? { setup: e, name: e.name } : e;
}
const eo = (e) => e.type.__isKeepAlive;
function Ms(e, t, n = K, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      Ct(), _t(n);
      const c = Re(t, n, e, i);
      return ao(), St(), c;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = Do(Dt[e].replace(/ hook$/, ""));
    y(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const to = (e) => (t, n = K) => Ms(e, t, n), no = to("m"), Bs = to("bum");
function zs(e, t) {
  return process.env.NODE_ENV !== "production" && y("withDirectives can only be used inside render functions."), e;
}
const ht = "components";
function Ls(e, t) {
  return Hs(ht, e, !0, t) || e;
}
const ks = Symbol();
function Hs(e, t, n = !0, o = !1) {
  const s = K;
  if (s) {
    const r = s.type;
    if (e === ht) {
      const c = Bt(r, !1);
      if (c && (c === t || c === We(t) || c === $e(We(t))))
        return r;
    }
    const i = en(s[e] || r[e], t) || en(s.appContext[e], t);
    if (!i && o)
      return r;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === ht ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      y(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && y(`resolve${$e(e.slice(0, -1))} can only be used in render() or setup().`);
}
function en(e, t) {
  return e && (e[t] || e[We(t)] || e[$e(We(t))]);
}
const mt = (e) => e ? ir(e) ? lr(e) || e.proxy : mt(e.parent) : null, Ge = /* @__PURE__ */ F(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? He(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? He(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? He(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? He(e.refs) : e.refs,
  $parent: (e) => mt(e.parent),
  $root: (e) => mt(e.root),
  $emit: (e) => e.emit,
  $options: (e) => Us(e),
  $forceUpdate: (e) => e.f || (e.f = () => Kn(e.update)),
  $nextTick: (e) => e.n || (e.n = Ns.bind(e.proxy)),
  $watch: (e) => Rs.bind(e)
}), js = (e) => e === "_" || e === "$", Ks = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (process.env.NODE_ENV !== "production" && o !== A && o.__isScriptSetup && N(o, t))
      return o[t];
    let f;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
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
    const d = Ge[t];
    let l, u;
    if (d)
      return t === "$attrs" && (M(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((l = c.__cssModules) && (l = l[t]))
      return l;
    if (n !== A && N(n, t))
      return i[t] = 4, n[t];
    if (u = a.config.globalProperties, N(u, t))
      return u[t];
    process.env.NODE_ENV !== "production" && ee && (!k(t) || t.indexOf("__v") !== 0) && (s !== A && js(t[0]) && N(s, t) ? y(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === ee && y(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return s !== A && N(s, t) ? (s[t] = n, !0) : o !== A && N(o, t) ? (o[t] = n, !0) : N(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`, e), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`, e), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r } }, i) {
    let c;
    return !!n[i] || e !== A && N(e, i) || t !== A && N(t, i) || (c = r[0]) && N(c, i) || N(o, i) || N(Ge, i) || N(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Ks.ownKeys = (e) => (y("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Us(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, c = r.get(t);
  let a;
  return c ? a = c : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach((f) => Ye(a, f, i, !0)), Ye(a, t, i)), r.set(t, a), a;
}
function Ye(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && Ye(e, r, n, !0), s && s.forEach((i) => Ye(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && y('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Ws[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Ws = {
  data: tn,
  props: le,
  emits: le,
  methods: le,
  computed: le,
  beforeCreate: T,
  created: T,
  beforeMount: T,
  mounted: T,
  beforeUpdate: T,
  updated: T,
  beforeDestroy: T,
  beforeUnmount: T,
  destroyed: T,
  unmounted: T,
  activated: T,
  deactivated: T,
  errorCaptured: T,
  serverPrefetch: T,
  components: le,
  directives: le,
  watch: Js,
  provide: tn,
  inject: qs
};
function tn(e, t) {
  return t ? e ? function() {
    return F(V(e) ? e.call(this, this) : e, V(t) ? t.call(this, this) : t);
  } : t : e;
}
function qs(e, t) {
  return le(nn(e), nn(t));
}
function nn(e) {
  if (w(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function T(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function le(e, t) {
  return e ? F(F(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Js(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = F(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = T(e[o], t[o]);
  return n;
}
function Gs() {
  return {
    app: null,
    config: {
      isNativeTag: wo,
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
const on = Is, Ys = (e) => e.__isTeleport, Ft = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Xs = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Ve = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const je = [];
let L = null;
function Zs(e = !1) {
  je.push(L = e ? null : []);
}
function Qs() {
  je.pop(), L = je[je.length - 1] || null;
}
function er(e) {
  return e.dynamicChildren = L || Eo, Qs(), L && L.push(e), e;
}
function tr(e, t, n, o, s, r) {
  return er(io(e, t, n, o, s, r, !0));
}
function gt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function oo(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && me.has(t.type) ? !1 : e.type === t.type && e.key === t.key;
}
const nr = (...e) => co(...e), so = "__vInternal", ro = ({ key: e }) => e != null ? e : null, Ke = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? k(e) || I(e) || V(e) ? { i: ee, r: e, k: t, f: !!n } : e : null;
function io(e, t = null, n = null, o = 0, s = null, r = e === Ft ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ro(t),
    ref: t && Ke(t),
    scopeId: Ts,
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
  return c ? (Mt(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= k(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && y("VNode created with invalid key (NaN). VNode type:", a.type), !i && L && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && L.push(a), a;
}
const b = process.env.NODE_ENV !== "production" ? nr : co;
function co(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === ks) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = Ve), gt(e)) {
    const c = ve(e, t, !0);
    return n && Mt(c, n), !r && L && (c.shapeFlag & 6 ? L[L.indexOf(e)] = c : L.push(c)), c.patchFlag |= -2, c;
  }
  if (fo(e) && (e = e.__vccOpts), t) {
    t = or(t);
    let { class: c, style: a } = t;
    c && !k(c) && (t.class = vt(c)), R(a) && (at(a) && !w(a) && (a = F({}, a)), t.style = bt(a));
  }
  const i = k(e) ? 1 : Ds(e) ? 128 : Ys(e) ? 64 : R(e) ? 4 : V(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && at(e) && (e = _(e), y("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), io(e, t, n, o, s, i, r, !0);
}
function or(e) {
  return e ? at(e) || so in e ? F({}, e) : e : null;
}
function ve(e, t, n = !1) {
  const { props: o, ref: s, patchFlag: r, children: i } = e, c = t ? sr(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && ro(c),
    ref: t && t.ref ? n && s ? w(s) ? s.concat(Ke(t)) : [s, Ke(t)] : Ke(t) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && r === -1 && w(i) ? i.map(lo) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ft ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ve(e.ssContent),
    ssFallback: e.ssFallback && ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor
  };
}
function lo(e) {
  const t = ve(e);
  return w(e.children) && (t.children = e.children.map(lo)), t;
}
function Pt(e = " ", t = 0) {
  return b(Xs, null, e, t);
}
function Mt(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (w(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Mt(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(so in t) ? t._ctx = ee : s === 3 && ee && (ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    V(t) ? (t = { default: t, _ctx: ee }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Pt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function sr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = vt([t.class, o.class]));
      else if (s === "style")
        t.style = bt([t.style, o.style]);
      else if (No(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(w(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else
        s !== "" && (t[s] = o[s]);
  }
  return t;
}
Gs();
let K = null;
const rr = () => K || ee, _t = (e) => {
  K = e, e.scope.on();
}, ao = () => {
  K && K.scope.off(), K = null;
};
function ir(e) {
  return e.vnode.shapeFlag & 4;
}
let cr = !1;
function lr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ds(ls(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Ge)
          return Ge[n](e);
      }
    }));
}
const ar = /(?:^|[-_])(\w)/g, ur = (e) => e.replace(ar, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Bt(e, t = !0) {
  return V(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function uo(e, t, n = !1) {
  let o = Bt(t);
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
  return o ? ur(o) : n ? "App" : "Anonymous";
}
function fo(e) {
  return V(e) && "__vccOpts" in e;
}
const sn = (e, t) => hs(e, t, cr);
function fr(e, t, n) {
  const o = arguments.length;
  return o === 2 ? R(t) && !w(t) ? gt(t) ? b(e, null, [t]) : b(e, t) : b(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && gt(n) && (n = [n]), b(e, t, n));
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function tt(e) {
  return !!(e && e.__v_isShallow);
}
function dr() {
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
        ["span", e, tt(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${pe(l) ? " (readonly)" : ""}`
      ] : pe(l) ? [
        "div",
        {},
        ["span", e, tt(l) ? "ShallowReadonly" : "Readonly"],
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
    const h = a(l, "computed");
    h && u.push(i("computed", h));
    const p = a(l, "inject");
    return p && u.push(i("injected", p)), u.push([
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
        ...Object.keys(u).map((h) => [
          "div",
          {},
          ["span", o, h + ": "],
          c(u[h], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", o, l] : R(l) ? ["object", { object: u ? _(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const h = l.type;
    if (V(h))
      return;
    const p = {};
    for (const g in l.ctx)
      f(h, g, u) && (p[g] = l.ctx[g]);
    return p;
  }
  function f(l, u, h) {
    const p = l[h];
    if (w(p) && p.includes(u) || R(p) && u in p || l.extends && f(l.extends, u, h) || l.mixins && l.mixins.some((g) => f(g, u, h)))
      return !0;
  }
  function d(l) {
    return tt(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const X = "transition", we = "animation", zt = (e, { slots: t }) => fr(Xn, pr(e), t);
zt.displayName = "Transition";
const po = {
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
zt.props = /* @__PURE__ */ F({}, Xn.props, po);
const se = (e, t = []) => {
  w(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, rn = (e) => e ? w(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function pr(e) {
  const t = {};
  for (const m in e)
    m in po || (t[m] = e[m]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: o, duration: s, enterFromClass: r = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: a = r, appearActiveClass: f = i, appearToClass: d = c, leaveFromClass: l = `${n}-leave-from`, leaveActiveClass: u = `${n}-leave-active`, leaveToClass: h = `${n}-leave-to` } = e, p = hr(s), g = p && p[0], S = p && p[1], { onBeforeEnter: C, onEnter: E, onEnterCancelled: G, onLeave: U, onLeaveCancelled: W, onBeforeAppear: Pe = C, onAppear: Ee = E, onAppearCancelled: v = G } = t, x = (m, O, q) => {
    re(m, O ? d : c), re(m, O ? f : i), q && q();
  }, $ = (m, O) => {
    m._isLeaving = !1, re(m, l), re(m, h), re(m, u), O && O();
  }, H = (m) => (O, q) => {
    const Lt = m ? Ee : E, kt = () => x(O, m, q);
    se(Lt, [O, kt]), cn(() => {
      re(O, m ? a : r), Z(O, m ? d : c), rn(Lt) || ln(O, o, g, kt);
    });
  };
  return F(t, {
    onBeforeEnter(m) {
      se(C, [m]), Z(m, r), Z(m, i);
    },
    onBeforeAppear(m) {
      se(Pe, [m]), Z(m, a), Z(m, f);
    },
    onEnter: H(!1),
    onAppear: H(!0),
    onLeave(m, O) {
      m._isLeaving = !0;
      const q = () => $(m, O);
      Z(m, l), br(), Z(m, u), cn(() => {
        !m._isLeaving || (re(m, l), Z(m, h), rn(U) || ln(m, o, S, q));
      }), se(U, [m, q]);
    },
    onEnterCancelled(m) {
      x(m, !1), se(G, [m]);
    },
    onAppearCancelled(m) {
      x(m, !0), se(v, [m]);
    },
    onLeaveCancelled(m) {
      $(m), se(W, [m]);
    }
  });
}
function hr(e) {
  if (e == null)
    return null;
  if (R(e))
    return [nt(e.enter), nt(e.leave)];
  {
    const t = nt(e);
    return [t, t];
  }
}
function nt(e) {
  const t = Ro(e);
  return process.env.NODE_ENV !== "production" && mr(t), t;
}
function mr(e) {
  typeof e != "number" ? y(`<transition> explicit duration is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && y("<transition> explicit duration is NaN - the duration expression might be incorrect.");
}
function Z(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function re(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function cn(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let gr = 0;
function ln(e, t, n, o) {
  const s = e._endId = ++gr, r = () => {
    s === e._endId && o();
  };
  if (n)
    return setTimeout(r, n);
  const { type: i, timeout: c, propCount: a } = _r(e, t);
  if (!i)
    return o();
  const f = i + "end";
  let d = 0;
  const l = () => {
    e.removeEventListener(f, u), r();
  }, u = (h) => {
    h.target === e && ++d >= a && l();
  };
  setTimeout(() => {
    d < a && l();
  }, c + 1), e.addEventListener(f, u);
}
function _r(e, t) {
  const n = window.getComputedStyle(e), o = (p) => (n[p] || "").split(", "), s = o(X + "Delay"), r = o(X + "Duration"), i = an(s, r), c = o(we + "Delay"), a = o(we + "Duration"), f = an(c, a);
  let d = null, l = 0, u = 0;
  t === X ? i > 0 && (d = X, l = i, u = r.length) : t === we ? f > 0 && (d = we, l = f, u = a.length) : (l = Math.max(i, f), d = l > 0 ? i > f ? X : we : null, u = d ? d === X ? r.length : a.length : 0);
  const h = d === X && /\b(transform|all)(,|$)/.test(n[X + "Property"]);
  return {
    type: d,
    timeout: l,
    propCount: u,
    hasTransform: h
  };
}
function an(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, o) => un(n) + un(e[o])));
}
function un(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function br() {
  return document.body.offsetHeight;
}
const vr = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ye(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), ye(e, !0), o.enter(e)) : o.leave(e, () => {
      ye(e, !1);
    }) : ye(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ye(e, t);
  }
};
function ye(e, t) {
  e.style.display = t ? e._vod : "none";
}
function Er() {
  dr();
}
process.env.NODE_ENV !== "production" && Er();
const wr = {
  type: {
    type: String,
    default: "default"
  },
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
}, fn = B({
  name: "CButton",
  props: wr,
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
    }, o = () => {
      switch (e.type) {
        case "danger":
          return "bg-red-500 hover:bg-red-400 border-red-500";
        case "success":
          return "bg-green-500 hover:bg-green-400 border-green-500";
        case "info":
          return "bg-gray-300 hover:bg-gray-200 border-gray-300";
        case "warning":
          return "bg-yellow-500 hover:bg-yellow-400 border-yellow-500";
        default:
          return `bg-${e.color}-${e.plain ? "100" : "500"} hover:bg-${e.color}-400 border-${e.color}-${e.plain, "500"}`;
      }
    };
    return () => b("button", {
      disabled: e.disabled,
      onClick: () => {
        e.disabled;
      },
      class: `
          py-${n[e.size].y}
          px-${n[e.size].x}
          ${e.round ? "rounded-full" : "rounded-lg"}
          ${o()}
          cursor-pointer
          border-solid
          text-${e.plain ? e.color + "-500" : "white"}
          text-${n[e.size].text}
          hover:text-white
          transition duration-300 ease-in-out transform hover:scale-105
          mx-1
          ${e.disabled ? "cursor-not-allowed opacity-50" : ""}
        `
    }, [e.icon !== "" ? b("i", {
      class: `i-ic-baseline-${e.icon} p-3`
    }, null) : "", t.default ? t.default() : ""]);
  }
}), dn = B({
  name: "CInput",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return () => b("div", {
      class: "op80 text-lg fw300 m1"
    }, [b("input", {
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
}, pn = B({
  name: "CLink",
  props: yr,
  setup(e, {
    slots: t
  }) {
    return () => b("a", {
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
}), Nr = {
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
}, hn = B({
  name: "CTitle",
  props: Nr,
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
    return () => b("p", {
      class: `
          text-${e.color}-500
          text-${n[e.size].x}xl
          `
    }, [e.text, t.default ? t.default() : ""]);
  }
}), Cr = {
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
}, mn = B({
  name: "Checkbox",
  props: Cr,
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
    return () => b("div", null, [b("input", {
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
    }, null), b("label", {
      class: `
            ${o[e.size].text}
            ${e.disabled || e.selectableDisabled ? "cursor-not-allowed opacity-50" : ""}
          `
    }, [e.text, t.default ? t.default() : ""])]);
  }
}), Sr = {
  name: "SFCButton"
}, xr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
};
function Or(e, t, n, o, s, r) {
  return Zs(), tr("button", null, "SFC Button");
}
const gn = /* @__PURE__ */ xr(Sr, [["render", Or]]), _n = B({
  name: "JSXButton",
  render() {
    return b("button", null, [Pt("JSX Button")]);
  }
}), Vr = {
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
}, bn = B({
  name: "CAvatar",
  props: Vr,
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
    return () => b("div", null, [b("img", {
      src: e.src,
      class: `avatar ${e.shape} ${e.size}`,
      style: {
        width: t[e.size].width,
        height: t[e.size].height
      }
    }, null)]);
  }
});
const $r = {
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
}, vn = B({
  name: "CSwitch",
  props: $r,
  setup(e, {
    slots: t
  }) {
    const n = j(e.checked);
    return () => b("div", null, [b("input", {
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
const Tr = {
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
}, En = B({
  name: "CTextarea",
  props: Tr,
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
    return () => b("div", {
      class: "ctextarea"
    }, [b("textarea", {
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
const wn = B({
  name: "CUpload",
  setup() {
    const e = j(null), t = () => {
      e.value.files[0];
    };
    return () => b("div", {
      class: "upload"
    }, [b("label", {
      for: "my-file",
      class: "upload-label"
    }, [Pt("\u4E0A\u4F20\u6587\u4EF6")]), b("input", {
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
}, Ir = {
  "update:modelValue": (e) => !!e,
  change: (e) => !!e
};
function ho(e) {
  return typeof e == "function" ? e() : Ln(e);
}
const Fe = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Rr = Object.prototype.toString, Ar = (e) => Rr.call(e) === "[object Object]", Ue = () => {
}, Fr = /* @__PURE__ */ Pr();
function Pr() {
  var e, t;
  return Fe && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Ce(e) {
  var t;
  const n = ho(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const mo = Fe ? window : void 0;
Fe && window.document;
Fe && window.navigator;
Fe && window.location;
function ot(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = mo) : [t, n, o, s] = e, !t)
    return Ue;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const r = [], i = () => {
    r.forEach((d) => d()), r.length = 0;
  }, c = (d, l, u, h) => (d.addEventListener(l, u, h), () => d.removeEventListener(l, u, h)), a = Gn(
    () => [Ce(t), ho(s)],
    ([d, l]) => {
      if (i(), !d)
        return;
      const u = Ar(l) ? { ...l } : l;
      r.push(
        ...n.flatMap((h) => o.map((p) => c(d, h, p, u)))
      );
    },
    { immediate: !0, flush: "post" }
  );
  return () => {
    a(), i();
  };
}
let yn = !1;
function Mr(e, t, n = {}) {
  const { window: o = mo, ignore: s = [], capture: r = !0, detectIframe: i = !1 } = n;
  if (!o)
    return Ue;
  Fr && !yn && (yn = !0, Array.from(o.document.body.children).forEach((u) => u.addEventListener("click", Ue)), o.document.documentElement.addEventListener("click", Ue));
  let c = !0;
  const a = (u) => s.some((h) => {
    if (typeof h == "string")
      return Array.from(o.document.querySelectorAll(h)).some((p) => p === u.target || u.composedPath().includes(p));
    {
      const p = Ce(h);
      return p && (u.target === p || u.composedPath().includes(p));
    }
  }), d = [
    ot(o, "click", (u) => {
      const h = Ce(e);
      if (!(!h || h === u.target || u.composedPath().includes(h))) {
        if (u.detail === 0 && (c = !a(u)), !c) {
          c = !0;
          return;
        }
        t(u);
      }
    }, { passive: !0, capture: r }),
    ot(o, "pointerdown", (u) => {
      const h = Ce(e);
      c = !a(u) && !!(h && !u.composedPath().includes(h));
    }, { passive: !0 }),
    i && ot(o, "blur", (u) => {
      setTimeout(() => {
        var h;
        const p = Ce(e);
        ((h = o.document.activeElement) == null ? void 0 : h.tagName) === "IFRAME" && !(p != null && p.contains(o.document.activeElement)) && t(u);
      }, 0);
    })
  ].filter(Boolean);
  return () => d.forEach((u) => u());
}
const Nn = B({
  name: "CSelect",
  props: Dr,
  emits: Ir,
  setup(e, {
    emit: t
  }) {
    const n = j(e.modelValue), o = j([]), s = j(!1), r = j(null), i = j(!1);
    no(() => {
      Mr(r.value, (p) => {
        const g = p.target.classList;
        !(g != null && g.contains("CSelect__input")) && !g.contains("ik-icon") && !g.contains("CSelect__inner") && (s.value = !1);
      });
    });
    const c = (p) => {
      t("update:modelValue", p), n.value = p, s.value = !1;
    }, a = () => {
      s.value = !0;
    };
    Gn(() => e.modelValue, (p) => t("change", p));
    const f = (p) => {
      if (typeof p.target.value == "string" && p.target.value) {
        const g = e.option.filter((S) => S.includes(p.target.value));
        o.value = g || [];
      } else
        o.value = e.option;
    }, d = () => {
      i.value = !0;
    }, l = () => {
      i.value = !1;
    }, u = sn(() => o.value.length ? o.value : e.option), h = sn(() => ["CSelect__inner", {
      "select--focus": i.value
    }]);
    return () => b("div", {
      class: "CSelect"
    }, [b("div", {
      class: h.value,
      onClick: a
    }, [b("input", {
      placeholder: "\u8BF7\u9009\u62E9",
      class: "CSelect__input",
      value: n.value,
      readonly: !e.filterOn,
      type: "text",
      onInput: f,
      onFocus: d,
      onBlur: l
    }, null), b(Ls("ik-icon"), {
      class: "CSelect--clear",
      name: "arrow-right",
      size: 18
    }, null)]), b(zt, {
      name: "slide-fade__select"
    }, {
      default: () => [zs(b("div", {
        class: "CSelect--options",
        ref: r
      }, [u.value.map((g, S) => b("div", {
        class: {
          "CSelect--item": !0,
          "CSelect--item__active": g === e.modelValue
        },
        key: S,
        onClick: () => c(g)
      }, [g]))]), [[vr, s.value]])]
    })]);
  }
});
const Cn = B({
  name: "CScrollContent",
  setup(e, {
    slots: t
  }) {
    return () => {
      var n;
      return b("div", {
        class: "scroll-content-box"
      }, [b("div", {
        class: "scroll-wrap"
      }, [b("div", {
        class: "scroll-item"
      }, [(n = t.default) == null ? void 0 : n.call(t)])])]);
    };
  }
}), Br = {
  install(e) {
    e.component(fn.name, fn), e.component(gn.name, gn), e.component(_n.name, _n), e.component(pn.name, pn), e.component(dn.name, dn), e.component(hn.name, hn), e.component(mn.name, mn), e.component(bn.name, bn), e.component(vn.name, vn), e.component(En.name, En), e.component(wn.name, wn), e.component(Nn.name, Nn), e.component(Cn.name, Cn);
  }
};
export {
  bn as Avatar,
  mn as CheckBox,
  dn as Input,
  _n as JSXButton,
  pn as Link,
  fn as MyButton,
  gn as SFCButton,
  Cn as ScrollContent,
  Nn as Select,
  En as Textarea,
  wn as Upload,
  Br as default
};
