function CTABand() {
  return (
    <section style={ctaStyles.wrap}>
      <div style={ctaStyles.inner}>
        <h2 style={ctaStyles.h2}>Ship from where you already work.</h2>
        <p style={ctaStyles.sub}>Available with a Pro or Max plan, a Team or Enterprise premium seat, or an Anthropic Console account.</p>
        <div style={ctaStyles.row}>
          <button style={ctaStyles.primary}>
            <span style={{fontFamily:'JetBrains Mono, monospace', fontWeight:700, marginRight:6}}>&gt;_</span>
            Install Claude Code SDK
          </button>
          <button style={ctaStyles.secondary}>See pricing</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={ftStyles.wrap}>
      <div style={ftStyles.inner}>
        <div style={ftStyles.cols}>
          <div style={ftStyles.col}>
            <div style={ftStyles.brand}>
              <div style={ftStyles.glyph}>&gt;_</div>
              <span style={ftStyles.brandText}>claude code <span style={{color:'#D97757'}}>sdk</span></span>
            </div>
            <p style={ftStyles.tag}>An agentic coding tool that lives in your terminal.</p>
          </div>
          <div style={ftStyles.col}>
            <div style={ftStyles.colH}>PRODUCT</div>
            <a style={ftStyles.colLink} href="#">Terminal</a>
            <a style={ftStyles.colLink} href="#">VS Code</a>
            <a style={ftStyles.colLink} href="#">Desktop</a>
            <a style={ftStyles.colLink} href="#">Web</a>
            <a style={ftStyles.colLink} href="#">Agent SDK</a>
          </div>
          <div style={ftStyles.col}>
            <div style={ftStyles.colH}>RESOURCES</div>
            <a style={ftStyles.colLink} href="#">Docs</a>
            <a style={ftStyles.colLink} href="#">Quickstart</a>
            <a style={ftStyles.colLink} href="#">Changelog</a>
            <a style={ftStyles.colLink} href="#">Engineering blog</a>
            <a style={ftStyles.colLink} href="#">Discord</a>
          </div>
          <div style={ftStyles.col}>
            <div style={ftStyles.colH}>COMPANY</div>
            <a style={ftStyles.colLink} href="#">Anthropic</a>
            <a style={ftStyles.colLink} href="#">Pricing</a>
            <a style={ftStyles.colLink} href="#">Customers</a>
            <a style={ftStyles.colLink} href="#">Status</a>
          </div>
        </div>
        <div style={ftStyles.bottom}>
          <span>© 2026 Anthropic PBC</span>
          <span>Built with Claude Code.</span>
        </div>
      </div>
    </footer>
  );
}

const ctaStyles = {
  wrap: { padding:'100px 24px', background:'#161513' },
  inner: { maxWidth:880, margin:'0 auto', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:18 },
  h2: { fontFamily:'Fraunces, serif', fontSize:64, fontWeight:400, lineHeight:1.02, letterSpacing:'-0.025em', color:'#ECEAE3', margin:0 },
  sub: { fontFamily:'Inter, sans-serif', fontSize:17, lineHeight:1.55, color:'#B1ADA1', margin:0, maxWidth:600 },
  row: { display:'flex', gap:10, marginTop:8 },
  primary: { fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, padding:'12px 22px', borderRadius:6, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center' },
  secondary: { fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, padding:'12px 22px', borderRadius:6, border:'1px solid #3A372F', background:'transparent', color:'#ECEAE3', cursor:'pointer' },
};

const ftStyles = {
  wrap: { padding:'48px 24px 32px', background:'#1F1D1A', color:'#B1ADA1' },
  inner: { maxWidth:1200, margin:'0 auto' },
  cols: { display:'grid', gridTemplateColumns:'1.4fr repeat(3, 1fr)', gap:32, paddingBottom:32, borderBottom:'1px solid #2E2C28' },
  col: { display:'flex', flexDirection:'column', gap:8 },
  brand: { display:'flex', alignItems:'center', gap:10, marginBottom:8 },
  glyph: { width:30, height:30, borderRadius:6, background:'#ECEAE3', color:'#C15F3C', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:14 },
  brandText: { fontFamily:'JetBrains Mono, monospace', fontSize:16, fontWeight:500, color:'#ECEAE3', letterSpacing:'-0.01em' },
  tag: { fontFamily:'Inter, sans-serif', fontSize:13, color:'#8A8780', maxWidth:240, lineHeight:1.5, margin:0 },
  colH: { fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.08em', color:'#8A8780', marginBottom:6, fontWeight:500 },
  colLink: { fontFamily:'Inter, sans-serif', fontSize:13.5, color:'#C9C5BB', textDecoration:'none' },
  bottom: { display:'flex', justifyContent:'space-between', paddingTop:18, fontFamily:'Inter, sans-serif', fontSize:12.5, color:'#8A8780' },
};

window.MkCTA = CTABand;
window.MkFooter = Footer;
