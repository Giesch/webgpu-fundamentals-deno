import triangleWgsl from "./shaders/triangle.wgsl" with { type: "text" };

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) throw new Error("no WebGPU adapter available");
const device = await adapter.requestDevice();

const win = new Deno.BrowserWindow({
  title: "Triangle",
  width: 640,
  height: 480,
});

const surface = win.getNativeWindow();
const format = navigator.gpu.getPreferredCanvasFormat();
const context = surface.getContext("webgpu");
context.configure({ device, format, alphaMode: "opaque" });

// The vertex stage emits three corners; the fragment stage receives the
// color interpolated between them.
const shader = device.createShaderModule({ code: triangleWgsl });

const pipeline = device.createRenderPipeline({
  layout: "auto",
  vertex: { module: shader, entryPoint: "vs" },
  fragment: { module: shader, entryPoint: "fs", targets: [{ format }] },
  primitive: { topology: "triangle-list" },
});

const encoder = device.createCommandEncoder();
const pass = encoder.beginRenderPass({
  colorAttachments: [{
    view: context.getCurrentTexture().createView(),
    clearValue: { r: 0.05, g: 0.05, b: 0.08, a: 1 },
    loadOp: "clear",
    storeOp: "store",
  }],
});
pass.setPipeline(pipeline);
pass.draw(3);
pass.end();
device.queue.submit([encoder.finish()]);
surface.present();
