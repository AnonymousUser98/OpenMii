// src/vendor/camera-controls.js
// camera-controls by yomotsu (editor camera).
//
// Third-party code, bundled as-is (names are minified). Licences: app/about/third-party-notices.js

var _i = { LEFT: 1, RIGHT: 2, MIDDLE: 4 },
  Be = Object.freeze({
    NONE: 0,
    ROTATE: 1,
    TRUCK: 2,
    SCREEN_PAN: 4,
    OFFSET: 8,
    DOLLY: 16,
    ZOOM: 32,
    TOUCH_ROTATE: 64,
    TOUCH_TRUCK: 128,
    TOUCH_SCREEN_PAN: 256,
    TOUCH_OFFSET: 512,
    TOUCH_DOLLY: 1024,
    TOUCH_ZOOM: 2048,
    TOUCH_DOLLY_TRUCK: 4096,
    TOUCH_DOLLY_SCREEN_PAN: 8192,
    TOUCH_DOLLY_OFFSET: 16384,
    TOUCH_DOLLY_ROTATE: 32768,
    TOUCH_ZOOM_TRUCK: 65536,
    TOUCH_ZOOM_OFFSET: 131072,
    TOUCH_ZOOM_SCREEN_PAN: 262144,
    TOUCH_ZOOM_ROTATE: 524288,
  }),
  A1 = { NONE: 0, IN: 1, OUT: -1 };
function Jf(e) {
  return e.isPerspectiveCamera;
}
function $d(e) {
  return e.isOrthographicCamera;
}
var Zd = Math.PI * 2,
  $D = Math.PI / 2,
  sN = 0.00001,
  a3 = Math.PI / 180;
