'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

// ── Data ─────────────────────────────────────────────────────────────────────

const GARMENT_TYPES = [
  { id: 't-shirt',    label: 'T-Shirt',    code: 'GAR-001' },
  { id: 'hoodie',     label: 'Hoodie',     code: 'GAR-002' },
  { id: 'sweatshirt', label: 'Sweatshirt', code: 'GAR-003' },
] as const;

const FABRICS = [
  { id: 'cotton-180',  label: 'Cotton Jersey',    spec: '180 gsm',  code: 'FAB-01' },
  { id: 'fleece-380',  label: 'Heavyweight Fleece', spec: '380 gsm', code: 'FAB-02' },
  { id: 'terry-280',   label: 'French Terry',      spec: '280 gsm',  code: 'FAB-03' },
] as const;

const COLOURS = [
  { hex: '#000000', label: '#000000' },
  { hex: '#FFFFFF', label: '#FFFFFF' },
  { hex: '#1A1A2E', label: '#1A1A2E' },
  { hex: '#16213E', label: '#16213E' },
  { hex: '#E5232A', label: '#E5232A' },
  { hex: '#FF6B35', label: '#FF6B35' },
  { hex: '#F7C948', label: '#F7C948' },
  { hex: '#2ECC71', label: '#2ECC71' },
  { hex: '#1ABC9C', label: '#1ABC9C' },
  { hex: '#3498DB', label: '#3498DB' },
  { hex: '#9B59B6', label: '#9B59B6' },
  { hex: '#BDC3C7', label: '#BDC3C7' },
] as const;

const PLACEMENTS = [
  { id: 'front-chest', label: 'Front Chest',   note: 'Left breast, standard position' },
  { id: 'back',        label: 'Back',           note: 'Centred, below collar' },
  { id: 'sleeve',      label: 'Sleeve',         note: 'Left or right upper arm' },
] as const;

