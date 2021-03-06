#version 330

uniform float u_time;

out vec4 fragColor;

in INTERFACE { vec2 st; }
In;

mat2 rotZ(float angle) {
  float ca = cos(angle);
  float sa = sin(angle);
  return mat2(ca, -sa, sa, ca);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void note_render(vec2 uv, float pos, inout vec3 color) {
  float mod_x = mod(uv.x, 0.1 * 2.5 * 2.0);

  vec3 col = vec3(160.0 / 255.0, 81.0 / 255.0, 238.0 / 255.0);

  if (pos == 0.5) {
    col = vec3(113.0 / 255.0, 48.0 / 255.0, 178.0 / 255.0);
  }

  // vec3 col = vec3(210.0 / 255.0, 89.0 / 255.0, 222.0 / 255.0);

  // if (pos == 0.5) {
  //   col = vec3(125.0 / 255.0, 69.0 / 255.0, 134.0 / 255.0);
  // }

  // vec3 col = hsv2rgb(vec3(0.85 - abs(sin(u_time / 150.0)), 59.9 / 100.0,
  //                         87.1 / 100.0)); // Hue 295.0,252.0

  // if (pos == 0.5) {
  //   col = hsv2rgb(vec3(0.85 - abs(sin(u_time / 150.0)) - 3.0 / 360.0,
  //                      48.5 / 100.0, 52.5 / 100.0));
  // }

  if (uv.y > 0.0 && uv.y < 0.5) {
    color = mix(color, col,
                smoothstep(-0.002, 0., 127. / 5800. - abs(mod_x - pos)));
  }
}

#define speed -0.5
#define liveTime 2.6

void main() {
  vec2 st = In.st;
  vec3 color = vec3(0.12);

  float d = 0.0;

  st *= rotZ(0.7);
  st.x *= 1.5;
  st.x = mod(st.x, 0.5);

  {
    st.y += 0.5;

    float off = 0.0;
    vec2 pos = st;

    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1, color);

    off = 1.0;
    pos = st;
    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1 * 2.0, color);

    off = 3.0;
    pos = st;
    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1 * 3.0, color);

    off = 2.0;
    pos = st;
    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1 * 4.0, color);

    off = 0.0;
    pos = st;
    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1 * 5.0, color);

    off = 4.0;
    pos = st;
    pos.y -= mod((u_time * speed + off) / 5.0, 1.0) * liveTime;
    note_render(pos, 0.1 * 5.0, color);
  }

  fragColor = vec4(color / 2.5, 1.0);
}