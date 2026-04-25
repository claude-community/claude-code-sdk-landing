function Hero() {
  const lines = [
    '<span style="color:#C15F3C;font-weight:700">&gt;_</span> claude <span style="color:#4F9A99">"add error handling to all API calls"</span>',
    '<span style="color:#8A8780">●</span> Plan: 4 files to update <span style="color:#8A8780">(src/api/*.ts)</span>',
    '<span style="color:#5A8E5A">✓</span> Updated <span style="color:#4F9A99">src/api/users.ts</span>',
    '<span style="color:#5A8E5A">✓</span> Updated <span style="color:#4F9A99">src/api/orders.ts</span>',
    '<span style="color:#5A8E5A">✓</span> Updated <span style="color:#4F9A99">src/api/auth.ts</span>',
    '<span style="color:#C99B2C">⏵</span> Running <span style="color:#4F9A99">npm test</span><span style="color:#8A8780">…</span>',
    '<span style="color:#5A8E5A">✓</span> 28 tests passed <span style="color:#8A8780">in 4.2s</span>',
    '<span style="color:#C15F3C;font-weight:700">&gt;_</span> <span style="color:#8A8780">_</span>',
  ];
  return (
    <section data-mk-section style={heroStyles.wrap}>
      <div style={heroStyles.inner}>
        <div style={heroStyles.copy}>
          <div style={heroStyles.eyebrow}>CLAUDE CODE SDK · POWERED BY SONNET 4.5</div>
          <h1 data-mk-display style={heroStyles.h1}>Code at the<br/>speed of thought.</h1>
          <p data-mk-body style={heroStyles.sub}>
            Build, debug, and ship from your terminal, IDE, Slack, or the web. Describe what you need, and Claude handles the rest — reading your codebase, editing files, running tests.
          </p>
          <div style={heroStyles.ctaRow}>
            <button style={heroStyles.primary}>
              <span style={{fontFamily:'JetBrains Mono, monospace', fontWeight:700, marginRight:6}}>&gt;_</span>
              Install Claude Code SDK
            </button>
            <button data-mk-secondary style={heroStyles.secondary}>Read the docs →</button>
          </div>
          <div style={heroStyles.installRow}>
            <span style={heroStyles.installLabel}>macOS · Linux · WSL</span>
            <code data-mk-install style={heroStyles.install}>curl -fsSL https://claude.ai/install.sh | bash</code>
          </div>
        </div>
        <div style={heroStyles.demo}>
          <window.MkTerminal lines={lines} animate={true} />
        </div>
      </div>
    </section>
  );
}

const heroStyles = {
  wrap: { padding:'80px 24px 60px' },
  inner: { maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:60, alignItems:'center' },
  copy: { display:'flex', flexDirection:'column', gap:20 },
  eyebrow: { fontFamily:'JetBrains Mono, monospace', fontSize:12, letterSpacing:'0.08em', color:'#9F4C2D', fontWeight:500 },
  h1: { fontFamily:'Fraunces, serif', fontSize:80, fontWeight:400, lineHeight:1.02, letterSpacing:'-0.025em', margin:0, color:'#1F1E1B' },
  sub: { fontFamily:'Inter, sans-serif', fontSize:18, lineHeight:1.55, color:'#3D3D3A', maxWidth:520, margin:0, textWrap:'pretty' },
  ctaRow: { display:'flex', gap:10, marginTop:8 },
  primary: { fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, padding:'12px 20px', borderRadius:6, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center' },
  secondary: { fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, padding:'12px 20px', borderRadius:6, border:'1px solid #DCD9CF', background:'#FAF9F5', color:'#1F1E1B', cursor:'pointer' },
  installRow: { marginTop:14, display:'flex', flexDirection:'column', gap:6 },
  installLabel: { fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.06em', color:'#8C8A82', textTransform:'uppercase' },
  install: { fontFamily:'JetBrains Mono, monospace', fontSize:13, background:'#EDEBE3', border:'1px solid #DCD9CF', borderRadius:6, padding:'8px 12px', color:'#1F1E1B', display:'inline-block', width:'fit-content' },
  demo: {},
};

window.MkHero = Hero;
