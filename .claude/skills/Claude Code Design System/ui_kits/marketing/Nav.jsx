const { useState, useEffect, useRef } = React;

function Nav() {
  return (
    <header data-mk-nav style={mkStyles.nav}>
      <div style={mkStyles.navInner}>
        <a href="#" style={mkStyles.brand}>
          <div style={mkStyles.glyph}>&gt;_</div>
          <span data-mk-brandtext style={mkStyles.brandText}>claude code <span style={{color:'#C15F3C'}}>sdk</span></span>
        </a>
        <nav style={mkStyles.navLinks}>
          <a data-mk-navlink style={mkStyles.navLink} href="#">Product</a>
          <a data-mk-navlink style={mkStyles.navLink} href="#">Docs</a>
          <a data-mk-navlink style={mkStyles.navLink} href="#">Pricing</a>
          <a data-mk-navlink style={mkStyles.navLink} href="#">Customers</a>
        </nav>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <a data-mk-navlink style={mkStyles.navLink} href="#">Log in</a>
          <button style={mkStyles.cta}>
            <span style={{fontFamily:'JetBrains Mono, monospace', fontWeight:700, marginRight:6}}>&gt;_</span>
            Try Claude Code SDK
          </button>
        </div>
      </div>
    </header>
  );
}

const mkStyles = {
  nav: { position:'sticky', top:0, zIndex:10, background:'rgba(244,243,238,0.82)', backdropFilter:'blur(12px) saturate(160%)', WebkitBackdropFilter:'blur(12px) saturate(160%)', borderBottom:'1px solid rgba(31,30,27,0.06)' },
  navInner: { maxWidth:1200, margin:'0 auto', padding:'14px 24px', display:'flex', alignItems:'center', gap:24 },
  brand: { display:'flex', alignItems:'center', gap:10, textDecoration:'none' },
  glyph: { width:30, height:30, borderRadius:6, background:'#1F1E1B', color:'#C15F3C', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:14 },
  brandText: { fontFamily:'JetBrains Mono, monospace', fontSize:16, fontWeight:500, color:'#1F1E1B', letterSpacing:'-0.01em' },
  navLinks: { display:'flex', gap:24, marginLeft:32, flex:1 },
  navLink: { fontFamily:'Inter, sans-serif', fontSize:14, color:'#3D3D3A', textDecoration:'none', fontWeight:500 },
  cta: { fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:500, padding:'9px 16px', borderRadius:6, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer', display:'inline-flex', alignItems:'center' },
};

window.MkNav = Nav;
