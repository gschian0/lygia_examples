#ifdef GL_ES
precision mediump float
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#include "lygia/math/const.glsl"

#include "lygia/space/ratio.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/stroke.glsl"
#include "lygia/draw/aastep.glsl"

#include "lygia/generative/snoise.glsl"
#include "lygia/color/space/hsv2rgb.glsl"

#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl"

#include "lygia/space/rotate.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float grid = 10.0;
    vec2 st_i = floor(st * grid);
    vec2 st_f = fract(st * grid);
    st_f = rotate(st_f, GOLDEN_ANGLE);

    float sdf2 = triSDF(st_f);
    color += fill(sdf2,.5);

    st = ratio(st+.5, u_resolution);
    float n = snoise(vec3(st*10., u_time))*.5 +.5;
    float sdf = circleSDF(st*n)*1.5;
    sdf = circleSDF(st*n)*1.5;
    color += stroke(sdf,.5, 0.2);
    
    color += hsv2rgb(vec3((10.*n), 1.0,1.0));

    vec3 c1 = vec3(1., .41,.71);
    vec3 c2 = vec3(1.0,1.0,0.);
    
    

    gl_FragColor = vec4(color, 1.0);
}