// Price per unit table (GBP)
function pricePerUnit(qty: number): number {
  if (qty >= 1000) return 3.20;
  if (qty >= 500)  return 4.50;
  if (qty >= 200)  return 6.00;
  if (qty >= 100)  return 7.80;
  return 10.20;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ConfigurePage() {
  const [step, setStep]           = useState(1);
  const [inputMode, setInputMode] = useState<'upload' | 'standard'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver]   = useState(false);
  const [garment, setGarment]     = useState<string>('t-shirt');
  const [fabric, setFabric]       = useState<string>('cotton-180');
  const [colour, setColour]       = useState<string>('#000000');
  const [placement, setPlacement] = useState<string>('front-chest');
  const [qty, setQty]             = useState<number>(100);

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  }

  const ppu = pricePerUnit(qty);
  const totalGBP = (ppu * qty).toFixed(2);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <div
            className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            CONFIGURATOR — DIGITAL FABRICATION
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Dogma', sans-serif" }}
          >
            Configure Your Collection
          </h1>
          <p className="text-gray-500 mt-3 max-w-lg">
            See your collection in 3D before we make a single stitch. Complete each step, then send your quote request.
          </p>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center gap-0 mb-12 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStep(n)}
              className={`flex items-center gap-0 shrink-0 ${n < 5 ? 'flex-1' : ''}`}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2 border text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                  step === n
                    ? 'border-[#E5232A] bg-[#E5232A]/10 text-[#E5232A]'
                    : step > n
                    ? 'border-[#E5232A]/30 bg-transparent text-gray-400'
                    : 'border-[#1E1E24] bg-transparent text-gray-600'
                }`}
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border ${
                    step >= n ? 'border-[#E5232A] text-[#E5232A]' : 'border-gray-700 text-gray-700'
                  }`}
                >
                  {n}
                </span>
                <span className="hidden sm:inline">
                  {['Pattern', 'Fabric', 'Colour', 'Logo', 'Quantity'][n - 1]}
                </span>
              </div>
              {n < 5 && <div className={`h-px flex-1 transition-colors duration-200 ${step > n ? 'bg-[#E5232A]/40' : 'bg-[#1E1E24]'}`} />}
            </button>
          ))}
        </div>

        {/* Main layout: left form + right preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT: Config form ── */}
          <div className="space-y-0">

            {/* STEP 1 — Pattern */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-white mb-2">
                  Step 1 — Your Pattern
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Upload your 2D tech pack and we&apos;ll generate a 3D model. Or choose a standard base garment.
                </p>

                {/* Mode toggle */}
                <div className="flex gap-0 mb-6 border border-[#1E1E24]">
                  <button
                    onClick={() => setInputMode('upload')}
                    className={`flex-1 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                      inputMode === 'upload'
                        ? 'bg-[#E5232A] text-white'
                        : 'bg-transparent text-gray-500 hover:text-white'
                    }`}
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    Upload Pattern
                  </button>
                  <button
                    onClick={() => setInputMode('standard')}
                    className={`flex-1 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                      inputMode === 'standard'
                        ? 'bg-[#E5232A] text-white'
                        : 'bg-transparent text-gray-500 hover:text-white'
                    }`}
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    Standard Garment
                  </button>
                </div>

                {/* ── Upload mode ── */}
                {inputMode === 'upload' && (
                  <div>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleFileDrop}
                      className={`relative border-2 border-dashed rounded-none p-10 text-center transition-all duration-200 cursor-pointer ${
                        dragOver
                          ? 'border-[#E5232A] bg-[#E5232A]/5'
                          : uploadedFile
                          ? 'border-[#E5232A]/60 bg-[#E5232A]/5'
                          : 'border-[#1E1E24] hover:border-[#E5232A]/40 bg-[#111114]'
                      }`}
                    >
                      <input
                        type="file"
                        accept=".dxf,.pdf,.ai,.svg,.png,.jpg,.jpeg,.zip"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {uploadedFile ? (
                        <div>
                          <div className="text-[#E5232A] text-2xl mb-3">✓</div>
                          <div className="text-white font-semibold text-sm mb-1">{uploadedFile.name}</div>
                          <div
                            className="text-gray-500 text-xs"
                            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                          >
                            {(uploadedFile.size / 1024).toFixed(0)} KB · Pattern received
                          </div>
                          <div className="mt-3 text-[11px] text-[#E5232A]/70 tracking-widest uppercase"
                            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                          >
                            Will be processed into 3D model via Blender
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-600 text-3xl mb-4">⊕</div>
                          <div className="text-white text-sm font-semibold mb-2">
                            Drop your tech pack here
                          </div>
                          <div className="text-gray-500 text-xs mb-4">
                            or click to browse
                          </div>
                          <div
                            className="text-[10px] text-gray-700 tracking-widest"
                            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                          >
                            DXF · PDF · AI · SVG · PNG · ZIP
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 p-4 border border-[#1E1E24] bg-[#111114]">
                      <div
                        className="text-[10px] text-gray-600 tracking-widest uppercase mb-2"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        What happens next
                      </div>
                      <ul className="text-xs text-gray-400 space-y-1">
                        <li>→ Your 2D pattern panels are read and reconstructed in 3D</li>
                        <li>→ A render is generated showing the garment in your chosen fabric</li>
                        <li>→ You approve before we cut a single piece of cloth</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* ── Standard garment mode ── */}
                {inputMode === 'standard' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {GARMENT_TYPES.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGarment(g.id)}
                        className={`tech-card relative p-6 text-left transition-all duration-200 ${
                          garment === g.id
                            ? 'border-[#E5232A] bg-[#E5232A]/5 shadow-[0_0_16px_rgba(229,35,42,0.15)]'
                            : 'hover:border-[#E5232A]/40'
                        }`}
                      >
                        <div
                          className="text-[10px] text-gray-600 tracking-widest mb-3"
                          style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                        >
                          {g.code}
                        </div>
                        <div className="text-sm font-bold text-white mb-1">{g.label}</div>
                        <div className="text-xs text-gray-600">Standard base pattern</div>
                        {garment === g.id && (
                          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#E5232A]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={inputMode === 'upload' && !uploadedFile}
                  className={`mt-8 px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 ${
                    inputMode === 'upload' && !uploadedFile
                      ? 'bg-[#1E1E24] text-gray-600 cursor-not-allowed'
                      : 'bg-[#E5232A] text-white hover:bg-red-500'
                  }`}
                >
                  Next: Fabric →
                </button>
                {inputMode === 'upload' && !uploadedFile && (
                  <p className="mt-2 text-[11px] text-gray-600" style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
                    Upload a pattern file to continue
                  </p>
                )}
              </div>
            )}

            {/* STEP 2 — Fabric */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-white mb-6">
                  Step 2 — Choose Fabric
                </h2>
                <div className="space-y-3">
                  {FABRICS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFabric(f.id)}
                      className={`tech-card w-full p-5 text-left flex items-center justify-between transition-all duration-200 ${
                        fabric === f.id
                          ? 'border-[#E5232A] bg-[#E5232A]/5'
                          : 'hover:border-[#E5232A]/40'
                      }`}
                    >
                      <div>
                        <div
                          className="text-[10px] text-gray-600 tracking-widest mb-1"
                          style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                        >
                          {f.code}
                        </div>
                        <div className="text-sm font-bold text-white">{f.label}</div>
                      </div>
                      <span
                        className={`text-xs border px-2 py-0.5 stat-readout transition-colors duration-200 ${
                          fabric === f.id ? 'border-[#E5232A] text-[#E5232A]' : 'border-gray-700 text-gray-500'
                        }`}
                      >
                        {f.spec}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="px-6 py-3 border border-[#1E1E24] text-sm text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200 tracking-widest uppercase">
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} className="px-8 py-3 bg-[#E5232A] text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-500 transition-all duration-200">
                    Next: Colour →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Colour */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-white mb-6">
                  Step 3 — Choose Colour
                </h2>
                <div className="grid grid-cols-6 gap-3 mb-4">
                  {COLOURS.map((c) => (
                    <div key={c.hex} className="flex flex-col items-center gap-1.5">
                      <button
                        onClick={() => setColour(c.hex)}
                        className={`colour-swatch ${colour === c.hex ? 'selected' : ''}`}
                        style={{ backgroundColor: c.hex, borderColor: colour === c.hex ? '#E5232A' : 'transparent' }}
                        title={c.label}
                      />
                      <span
                        className="text-[8px] text-gray-600"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4 p-4 border border-[#1E1E24] bg-[#111114]">
                  <div
                    className="w-10 h-10 rounded-sm border border-[#1E1E24] shrink-0"
                    style={{ backgroundColor: colour }}
                  />
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>Selected</div>
                    <div className="text-sm font-semibold text-white stat-readout">{colour}</div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-3 border border-[#1E1E24] text-sm text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200 tracking-widest uppercase">
                    ← Back
                  </button>
                  <button onClick={() => setStep(4)} className="px-8 py-3 bg-[#E5232A] text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-500 transition-all duration-200">
                    Next: Logo Placement →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 — Logo placement */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-white mb-6">
                  Step 4 — Logo Placement
                </h2>
                <div className="space-y-3">
                  {PLACEMENTS.map((p) => (
                    <label
                      key={p.id}
                      className={`tech-card flex items-center gap-4 p-5 cursor-pointer transition-all duration-200 ${
                        placement === p.id
                          ? 'border-[#E5232A] bg-[#E5232A]/5'
                          : 'hover:border-[#E5232A]/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="placement"
                        value={p.id}
                        checked={placement === p.id}
                        onChange={() => setPlacement(p.id)}
                        className="sr-only"
                      />
                      {/* Custom radio */}
                      <div
                        className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors duration-200 ${
                          placement === p.id ? 'border-[#E5232A]' : 'border-gray-600'
                        }`}
                      >
                        {placement === p.id && (
                          <div className="w-2 h-2 bg-[#E5232A]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{p.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{p.note}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {/* Placement diagram placeholder */}
                <div className="mt-6 p-5 border border-[#1E1E24] bg-[#111114] text-center">
                  <div
                    className="text-[10px] text-gray-600 tracking-widest uppercase mb-3"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    PLACEMENT DIAGRAM
                  </div>
                  <div className="inline-block relative">
                    {/* T-shirt silhouette via CSS borders */}
                    <div className="w-32 h-40 border border-gray-700 mx-auto relative">
                      <div className="absolute -top-4 left-6 w-20 h-5 border border-gray-700 border-b-0" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-10 h-4 border border-gray-700 rounded-b-full" />
                      {placement === 'front-chest' && (
                        <div className="absolute top-4 left-3 w-6 h-6 border border-[#E5232A] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#E5232A]" />
                        </div>
                      )}
                      {placement === 'sleeve' && (
                        <div className="absolute top-4 -left-8 w-6 h-6 border border-[#E5232A] flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#E5232A]" />
                        </div>
                      )}
                    </div>
                    {placement === 'back' && (
                      <div className="text-[10px] text-[#E5232A] mt-2 tracking-widest" style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
                        — BACK VIEW —
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(3)} className="px-6 py-3 border border-[#1E1E24] text-sm text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200 tracking-widest uppercase">
                    ← Back
                  </button>
                  <button onClick={() => setStep(5)} className="px-8 py-3 bg-[#E5232A] text-white text-sm font-semibold tracking-widest uppercase hover:bg-red-500 transition-all duration-200">
                    Next: Quantity →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5 — Quantity + pricing */}
            {step === 5 && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-white mb-6">
                  Step 5 — Quantity &amp; Pricing
                </h2>
                <div className="p-6 border border-[#1E1E24] bg-[#111114] mb-6">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div
                        className="text-[10px] text-gray-600 tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        UNITS
                      </div>
                      <div className="text-4xl font-bold text-white stat-readout">{qty}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-[10px] text-gray-600 tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        PRICE PER UNIT
                      </div>
                      <div className="text-4xl font-bold text-[#E5232A] stat-readout">£{ppu.toFixed(2)}</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="qty-slider"
                    min={50}
                    max={1000}
                    step={10}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1 stat-readout" style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}>
                    <span>50</span><span>200</span><span>500</span><span>1000</span>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="border border-[#1E1E24] overflow-hidden mb-8">
                  <div
                    className="bg-[#111114] border-b border-[#1E1E24] px-5 py-2.5 text-[10px] text-gray-500 tracking-widest uppercase flex justify-between"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    <span>BREAKDOWN</span>
                    <span>GBP</span>
                  </div>
                  {[
                    [`${qty} × £${ppu.toFixed(2)} per unit`, `£${totalGBP}`],
                    ['UK Import Duty', '£0.00 — DFQF'],
                    ['Est. shipping (air freight)', 'TBC on quote'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 border-b border-[#1E1E24] last:border-0">
                      <span className="text-sm text-gray-400">{label}</span>
                      <span className="text-sm font-semibold text-white stat-readout">{val}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-5 py-4 bg-[#E5232A]/5 border-t border-[#E5232A]/30">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Estimated Total</span>
                    <span className="text-lg font-bold text-[#E5232A] stat-readout">£{totalGBP}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(4)} className="px-6 py-3 border border-[#1E1E24] text-sm text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200 tracking-widest uppercase">
                    ← Back
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: 3D Preview panel ── */}
          <div className="lg:sticky lg:top-28 self-start">
            {/* Config summary strip */}
            <div
              className="flex items-center gap-4 px-5 py-3 bg-[#111114] border border-[#1E1E24] mb-4 overflow-x-auto text-[10px] text-gray-500 tracking-widest uppercase"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              <span>
                {GARMENT_TYPES.find(g => g.id === garment)?.label ?? garment}
              </span>
              <span className="text-gray-700">·</span>
              <span>
                {FABRICS.find(f => f.id === fabric)?.label ?? fabric}
              </span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded-sm border border-gray-700"
                  style={{ backgroundColor: colour }}
                />
                {colour}
              </span>
              <span className="text-gray-700">·</span>
              <span>{qty} units</span>
            </div>

            {/* 3D Preview area */}
            <div className="preview-panel relative bg-[#0D0D10] flex flex-col items-center justify-center"
              style={{ minHeight: '480px' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#E5232A]/60" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#E5232A]/60" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#E5232A]/60" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#E5232A]/60" />

              {/* Subtle grid inside panel */}
              <div className="absolute inset-0 grid-overlay-fine opacity-60" />

              {/* Wireframe decoration inside panel */}
              <div className="relative z-10 flex flex-col items-center gap-6 py-12 px-8 text-center">
                {/* Mini rotating wireframe */}
                <div className="relative w-32 h-40 opacity-20" aria-hidden="true">
                  <div className="absolute inset-4 border border-[#E5232A]" style={{ animation: 'slowRotate 16s linear infinite', transformStyle: 'preserve-3d' }} />
                  <div className="absolute top-0 left-8 right-8 h-6 border border-[#E5232A] border-b-0" style={{ animation: 'slowRotate 16s linear infinite' }} />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-3 border border-[#E5232A] rounded-b-full" style={{ animation: 'slowRotate 16s linear infinite' }} />
                </div>

                <div
                  className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  3D PREVIEW
                </div>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                  3D viewer coming soon — connect Blender MCP to enable
                </p>
                <div
                  className="px-4 py-2 border border-[#E5232A]/30 text-[10px] text-gray-600 tracking-widest uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  RENDERER OFFLINE
                </div>

                {/* Live config echo */}
                <div className="w-full mt-4 border border-[#1E1E24] bg-[#0A0A0B] p-4 text-left">
                  <div
                    className="text-[10px] text-gray-600 tracking-widest uppercase mb-3"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    CONFIG STATE
                  </div>
                  {[
                    ['garment', GARMENT_TYPES.find(g => g.id === garment)?.label ?? garment],
                    ['fabric',  FABRICS.find(f => f.id === fabric)?.label ?? fabric],
                    ['colour',  colour],
                    ['logo',    PLACEMENTS.find(p => p.id === placement)?.label ?? placement],
                    ['qty',     String(qty)],
                    ['ppu',     `£${ppu.toFixed(2)}`],
                  ].map(([key, val]) => (
                    <div key={key} className="flex gap-2 text-[11px] font-mono">
                      <span className="text-[#E5232A]/70 w-16 shrink-0">{key}</span>
                      <span className="text-gray-400 truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Send quote CTA */}
            <Link
              href="/quote"
              className="mt-4 block w-full text-center px-8 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_28px_rgba(229,35,42,0.55)] hover:scale-[1.01]"
            >
              Send Quote Request →
            </Link>

            <p
              className="text-center text-[10px] text-gray-600 mt-3 tracking-wide"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              No commitment required · Reply within 24 hours
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
