!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports._vantaEffect = e())
    : (t._vantaEffect = e());
})("undefined" != typeof self ? self : this, function () {
  return (function (t) {
    var e = {};
    function i(n) {
      if (e[n]) return e[n].exports;
      var o = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, i), (o.l = !0), o.exports;
    }
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (i.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            i.d(
              n,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return n;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = ""),
      i((i.s = 18))
    );
  })({
    0: function (t, e, i) {
      "use strict";
      function n(t, e) {
        for (let i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
      }
      function o() {
        return "undefined" != typeof navigator
          ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) || window.innerWidth < 600
          : null;
      }
      i.d(e, "c", function () {
        return n;
      }),
        i.d(e, "e", function () {
          return o;
        }),
        i.d(e, "i", function () {
          return s;
        }),
        i.d(e, "h", function () {
          return r;
        }),
        i.d(e, "g", function () {
          return a;
        }),
        i.d(e, "f", function () {
          return l;
        }),
        i.d(e, "a", function () {
          return h;
        }),
        i.d(e, "b", function () {
          return c;
        }),
        i.d(e, "d", function () {
          return u;
        }),
        (Number.prototype.clamp = function (t, e) {
          return Math.min(Math.max(this, t), e);
        });
      const s = (t) => t[Math.floor(Math.random() * t.length)];
      function r(t, e) {
        return (
          null == t && (t = 0),
          null == e && (e = 1),
          t + Math.random() * (e - t)
        );
      }
      function a(t, e) {
        return (
          null == t && (t = 0),
          null == e && (e = 1),
          Math.floor(t + Math.random() * (e - t + 1))
        );
      }
      const l = (t) => document.querySelector(t),
        h = (t) =>
          "number" == typeof t ? "#" + ("00000" + t.toString(16)).slice(-6) : t,
        c = (t, e = 1) => {
          const i = h(t),
            n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i),
            o = n
              ? {
                  r: parseInt(n[1], 16),
                  g: parseInt(n[2], 16),
                  b: parseInt(n[3], 16),
                }
              : null;
          return "rgba(" + o.r + "," + o.g + "," + o.b + "," + e + ")";
        },
        u = (t) => 0.299 * t.r + 0.587 * t.g + 0.114 * t.b;
    },
    1: function (t, e, i) {
      "use strict";
      i.d(e, "a", function () {
        return r;
      });
      var n = i(0);
      const o = "object" == typeof window;
      let s = (o && window.THREE) || {};
      o && !window.VANTA && (window.VANTA = {});
      const r = (o && window.VANTA) || {};
      (r.register = (t, e) => (r[t] = (t) => new e(t))), (r.version = "0.5.21");
      const a = function () {
        return (
          Array.prototype.unshift.call(arguments, "[VANTA]"),
          console.error.apply(this, arguments)
        );
      };
      (r.VantaBase = class {
        constructor(t = {}) {
          if (!o) return !1;
          (r.current = this),
            (this.windowMouseMoveWrapper =
              this.windowMouseMoveWrapper.bind(this)),
            (this.windowTouchWrapper = this.windowTouchWrapper.bind(this)),
            (this.windowGyroWrapper = this.windowGyroWrapper.bind(this)),
            (this.resize = this.resize.bind(this)),
            (this.animationLoop = this.animationLoop.bind(this)),
            (this.restart = this.restart.bind(this));
          const e =
            "function" == typeof this.getDefaultOptions
              ? this.getDefaultOptions()
              : this.defaultOptions;
          if (
            ((this.options = Object(n.c)(
              {
                mouseControls: !0,
                touchControls: !0,
                gyroControls: !1,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                scaleMobile: 1,
              },
              e
            )),
            (t instanceof HTMLElement || "string" == typeof t) &&
              (t = { el: t }),
            Object(n.c)(this.options, t),
            this.options.THREE && (s = this.options.THREE),
            (this.el = this.options.el),
            null == this.el)
          )
            a('Instance needs "el" param!');
          else if (!(this.options.el instanceof HTMLElement)) {
            const t = this.el;
            if (((this.el = Object(n.f)(t)), !this.el))
              return void a("Cannot find element", t);
          }
          this.prepareEl(), this.initThree(), this.setSize();
          try {
            this.init();
          } catch (t) {
            return (
              a("Init error", t),
              this.renderer &&
                this.renderer.domElement &&
                this.el.removeChild(this.renderer.domElement),
              void (
                this.options.backgroundColor &&
                (console.log("[VANTA] Falling back to backgroundColor"),
                (this.el.style.background = Object(n.a)(
                  this.options.backgroundColor
                )))
              )
            );
          }
          this.initMouse(), this.resize(), this.animationLoop();
          const i = window.addEventListener;
          i("resize", this.resize),
            window.requestAnimationFrame(this.resize),
            this.options.mouseControls &&
              (i("scroll", this.windowMouseMoveWrapper),
              i("mousemove", this.windowMouseMoveWrapper)),
            this.options.touchControls &&
              (i("touchstart", this.windowTouchWrapper),
              i("touchmove", this.windowTouchWrapper)),
            this.options.gyroControls &&
              i("deviceorientation", this.windowGyroWrapper);
        }
        setOptions(t = {}) {
          Object(n.c)(this.options, t), this.triggerMouseMove();
        }
        prepareEl() {
          let t, e;
          if ("undefined" != typeof Node && Node.TEXT_NODE)
            for (t = 0; t < this.el.childNodes.length; t++) {
              const e = this.el.childNodes[t];
              if (e.nodeType === Node.TEXT_NODE) {
                const t = document.createElement("span");
                (t.textContent = e.textContent),
                  e.parentElement.insertBefore(t, e),
                  e.remove();
              }
            }
          for (t = 0; t < this.el.children.length; t++)
            (e = this.el.children[t]),
              "static" === getComputedStyle(e).position &&
                (e.style.position = "relative"),
              "auto" === getComputedStyle(e).zIndex && (e.style.zIndex = 1);
          "static" === getComputedStyle(this.el).position &&
            (this.el.style.position = "relative");
        }
        applyCanvasStyles(t, e = {}) {
          Object(n.c)(t.style, {
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            background: "",
          }),
            Object(n.c)(t.style, e),
            t.classList.add("vanta-canvas");
        }
        initThree() {
          s.WebGLRenderer
            ? ((this.renderer = new s.WebGLRenderer({
                alpha: !0,
                antialias: !0,
              })),
              this.el.appendChild(this.renderer.domElement),
              this.applyCanvasStyles(this.renderer.domElement),
              isNaN(this.options.backgroundAlpha) &&
                (this.options.backgroundAlpha = 1),
              (this.scene = new s.Scene()))
            : console.warn("[VANTA] No THREE defined on window");
        }
        getCanvasElement() {
          return this.renderer
            ? this.renderer.domElement
            : this.p5renderer
            ? this.p5renderer.canvas
            : void 0;
        }
        getCanvasRect() {
          const t = this.getCanvasElement();
          return !!t && t.getBoundingClientRect();
        }
        windowMouseMoveWrapper(t) {
          const e = this.getCanvasRect();
          if (!e) return !1;
          const i = t.clientX - e.left,
            n = t.clientY - e.top;
          i >= 0 &&
            n >= 0 &&
            i <= e.width &&
            n <= e.height &&
            ((this.mouseX = i),
            (this.mouseY = n),
            this.options.mouseEase || this.triggerMouseMove(i, n));
        }
        windowTouchWrapper(t) {
          const e = this.getCanvasRect();
          if (!e) return !1;
          if (1 === t.touches.length) {
            const i = t.touches[0].clientX - e.left,
              n = t.touches[0].clientY - e.top;
            i >= 0 &&
              n >= 0 &&
              i <= e.width &&
              n <= e.height &&
              ((this.mouseX = i),
              (this.mouseY = n),
              this.options.mouseEase || this.triggerMouseMove(i, n));
          }
        }
        windowGyroWrapper(t) {
          const e = this.getCanvasRect();
          if (!e) return !1;
          const i = Math.round(2 * t.alpha) - e.left,
            n = Math.round(2 * t.beta) - e.top;
          i >= 0 &&
            n >= 0 &&
            i <= e.width &&
            n <= e.height &&
            ((this.mouseX = i),
            (this.mouseY = n),
            this.options.mouseEase || this.triggerMouseMove(i, n));
        }
        triggerMouseMove(t, e) {
          void 0 === t &&
            void 0 === e &&
            (this.options.mouseEase
              ? ((t = this.mouseEaseX), (e = this.mouseEaseY))
              : ((t = this.mouseX), (e = this.mouseY))),
            this.uniforms &&
              ((this.uniforms.iMouse.value.x = t / this.scale),
              (this.uniforms.iMouse.value.y = e / this.scale));
          const i = t / this.width,
            n = e / this.height;
          "function" == typeof this.onMouseMove && this.onMouseMove(i, n);
        }
        setSize() {
          this.scale || (this.scale = 1),
            Object(n.e)() && this.options.scaleMobile
              ? (this.scale = this.options.scaleMobile)
              : this.options.scale && (this.scale = this.options.scale),
            (this.width = Math.max(this.el.offsetWidth, this.options.minWidth)),
            (this.height = Math.max(
              this.el.offsetHeight,
              this.options.minHeight
            ));
        }
        initMouse() {
          ((!this.mouseX && !this.mouseY) ||
            (this.mouseX === this.options.minWidth / 2 &&
              this.mouseY === this.options.minHeight / 2)) &&
            ((this.mouseX = this.width / 2),
            (this.mouseY = this.height / 2),
            this.triggerMouseMove(this.mouseX, this.mouseY));
        }
        resize() {
          this.setSize(),
            this.camera &&
              ((this.camera.aspect = this.width / this.height),
              "function" == typeof this.camera.updateProjectionMatrix &&
                this.camera.updateProjectionMatrix()),
            this.renderer &&
              (this.renderer.setSize(this.width, this.height),
              this.renderer.setPixelRatio(
                window.devicePixelRatio / this.scale
              )),
            "function" == typeof this.onResize && this.onResize();
        }
        isOnScreen() {
          const t = this.el.offsetHeight,
            e = this.el.getBoundingClientRect(),
            i =
              window.pageYOffset ||
              (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop,
            n = e.top + i;
          return n - window.innerHeight <= i && i <= n + t;
        }
        animationLoop() {
          return (
            this.t || (this.t = 0),
            (this.t += 1),
            this.t2 || (this.t2 = 0),
            (this.t2 += this.options.speed || 1),
            this.uniforms && (this.uniforms.iTime.value = 0.016667 * this.t2),
            this.options.mouseEase &&
              ((this.mouseEaseX = this.mouseEaseX || this.mouseX || 0),
              (this.mouseEaseY = this.mouseEaseY || this.mouseY || 0),
              Math.abs(this.mouseEaseX - this.mouseX) +
                Math.abs(this.mouseEaseY - this.mouseY) >
                0.1 &&
                ((this.mouseEaseX += 0.05 * (this.mouseX - this.mouseEaseX)),
                (this.mouseEaseY += 0.05 * (this.mouseY - this.mouseEaseY)),
                this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY))),
            (this.isOnScreen() || this.options.forceAnimate) &&
              ("function" == typeof this.onUpdate && this.onUpdate(),
              this.scene &&
                this.camera &&
                (this.renderer.render(this.scene, this.camera),
                this.renderer.setClearColor(
                  this.options.backgroundColor,
                  this.options.backgroundAlpha
                )),
              this.fps && this.fps.update && this.fps.update(),
              "function" == typeof this.afterRender && this.afterRender()),
            (this.req = window.requestAnimationFrame(this.animationLoop))
          );
        }
        restart() {
          if (this.scene)
            for (; this.scene.children.length; )
              this.scene.remove(this.scene.children[0]);
          "function" == typeof this.onRestart && this.onRestart(), this.init();
        }
        init() {
          "function" == typeof this.onInit && this.onInit();
        }
        destroy() {
          "function" == typeof this.onDestroy && this.onDestroy();
          const t = window.removeEventListener;
          t("touchstart", this.windowTouchWrapper),
            t("touchmove", this.windowTouchWrapper),
            t("scroll", this.windowMouseMoveWrapper),
            t("mousemove", this.windowMouseMoveWrapper),
            t("deviceorientation", this.windowGyroWrapper),
            t("resize", this.resize),
            window.cancelAnimationFrame(this.req),
            this.renderer &&
              (this.renderer.domElement &&
                this.el.removeChild(this.renderer.domElement),
              (this.renderer = null),
              (this.scene = null)),
            r.current === this && (r.current = null);
        }
      }),
        (e.b = r.VantaBase);
    },
    18: function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i(1),
        o = i(0);
      let s = "object" == typeof window && window.THREE,
        {
          Camera: r,
          ClampToEdgeWrapping: a,
          DataTexture: l,
          FloatType: h,
          Mesh: c,
          NearestFilter: u,
          PlaneBufferGeometry: d,
          RGBAFormat: p,
          Scene: f,
          ShaderMaterial: m,
          WebGLRenderTarget: v,
        } = s || {};
      var y = function (t, e, i, n) {
        n &&
          ({
            Camera: r,
            ClampToEdgeWrapping: a,
            DataTexture: l,
            FloatType: h,
            Mesh: c,
            NearestFilter: u,
            PlaneBufferGeometry: d,
            RGBAFormat: p,
            Scene: f,
            ShaderMaterial: m,
            WebGLRenderTarget: v,
          } = n),
          (this.variables = []),
          (this.currentTextureIndex = 0);
        var o = h,
          s = new f(),
          y = new r();
        y.position.z = 1;
        var g = { passThruTexture: { value: null } },
          w = M(
            "uniform sampler2D passThruTexture;\n\nvoid main() {\n\n\tvec2 uv = gl_FragCoord.xy / resolution.xy;\n\n\tgl_FragColor = texture2D( passThruTexture, uv );\n\n}\n",
            g
          ),
          b = new c(new d(2, 2), w);
        function x(i) {
          i.defines.resolution =
            "vec2( " + t.toFixed(1) + ", " + e.toFixed(1) + " )";
        }
        function M(t, e) {
          var i = new m({
            uniforms: (e = e || {}),
            vertexShader:
              "void main()\t{\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n",
            fragmentShader: t,
          });
          return x(i), i;
        }
        s.add(b),
          (this.setDataType = function (t) {
            return (o = t), this;
          }),
          (this.addVariable = function (t, e, i) {
            var n = {
              name: t,
              initialValueTexture: i,
              material: this.createShaderMaterial(e),
              dependencies: null,
              renderTargets: [],
              wrapS: null,
              wrapT: null,
              minFilter: u,
              magFilter: u,
            };
            return this.variables.push(n), n;
          }),
          (this.setVariableDependencies = function (t, e) {
            t.dependencies = e;
          }),
          (this.init = function () {
            if (
              !i.capabilities.isWebGL2 &&
              !i.extensions.get("OES_texture_float")
            )
              return "No OES_texture_float support for float textures.";
            if (0 === i.capabilities.maxVertexTextures)
              return "No support for vertex shader textures.";
            for (var n = 0; n < this.variables.length; n++) {
              var o = this.variables[n];
              (o.renderTargets[0] = this.createRenderTarget(
                t,
                e,
                o.wrapS,
                o.wrapT,
                o.minFilter,
                o.magFilter
              )),
                (o.renderTargets[1] = this.createRenderTarget(
                  t,
                  e,
                  o.wrapS,
                  o.wrapT,
                  o.minFilter,
                  o.magFilter
                )),
                this.renderTexture(o.initialValueTexture, o.renderTargets[0]),
                this.renderTexture(o.initialValueTexture, o.renderTargets[1]);
              var s = o.material,
                r = s.uniforms;
              if (null !== o.dependencies)
                for (var a = 0; a < o.dependencies.length; a++) {
                  var l = o.dependencies[a];
                  if (l.name !== o.name) {
                    for (var h = !1, c = 0; c < this.variables.length; c++)
                      if (l.name === this.variables[c].name) {
                        h = !0;
                        break;
                      }
                    if (!h)
                      return (
                        "Variable dependency not found. Variable=" +
                        o.name +
                        ", dependency=" +
                        l.name
                      );
                  }
                  (r[l.name] = { value: null }),
                    (s.fragmentShader =
                      "\nuniform sampler2D " +
                      l.name +
                      ";\n" +
                      s.fragmentShader);
                }
            }
            return (this.currentTextureIndex = 0), null;
          }),
          (this.compute = function () {
            for (
              var t = this.currentTextureIndex,
                e = 0 === this.currentTextureIndex ? 1 : 0,
                i = 0,
                n = this.variables.length;
              i < n;
              i++
            ) {
              var o = this.variables[i];
              if (null !== o.dependencies)
                for (
                  var s = o.material.uniforms, r = 0, a = o.dependencies.length;
                  r < a;
                  r++
                ) {
                  var l = o.dependencies[r];
                  s[l.name].value = l.renderTargets[t].texture;
                }
              this.doRenderTarget(o.material, o.renderTargets[e]);
            }
            this.currentTextureIndex = e;
          }),
          (this.getCurrentRenderTarget = function (t) {
            return t.renderTargets[this.currentTextureIndex];
          }),
          (this.getAlternateRenderTarget = function (t) {
            return t.renderTargets[0 === this.currentTextureIndex ? 1 : 0];
          }),
          (this.addResolutionDefine = x),
          (this.createShaderMaterial = M),
          (this.createRenderTarget = function (i, n, s, r, l, h) {
            return new v((i = i || t), (n = n || e), {
              wrapS: (s = s || a),
              wrapT: (r = r || a),
              minFilter: (l = l || u),
              magFilter: (h = h || u),
              format: p,
              type: o,
              stencilBuffer: !1,
              depthBuffer: !1,
            });
          }),
          (this.createTexture = function () {
            var i = new Float32Array(t * e * 4);
            return new l(i, t, e, p, h);
          }),
          (this.renderTexture = function (t, e) {
            (g.passThruTexture.value = t),
              this.doRenderTarget(w, e),
              (g.passThruTexture.value = null);
          }),
          (this.doRenderTarget = function (t, e) {
            var n = i.getRenderTarget();
            (b.material = t),
              i.setRenderTarget(e),
              i.render(s, y),
              (b.material = w),
              i.setRenderTarget(n);
          });
      };
      let g = "object" == typeof window && window.THREE;
      const w = !Object(o.e)();
      let b = 32,
        x = b * b;
      const M = 800,
        T = M / 2;
      let z, S;
      const C = function (t) {
          ((z = function (e = {}) {
            var i = this;
            function n(n, o, s) {
              const r = 1.5 * (e.birdSize || 1);
              i.vertices.push(new t.Vector3(n * r, o * r, s * r));
            }
            function o(e, n, o) {
              i.faces.push(new t.Face3(e, n, o));
            }
            t.Geometry.call(this),
              n(5, 0, 0),
              n(-5, -1, 1),
              n(-5, 0, 0),
              n(-5, -2, -1),
              n(0, 2, -6),
              n(0, 2, 6),
              n(2, 0, 0),
              n(-3, 0, 0),
              o(0, 2, 1),
              o(4, 7, 6),
              o(5, 6, 7),
              this.computeFaceNormals();
          }).prototype = Object.create(t.Geometry.prototype)),
            (S = function (e) {
              var i,
                n,
                o = new t.Vector3(),
                s = 500,
                r = 500,
                a = 200,
                l = e;
              (this.position = new t.Vector3()),
                (this.velocity = new t.Vector3()),
                (i = new t.Vector3()),
                (this.setGoal = function (t) {
                  n = t;
                }),
                (this.setWorldSize = function (t, e, i) {
                  (s = t), (r = e), (a = i);
                }),
                (this.run = function (t) {
                  o.set(-s, this.position.y, this.position.z),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    o.set(s, this.position.y, this.position.z),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    o.set(this.position.x, -r, this.position.z),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    o.set(this.position.x, r, this.position.z),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    o.set(this.position.x, this.position.y, -a),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    o.set(this.position.x, this.position.y, a),
                    (o = this.avoid(o)).multiplyScalar(5),
                    i.add(o),
                    Math.random() > 0.5 && this.flock(t),
                    this.move();
                }),
                (this.flock = function (t) {
                  n && i.add(this.reach(n, 0.005)),
                    i.add(this.alignment(t)),
                    i.add(this.cohesion(t)),
                    i.add(this.separation(t));
                }),
                (this.move = function () {
                  this.velocity.add(i);
                  var t = this.velocity.length();
                  t > 2.5 && this.velocity.divideScalar(t / 2.5),
                    this.position.add(this.velocity),
                    i.set(0, 0, 0);
                }),
                (this.checkBounds = function () {
                  this.position.x > s && (this.position.x = -s),
                    this.position.x < -s && (this.position.x = s),
                    this.position.y > r && (this.position.y = -r),
                    this.position.y < -r && (this.position.y = r),
                    this.position.z > a && (this.position.z = -a),
                    this.position.z < -a && (this.position.z = a);
                }),
                (this.avoid = function (e) {
                  var i = new t.Vector3();
                  return (
                    i.copy(this.position),
                    i.sub(e),
                    i.multiplyScalar(1 / this.position.distanceToSquared(e)),
                    i
                  );
                }),
                (this.repulse = function (e) {
                  var n = this.position.distanceTo(e);
                  if (n < 150) {
                    var o = new t.Vector3();
                    o.subVectors(this.position, e),
                      o.multiplyScalar(0.5 / n),
                      i.add(o);
                  }
                }),
                (this.reach = function (e, i) {
                  var n = new t.Vector3();
                  return n.subVectors(e, this.position), n.multiplyScalar(i), n;
                }),
                (this.alignment = function (e) {
                  var i,
                    n,
                    o = new t.Vector3(),
                    s = 0;
                  const r = (100 * l.alignment) / 20;
                  for (var a = 0, h = e.length; a < h; a++)
                    Math.random() > 0.6 ||
                      ((n = (i = e[a]).position.distanceTo(this.position)) >
                        0 &&
                        n <= r &&
                        (o.add(i.velocity), s++));
                  if (s > 0) {
                    o.divideScalar(s);
                    var c = o.length();
                    c > 0.1 && o.divideScalar(c / 0.1);
                  }
                  return o;
                }),
                (this.cohesion = function (e) {
                  var i,
                    n,
                    o = new t.Vector3(),
                    s = new t.Vector3(),
                    r = 0;
                  const a = (100 * l.cohesion) / 20;
                  for (var h = 0, c = e.length; h < c; h++)
                    Math.random() > 0.6 ||
                      ((n = (i = e[h]).position.distanceTo(this.position)) >
                        0 &&
                        n <= a &&
                        (o.add(i.position), r++));
                  r > 0 && o.divideScalar(r), s.subVectors(o, this.position);
                  var u = s.length();
                  return u > 0.1 && s.divideScalar(u / 0.1), s;
                }),
                (this.separation = function (e) {
                  var i,
                    n,
                    o = new t.Vector3(),
                    s = new t.Vector3();
                  const r = (100 * l.separation) / 20;
                  for (var a = 0, h = e.length; a < h; a++)
                    Math.random() > 0.6 ||
                      ((n = (i = e[a]).position.distanceTo(this.position)) >
                        0 &&
                        n <= r &&
                        (s.subVectors(this.position, i.position),
                        s.normalize(),
                        s.divideScalar(n),
                        o.add(s)));
                  return o;
                });
            }),
            (t.BirdGeometry = function (e) {
              e.quantity && ((b = Math.pow(2, e.quantity)), (x = b * b));
              const i = 3 * x,
                n = 3 * i;
              t.BufferGeometry.call(this);
              const o = new t.BufferAttribute(new Float32Array(3 * n), 3),
                s = new t.BufferAttribute(new Float32Array(3 * n), 3),
                r = new t.BufferAttribute(new Float32Array(2 * n), 2),
                a = new t.BufferAttribute(new Float32Array(n), 1);
              this.setAttribute || (this.setAttribute = this.addAttribute),
                this.setAttribute("position", o),
                this.setAttribute("birdColor", s),
                this.setAttribute("reference", r),
                this.setAttribute("birdVertex", a);
              let l = 0;
              const h = function () {
                  for (let t = 0; t < arguments.length; t++)
                    o.array[l++] = arguments[t];
                },
                c = e.wingSpan || 20,
                u = e.birdSize || 1;
              for (let t = 0; t < x; t++)
                h(0, -0, -20 * u, 0, 4 * u, -20 * u, 0, 0, 30 * u),
                  h(0, 0, -15 * u, -c * u, 0, 0, 0, 0, 15 * u),
                  h(0, 0, 15 * u, c * u, 0, 0, 0, 0, -15 * u);
              const d = {};
              for (l = 0; l < 3 * i; l++) {
                const t = ~~(l / 3),
                  i = (t % b) / b,
                  n = ~~(t / b) / b,
                  o = ~~(l / 9) / x,
                  h = o.toString(),
                  c = -1 != e.colorMode.indexOf("Gradient");
                let u;
                (u = !c && d[h] ? d[h] : e.effect.getNewCol(o)),
                  c || d[h] || (d[h] = u),
                  (s.array[3 * l + 0] = u.r),
                  (s.array[3 * l + 1] = u.g),
                  (s.array[3 * l + 2] = u.b),
                  (r.array[2 * l] = i),
                  (r.array[2 * l + 1] = n),
                  (a.array[l] = l % 9);
              }
              return this.scale(0.2, 0.2, 0.2);
            }),
            (t.BirdGeometry.prototype = Object.create(
              t.BufferGeometry.prototype
            ));
        },
        V =
          "uniform float time;\nuniform float delta;\n\nvoid main() {\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec4 tmpPos = texture2D( texturePosition, uv );\n  vec3 position = tmpPos.xyz;\n  vec3 velocity = texture2D( textureVelocity, uv ).xyz;\n\n  float phase = tmpPos.w;\n\n  phase = mod( ( phase + delta +\n    length( velocity.xz ) * delta * 3. +\n    max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );\n\n  gl_FragColor = vec4( position + velocity * delta * 15. , phase );\n\n}",
        R =
          "uniform float time;\nuniform float testing;\nuniform float delta; // about 0.016\nuniform float separationDistance; // 20\nuniform float alignmentDistance; // 40\nuniform float cohesionDistance;\nuniform float speedLimit;\nuniform float freedomFactor;\nuniform vec3 predator;\n\nconst float width = resolution.x;\nconst float height = resolution.y;\n\nconst float PI = 3.141592653589793;\nconst float PI_2 = PI * 2.0;\n// const float VISION = PI * 0.55;\n\nfloat zoneRadius = 40.0;\nfloat zoneRadiusSquared = 1600.0;\n\nfloat separationThresh = 0.45;\nfloat alignmentThresh = 0.65;\n\nconst float UPPER_BOUNDS = BOUNDS;\nconst float LOWER_BOUNDS = -UPPER_BOUNDS;\n\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n\n  zoneRadius = separationDistance + alignmentDistance + cohesionDistance;\n  separationThresh = separationDistance / zoneRadius;\n  alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;\n  zoneRadiusSquared = zoneRadius * zoneRadius;\n\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec3 birdPosition, birdVelocity;\n\n  vec3 selfPosition = texture2D( texturePosition, uv ).xyz;\n  vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;\n\n  float dist;\n  vec3 dir; // direction\n  float distSquared;\n\n  float separationSquared = separationDistance * separationDistance;\n  float cohesionSquared = cohesionDistance * cohesionDistance;\n\n  float f;\n  float percent;\n\n  vec3 velocity = selfVelocity;\n\n  float limit = speedLimit;\n\n  dir = predator * UPPER_BOUNDS - selfPosition;\n  dir.z = 0.;\n  // dir.z *= 0.6;\n  dist = length( dir );\n  distSquared = dist * dist;\n\n  float preyRadius = 150.0;\n  float preyRadiusSq = preyRadius * preyRadius;\n\n  // move birds away from predator\n  if (dist < preyRadius) {\n\n    f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;\n    velocity += normalize( dir ) * f;\n    limit += 5.0;\n  }\n\n  // if (testing == 0.0) {}\n  // if ( rand( uv + time ) < freedomFactor ) {}\n\n  // Attract flocks to the center\n  vec3 central = vec3( 0., 0., 0. );\n  dir = selfPosition - central;\n  dist = length( dir );\n\n  dir.y *= 2.5;\n  velocity -= normalize( dir ) * delta * 5.;\n\n  for (float y=0.0;y<height;y++) {\n    for (float x=0.0;x<width;x++) {\n\n      vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;\n      birdPosition = texture2D( texturePosition, ref ).xyz;\n\n      dir = birdPosition - selfPosition;\n      dist = length(dir);\n\n      if (dist < 0.0001) continue;\n\n      distSquared = dist * dist;\n\n      if (distSquared > zoneRadiusSquared ) continue;\n\n      percent = distSquared / zoneRadiusSquared;\n\n      if ( percent < separationThresh ) { // low\n\n        // Separation - Move apart for comfort\n        f = (separationThresh / percent - 1.0) * delta;\n        velocity -= normalize(dir) * f;\n\n      } else if ( percent < alignmentThresh ) { // high\n\n        // Alignment - fly the same direction\n        float threshDelta = alignmentThresh - separationThresh;\n        float adjustedPercent = ( percent - separationThresh ) / threshDelta;\n\n        birdVelocity = texture2D( textureVelocity, ref ).xyz;\n\n        f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;\n        velocity += normalize(birdVelocity) * f;\n\n      } else {\n\n        // Attraction / Cohesion - move closer\n        float threshDelta = 1.0 - alignmentThresh;\n        float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;\n\n        f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;\n\n        velocity += normalize(dir) * f;\n\n      }\n    }\n  }\n\n  // this make tends to fly around than down or up\n  // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);\n\n  // Speed Limits\n  if ( length( velocity ) > limit ) {\n    velocity = normalize( velocity ) * limit;\n  }\n\n  gl_FragColor = vec4( velocity, 1.0 );\n\n}",
        E =
          "attribute vec2 reference;\nattribute float birdVertex;\n\nattribute vec3 birdColor;\n\nuniform sampler2D texturePosition;\nuniform sampler2D textureVelocity;\n\nvarying vec4 vColor;\nvarying float z;\n\nuniform float time;\nuniform float birdSize;\n\nvoid main() {\n\n  vec4 tmpPos = texture2D( texturePosition, reference );\n  vec3 pos = tmpPos.xyz;\n  vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);\n\n  vec3 newPosition = position;\n\n  if ( birdVertex == 4.0 || birdVertex == 7.0 ) {\n    // flap wings\n    newPosition.y = sin( tmpPos.w ) * 5. * birdSize;\n  }\n\n  newPosition = mat3( modelMatrix ) * newPosition;\n\n  velocity.z *= -1.;\n  float xz = length( velocity.xz );\n  float xyz = 1.;\n  float x = sqrt( 1. - velocity.y * velocity.y );\n\n  float cosry = velocity.x / xz;\n  float sinry = velocity.z / xz;\n\n  float cosrz = x / xyz;\n  float sinrz = velocity.y / xyz;\n\n  mat3 maty =  mat3(\n    cosry, 0, -sinry,\n    0    , 1, 0     ,\n    sinry, 0, cosry\n  );\n\n  mat3 matz =  mat3(\n    cosrz , sinrz, 0,\n    -sinrz, cosrz, 0,\n    0     , 0    , 1\n  );\n  newPosition =  maty * matz * newPosition;\n  newPosition += pos;\n  z = newPosition.z;\n\n  vColor = vec4( birdColor, 1.0 );\n  gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );\n}",
        P =
          "varying vec4 vColor;\nvarying float z;\nuniform vec3 color;\nvoid main() {\n  // Fake colors for now\n  float rr = 0.2 + ( 1000. - z ) / 1000. * vColor.x;\n  float gg = 0.2 + ( 1000. - z ) / 1000. * vColor.y;\n  float bb = 0.2 + ( 1000. - z ) / 1000. * vColor.z;\n  gl_FragColor = vec4( rr, gg, bb, 1. );\n}",
        D = function (t) {
          const e = t.image.data;
          let i = 0;
          const n = e.length;
          return (() => {
            const t = [];
            for (; i < n; ) {
              const n = Math.random() * M - T,
                o = Math.random() * M - T,
                s = Math.random() * M - T;
              (e[i + 0] = n),
                (e[i + 1] = o),
                (e[i + 2] = s),
                (e[i + 3] = 1),
                t.push((i += 4));
            }
            return t;
          })();
        },
        O = function (t) {
          const e = t.image.data;
          let i = 0;
          const n = e.length;
          return (() => {
            const t = [];
            for (; i < n; ) {
              const n = Math.random() - 0.5,
                o = Math.random() - 0.5,
                s = Math.random() - 0.5;
              (e[i + 0] = 10 * n),
                (e[i + 1] = 10 * o),
                (e[i + 2] = 10 * s),
                (e[i + 3] = 1),
                t.push((i += 4));
            }
            return t;
          })();
        };
      class A extends n.b {
        static initClass() {
          this.prototype.defaultOptions = {
            backgroundColor: 465199,
            color1: 16711680,
            color2: 53759,
            colorMode: "varianceGradient",
            birdSize: 1,
            wingSpan: 30,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            quantity: 5,
          };
        }
        constructor(t) {
          (g = t.THREE || g), C(g), super(t);
        }
        initComputeRenderer() {
          this.gpuCompute = new y(b, b, this.renderer, g);
          const t = this.gpuCompute.createTexture(),
            e = this.gpuCompute.createTexture();
          D(t),
            O(e),
            (this.velocityVariable = this.gpuCompute.addVariable(
              "textureVelocity",
              R,
              e
            )),
            (this.positionVariable = this.gpuCompute.addVariable(
              "texturePosition",
              V,
              t
            )),
            this.gpuCompute.setVariableDependencies(this.velocityVariable, [
              this.positionVariable,
              this.velocityVariable,
            ]),
            this.gpuCompute.setVariableDependencies(this.positionVariable, [
              this.positionVariable,
              this.velocityVariable,
            ]),
            (this.positionUniforms = this.positionVariable.material.uniforms),
            (this.velocityUniforms = this.velocityVariable.material.uniforms),
            (this.positionUniforms.time = { value: 0 }),
            (this.positionUniforms.delta = { value: 0 }),
            (this.velocityUniforms.time = { value: 1 }),
            (this.velocityUniforms.delta = { value: 0 }),
            (this.velocityUniforms.testing = { value: 1 }),
            (this.velocityUniforms.separationDistance = { value: 1 }),
            (this.velocityUniforms.alignmentDistance = { value: 1 }),
            (this.velocityUniforms.cohesionDistance = { value: 1 }),
            (this.velocityUniforms.speedLimit = { value: 1 }),
            (this.velocityUniforms.freedomFactor = { value: 1 }),
            (this.velocityUniforms.predator = { value: new g.Vector3() }),
            (this.velocityVariable.material.defines.BOUNDS = M.toFixed(2)),
            (this.velocityVariable.wrapS = g.RepeatWrapping),
            (this.velocityVariable.wrapT = g.RepeatWrapping),
            (this.positionVariable.wrapS = g.RepeatWrapping),
            (this.positionVariable.wrapT = g.RepeatWrapping);
          const i = this.gpuCompute.init();
          null !== i && console.error(i);
        }
        initGpgpuBirds() {
          const t = Object.assign({}, this.options, { effect: this }),
            e = new g.BirdGeometry(t);
          this.birdUniforms = {
            color: { value: new g.Color(16720384) },
            texturePosition: { value: null },
            textureVelocity: { value: null },
            time: { value: 1 },
            delta: { value: 0 },
            birdSize: { value: this.options.birdSize },
          };
          const i = new g.ShaderMaterial({
              uniforms: this.birdUniforms,
              vertexShader: E,
              fragmentShader: P,
              side: g.DoubleSide,
            }),
            n = new g.Mesh(e, i);
          return (
            (n.rotation.y = Math.PI / 2),
            (n.matrixAutoUpdate = !1),
            n.updateMatrix(),
            this.scene.add(n)
          );
        }
        getNewCol(t) {
          const e = this.options,
            i = null != e.color1 ? e.color1 : 4456448,
            n = null != e.color2 ? e.color2 : 6684672,
            o = new g.Color(i),
            s = new g.Color(n);
          let r, a;
          if (
            ((a = -1 != e.colorMode.indexOf("Gradient") ? Math.random() : t),
            0 == e.colorMode.indexOf("variance"))
          ) {
            const t = (o.r + Math.random() * s.r).clamp(0, 1),
              e = (o.g + Math.random() * s.g).clamp(0, 1),
              i = (o.b + Math.random() * s.b).clamp(0, 1);
            r = new g.Color(t, e, i);
          } else
            r =
              0 == e.colorMode.indexOf("mix")
                ? new g.Color(i + a * n)
                : o.lerp(s, a);
          return r;
        }
        onInit() {
          (this.camera = new g.PerspectiveCamera(
            75,
            this.width / this.height,
            1,
            3e3
          )),
            (this.camera.position.z = 350),
            (this.fog = new g.Fog(16777215, 100, 1e3)),
            (this.mouseX = this.mouseY = 0);
          const t = (this.birds = []),
            e = (this.boids = []),
            i = this.options;
          let n, o;
          if (w)
            try {
              this.initComputeRenderer(),
                (this.valuesChanger = this.valuesChanger.bind(this)),
                this.valuesChanger(),
                this.initGpgpuBirds();
            } catch (t) {
              console.error("[vanta.js] birds init error: ", t);
            }
          else {
            const l = 6 * Math.pow(2, i.quantity);
            for (var s = 0; s < l; s++) {
              ((n = e[s] = new S(i)).position.x = 400 * Math.random() - 200),
                (n.position.y = 400 * Math.random() - 200),
                (n.position.z = 400 * Math.random() - 200),
                (n.velocity.x = 2 * Math.random() - 1),
                (n.velocity.y = 2 * Math.random() - 1),
                (n.velocity.z = 2 * Math.random() - 1),
                n.setWorldSize(500, 500, 300);
              const h = -1 != i.colorMode.indexOf("Gradient"),
                c = new z(i);
              for (var r = 0; r < c.faces.length; r++)
                if (h)
                  for (var a = 0; a < 3; a++) {
                    const t = this.getNewCol();
                    c.faces[r].vertexColors[a] = t;
                  }
                else {
                  const t = this.getNewCol(s / l);
                  (c.faces[r].vertexColors[0] = t),
                    (c.faces[r].vertexColors[1] = t),
                    (c.faces[r].vertexColors[2] = t);
                }
              ((o = t[s] =
                new g.Mesh(
                  c,
                  new g.MeshBasicMaterial({
                    color: 16777215,
                    side: g.DoubleSide,
                    vertexColors: g.VertexColors,
                  })
                )).phase = Math.floor(62.83 * Math.random())),
                (o.position.x = e[s].position.x),
                (o.position.y = e[s].position.y),
                (o.position.z = e[s].position.z),
                this.scene.add(o);
            }
          }
        }
        valuesChanger() {
          this.velocityUniforms &&
            ((this.velocityUniforms.separationDistance.value =
              this.options.separation),
            (this.velocityUniforms.alignmentDistance.value =
              this.options.alignment),
            (this.velocityUniforms.speedLimit.value = this.options.speedLimit),
            (this.velocityUniforms.cohesionDistance.value =
              this.options.cohesion));
        }
        onUpdate() {
          (this.now = performance.now()), this.last || (this.last = this.now);
          let t = (this.now - this.last) / 1e3;
          if ((t > 1 && (t = 1), (this.last = this.now), w))
            (this.positionUniforms.time.value = this.now),
              (this.positionUniforms.delta.value = t),
              (this.velocityUniforms.time.value = this.now),
              (this.velocityUniforms.delta.value = t),
              (this.birdUniforms.time.value = this.now),
              (this.birdUniforms.delta.value = t),
              this.velocityUniforms.predator.value.set(
                this.mouseX,
                -this.mouseY,
                0
              ),
              (this.mouseX = 1e4),
              (this.mouseY = 1e4),
              this.gpuCompute.compute(),
              (this.birdUniforms.texturePosition.value =
                this.gpuCompute.getCurrentRenderTarget(
                  this.positionVariable
                ).texture),
              (this.birdUniforms.textureVelocity.value =
                this.gpuCompute.getCurrentRenderTarget(
                  this.velocityVariable
                ).texture);
          else {
            const t = this.birds,
              n = this.boids;
            let o, s;
            for (var e = 0, i = t.length; e < i; e++)
              (o = n[e]).run(n),
                ((s = t[e]).rotation.y = Math.atan2(
                  -o.velocity.z,
                  o.velocity.x
                )),
                (s.rotation.z = Math.asin(o.velocity.y / o.velocity.length())),
                (s.phase =
                  (s.phase + (Math.max(0, s.rotation.z) + 0.1)) % 62.83),
                (s.geometry.vertices[5].y = s.geometry.vertices[4].y =
                  5 * Math.sin(s.phase) * this.options.birdSize),
                (s.geometry.verticesNeedUpdate = !0),
                (s.position.x = n[e].position.x),
                (s.position.y = n[e].position.y),
                (s.position.z = n[e].position.z);
          }
        }
        onMouseMove(t, e) {
          if (((this.mouseX = t - 0.5), (this.mouseY = e - 0.5), !w)) {
            const t = this.boids;
            let e;
            for (
              var i = new g.Vector3(
                  this.mouseX * this.width,
                  -this.mouseY * this.height,
                  0
                ),
                n = 0,
                o = t.length;
              n < o;
              n++
            )
              (e = t[n]), (i.z = e.position.z), e.repulse(i);
          }
        }
        onDestroy() {}
        onResize() {}
      }
      A.initClass();
      e.default = n.a.register("BIRDS", A);
    },
  });
});
