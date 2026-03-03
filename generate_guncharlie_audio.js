import fs from 'fs';
import { Buffer } from 'buffer';

const sampleRate = 44100;
const bpm = 82;
const beatSec = 60 / bpm;

const notes = {
    'G2': 98.00, 'A2': 110.00, 'B2': 123.47, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F#3': 185.00,
    'G3': 196.00, 'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F#5': 739.99,
    'G5': 783.99, 'A5': 880.00, 'B5': 987.77
};

function generateTone(freq, duration, type = 'sine', vol = 0.5) {
    const samples = Math.floor(sampleRate * duration);
    const buffer = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        let wave = 0;
        if (type === 'sine') wave = Math.sin(2 * Math.PI * freq * t);
        if (type === 'triangle') wave = Math.asin(Math.sin(2 * Math.PI * freq * t)) * (2 / Math.PI);

        let envelope = 1;
        if (i < 2500) envelope = i / 2500;
        if (i > samples - 4000) envelope = (samples - i) / 4000;
        buffer[i] = wave * vol * envelope;
    }
    return buffer;
}

const totalBeats = 32;
const totalSamples = Math.floor(sampleRate * totalBeats * beatSec);
const mix = new Float32Array(totalSamples);

function addNote(note, startBeat, durationBeats, type, vol) {
    const freq = notes[note];
    if (!freq) return;
    const tone = generateTone(freq, durationBeats * beatSec, type, vol);
    const startIdx = Math.floor(startBeat * beatSec * sampleRate);
    for (let i = 0; i < tone.length; i++) {
        if (startIdx + i < mix.length) mix[startIdx + i] += tone[i];
    }
}

// Chords (Gmaj7 - Bm7 - Am7 - D7)
const baseVol = 0.07;
for (let bar = 0; bar < 8; bar++) {
    const start = bar * 4;
    let chord = [];
    if (bar % 4 === 0) chord = ['G2', 'D3', 'F#3', 'B3'];
    if (bar % 4 === 1) chord = ['B2', 'F#3', 'A3', 'D4'];
    if (bar % 4 === 2) chord = ['A2', 'E3', 'G3', 'C4'];
    if (bar % 4 === 3) chord = ['D3', 'A3', 'C4', 'F#4'];
    chord.forEach(n => addNote(n, start, 3.8, 'triangle', baseVol));
}

// Melody: Focusing on the sentimental hook
const melody = [
    // Luea tee nueng hai tur
    { n: 'B4', s: 0, d: 0.5 }, { n: 'B4', s: 0.5, d: 0.5 }, { n: 'B4', s: 1, d: 0.8 },
    { n: 'A4', s: 1.8, d: 0.2 }, { n: 'G4', s: 2, d: 0.5 }, { n: 'A4', s: 2.5, d: 1.2 },

    // Pen tee nueng puea thoe semoe
    { n: 'B4', s: 4, d: 0.5 }, { n: 'B4', s: 4.5, d: 0.5 }, { n: 'B4', s: 5, d: 0.8 },
    { n: 'A4', s: 5.8, d: 0.2 }, { n: 'G4', s: 6, d: 0.5 }, { n: 'A4', s: 6.5, d: 1.2 },

    // Wen tee wai hai kon pises
    { n: 'D5', s: 8, d: 0.5 }, { n: 'B4', s: 8.5, d: 0.5 }, { n: 'B4', s: 9, d: 0.8 },
    { n: 'A4', s: 9.8, d: 0.2 }, { n: 'G4', s: 10, d: 0.5 }, { n: 'A4', s: 10.5, d: 1.2 },

    // Pen jao kong...
    { n: 'B4', s: 12, d: 0.5 }, { n: 'B4', s: 12.5, d: 0.5 }, { n: 'B4', s: 13, d: 0.8 },
    { n: 'A4', s: 13.8, d: 0.2 }, { n: 'G4', s: 14, d: 0.5 }, { n: 'G4', s: 14.5, d: 1.8 },

    // Puea wan nai thoe ja klap ma (Repeat with variation)
    { n: 'D5', s: 16, d: 0.5 }, { n: 'E5', s: 16.5, d: 0.5 }, { n: 'D5', s: 17, d: 1 },
    { n: 'G4', s: 18.5, d: 1.2 },

    { n: 'B4', s: 20, d: 0.5 }, { n: 'A4', s: 20.5, d: 0.5 }, { n: 'G4', s: 21, d: 1 },
    { n: 'A4', s: 22.5, d: 1.2 },

    { n: 'G4', s: 24, d: 4 },
    { n: 'G4', s: 28, d: 4 }
];

melody.forEach(m => addNote(m.n, m.s, m.d, 'sine', 0.16));

// Lo-fi Beat
for (let b = 0; b < totalBeats; b++) {
    if (b % 4 === 0 || b % 4 === 2.5) addNote('G2', b, 0.15, 'sine', 0.2); // Kick
    if (b % 4 === 1 || b % 4 === 3) { // Soft Snap
        const samples = Math.floor(sampleRate * 0.08);
        const startIdx = Math.floor(b * beatSec * sampleRate);
        for (let j = 0; j < samples; j++) {
            if (startIdx + j < mix.length) mix[startIdx + j] += (Math.random() * 2 - 1) * 0.03 * (1 - j / samples);
        }
    }
}

// PCM
const pcm = Buffer.alloc(mix.length * 2);
for (let i = 0; i < mix.length; i++) {
    let val = mix[i];
    if (val > 1) val = 1;
    if (val < -1) val = -1;
    pcm.writeInt16LE(Math.floor(val * 32767), i * 2);
}

// WAV
const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(sampleRate, 24);
header.writeUInt32LE(sampleRate * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(pcm.length, 40);

fs.writeFileSync('public/guncharlie.wav', Buffer.concat([header, pcm]));
console.log('Final refined hook generated.');
