// Node smoke test for the embedding lifecycle (headless): config -> loadROM -> play -> destroy -> again.
// If destroy() leaves a worker alive, node never exits and the test runner times out.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { WasmBoy } = require('../../dist/wasmboy.wasm.cjs.js');

const rom = new Uint8Array(fs.readFileSync(path.join(__dirname, '../performance/testroms/tobutobugirl/tobutobugirl.gb')));
const options = { headless: true, isAudioEnabled: false, disableSaves: true };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runOnce() {
  await WasmBoy.config(options);
  await WasmBoy.loadROM(rom);
  assert.equal(WasmBoy.isReady(), true);
  await WasmBoy.play();
  await sleep(300);
  assert.equal(WasmBoy.isPlaying(), true);
}

test('disableSaves is a known option', async () => {
  await WasmBoy.config(options);
  assert.equal(WasmBoy.getConfig().disableSaves, true);
});

test('destroy tears everything down', async () => {
  await runOnce();
  await WasmBoy.destroy();
  assert.equal(WasmBoy.isReady(), false);
  assert.equal(WasmBoy.isLoadedAndStarted(), false);
});

test('destroy is idempotent', async () => {
  await WasmBoy.destroy();
  await WasmBoy.destroy();
});

test('mount, destroy, mount again works (StrictMode)', async () => {
  await runOnce();
  await WasmBoy.destroy();
  await runOnce();
  await WasmBoy.destroy();
});