function Yl(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
function oi(e, t = sN) {
  return Math.abs(e) < t;
}
function Tn(e, t, r = sN) {
  return oi(e - t, r);
}
function JD(e, t) {
  return Math.round(e / t) * t;
}
function l3(e) {
  if (isFinite(e)) return e;
  if (e < 0) return -Number.MAX_VALUE;
  return Number.MAX_VALUE;
}
function c3(e) {
  if (Math.abs(e) < Number.MAX_VALUE) return e;
  return e * (1 / 0);
}
function zb(e, t, r, n, i = 1 / 0, o) {
  n = Math.max(0.0001, n);
  let s = 2 / n,
    a = s * o,
    l = 1 / (1 + a + 0.48 * a * a + 0.235 * a * a * a),
    c = e - t,
    u = t,
    d = i * n;
  ((c = Yl(c, -d, d)), (t = e - c));
  let h = (r.value + s * c) * o;
  r.value = (r.value - s * h) * l;
  let f = t + (c + h) * l;
  if (u - e > 0 === f > u) ((f = u), (r.value = (f - u) / o));
  return f;
}
function eN(e, t, r, n, i = 1 / 0, o, s) {
  n = Math.max(0.0001, n);
  let a = 2 / n,
    l = a * o,
    c = 1 / (1 + l + 0.48 * l * l + 0.235 * l * l * l),
    { x: u, y: d, z: h } = t,
    f = e.x - u,
    p = e.y - d,
    g = e.z - h,
    m = u,
    A = d,
    y = h,
    x = i * n,
    b = x * x,
    v = f * f + p * p + g * g;
  if (v > b) {
    let L = Math.sqrt(v);
    ((f = (f / L) * x), (p = (p / L) * x), (g = (g / L) * x));
  }
  ((u = e.x - f), (d = e.y - p), (h = e.z - g));
  let _ = (r.x + a * f) * o,
    w = (r.y + a * p) * o,
    S = (r.z + a * g) * o;
  ((r.x = (r.x - a * _) * c),
    (r.y = (r.y - a * w) * c),
    (r.z = (r.z - a * S) * c),
    (s.x = u + (f + _) * c),
    (s.y = d + (p + w) * c),
    (s.z = h + (g + S) * c));
  let E = m - e.x,
    T = A - e.y,
    M = y - e.z,
    C = s.x - m,
    R = s.y - A,
    B = s.z - y;
  if (E * C + T * R + M * B > 0)
    ((s.x = m),
      (s.y = A),
      (s.z = y),
      (r.x = (s.x - m) / o),
      (r.y = (s.y - A) / o),
      (r.z = (s.z - y) / o));
  return s;
}
function WE(e, t) {
  (t.set(0, 0),
    e.forEach((r) => {
      ((t.x += r.clientX), (t.y += r.clientY));
    }),
    (t.x /= e.length),
    (t.y /= e.length));
}
function QE(e, t) {
  if ($d(e)) return !0;
  return !1;
}
class aN {
  _listeners = {};
  addEventListener(e, t) {
    let r = this._listeners;
    if (r[e] === void 0) r[e] = [];
    if (r[e].indexOf(t) === -1) r[e].push(t);
  }
  hasEventListener(e, t) {
    let r = this._listeners;
    return r[e] !== void 0 && r[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    let n = this._listeners[e];
    if (n !== void 0) {
      let i = n.indexOf(t);
      if (i !== -1) n.splice(i, 1);
    }
  }
  removeAllEventListeners(e) {
    if (!e) {
      this._listeners = {};
      return;
    }
    if (Array.isArray(this._listeners[e])) this._listeners[e].length = 0;
  }
  dispatchEvent(e) {
    let r = this._listeners[e.type];
    if (r !== void 0) {
      e.target = this;
      let n = r.slice(0);
      for (let i = 0, o = n.length; i < o; i++) n[i].call(this, e);
    }
  }
}
var HJ = "3.1.2",
  Vb = 0.125,
  GJ = /Mac/.test(globalThis?.navigator?.platform),
  fr,
  tN,
  Wb,
  YE,
  ra,
  Dr,
  gn,
  y1,
  u3,
  vc,
  Cc,
  e0,
  rN,
  nN,
  Ia,
  x1,
  b1,
  iN,
  XE,
  oN,
  jE,
  KE,
  Qb;
class ll extends aN {
  static install(e) {
    ((fr = e.THREE),
      (tN = Object.freeze(new fr.Vector3(0, 0, 0))),
      (Wb = Object.freeze(new fr.Vector3(0, 1, 0))),
      (YE = Object.freeze(new fr.Vector3(0, 0, 1))),
      (ra = new fr.Vector2()),
      (Dr = new fr.Vector3()),
      (gn = new fr.Vector3()),
      (y1 = new fr.Vector3()),
      (u3 = new fr.Vector3()),
      (vc = new fr.Vector3()),
      (Cc = new fr.Vector3()),
      (e0 = new fr.Vector3()),
      (rN = new fr.Vector3()),
      (nN = new fr.Vector3()),
      (Ia = new fr.Spherical()),
      (x1 = new fr.Spherical()),
      (b1 = new fr.Box3()),
      (iN = new fr.Box3()),
      (XE = new fr.Sphere()),
      (oN = new fr.Quaternion()),
      (jE = new fr.Quaternion()),
      (KE = new fr.Matrix4()),
      (Qb = new fr.Raycaster()));
  }
  static get ACTION() {
    return Be;
  }
  minPolarAngle = 0;
  maxPolarAngle = Math.PI;
  minAzimuthAngle = -1 / 0;
  maxAzimuthAngle = 1 / 0;
  minDistance = Number.EPSILON;
  maxDistance = 1 / 0;
  infinityDolly = !1;
  minZoom = 0.01;
  maxZoom = 1 / 0;
  smoothTime = 0.25;
  draggingSmoothTime = 0.125;
  maxSpeed = 1 / 0;
  azimuthRotateSpeed = 1;
  polarRotateSpeed = 1;
  dollySpeed = 1;
  dollyDragInverted = !1;
  truckSpeed = 2;
  dollyToCursor = !1;
  dragToOffset = !1;
  boundaryFriction = 0;
  restThreshold = 0.01;
  colliderMeshes = [];
  mouseButtons;
  touches;
  cancel = () => {};
  lockPointer;
  unlockPointer;
  _enabled = !0;
  _camera;
  _yAxisUpSpace;
  _yAxisUpSpaceInverse;
  _state = Be.NONE;
  _domElement;
  _viewport = null;
  _target;
  _targetEnd;
  _focalOffset;
  _focalOffsetEnd;
  _spherical;
  _sphericalEnd;
  _lastDistance;
  _zoom;
  _zoomEnd;
  _lastZoom;
  _cameraUp0;
  _target0;
  _position0;
  _zoom0;
  _focalOffset0;
  _dollyControlCoord;
  _changedDolly = 0;
  _changedZoom = 0;
  _nearPlaneCorners;
  _hasRested = !0;
  _boundary;
  _boundaryEnclosesCamera = !1;
  _needsUpdate = !0;
  _updatedLastTime = !1;
  _elementRect = new DOMRect();
  _isDragging = !1;
  _dragNeedsUpdate = !0;
  _activePointers = [];
  _lockedPointer = null;
  _interactiveArea = new DOMRect(0, 0, 1, 1);
  _isUserControllingRotate = !1;
  _isUserControllingDolly = !1;
  _isUserControllingTruck = !1;
  _isUserControllingOffset = !1;
  _isUserControllingZoom = !1;
  _lastDollyDirection = A1.NONE;
  _thetaVelocity = { value: 0 };
  _phiVelocity = { value: 0 };
  _radiusVelocity = { value: 0 };
  _targetVelocity = new fr.Vector3();
  _focalOffsetVelocity = new fr.Vector3();
  _zoomVelocity = { value: 0 };
  set verticalDragToForward(e) {}
  constructor(e, t) {
    super();
    ((this._camera = e),
      (this._yAxisUpSpace = new fr.Quaternion().setFromUnitVectors(this._camera.up, Wb)),
      (this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert()),
      (this._state = Be.NONE),
      (this._target = new fr.Vector3()),
      (this._targetEnd = this._target.clone()),
      (this._focalOffset = new fr.Vector3()),
      (this._focalOffsetEnd = this._focalOffset.clone()),
      (this._spherical = new fr.Spherical().setFromVector3(
        Dr.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace),
      )),
      (this._sphericalEnd = this._spherical.clone()),
      (this._lastDistance = this._spherical.radius),
      (this._zoom = this._camera.zoom),
      (this._zoomEnd = this._zoom),
      (this._lastZoom = this._zoom),
      (this._nearPlaneCorners = [
        new fr.Vector3(),
        new fr.Vector3(),
        new fr.Vector3(),
        new fr.Vector3(),
      ]),
      this._updateNearPlaneCorners(),
      (this._boundary = new fr.Box3(
        new fr.Vector3(-1 / 0, -1 / 0, -1 / 0),
        new fr.Vector3(1 / 0, 1 / 0, 1 / 0),
      )),
      (this._cameraUp0 = this._camera.up.clone()),
      (this._target0 = this._target.clone()),
      (this._position0 = this._camera.position.clone()),
      (this._zoom0 = this._zoom),
      (this._focalOffset0 = this._focalOffset.clone()),
      (this._dollyControlCoord = new fr.Vector2()),
      (this.mouseButtons = {
        left: Be.ROTATE,
        middle: Be.DOLLY,
        right: Be.TRUCK,
        wheel: Jf(this._camera) ? Be.DOLLY : $d(this._camera) ? Be.ZOOM : Be.NONE,
      }),
      (this.touches = {
        one: Be.TOUCH_ROTATE,
        two: Jf(this._camera)
          ? Be.TOUCH_DOLLY_TRUCK
          : $d(this._camera)
            ? Be.TOUCH_ZOOM_TRUCK
            : Be.NONE,
        three: Be.TOUCH_TRUCK,
      }));
    let r = new fr.Vector2(),
      n = new fr.Vector2(),
      i = new fr.Vector2(),
      o = (m) => {
        if (!this._enabled || !this._domElement) return;
        if (
          this._interactiveArea.left !== 0 ||
          this._interactiveArea.top !== 0 ||
          this._interactiveArea.width !== 1 ||
          this._interactiveArea.height !== 1
        ) {
          let x = this._domElement.getBoundingClientRect(),
            b = m.clientX / x.width,
            v = m.clientY / x.height;
          if (
            b < this._interactiveArea.left ||
            b > this._interactiveArea.right ||
            v < this._interactiveArea.top ||
            v > this._interactiveArea.bottom
          )
            return;
        }
        let A =
          m.pointerType !== "mouse"
            ? null
            : (m.buttons & _i.LEFT) === _i.LEFT
              ? _i.LEFT
              : (m.buttons & _i.MIDDLE) === _i.MIDDLE
                ? _i.MIDDLE
                : (m.buttons & _i.RIGHT) === _i.RIGHT
                  ? _i.RIGHT
                  : null;
        if (A !== null) {
          let x = this._findPointerByMouseButton(A);
          x && this._disposePointer(x);
        }
        if ((m.buttons & _i.LEFT) === _i.LEFT && this._lockedPointer) return;
        let y = {
          pointerId: m.pointerId,
          clientX: m.clientX,
          clientY: m.clientY,
          deltaX: 0,
          deltaY: 0,
          mouseButton: A,
        };
        (this._activePointers.push(y),
          this._domElement.ownerDocument.removeEventListener("pointermove", s, { passive: !1 }),
          this._domElement.ownerDocument.removeEventListener("pointerup", a),
          this._domElement.ownerDocument.addEventListener("pointermove", s, { passive: !1 }),
          this._domElement.ownerDocument.addEventListener("pointerup", a),
          (this._isDragging = !0),
          d(m));
      },
      s = (m) => {
        if (m.cancelable) m.preventDefault();
        let A = m.pointerId,
          y = this._lockedPointer || this._findPointerById(A);
        if (!y) return;
        if (
          ((y.clientX = m.clientX),
          (y.clientY = m.clientY),
          (y.deltaX = m.movementX),
          (y.deltaY = m.movementY),
          (this._state = 0),
          m.pointerType === "touch")
        )
          switch (this._activePointers.length) {
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
        else {
          if (
            (!this._isDragging && this._lockedPointer) ||
            (this._isDragging && (m.buttons & _i.LEFT) === _i.LEFT)
          )
            this._state = this._state | this.mouseButtons.left;
          if (this._isDragging && (m.buttons & _i.MIDDLE) === _i.MIDDLE)
            this._state = this._state | this.mouseButtons.middle;
          if (this._isDragging && (m.buttons & _i.RIGHT) === _i.RIGHT)
            this._state = this._state | this.mouseButtons.right;
        }
        h();
      },
      a = (m) => {
        let A = this._findPointerById(m.pointerId);
        if (A && A === this._lockedPointer) return;
        if ((A && this._disposePointer(A), m.pointerType === "touch"))
          switch (this._activePointers.length) {
            case 0:
              this._state = Be.NONE;
              break;
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
        else this._state = Be.NONE;
        f();
      },
      l = -1,
      c = (m) => {
        if (!this._domElement) return;
        if (!this._enabled || this.mouseButtons.wheel === Be.NONE) return;
        if (
          this._interactiveArea.left !== 0 ||
          this._interactiveArea.top !== 0 ||
          this._interactiveArea.width !== 1 ||
          this._interactiveArea.height !== 1
        ) {
          let _ = this._domElement.getBoundingClientRect(),
            w = m.clientX / _.width,
            S = m.clientY / _.height;
          if (
            w < this._interactiveArea.left ||
            w > this._interactiveArea.right ||
            S < this._interactiveArea.top ||
            S > this._interactiveArea.bottom
          )
            return;
        }
        if (
          (m.preventDefault(),
          this.dollyToCursor ||
            this.mouseButtons.wheel === Be.ROTATE ||
            this.mouseButtons.wheel === Be.TRUCK)
        ) {
          let _ = performance.now();
          if (l - _ < 1000) this._getClientRect(this._elementRect);
          l = _;
        }
        let A = GJ ? -1 : -3,
          y = m.deltaMode === 1 && !m.ctrlKey ? m.deltaY / A : m.deltaY / (A * 10),
          x = this.dollyToCursor
            ? ((m.clientX - this._elementRect.x) / this._elementRect.width) * 2 - 1
            : 0,
          b = this.dollyToCursor
            ? ((m.clientY - this._elementRect.y) / this._elementRect.height) * -2 + 1
            : 0;
        switch (m.ctrlKey ? Be.ZOOM : this.mouseButtons.wheel) {
          case Be.ROTATE: {
            (this._rotateInternal(m.deltaX, m.deltaY), (this._isUserControllingRotate = !0));
            break;
          }
          case Be.TRUCK: {
            (this._truckInternal(m.deltaX, m.deltaY, !1, !1), (this._isUserControllingTruck = !0));
            break;
          }
          case Be.SCREEN_PAN: {
            (this._truckInternal(m.deltaX, m.deltaY, !1, !0), (this._isUserControllingTruck = !0));
            break;
          }
          case Be.OFFSET: {
            (this._truckInternal(m.deltaX, m.deltaY, !0, !1), (this._isUserControllingOffset = !0));
            break;
          }
          case Be.DOLLY: {
            (this._dollyInternal(-y, x, b), (this._isUserControllingDolly = !0));
            break;
          }
          case Be.ZOOM: {
            (this._zoomInternal(-y, x, b), (this._isUserControllingZoom = !0));
            break;
          }
        }
        this.dispatchEvent({ type: "control" });
      },
      u = (m) => {
        if (!this._domElement || !this._enabled) return;
        if (this.mouseButtons.right === ll.ACTION.NONE) {
          let A = m instanceof PointerEvent ? m.pointerId : 0,
            y = this._findPointerById(A);
          (y && this._disposePointer(y),
            this._domElement.ownerDocument.removeEventListener("pointermove", s, { passive: !1 }),
            this._domElement.ownerDocument.removeEventListener("pointerup", a));
          return;
        }
        m.preventDefault();
      },
      d = (m) => {
        if (!this._enabled) return;
        if (
          (WE(this._activePointers, ra),
          this._getClientRect(this._elementRect),
          r.copy(ra),
          n.copy(ra),
          this._activePointers.length >= 2)
        ) {
          let y = ra.x - this._activePointers[1].clientX,
            x = ra.y - this._activePointers[1].clientY,
            b = Math.sqrt(y * y + x * x);
          i.set(0, b);
          let v = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5,
            _ = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
          n.set(v, _);
        }
        if (((this._state = 0), !m)) {
          if (this._lockedPointer) this._state = this._state | this.mouseButtons.left;
        } else if ("pointerType" in m && m.pointerType === "touch")
          switch (this._activePointers.length) {
            case 1:
              this._state = this.touches.one;
              break;
            case 2:
              this._state = this.touches.two;
              break;
            case 3:
              this._state = this.touches.three;
              break;
          }
        else {
          if (!this._lockedPointer && (m.buttons & _i.LEFT) === _i.LEFT)
            this._state = this._state | this.mouseButtons.left;
          if ((m.buttons & _i.MIDDLE) === _i.MIDDLE)
            this._state = this._state | this.mouseButtons.middle;
          if ((m.buttons & _i.RIGHT) === _i.RIGHT)
            this._state = this._state | this.mouseButtons.right;
        }
        if (
          (this._state & Be.ROTATE) === Be.ROTATE ||
          (this._state & Be.TOUCH_ROTATE) === Be.TOUCH_ROTATE ||
          (this._state & Be.TOUCH_DOLLY_ROTATE) === Be.TOUCH_DOLLY_ROTATE ||
          (this._state & Be.TOUCH_ZOOM_ROTATE) === Be.TOUCH_ZOOM_ROTATE
        )
          ((this._sphericalEnd.theta = this._spherical.theta),
            (this._sphericalEnd.phi = this._spherical.phi),
            (this._thetaVelocity.value = 0),
            (this._phiVelocity.value = 0));
        if (
          (this._state & Be.TRUCK) === Be.TRUCK ||
          (this._state & Be.SCREEN_PAN) === Be.SCREEN_PAN ||
          (this._state & Be.TOUCH_TRUCK) === Be.TOUCH_TRUCK ||
          (this._state & Be.TOUCH_SCREEN_PAN) === Be.TOUCH_SCREEN_PAN ||
          (this._state & Be.TOUCH_DOLLY_TRUCK) === Be.TOUCH_DOLLY_TRUCK ||
          (this._state & Be.TOUCH_DOLLY_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN ||
          (this._state & Be.TOUCH_ZOOM_TRUCK) === Be.TOUCH_ZOOM_TRUCK ||
          (this._state & Be.TOUCH_ZOOM_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN
        )
          (this._targetEnd.copy(this._target), this._targetVelocity.set(0, 0, 0));
        if (
          (this._state & Be.DOLLY) === Be.DOLLY ||
          (this._state & Be.TOUCH_DOLLY) === Be.TOUCH_DOLLY ||
          (this._state & Be.TOUCH_DOLLY_TRUCK) === Be.TOUCH_DOLLY_TRUCK ||
          (this._state & Be.TOUCH_DOLLY_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN ||
          (this._state & Be.TOUCH_DOLLY_OFFSET) === Be.TOUCH_DOLLY_OFFSET ||
          (this._state & Be.TOUCH_DOLLY_ROTATE) === Be.TOUCH_DOLLY_ROTATE
        )
          ((this._sphericalEnd.radius = this._spherical.radius), (this._radiusVelocity.value = 0));
        if (
          (this._state & Be.ZOOM) === Be.ZOOM ||
          (this._state & Be.TOUCH_ZOOM) === Be.TOUCH_ZOOM ||
          (this._state & Be.TOUCH_ZOOM_TRUCK) === Be.TOUCH_ZOOM_TRUCK ||
          (this._state & Be.TOUCH_ZOOM_SCREEN_PAN) === Be.TOUCH_ZOOM_SCREEN_PAN ||
          (this._state & Be.TOUCH_ZOOM_OFFSET) === Be.TOUCH_ZOOM_OFFSET ||
          (this._state & Be.TOUCH_ZOOM_ROTATE) === Be.TOUCH_ZOOM_ROTATE
        )
          ((this._zoomEnd = this._zoom), (this._zoomVelocity.value = 0));
        if (
          (this._state & Be.OFFSET) === Be.OFFSET ||
          (this._state & Be.TOUCH_OFFSET) === Be.TOUCH_OFFSET ||
          (this._state & Be.TOUCH_DOLLY_OFFSET) === Be.TOUCH_DOLLY_OFFSET ||
          (this._state & Be.TOUCH_ZOOM_OFFSET) === Be.TOUCH_ZOOM_OFFSET
        )
          (this._focalOffsetEnd.copy(this._focalOffset), this._focalOffsetVelocity.set(0, 0, 0));
        this.dispatchEvent({ type: "controlstart" });
      },
      h = () => {
        if (!this._enabled || !this._dragNeedsUpdate) return;
        ((this._dragNeedsUpdate = !1), WE(this._activePointers, ra));
        let A =
            this._domElement &&
            this._domElement.ownerDocument.pointerLockElement === this._domElement
              ? this._lockedPointer || this._activePointers[0]
              : null,
          y = A ? -A.deltaX : n.x - ra.x,
          x = A ? -A.deltaY : n.y - ra.y;
        if (
          (n.copy(ra),
          (this._state & Be.ROTATE) === Be.ROTATE ||
            (this._state & Be.TOUCH_ROTATE) === Be.TOUCH_ROTATE ||
            (this._state & Be.TOUCH_DOLLY_ROTATE) === Be.TOUCH_DOLLY_ROTATE ||
            (this._state & Be.TOUCH_ZOOM_ROTATE) === Be.TOUCH_ZOOM_ROTATE)
        )
          (this._rotateInternal(y, x), (this._isUserControllingRotate = !0));
        if ((this._state & Be.DOLLY) === Be.DOLLY || (this._state & Be.ZOOM) === Be.ZOOM) {
          let b = this.dollyToCursor
              ? ((r.x - this._elementRect.x) / this._elementRect.width) * 2 - 1
              : 0,
            v = this.dollyToCursor
              ? ((r.y - this._elementRect.y) / this._elementRect.height) * -2 + 1
              : 0,
            _ = this.dollyDragInverted ? -1 : 1;
          if ((this._state & Be.DOLLY) === Be.DOLLY)
            (this._dollyInternal(_ * x * Vb, b, v), (this._isUserControllingDolly = !0));
          else (this._zoomInternal(_ * x * Vb, b, v), (this._isUserControllingZoom = !0));
        }
        if (
          (this._state & Be.TOUCH_DOLLY) === Be.TOUCH_DOLLY ||
          (this._state & Be.TOUCH_ZOOM) === Be.TOUCH_ZOOM ||
          (this._state & Be.TOUCH_DOLLY_TRUCK) === Be.TOUCH_DOLLY_TRUCK ||
          (this._state & Be.TOUCH_ZOOM_TRUCK) === Be.TOUCH_ZOOM_TRUCK ||
          (this._state & Be.TOUCH_DOLLY_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN ||
          (this._state & Be.TOUCH_ZOOM_SCREEN_PAN) === Be.TOUCH_ZOOM_SCREEN_PAN ||
          (this._state & Be.TOUCH_DOLLY_OFFSET) === Be.TOUCH_DOLLY_OFFSET ||
          (this._state & Be.TOUCH_ZOOM_OFFSET) === Be.TOUCH_ZOOM_OFFSET ||
          (this._state & Be.TOUCH_DOLLY_ROTATE) === Be.TOUCH_DOLLY_ROTATE ||
          (this._state & Be.TOUCH_ZOOM_ROTATE) === Be.TOUCH_ZOOM_ROTATE
        ) {
          let b = ra.x - this._activePointers[1].clientX,
            v = ra.y - this._activePointers[1].clientY,
            _ = Math.sqrt(b * b + v * v),
            w = i.y - _;
          i.set(0, _);
          let S = this.dollyToCursor
              ? ((n.x - this._elementRect.x) / this._elementRect.width) * 2 - 1
              : 0,
            E = this.dollyToCursor
              ? ((n.y - this._elementRect.y) / this._elementRect.height) * -2 + 1
              : 0;
          if (
            (this._state & Be.TOUCH_DOLLY) === Be.TOUCH_DOLLY ||
            (this._state & Be.TOUCH_DOLLY_ROTATE) === Be.TOUCH_DOLLY_ROTATE ||
            (this._state & Be.TOUCH_DOLLY_TRUCK) === Be.TOUCH_DOLLY_TRUCK ||
            (this._state & Be.TOUCH_DOLLY_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN ||
            (this._state & Be.TOUCH_DOLLY_OFFSET) === Be.TOUCH_DOLLY_OFFSET
          )
            (this._dollyInternal(w * Vb, S, E), (this._isUserControllingDolly = !0));
          else (this._zoomInternal(w * Vb, S, E), (this._isUserControllingZoom = !0));
        }
        if (
          (this._state & Be.TRUCK) === Be.TRUCK ||
          (this._state & Be.TOUCH_TRUCK) === Be.TOUCH_TRUCK ||
          (this._state & Be.TOUCH_DOLLY_TRUCK) === Be.TOUCH_DOLLY_TRUCK ||
          (this._state & Be.TOUCH_ZOOM_TRUCK) === Be.TOUCH_ZOOM_TRUCK
        )
          (this._truckInternal(y, x, !1, !1), (this._isUserControllingTruck = !0));
        if (
          (this._state & Be.SCREEN_PAN) === Be.SCREEN_PAN ||
          (this._state & Be.TOUCH_SCREEN_PAN) === Be.TOUCH_SCREEN_PAN ||
          (this._state & Be.TOUCH_DOLLY_SCREEN_PAN) === Be.TOUCH_DOLLY_SCREEN_PAN ||
          (this._state & Be.TOUCH_ZOOM_SCREEN_PAN) === Be.TOUCH_ZOOM_SCREEN_PAN
        )
          (this._truckInternal(y, x, !1, !0), (this._isUserControllingTruck = !0));
        if (
          (this._state & Be.OFFSET) === Be.OFFSET ||
          (this._state & Be.TOUCH_OFFSET) === Be.TOUCH_OFFSET ||
          (this._state & Be.TOUCH_DOLLY_OFFSET) === Be.TOUCH_DOLLY_OFFSET ||
          (this._state & Be.TOUCH_ZOOM_OFFSET) === Be.TOUCH_ZOOM_OFFSET
        )
          (this._truckInternal(y, x, !0, !1), (this._isUserControllingOffset = !0));
        this.dispatchEvent({ type: "control" });
      },
      f = () => {
        if (
          (WE(this._activePointers, ra),
          n.copy(ra),
          (this._dragNeedsUpdate = !1),
          this._activePointers.length === 0 ||
            (this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer))
        )
          this._isDragging = !1;
        if (this._activePointers.length === 0 && this._domElement)
          (this._domElement.ownerDocument.removeEventListener("pointermove", s, { passive: !1 }),
            this._domElement.ownerDocument.removeEventListener("pointerup", a),
            this.dispatchEvent({ type: "controlend" }));
      };
    ((this.lockPointer = () => {
      if (!this._enabled || !this._domElement) return;
      (this.cancel(),
        (this._lockedPointer = {
          pointerId: -1,
          clientX: 0,
          clientY: 0,
          deltaX: 0,
          deltaY: 0,
          mouseButton: null,
        }),
        this._activePointers.push(this._lockedPointer),
        this._domElement.ownerDocument.removeEventListener("pointermove", s, { passive: !1 }),
        this._domElement.ownerDocument.removeEventListener("pointerup", a),
        this._domElement.requestPointerLock(),
        this._domElement.ownerDocument.addEventListener("pointerlockchange", p),
        this._domElement.ownerDocument.addEventListener("pointerlockerror", g),
        this._domElement.ownerDocument.addEventListener("pointermove", s, { passive: !1 }),
        this._domElement.ownerDocument.addEventListener("pointerup", a),
        d());
    }),
      (this.unlockPointer = () => {
        if (this._lockedPointer !== null)
          (this._disposePointer(this._lockedPointer), (this._lockedPointer = null));
        (this._domElement?.ownerDocument.exitPointerLock(),
          this._domElement?.ownerDocument.removeEventListener("pointerlockchange", p),
          this._domElement?.ownerDocument.removeEventListener("pointerlockerror", g),
          this.cancel());
      }));
    let p = () => {
        if (
          !(
            this._domElement &&
            this._domElement.ownerDocument.pointerLockElement === this._domElement
          )
        )
          this.unlockPointer();
      },
      g = () => {
        this.unlockPointer();
      };
    if (
      ((this._addAllEventListeners = (m) => {
        ((this._domElement = m),
          (this._domElement.style.touchAction = "none"),
          (this._domElement.style.userSelect = "none"),
          (this._domElement.style.webkitUserSelect = "none"),
          this._domElement.addEventListener("pointerdown", o),
          this._domElement.addEventListener("pointercancel", a),
          this._domElement.addEventListener("wheel", c, { passive: !1 }),
          this._domElement.addEventListener("contextmenu", u));
      }),
      (this._removeAllEventListeners = () => {
        if (!this._domElement) return;
        ((this._domElement.style.touchAction = ""),
          (this._domElement.style.userSelect = ""),
          (this._domElement.style.webkitUserSelect = ""),
          this._domElement.removeEventListener("pointerdown", o),
          this._domElement.removeEventListener("pointercancel", a),
          this._domElement.removeEventListener("wheel", c, { passive: !1 }),
          this._domElement.removeEventListener("contextmenu", u),
          this._domElement.ownerDocument.removeEventListener("pointermove", s, { passive: !1 }),
          this._domElement.ownerDocument.removeEventListener("pointerup", a),
          this._domElement.ownerDocument.removeEventListener("pointerlockchange", p),
          this._domElement.ownerDocument.removeEventListener("pointerlockerror", g));
      }),
      (this.cancel = () => {
        if (this._state === Be.NONE) return;
        ((this._state = Be.NONE), (this._activePointers.length = 0), f());
      }),
      t)
    )
      this.connect(t);
    this.update(0);
  }
  get camera() {
    return this._camera;
  }
  set camera(e) {
    ((this._camera = e),
      this.updateCameraUp(),
      this._camera.updateProjectionMatrix(),
      this._updateNearPlaneCorners(),
      (this._needsUpdate = !0));
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    if (((this._enabled = e), !this._domElement)) return;
    if (e)
      ((this._domElement.style.touchAction = "none"),
        (this._domElement.style.userSelect = "none"),
        (this._domElement.style.webkitUserSelect = "none"));
    else
      (this.cancel(),
        (this._domElement.style.touchAction = ""),
        (this._domElement.style.userSelect = ""),
        (this._domElement.style.webkitUserSelect = ""));
  }
  get active() {
    return !this._hasRested;
  }
  get currentAction() {
    return this._state;
  }
  get distance() {
    return this._spherical.radius;
  }
  set distance(e) {
    if (this._spherical.radius === e && this._sphericalEnd.radius === e) return;
    ((this._spherical.radius = e), (this._sphericalEnd.radius = e), (this._needsUpdate = !0));
  }
  get azimuthAngle() {
    return this._spherical.theta;
  }
  set azimuthAngle(e) {
    if (this._spherical.theta === e && this._sphericalEnd.theta === e) return;
    ((this._spherical.theta = e), (this._sphericalEnd.theta = e), (this._needsUpdate = !0));
  }
  get polarAngle() {
    return this._spherical.phi;
  }
  set polarAngle(e) {
    if (this._spherical.phi === e && this._sphericalEnd.phi === e) return;
    ((this._spherical.phi = e), (this._sphericalEnd.phi = e), (this._needsUpdate = !0));
  }
  get boundaryEnclosesCamera() {
    return this._boundaryEnclosesCamera;
  }
  set boundaryEnclosesCamera(e) {
    ((this._boundaryEnclosesCamera = e), (this._needsUpdate = !0));
  }
  set interactiveArea(e) {
    ((this._interactiveArea.width = Yl(e.width, 0, 1)),
      (this._interactiveArea.height = Yl(e.height, 0, 1)),
      (this._interactiveArea.x = Yl(e.x, 0, 1 - this._interactiveArea.width)),
      (this._interactiveArea.y = Yl(e.y, 0, 1 - this._interactiveArea.height)));
  }
  addEventListener(e, t) {
    super.addEventListener(e, t);
  }
  removeEventListener(e, t) {
    super.removeEventListener(e, t);
  }
  rotate(e, t, r = !1) {
    return this.rotateTo(this._sphericalEnd.theta + e, this._sphericalEnd.phi + t, r);
  }
  rotateAzimuthTo(e, t = !1) {
    return this.rotateTo(e, this._sphericalEnd.phi, t);
  }
  rotatePolarTo(e, t = !1) {
    return this.rotateTo(this._sphericalEnd.theta, e, t);
  }
  rotateTo(e, t, r = !1) {
    this._isUserControllingRotate = !1;
    let n = Yl(e, this.minAzimuthAngle, this.maxAzimuthAngle),
      i = Yl(t, this.minPolarAngle, this.maxPolarAngle);
    if (
      ((this._sphericalEnd.theta = n),
      (this._sphericalEnd.phi = i),
      this._sphericalEnd.makeSafe(),
      (this._needsUpdate = !0),
      !r)
    )
      ((this._spherical.theta = this._sphericalEnd.theta),
        (this._spherical.phi = this._sphericalEnd.phi));
    let o =
      !r ||
      (Tn(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) &&
        Tn(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold));
    return this._createOnRestPromise(o);
  }
  dolly(e, t = !1) {
    return this.dollyTo(this._sphericalEnd.radius - e, t);
  }
  dollyTo(e, t = !1) {
    return (
      (this._isUserControllingDolly = !1),
      (this._lastDollyDirection = A1.NONE),
      (this._changedDolly = 0),
      this._dollyToNoClamp(Yl(e, this.minDistance, this.maxDistance), t)
    );
  }
  _dollyToNoClamp(e, t = !1) {
    let r = this._sphericalEnd.radius;
    if (this.colliderMeshes.length >= 1) {
      let o = this._collisionTest(),
        s = Tn(o, this._spherical.radius);
      if (!(r > e) && s) return Promise.resolve();
      this._sphericalEnd.radius = Math.min(e, o);
    } else this._sphericalEnd.radius = e;
    if (((this._needsUpdate = !0), !t)) this._spherical.radius = this._sphericalEnd.radius;
    let i = !t || Tn(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(i);
  }
  dollyInFixed(e, t = !1) {
    if ((this._targetEnd.add(this._getCameraDirection(u3).multiplyScalar(e)), !t))
      this._target.copy(this._targetEnd);
    let r =
      !t ||
      (Tn(this._target.x, this._targetEnd.x, this.restThreshold) &&
        Tn(this._target.y, this._targetEnd.y, this.restThreshold) &&
        Tn(this._target.z, this._targetEnd.z, this.restThreshold));
    return this._createOnRestPromise(r);
  }
  zoom(e, t = !1) {
    return this.zoomTo(this._zoomEnd + e, t);
  }
  zoomTo(e, t = !1) {
    if (
      ((this._isUserControllingZoom = !1),
      (this._zoomEnd = Yl(e, this.minZoom, this.maxZoom)),
      (this._needsUpdate = !0),
      !t)
    )
      this._zoom = this._zoomEnd;
    let r = !t || Tn(this._zoom, this._zoomEnd, this.restThreshold);
    return ((this._changedZoom = 0), this._createOnRestPromise(r));
  }
  pan(e, t, r = !1) {
    return this.truck(e, t, r);
  }
  truck(e, t, r = !1) {
    (this._camera.updateMatrix(),
      vc.setFromMatrixColumn(this._camera.matrix, 0),
      Cc.setFromMatrixColumn(this._camera.matrix, 1),
      vc.multiplyScalar(e),
      Cc.multiplyScalar(-t));
    let n = Dr.copy(vc).add(Cc),
      i = gn.copy(this._targetEnd).add(n);
    return this.moveTo(i.x, i.y, i.z, r);
  }
  forward(e, t = !1) {
    (Dr.setFromMatrixColumn(this._camera.matrix, 0),
      Dr.crossVectors(this._camera.up, Dr),
      Dr.multiplyScalar(e));
    let r = gn.copy(this._targetEnd).add(Dr);
    return this.moveTo(r.x, r.y, r.z, t);
  }
  elevate(e, t = !1) {
    return (
      Dr.copy(this._camera.up).multiplyScalar(e),
      this.moveTo(this._targetEnd.x + Dr.x, this._targetEnd.y + Dr.y, this._targetEnd.z + Dr.z, t)
    );
  }
  moveTo(e, t, r, n = !1) {
    this._isUserControllingTruck = !1;
    let i = Dr.set(e, t, r).sub(this._targetEnd);
    if (
      (this._encloseToBoundary(this._targetEnd, i, this.boundaryFriction),
      (this._needsUpdate = !0),
      !n)
    )
      this._target.copy(this._targetEnd);
    let o =
      !n ||
      (Tn(this._target.x, this._targetEnd.x, this.restThreshold) &&
        Tn(this._target.y, this._targetEnd.y, this.restThreshold) &&
        Tn(this._target.z, this._targetEnd.z, this.restThreshold));
    return this._createOnRestPromise(o);
  }
  lookInDirectionOf(e, t, r, n = !1) {
    let s = Dr.set(e, t, r)
      .sub(this._targetEnd)
      .normalize()
      .multiplyScalar(-this._sphericalEnd.radius)
      .add(this._targetEnd);
    return this.setPosition(s.x, s.y, s.z, n);
  }
  fitToBox(
    e,
    t,
    {
      cover: r = !1,
      paddingLeft: n = 0,
      paddingRight: i = 0,
      paddingBottom: o = 0,
      paddingTop: s = 0,
    } = {},
  ) {
    let a = [],
      l = e.isBox3 ? b1.copy(e) : b1.setFromObject(e);
    if (l.isEmpty()) Promise.resolve();
    let c = JD(this._sphericalEnd.theta, $D),
      u = JD(this._sphericalEnd.phi, $D);
    a.push(this.rotateTo(c, u, t));
    let d = Dr.setFromSpherical(this._sphericalEnd).normalize(),
      h = oN.setFromUnitVectors(d, YE),
      f = Tn(Math.abs(d.y), 1);
    if (f) h.multiply(jE.setFromAxisAngle(Wb, c));
    h.multiply(this._yAxisUpSpaceInverse);
    let p = iN.makeEmpty();
    if (
      (gn.copy(l.min).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.min).setX(l.max.x).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.min).setY(l.max.y).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.max).setZ(l.min.z).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.min).setZ(l.max.z).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.max).setY(l.min.y).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.max).setX(l.min.x).applyQuaternion(h),
      p.expandByPoint(gn),
      gn.copy(l.max).applyQuaternion(h),
      p.expandByPoint(gn),
      (p.min.x -= n),
      (p.min.y -= o),
      (p.max.x += i),
      (p.max.y += s),
      h.setFromUnitVectors(YE, d),
      f)
    )
      h.premultiply(jE.invert());
    h.premultiply(this._yAxisUpSpace);
    let g = p.getSize(Dr),
      m = p.getCenter(gn).applyQuaternion(h);
    if (Jf(this._camera)) {
      let A = this.getDistanceToFitBox(g.x, g.y, g.z, r);
      (a.push(this.moveTo(m.x, m.y, m.z, t)),
        a.push(this.dollyTo(A, t)),
        a.push(this.setFocalOffset(0, 0, 0, t)));
    } else if ($d(this._camera)) {
      let A = this._camera,
        y = A.right - A.left,
        x = A.top - A.bottom,
        b = r ? Math.max(y / g.x, x / g.y) : Math.min(y / g.x, x / g.y);
      (a.push(this.moveTo(m.x, m.y, m.z, t)),
        a.push(this.zoomTo(b, t)),
        a.push(this.setFocalOffset(0, 0, 0, t)));
    }
    return Promise.all(a);
  }
  fitToSphere(e, t) {
    let r = [],
      i = "isObject3D" in e ? ll.createBoundingSphere(e, XE) : XE.copy(e);
    if ((r.push(this.moveTo(i.center.x, i.center.y, i.center.z, t)), Jf(this._camera))) {
      let o = this.getDistanceToFitSphere(i.radius);
      r.push(this.dollyTo(o, t));
    } else if ($d(this._camera)) {
      let o = this._camera.right - this._camera.left,
        s = this._camera.top - this._camera.bottom,
        a = 2 * i.radius,
        l = Math.min(o / a, s / a);
      r.push(this.zoomTo(l, t));
    }
    return (r.push(this.setFocalOffset(0, 0, 0, t)), Promise.all(r));
  }
  setLookAt(e, t, r, n, i, o, s = !1) {
    ((this._isUserControllingRotate = !1),
      (this._isUserControllingDolly = !1),
      (this._isUserControllingTruck = !1),
      (this._lastDollyDirection = A1.NONE),
      (this._changedDolly = 0));
    let a = gn.set(n, i, o),
      l = Dr.set(e, t, r);
    if (
      (this._targetEnd.copy(a),
      this._sphericalEnd.setFromVector3(l.sub(a).applyQuaternion(this._yAxisUpSpace)),
      (this._needsUpdate = !0),
      !s)
    )
      (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    let c =
      !s ||
      (Tn(this._target.x, this._targetEnd.x, this.restThreshold) &&
        Tn(this._target.y, this._targetEnd.y, this.restThreshold) &&
        Tn(this._target.z, this._targetEnd.z, this.restThreshold) &&
        Tn(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) &&
        Tn(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) &&
        Tn(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold));
    return this._createOnRestPromise(c);
  }
  lerp(e, t, r, n = !1) {
    ((this._isUserControllingRotate = !1),
      (this._isUserControllingDolly = !1),
      (this._isUserControllingTruck = !1),
      (this._lastDollyDirection = A1.NONE),
      (this._changedDolly = 0));
    let i = Dr.set(...e.target);
    if ("spherical" in e) Ia.set(...e.spherical);
    else {
      let u = gn.set(...e.position);
      Ia.setFromVector3(u.sub(i).applyQuaternion(this._yAxisUpSpace));
    }
    let o = y1.set(...t.target);
    if ("spherical" in t) x1.set(...t.spherical);
    else {
      let u = gn.set(...t.position);
      x1.setFromVector3(u.sub(o).applyQuaternion(this._yAxisUpSpace));
    }
    this._targetEnd.copy(i.lerp(o, r));
    let s = x1.theta - Ia.theta,
      a = x1.phi - Ia.phi,
      l = x1.radius - Ia.radius;
    if (
      (this._sphericalEnd.set(Ia.radius + l * r, Ia.phi + a * r, Ia.theta + s * r),
      (this._needsUpdate = !0),
      !n)
    )
      (this._target.copy(this._targetEnd), this._spherical.copy(this._sphericalEnd));
    let c =
      !n ||
      (Tn(this._target.x, this._targetEnd.x, this.restThreshold) &&
        Tn(this._target.y, this._targetEnd.y, this.restThreshold) &&
        Tn(this._target.z, this._targetEnd.z, this.restThreshold) &&
        Tn(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) &&
        Tn(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) &&
        Tn(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold));
    return this._createOnRestPromise(c);
  }
  lerpLookAt(e, t, r, n, i, o, s, a, l, c, u, d, h, f = !1) {
    return this.lerp(
      { position: [e, t, r], target: [n, i, o] },
      { position: [s, a, l], target: [c, u, d] },
      h,
      f,
    );
  }
  setPosition(e, t, r, n = !1) {
    return this.setLookAt(e, t, r, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, n);
  }
  setTarget(e, t, r, n = !1) {
    let i = this.getPosition(Dr),
      o = this.setLookAt(i.x, i.y, i.z, e, t, r, n);
    return (
      (this._sphericalEnd.phi = Yl(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle)),
      o
    );
  }
  setFocalOffset(e, t, r, n = !1) {
    if (
      ((this._isUserControllingOffset = !1),
      this._focalOffsetEnd.set(e, t, r),
      (this._needsUpdate = !0),
      !n)
    )
      this._focalOffset.copy(this._focalOffsetEnd);
    let i =
      !n ||
      (Tn(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) &&
        Tn(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) &&
        Tn(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold));
    return this._createOnRestPromise(i);
  }
  setOrbitPoint(e, t, r) {
    (this._camera.updateMatrixWorld(),
      vc.setFromMatrixColumn(this._camera.matrixWorldInverse, 0),
      Cc.setFromMatrixColumn(this._camera.matrixWorldInverse, 1),
      e0.setFromMatrixColumn(this._camera.matrixWorldInverse, 2));
    let n = Dr.set(e, t, r),
      i = n.distanceTo(this._camera.position),
      o = n.sub(this._camera.position);
    (vc.multiplyScalar(o.x),
      Cc.multiplyScalar(o.y),
      e0.multiplyScalar(o.z),
      Dr.copy(vc).add(Cc).add(e0),
      (Dr.z = Dr.z + i),
      this.dollyTo(i, !1),
      this.setFocalOffset(-Dr.x, Dr.y, -Dr.z, !1),
      this.moveTo(e, t, r, !1));
  }
  setBoundary(e) {
    if (!e) {
      (this._boundary.min.set(-1 / 0, -1 / 0, -1 / 0),
        this._boundary.max.set(1 / 0, 1 / 0, 1 / 0),
        (this._needsUpdate = !0));
      return;
    }
    (this._boundary.copy(e),
      this._boundary.clampPoint(this._targetEnd, this._targetEnd),
      (this._needsUpdate = !0));
  }
  setViewport(e, t, r, n) {
    if (e === null) {
      this._viewport = null;
      return;
    }
    if (((this._viewport = this._viewport || new fr.Vector4()), typeof e === "number"))
      this._viewport.set(e, t, r, n);
    else this._viewport.copy(e);
  }
  getDistanceToFitBox(e, t, r, n = !1) {
    if (QE(this._camera, "getDistanceToFitBox")) return this._spherical.radius;
    let i = e / t,
      o = this._camera.getEffectiveFOV() * a3,
      s = this._camera.aspect;
    return (((n ? i > s : i < s) ? t : e / s) * 0.5) / Math.tan(o * 0.5) + r * 0.5;
  }
  getDistanceToFitSphere(e) {
    if (QE(this._camera, "getDistanceToFitSphere")) return this._spherical.radius;
    let t = this._camera.getEffectiveFOV() * a3,
      r = Math.atan(Math.tan(t * 0.5) * this._camera.aspect) * 2,
      n = 1 < this._camera.aspect ? t : r;
    return e / Math.sin(n * 0.5);
  }
  getTarget(e, t = !0) {
    return (!!e && e.isVector3 ? e : new fr.Vector3()).copy(t ? this._targetEnd : this._target);
  }
  getPosition(e, t = !0) {
    return (!!e && e.isVector3 ? e : new fr.Vector3())
      .setFromSpherical(t ? this._sphericalEnd : this._spherical)
      .applyQuaternion(this._yAxisUpSpaceInverse)
      .add(t ? this._targetEnd : this._target);
  }
  getSpherical(e, t = !0) {
    return (e || new fr.Spherical()).copy(t ? this._sphericalEnd : this._spherical);
  }
  getFocalOffset(e, t = !0) {
    return (!!e && e.isVector3 ? e : new fr.Vector3()).copy(
      t ? this._focalOffsetEnd : this._focalOffset,
    );
  }
  normalizeRotations() {
    if (
      ((this._sphericalEnd.theta = ((this._sphericalEnd.theta % Zd) + Zd) % Zd),
      this._sphericalEnd.theta > Math.PI)
    )
      this._sphericalEnd.theta -= Zd;
    return (
      (this._spherical.theta +=
        Zd * Math.round((this._sphericalEnd.theta - this._spherical.theta) / Zd)),
      this
    );
  }
  stop() {
    (this._focalOffset.copy(this._focalOffsetEnd),
      this._target.copy(this._targetEnd),
      this._spherical.copy(this._sphericalEnd),
      (this._zoom = this._zoomEnd));
  }
  reset(e = !1) {
    if (
      !Tn(this._camera.up.x, this._cameraUp0.x) ||
      !Tn(this._camera.up.y, this._cameraUp0.y) ||
      !Tn(this._camera.up.z, this._cameraUp0.z)
    ) {
      this._camera.up.copy(this._cameraUp0);
      let r = this.getPosition(Dr);
      (this.updateCameraUp(), this.setPosition(r.x, r.y, r.z));
    }
    let t = [
      this.setLookAt(
        this._position0.x,
        this._position0.y,
        this._position0.z,
        this._target0.x,
        this._target0.y,
        this._target0.z,
        e,
      ),
      this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, e),
      this.zoomTo(this._zoom0, e),
    ];
    return Promise.all(t);
  }
  saveState() {
    (this._cameraUp0.copy(this._camera.up),
      this.getTarget(this._target0),
      this.getPosition(this._position0),
      (this._zoom0 = this._zoom),
      this._focalOffset0.copy(this._focalOffset));
  }
  updateCameraUp() {
    (this._yAxisUpSpace.setFromUnitVectors(this._camera.up, Wb),
      this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert());
  }
  applyCameraUp() {
    let e = Dr.subVectors(this._target, this._camera.position).normalize(),
      t = gn.crossVectors(e, this._camera.up);
    (this._camera.up.crossVectors(t, e).normalize(), this._camera.updateMatrixWorld());
    let r = this.getPosition(Dr);
    (this.updateCameraUp(), this.setPosition(r.x, r.y, r.z));
  }
  update(e) {
    let t = this._sphericalEnd.theta - this._spherical.theta,
      r = this._sphericalEnd.phi - this._spherical.phi,
      n = this._sphericalEnd.radius - this._spherical.radius,
      i = rN.subVectors(this._targetEnd, this._target),
      o = nN.subVectors(this._focalOffsetEnd, this._focalOffset),
      s = this._zoomEnd - this._zoom;
    if (oi(t))
      ((this._thetaVelocity.value = 0), (this._spherical.theta = this._sphericalEnd.theta));
    else {
      let u = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      ((this._spherical.theta = zb(
        this._spherical.theta,
        this._sphericalEnd.theta,
        this._thetaVelocity,
        u,
        1 / 0,
        e,
      )),
        (this._needsUpdate = !0));
    }
    if (oi(r)) ((this._phiVelocity.value = 0), (this._spherical.phi = this._sphericalEnd.phi));
    else {
      let u = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      ((this._spherical.phi = zb(
        this._spherical.phi,
        this._sphericalEnd.phi,
        this._phiVelocity,
        u,
        1 / 0,
        e,
      )),
        (this._needsUpdate = !0));
    }
    if (oi(n))
      ((this._radiusVelocity.value = 0), (this._spherical.radius = this._sphericalEnd.radius));
    else {
      let u = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      ((this._spherical.radius = zb(
        this._spherical.radius,
        this._sphericalEnd.radius,
        this._radiusVelocity,
        u,
        this.maxSpeed,
        e,
      )),
        (this._needsUpdate = !0));
    }
    if (oi(i.x) && oi(i.y) && oi(i.z))
      (this._targetVelocity.set(0, 0, 0), this._target.copy(this._targetEnd));
    else {
      let u = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      (eN(this._target, this._targetEnd, this._targetVelocity, u, this.maxSpeed, e, this._target),
        (this._needsUpdate = !0));
    }
    if (oi(o.x) && oi(o.y) && oi(o.z))
      (this._focalOffsetVelocity.set(0, 0, 0), this._focalOffset.copy(this._focalOffsetEnd));
    else {
      let u = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      (eN(
        this._focalOffset,
        this._focalOffsetEnd,
        this._focalOffsetVelocity,
        u,
        this.maxSpeed,
        e,
        this._focalOffset,
      ),
        (this._needsUpdate = !0));
    }
    if (oi(s)) ((this._zoomVelocity.value = 0), (this._zoom = this._zoomEnd));
    else {
      let u = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = zb(this._zoom, this._zoomEnd, this._zoomVelocity, u, 1 / 0, e);
    }
    if (this.dollyToCursor) {
      if (Jf(this._camera) && this._changedDolly !== 0) {
        let u = this._spherical.radius - this._lastDistance,
          d = this._camera,
          h = this._getCameraDirection(u3),
          f = Dr.copy(h).cross(d.up).normalize();
        if (f.lengthSq() === 0) f.x = 1;
        let p = gn.crossVectors(f, h),
          g = this._sphericalEnd.radius * Math.tan(d.getEffectiveFOV() * a3 * 0.5),
          A =
            (this._sphericalEnd.radius - u - this._sphericalEnd.radius) / this._sphericalEnd.radius,
          y = y1
            .copy(this._targetEnd)
            .add(f.multiplyScalar(this._dollyControlCoord.x * g * d.aspect))
            .add(p.multiplyScalar(this._dollyControlCoord.y * g)),
          x = Dr.copy(this._targetEnd).lerp(y, A),
          b = this._lastDollyDirection === A1.IN && this._spherical.radius <= this.minDistance,
          v = this._lastDollyDirection === A1.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (b || v)) {
          ((this._sphericalEnd.radius -= u), (this._spherical.radius -= u));
          let w = gn.copy(h).multiplyScalar(-u);
          x.add(w);
        }
        this._boundary.clampPoint(x, x);
        let _ = gn.subVectors(x, this._targetEnd);
        if (
          (this._targetEnd.copy(x),
          this._target.add(_),
          (this._changedDolly -= u),
          oi(this._changedDolly))
        )
          this._changedDolly = 0;
      } else if ($d(this._camera) && this._changedZoom !== 0) {
        let u = this._zoom - this._lastZoom,
          d = this._camera,
          h = Dr.set(
            this._dollyControlCoord.x,
            this._dollyControlCoord.y,
            (d.near + d.far) / (d.near - d.far),
          ).unproject(d),
          f = gn.set(0, 0, -1).applyQuaternion(d.quaternion),
          p = y1.copy(h).add(f.multiplyScalar(-h.dot(d.up))),
          m = -(this._zoom - u - this._zoom) / this._zoom,
          A = this._getCameraDirection(u3),
          y = this._targetEnd.dot(A),
          x = Dr.copy(this._targetEnd).lerp(p, m),
          b = x.dot(A),
          v = A.multiplyScalar(b - y);
        (x.sub(v), this._boundary.clampPoint(x, x));
        let _ = gn.subVectors(x, this._targetEnd);
        if (
          (this._targetEnd.copy(x),
          this._target.add(_),
          (this._changedZoom -= u),
          oi(this._changedZoom))
        )
          this._changedZoom = 0;
      }
    }
    if (this._camera.zoom !== this._zoom)
      ((this._camera.zoom = this._zoom),
        this._camera.updateProjectionMatrix(),
        this._updateNearPlaneCorners(),
        (this._needsUpdate = !0));
    this._dragNeedsUpdate = !0;
    let a = this._collisionTest();
    if (
      ((this._spherical.radius = Math.min(this._spherical.radius, a)),
      this._spherical.makeSafe(),
      this._camera.position
        .setFromSpherical(this._spherical)
        .applyQuaternion(this._yAxisUpSpaceInverse)
        .add(this._target),
      this._camera.lookAt(this._target),
      !oi(this._focalOffset.x) || !oi(this._focalOffset.y) || !oi(this._focalOffset.z))
    )
      (this._camera.matrix.compose(
        this._camera.position,
        this._camera.quaternion,
        this._camera.scale,
      ),
        vc.setFromMatrixColumn(this._camera.matrix, 0),
        Cc.setFromMatrixColumn(this._camera.matrix, 1),
        e0.setFromMatrixColumn(this._camera.matrix, 2),
        vc.multiplyScalar(this._focalOffset.x),
        Cc.multiplyScalar(-this._focalOffset.y),
        e0.multiplyScalar(this._focalOffset.z),
        Dr.copy(vc).add(Cc).add(e0),
        this._camera.position.add(Dr),
        this._camera.updateMatrixWorld());
    if (this._boundaryEnclosesCamera)
      this._encloseToBoundary(
        this._camera.position.copy(this._target),
        Dr.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),
        1,
      );
    let c = this._needsUpdate;
    if (c && !this._updatedLastTime)
      ((this._hasRested = !1),
        this.dispatchEvent({ type: "wake" }),
        this.dispatchEvent({ type: "update" }));
    else if (c) {
      if (
        (this.dispatchEvent({ type: "update" }),
        oi(t, this.restThreshold) &&
          oi(r, this.restThreshold) &&
          oi(n, this.restThreshold) &&
          oi(i.x, this.restThreshold) &&
          oi(i.y, this.restThreshold) &&
          oi(i.z, this.restThreshold) &&
          oi(o.x, this.restThreshold) &&
          oi(o.y, this.restThreshold) &&
          oi(o.z, this.restThreshold) &&
          oi(s, this.restThreshold) &&
          !this._hasRested)
      )
        ((this._hasRested = !0), this.dispatchEvent({ type: "rest" }));
    } else if (!c && this._updatedLastTime) this.dispatchEvent({ type: "sleep" });
    return (
      (this._lastDistance = this._spherical.radius),
      (this._lastZoom = this._zoom),
      (this._updatedLastTime = c),
      (this._needsUpdate = !1),
      c
    );
  }
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: l3(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: l3(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: l3(this.maxPolarAngle),
      minAzimuthAngle: l3(this.minAzimuthAngle),
      maxAzimuthAngle: l3(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      target: this._targetEnd.toArray(),
      position: Dr.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
      zoom: this._zoomEnd,
      focalOffset: this._focalOffsetEnd.toArray(),
      target0: this._target0.toArray(),
      position0: this._position0.toArray(),
      zoom0: this._zoom0,
      focalOffset0: this._focalOffset0.toArray(),
    });
  }
  fromJSON(e, t = !1) {
    let r = JSON.parse(e);
    ((this.enabled = r.enabled),
      (this.minDistance = r.minDistance),
      (this.maxDistance = c3(r.maxDistance)),
      (this.minZoom = r.minZoom),
      (this.maxZoom = c3(r.maxZoom)),
      (this.minPolarAngle = r.minPolarAngle),
      (this.maxPolarAngle = c3(r.maxPolarAngle)),
      (this.minAzimuthAngle = c3(r.minAzimuthAngle)),
      (this.maxAzimuthAngle = c3(r.maxAzimuthAngle)),
      (this.smoothTime = r.smoothTime),
      (this.draggingSmoothTime = r.draggingSmoothTime),
      (this.dollySpeed = r.dollySpeed),
      (this.truckSpeed = r.truckSpeed),
      (this.dollyToCursor = r.dollyToCursor),
      this._target0.fromArray(r.target0),
      this._position0.fromArray(r.position0),
      (this._zoom0 = r.zoom0),
      this._focalOffset0.fromArray(r.focalOffset0),
      this.moveTo(r.target[0], r.target[1], r.target[2], t),
      Ia.setFromVector3(
        Dr.fromArray(r.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace),
      ),
      this.rotateTo(Ia.theta, Ia.phi, t),
      this.dollyTo(Ia.radius, t),
      this.zoomTo(r.zoom, t),
      this.setFocalOffset(r.focalOffset[0], r.focalOffset[1], r.focalOffset[2], t),
      (this._needsUpdate = !0));
  }
  connect(e) {
    if (this._domElement) return;
    (e.setAttribute("data-camera-controls-version", HJ),
      this._addAllEventListeners(e),
      this._getClientRect(this._elementRect));
  }
  disconnect() {
    if ((this.cancel(), this._removeAllEventListeners(), this._domElement))
      (this._domElement.removeAttribute("data-camera-controls-version"),
        (this._domElement = void 0));
  }
  dispose() {
    (this.removeAllEventListeners(), this.disconnect());
  }
  _getTargetDirection(e) {
    return e
      .setFromSpherical(this._spherical)
      .divideScalar(this._spherical.radius)
      .applyQuaternion(this._yAxisUpSpaceInverse);
  }
  _getCameraDirection(e) {
    return this._getTargetDirection(e).negate();
  }
  _findPointerById(e) {
    return this._activePointers.find((t) => t.pointerId === e);
  }
  _findPointerByMouseButton(e) {
    return this._activePointers.find((t) => t.mouseButton === e);
  }
  _disposePointer(e) {
    this._activePointers.splice(this._activePointers.indexOf(e), 1);
  }
  _encloseToBoundary(e, t, r) {
    let n = t.lengthSq();
    if (n === 0) return e;
    let i = gn.copy(t).add(e),
      s = this._boundary.clampPoint(i, y1).sub(i),
      a = s.lengthSq();
    if (a === 0) return e.add(t);
    else if (a === n) return e;
    else if (r === 0) return e.add(t).add(s);
    else {
      let l = 1 + (r * a) / t.dot(s);
      return e.add(gn.copy(t).multiplyScalar(l)).add(s.multiplyScalar(1 - r));
    }
  }
  _updateNearPlaneCorners() {
    if (Jf(this._camera)) {
      let e = this._camera,
        t = e.near,
        r = e.getEffectiveFOV() * a3,
        n = Math.tan(r * 0.5) * t,
        i = n * e.aspect;
      (this._nearPlaneCorners[0].set(-i, -n, 0),
        this._nearPlaneCorners[1].set(i, -n, 0),
        this._nearPlaneCorners[2].set(i, n, 0),
        this._nearPlaneCorners[3].set(-i, n, 0));
    } else if ($d(this._camera)) {
      let e = this._camera,
        t = 1 / e.zoom,
        r = e.left * t,
        n = e.right * t,
        i = e.top * t,
        o = e.bottom * t;
      (this._nearPlaneCorners[0].set(r, i, 0),
        this._nearPlaneCorners[1].set(n, i, 0),
        this._nearPlaneCorners[2].set(n, o, 0),
        this._nearPlaneCorners[3].set(r, o, 0));
    }
  }
  _truckInternal = (e, t, r, n) => {
    let i, o;
    if (Jf(this._camera)) {
      let s = Dr.copy(this._camera.position).sub(this._target),
        a = this._camera.getEffectiveFOV() * a3,
        l = s.length() * Math.tan(a * 0.5);
      ((i = (this.truckSpeed * e * l) / this._elementRect.height),
        (o = (this.truckSpeed * t * l) / this._elementRect.height));
    } else if ($d(this._camera)) {
      let s = this._camera;
      ((i = (this.truckSpeed * e * (s.right - s.left)) / s.zoom / this._elementRect.width),
        (o = (this.truckSpeed * t * (s.top - s.bottom)) / s.zoom / this._elementRect.height));
    } else return;
    if (n)
      (r
        ? this.setFocalOffset(
            this._focalOffsetEnd.x + i,
            this._focalOffsetEnd.y,
            this._focalOffsetEnd.z,
            !0,
          )
        : this.truck(i, 0, !0),
        this.forward(-o, !0));
    else
      r
        ? this.setFocalOffset(
            this._focalOffsetEnd.x + i,
            this._focalOffsetEnd.y + o,
            this._focalOffsetEnd.z,
            !0,
          )
        : this.truck(i, o, !0);
  };
  _rotateInternal = (e, t) => {
    let r = (Zd * this.azimuthRotateSpeed * e) / this._elementRect.height,
      n = (Zd * this.polarRotateSpeed * t) / this._elementRect.height;
    this.rotate(r, n, !0);
  };
  _dollyInternal = (e, t, r) => {
    let n = Math.pow(0.95, -e * this.dollySpeed),
      i = this._sphericalEnd.radius,
      o = this._sphericalEnd.radius * n,
      s = Yl(o, this.minDistance, this.maxDistance),
      a = s - o;
    if (this.infinityDolly && this.dollyToCursor) this._dollyToNoClamp(o, !0);
    else if (this.infinityDolly && !this.dollyToCursor)
      (this.dollyInFixed(a, !0), this._dollyToNoClamp(s, !0));
    else this._dollyToNoClamp(s, !0);
    if (this.dollyToCursor)
      ((this._changedDolly += (this.infinityDolly ? o : s) - i), this._dollyControlCoord.set(t, r));
    this._lastDollyDirection = Math.sign(-e);
  };
  _zoomInternal = (e, t, r) => {
    let n = Math.pow(0.95, e * this.dollySpeed),
      i = this._zoom,
      o = this._zoom * n;
    if ((this.zoomTo(o, !0), this.dollyToCursor))
      ((this._changedZoom += o - i), this._dollyControlCoord.set(t, r));
  };
  _collisionTest() {
    let e = 1 / 0;
    if (!(this.colliderMeshes.length >= 1)) return e;
    if (QE(this._camera, "_collisionTest")) return e;
    let r = this._getTargetDirection(u3);
    KE.lookAt(tN, r, this._camera.up);
    for (let n = 0; n < 4; n++) {
      let i = gn.copy(this._nearPlaneCorners[n]);
      i.applyMatrix4(KE);
      let o = y1.addVectors(this._target, i);
      (Qb.set(o, r), (Qb.far = this._spherical.radius + 1));
      let s = Qb.intersectObjects(this.colliderMeshes);
      if (s.length !== 0 && s[0].distance < e) e = s[0].distance;
    }
    return e;
  }
  _getClientRect(e) {
    if (!this._domElement) return;
    let t = this._domElement.getBoundingClientRect();
    if (((e.x = t.left), (e.y = t.top), this._viewport))
      ((e.x += this._viewport.x),
        (e.y += t.height - this._viewport.w - this._viewport.y),
        (e.width = this._viewport.z),
        (e.height = this._viewport.w));
    else ((e.width = t.width), (e.height = t.height));
    return e;
  }
  _createOnRestPromise(e) {
    if (e) return Promise.resolve();
    return (
      (this._hasRested = !1),
      this.dispatchEvent({ type: "transitionstart" }),
      new Promise((t) => {
        let r = () => {
          (this.removeEventListener("rest", r), t());
        };
        this.addEventListener("rest", r);
      })
    );
  }
  _addAllEventListeners(e) {}
  _removeAllEventListeners() {}
  get dampingFactor() {
    return 0;
  }
  set dampingFactor(e) {}
  get draggingDampingFactor() {
    return 0;
  }
  set draggingDampingFactor(e) {}
  static createBoundingSphere(e, t = new fr.Sphere()) {
    let r = t,
      n = r.center;
    (b1.makeEmpty(),
      e.traverseVisible((o) => {
        if (!o.isMesh) return;
        b1.expandByObject(o);
      }),
      b1.getCenter(n));
    let i = 0;
    return (
      e.traverseVisible((o) => {
        if (!o.isMesh) return;
        let s = o;
        if (!s.geometry) return;
        let a = s.geometry.clone();
        a.applyMatrix4(s.matrixWorld);
        let c = a.attributes.position;
        for (let u = 0, d = c.count; u < d; u++)
          (Dr.fromBufferAttribute(c, u), (i = Math.max(i, n.distanceToSquared(Dr))));
      }),
      (r.radius = Math.sqrt(i)),
      r
    );
  }
}
