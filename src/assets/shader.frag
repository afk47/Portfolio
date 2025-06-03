//CC0 - Credit mrange https://www.shadertoy.com/view/lfc3zr modified slightly to work in threejs
uniform float uTime;
uniform vec2 uResolution;
varying vec2 fragCoord;
#define TIME        uTime
#define RESOLUTION  uResolution
#define PI          3.141592654
#define TAU         (2.0*PI)

#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))
// License: WTFPL, author: sam hocevar, found: https://stackoverflow.com/a/17897228/418488
const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
  return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
}
// License: WTFPL, author: sam hocevar, found: https://stackoverflow.com/a/17897228/418488
//  Macro version of above to enable compile-time constants
#define HSV2RGB(c)  (c.z * mix(hsv2rgb_K.xxx, clamp(abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www) - hsv2rgb_K.xxx, 0.0, 1.0), c.y))

#define TOLERANCE           0.0001
#define MAX_RAY_LENGTH      10.0
#define MAX_RAY_MARCHES     90
#define NORM_OFF            0.005

const vec3 sunDir    = normalize(vec3(0.,0., 1.));
const vec3 lightPos1 = 2.0*vec3(-1.0, -1.0, -2.0);
const vec3 lightPos0 = 4.0*vec3(1.0, 1.0, -2.0);

const vec3 sunCol    = HSV2RGB(vec3(0.6, .95, 1E-2))*1.;
const vec3 lightCol0 = HSV2RGB(vec3(0.7, 0.85, 1.0))*1.;
const vec3 lightCol1 = HSV2RGB(vec3(0.8, 0.75, 1.0))*1.;
const vec3 bottomBoxCol = HSV2RGB(vec3(0.7, 0.80, 0.5))*1.;
const vec3 topBoxCol    = HSV2RGB(vec3(0.57, 0.90, 1.))*1.;
const vec3 glowCol0 = HSV2RGB(vec3(0.58, 0.9, 4E-3))*1.;
const vec3 glowCol1 = HSV2RGB(vec3(0.03, 0.9, 5E-3))*1.;

  
// License: MIT, author: Inigo Quilez, found: https://iquilezles.org/articles/noacos/
mat3 rot(vec3 d, vec3 z) {
  vec3  v = cross( z, d );
  float c = dot( z, d );
  float k = 1.0/(1.0+c);

  return mat3( v.x*v.x*k + c,     v.y*v.x*k - v.z,    v.z*v.x*k + v.y,
               v.x*v.y*k + v.z,   v.y*v.y*k + c,      v.z*v.y*k - v.x,
               v.x*v.z*k - v.y,   v.y*v.z*k + v.x,    v.z*v.z*k + c    );
}

// License: MIT, author: Inigo Quilez, found: https://www.iquilezles.org/www/articles/smin/smin.htm
float pmin(float a, float b, float k) {
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}

// License: CC0, author: Mårten Rånge, found: https://github.com/mrange/glsl-snippets
float pmax(float a, float b, float k) {
  return -pmin(-a, -b, k);
}

// License: Unknown, author: Matt Taylor (https://github.com/64), found: https://64.github.io/tonemapping/
vec3 aces_approx(vec3 v) {
  v = max(v, 0.0);
  v *= 0.6f;
  float a = 2.51f;
  float b = 0.03f;
  float c = 2.43f;
  float d = 0.59f;
  float e = 0.14f;
  return clamp((v*(a*v+b))/(v*(c*v+d)+e), 0.0f, 1.0f);
}

// License: MIT, author: Inigo Quilez, found: https://iquilezles.org/articles/intersectors/
float rayPlane(vec3 ro, vec3 rd, vec4 p) {
  return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
}

