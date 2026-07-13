struct VertexOut {
  @builtin(position) pos: vec4f,
  @location(0) color: vec3f,
};

@vertex
fn vs(@builtin(vertex_index) i: u32) -> VertexOut {
  var positions = array<vec2f, 3>(
    vec2f( 0.0,  0.6),
    vec2f(-0.6, -0.6),
    vec2f( 0.6, -0.6),
  );

  var colors = array<vec3f, 3>(
    vec3f(1.0, 0.0, 0.0),
    vec3f(0.0, 1.0, 0.0),
    vec3f(0.0, 0.0, 1.0),
  );

  var out: VertexOut;
  out.pos = vec4f(positions[i], 0.0, 1.0);
  out.color = colors[i];

  return out;
}

@fragment
fn fs(in: VertexOut) -> @location(0) vec4f {
  return vec4f(in.color, 1.0);
}
