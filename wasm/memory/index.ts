// WasmBoy memory map:
// https://docs.google.com/spreadsheets/d/17xrEzJk5-sCB9J2mMJcVnzhbE-XH_NvczVSQH9OHvRk/edit?usp=sharing
// Public exports for our memory "class"

export {
  Memory,
  initializeCartridge,
  setPixelOnFrame,
  getRgbPixelStart,
  storeFrameToBeRendered,
  setLeftAndRightOutputForAudioQueue,
  storePaletteByteInWasmMemory,
  loadPaletteByteFromWasmMemory,
  getSaveStateMemoryOffset,
  loadFromVramBank
} from './memory';

export {
  eightBitLoadFromGBMemoryWithTraps,
  eightBitLoadFromGBMemory,
  sixteenBitLoadFromGBMemory,
  loadBooleanDirectlyFromWasmMemory
} from './load';

export {
  eightBitStoreIntoGBMemoryWithTraps,
  sixteenBitStoreIntoGBMemory,
  eightBitStoreIntoGBMemory,
  sixteenBitStoreIntoGBMemorySkipTraps,
  storeBooleanDirectlyToWasmMemory
} from './store';

export {
  updateHblankHdma
} from './dma';
