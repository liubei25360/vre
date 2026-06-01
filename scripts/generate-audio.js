const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const DURATION = 12;
const CHANNELS = 2;
const BITS = 16;

const totalSamples = SAMPLE_RATE * DURATION;
const buffer = new Int16Array(totalSamples * CHANNELS);

function writeSample(index, channel, value) {
  const i = index * CHANNELS + channel;
  const clamped = Math.max(-32768, Math.min(32767, Math.round(value * 32767)));
  buffer[i] = clamped;
}

// Deep warm cinematic bass drone (sine at ~55Hz + 110Hz + harmonics)
const bassFreq = 55;
const bass2Freq = 110;
const bass3Freq = 82.4;

for (let i = 0; i < totalSamples; i++) {
  const t = i / SAMPLE_RATE;

  // Envelope: fade in 0.5s, full 9s, fade out 2.5s
  let env = 1;
  if (t < 0.5) env = t / 0.5;
  else if (t > DURATION - 2.5) env = Math.max(0, (DURATION - t) / 2.5);

  // Drone: warm low-end
  const drone =
    Math.sin(2 * Math.PI * bassFreq * t) * 0.18 +
    Math.sin(2 * Math.PI * bass2Freq * t) * 0.1 +
    Math.sin(2 * Math.PI * bass3Freq * t) * 0.06;

  // Sub-bass rumble at 27.5Hz
  const sub = Math.sin(2 * Math.PI * 27.5 * t) * 0.12;

  // Warm pad layer — slow pulse
  const padFreq = 220 + Math.sin(2 * Math.PI * 0.15 * t) * 8;
  const pad = Math.sin(2 * Math.PI * padFreq * t) * 0.04;

  // High shimmer (subtle)
  const shimmer =
    Math.sin(2 * Math.PI * 880 * t) * 0.015 +
    Math.sin(2 * Math.PI * 1320 * t) * 0.008;

  const sample = (drone + sub + pad + shimmer) * env;

  writeSample(i, 0, sample);
  writeSample(i, 1, sample);
}

// Add golden chime spike at ~4s (when gold line reveals + title drops)
const chimeStart = Math.floor(4.0 * SAMPLE_RATE);
const chimeEnd = Math.floor(4.8 * SAMPLE_RATE);

for (let i = chimeStart; i < chimeEnd && i < totalSamples; i++) {
  const t = (i - chimeStart) / SAMPLE_RATE;

  // High-frequency bell strike
  const chimeEnv = Math.exp(-t * 6);

  const bellFreqs = [1046.5, 1318.5, 1568, 2093];
  let chime = 0;
  for (const f of bellFreqs) {
    chime += Math.sin(2 * Math.PI * f * t) * 0.3 * chimeEnv;
  }
  chime *= 0.25;

  writeSample(i, 0, buffer[i * CHANNELS] / 32767 + chime);
  writeSample(i, 1, buffer[i * CHANNELS + 1] / 32767 + chime);
}

// Add a second gentle chime at ~6s (when phrase lines appear)
const chime2Start = Math.floor(6.0 * SAMPLE_RATE);
const chime2End = Math.floor(6.4 * SAMPLE_RATE);

for (let i = chime2Start; i < chime2End && i < totalSamples; i++) {
  const t = (i - chime2Start) / SAMPLE_RATE;
  const chimeEnv = Math.exp(-t * 8);
  let chime2 = 0;
  for (const f of [784, 1046.5, 1318.5]) {
    chime2 += Math.sin(2 * Math.PI * f * t) * 0.25 * chimeEnv;
  }
  chime2 *= 0.15;

  writeSample(i, 0, buffer[i * CHANNELS] / 32767 + chime2);
  writeSample(i, 1, buffer[i * CHANNELS + 1] / 32767 + chime2);
}

// Final gentle chime at 8s
const chime3Start = Math.floor(8.0 * SAMPLE_RATE);
const chime3End = Math.floor(8.3 * SAMPLE_RATE);
for (let i = chime3Start; i < chime3End && i < totalSamples; i++) {
  const t = (i - chime3Start) / SAMPLE_RATE;
  const chimeEnv = Math.exp(-t * 10);
  let chime3 = 0;
  for (const f of [1046.5, 1568]) {
    chime3 += Math.sin(2 * Math.PI * f * t) * 0.2 * chimeEnv;
  }
  chime3 *= 0.12;
  writeSample(i, 0, buffer[i * CHANNELS] / 32767 + chime3);
  writeSample(i, 1, buffer[i * CHANNELS + 1] / 32767 + chime3);
}

// WAV header
const byteRate = SAMPLE_RATE * CHANNELS * (BITS / 8);
const dataSize = buffer.length * (BITS / 8);
const header = Buffer.alloc(44);

header.write("RIFF", 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(CHANNELS, 22);
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(byteRate, 28);
header.writeUInt16LE(CHANNELS * (BITS / 8), 32);
header.writeUInt16LE(BITS, 34);
header.write("data", 36);
header.writeUInt32LE(dataSize, 40);

const pcm = Buffer.from(buffer.buffer);
const wav = Buffer.concat([header, pcm]);

const outPath = path.join(__dirname, "..", "public", "ambient.wav");
fs.writeFileSync(outPath, wav);
console.log(`Generated: ${outPath} (${(wav.length / 1024 / 1024).toFixed(1)} MB)`);
