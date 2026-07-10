// A WebGPU context must exist before the native surface can be wrapped, so
// acquire the adapter and device first.
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) throw new Error("no WebGPU adapter available");
const device = await adapter.requestDevice();

const win = new Deno.BrowserWindow({
  title: "WebGPU",
  // width: 640,
  // height: 480,
});

// Wrap the native window as a surface and configure a WebGPU context on it.
const surface = win.getNativeWindow();
const format = navigator.gpu.getPreferredCanvasFormat();
const context = surface.getContext("webgpu") as GPUCanvasContext | null;
if (!context) throw new Error("failed to acquire GPU canvas contex");
context.configure({ device, format, alphaMode: "opaque" });

// FIXME this hits an upstream panic on wayland
// // Match the surface to the window before the first frame.
// const [width, height] = win.getSize();
// surface.width = width;
// surface.height = height;

// Clear the frame to teal and present it.
const encoder = device.createCommandEncoder();
encoder.beginRenderPass({
  colorAttachments: [{
    view: context.getCurrentTexture().createView(),
    clearValue: { r: 0, g: 0.5, b: 0.5, a: 1 },
    loadOp: "clear",
    storeOp: "store",
  }],
}).end();
device.queue.submit([encoder.finish()]);
surface.present();
