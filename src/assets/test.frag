#ifdef GL_ES
precision mediump float;
#endif

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.5 + 0.5 * cos(uTime + uv.xyx * 3.0));
    gl_FragColor = vec4(color, 1.0);
}