// License: MIT, author: Inigo Quilez, found: https://iquilezles.org/articles/distfunctions/
float box(vec2 p, vec2 b) {
  vec2 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
  

mat3 g_rot;

float sphere4(vec3 p, float r) {
  p*=p;
  return pow(dot(p,p), 0.25) -r;
}

float sphere8(vec3 p, float r) {
  p*=p;
  p*=p;
  return pow(dot(p,p), 0.125) -r;
}

float df(vec3 op) {
  vec3 p0 = op*g_rot;
  vec3 p1 = g_rot*op;
  float d0 = sphere4(p0, 1.);
  float d1 = sphere4(p1, 0.65);
  float d = d0;
  d = pmax(d, -d1, 0.5);
  return d;
}

#define BACKSTEP
float rayMarch(vec3 ro, vec3 rd, float tinit, out int iter) {
  float t = tinit;
  const float tol = TOLERANCE;
#if defined(BACKSTEP)
  vec2 dti = vec2(1e10,0.0);
#endif  
  int i = 0;
  for (i = 0; i < MAX_RAY_MARCHES; ++i) {
    float d = df(ro + rd*t);
#if defined(BACKSTEP)
    if (d<dti.x) { dti=vec2(d,t); }
#endif  
    if (d < TOLERANCE || t > MAX_RAY_LENGTH) {
      break;
    }
    t += d;
  }
#if defined(BACKSTEP)
  if(i==MAX_RAY_MARCHES) { t=dti.y; };
#endif  
  iter = i;
  return t;
}


vec3 normal(vec3 pos) {
  vec2  eps = vec2(NORM_OFF,0.0);
  vec3 nor;
  nor.x = df(pos+eps.xyy) - df(pos-eps.xyy);
  nor.y = df(pos+eps.yxy) - df(pos-eps.yxy);
  nor.z = df(pos+eps.yyx) - df(pos-eps.yyx);
  return normalize(nor);
}

vec3 render0(vec3 ro, vec3 rd) {
  vec3 col = vec3(0.0);
  
  vec3 ld0 = normalize(lightPos0-ro);
  vec3 ld1 = normalize(lightPos1-ro);

  float tp0  = rayPlane(ro, rd, vec4(vec3(0.0, -1.0, 0.0), -5.0));
  float tp1  = rayPlane(ro, rd, vec4(vec3(0.0, -1.0, 0.0), 6.0));

  if (tp0 > 0.0) {
    col += bottomBoxCol*exp(-0.5*(length((ro + tp0*rd).xz)));
  }

  if (tp1 > 0.0) {
    vec3 pos  = ro + tp1*rd;
    vec2 pp = pos.xz;
    float db = box(pp, vec2(5.0, 9.0))-3.0;
    
    col += topBoxCol*rd.y*rd.y*smoothstep(0.25, 0.0, db);
    col += 0.2*topBoxCol*exp(-0.5*max(db, 0.0));
    col += 0.05*sqrt(topBoxCol)*max(-db, 0.0);
  }

  col += 1E-2*lightCol0/(1.002-dot(ld0, rd));
  col += 2E-2*lightCol1/(1.005-dot(ld1, rd));
  col += sunCol/(1.001-dot(sunDir, rd));
  return col; 
}

vec3 render1(vec3 ro, vec3 rd) {
  
  int ii;
  float t = rayMarch(ro, rd, 0., ii);

  vec3 col = render0(ro, rd);
  
  if (t < MAX_RAY_LENGTH) {
    vec3 p = ro+rd*t;
    vec3 n = normal(p);
    vec3 r = reflect(rd, n);
    vec3 rcol = render0(p, r);
    float fre = 1.0+dot(rd,n);
    fre *= fre;
    fre = mix(0.5, 1.0, fre);
    vec3 ld0 = normalize(lightPos0-p);
    vec3 ld1 = normalize(lightPos1-p);
    
    float dif0 = pow(max(dot(ld0, n), 0.), 4.0)*0.1;
    float dif1 = pow(max(dot(ld1, n), 0.), 4.0)*0.1;

    col = vec3(0.);
    col += dif0*lightCol0;
    col += dif1*lightCol1;
    col += rcol*fre;
    mat3 rot = (g_rot);
    vec3 tp3 = p;
    vec3 tn3 = n;
    tp3 *= rot;
    tn3 *= rot;
    vec2 p2 = -(tp3.xy*tn3.z+tp3.zx*tn3.y+tp3.yz*tn3.x);
    float l2 = length(p2);
    p2.x *= RESOLUTION.y/RESOLUTION.x;
    vec2 tp2 = 0.5+0.5*p2;

    vec3 pcol = vec3(0,0,0);
    pcol *= pcol;
    float dc = l2-0.6;
    col = mix(col, pcol*sqrt(.5)*vec3(1., .5, .75)*smoothstep(0.9, 0.0, l2), smoothstep(-0.1250, 0.125, -dc));
    col += glowCol0/max(abs(dc), 1E-3);
    col += glowCol1/max(abs(l2*l2-0.05), 1E-4);
  }
  
  return col;
}

vec3 effect(vec2 p) {
  float a = TIME*0.25;
  vec3 r0 = vec3(1.0, sin(vec2(sqrt(0.5), 1.0)*a));
  vec3 r1 = vec3(cos(vec2(sqrt(0.5), 1.0)*0.913*a), 1.0);
  mat3 rot = rot(normalize(r0), normalize(r1));
  g_rot = rot;

  const vec3 up = vec3(0., 1., 0.);
  const vec3 ro   = vec3(0.0, 0.5, -3.0);
  const vec3 la   = vec3(0.0);

  const vec3 ww = normalize(la-ro);
  const vec3 uu = normalize(cross(up, ww));
  const vec3 vv = cross(ww, uu);
  vec3 rd = normalize(p.x*uu + p.y*vv + 2.*ww);

  vec3 col = vec3(0.0); 
  col = render1(ro, rd);
  col -= 2E-2*vec3(1.,2.,3.).zyx*(length(p)+0.25); 
  col = aces_approx(col);
  col = sqrt(col);
  return col;
}

void main() {
  vec2 q = gl_FragCoord.xy/RESOLUTION.xy;
  vec2 p = -1. + 2. * q;
  p.x *= RESOLUTION.x/RESOLUTION.y;

  vec3 col = effect(p);

  gl_FragColor = vec4(col, 1.0);
}

