
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/space/ratio.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/draw/stroke.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = ratio(st, u_resolution);
    
    color += stroke(circleSDF(st),.9,.1);
    color += fill(flowerSDF(st.yx,3),.2);
    color -= fill(triSDF(vec2(st.x,.98-st.y)),.15);
    
    gl_FragColor = vec4(color, 1.0);
}
