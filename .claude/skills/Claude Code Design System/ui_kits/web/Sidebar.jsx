const { useState } = React;

function Sidebar({ active, setActive }) {
  const items = [
    { id:'sessions', icon:'⌘', label:'Sessions', count:3 },
    { id:'tasks',    icon:'☰', label:'Tasks',    count:7 },
    { id:'projects', icon:'⌖', label:'Projects' },
    { id:'routines', icon:'⏱', label:'Routines' },
    { id:'mcp',      icon:'⌥', label:'MCP servers' },
  ];
  return (
    <aside style={sbStyles.wrap}>
      <div style={sbStyles.brand}>
        <div style={sbStyles.glyph}>&gt;_</div>
        <div>
          <div style={sbStyles.brandLine}>claude <span style={{color:'#D97757'}}>code</span></div>
          <div style={sbStyles.brandSub}>web · sonnet 4.5</div>
        </div>
      </div>
      <button style={sbStyles.newBtn}>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontWeight:700, marginRight:6}}>+</span>
        New session
      </button>
      <nav style={sbStyles.nav}>
        {items.map(it => (
          <button key={it.id} onClick={() => setActive(it.id)} style={{...sbStyles.item, ...(active===it.id ? sbStyles.itemActive : {})}}>
            <span style={sbStyles.itemIcon}>{it.icon}</span>
            <span style={{flex:1, textAlign:'left'}}>{it.label}</span>
            {it.count != null && <span style={sbStyles.count}>{it.count}</span>}
          </button>
        ))}
      </nav>
      <div style={sbStyles.spacer}/>
      <div style={sbStyles.foot}>
        <div style={sbStyles.recentH}>RECENT REPOS</div>
        <a style={sbStyles.recent} href="#"><span style={sbStyles.dot}/>anthropic/example-app</a>
        <a style={sbStyles.recent} href="#"><span style={sbStyles.dot}/>my-org/marketing</a>
        <a style={sbStyles.recent} href="#"><span style={sbStyles.dot}/>solo/portfolio-site</a>
      </div>
    </aside>
  );
}

const sbStyles = {
  wrap: { width:240, background:'#1F1D1A', color:'#C9C5BB', display:'flex', flexDirection:'column', padding:'14px 12px', borderRight:'1px solid #2E2C28', height:'100%' },
  brand: { display:'flex', alignItems:'center', gap:10, padding:'4px 6px 14px' },
  glyph: { width:30, height:30, borderRadius:6, background:'#ECEAE3', color:'#C15F3C', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:14 },
  brandLine: { fontFamily:'JetBrains Mono, monospace', fontSize:14, fontWeight:500, color:'#ECEAE3' },
  brandSub: { fontFamily:'JetBrains Mono, monospace', fontSize:10.5, color:'#8A8780', letterSpacing:'0.04em' },
  newBtn: { fontFamily:'Inter, sans-serif', fontSize:13.5, fontWeight:500, padding:'10px 12px', borderRadius:6, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer', textAlign:'left', marginBottom:14 },
  nav: { display:'flex', flexDirection:'column', gap:1 },
  item: { fontFamily:'Inter, sans-serif', fontSize:13.5, padding:'8px 10px', borderRadius:5, border:'none', background:'transparent', color:'#C9C5BB', cursor:'pointer', display:'flex', alignItems:'center', gap:10, textAlign:'left', position:'relative' },
  itemActive: { background:'rgba(217,119,87,0.16)', color:'#ECEAE3', boxShadow:'inset 2px 0 0 #C15F3C' },
  itemIcon: { width:18, fontFamily:'JetBrains Mono, monospace', color:'#8A8780' },
  count: { fontFamily:'JetBrains Mono, monospace', fontSize:11, padding:'1px 6px', background:'#2A2825', borderRadius:999, color:'#8A8780' },
  spacer: { flex:1 },
  foot: { display:'flex', flexDirection:'column', gap:4, padding:'10px 6px', borderTop:'1px solid #2E2C28' },
  recentH: { fontFamily:'JetBrains Mono, monospace', fontSize:10.5, color:'#8A8780', letterSpacing:'0.06em', marginBottom:4 },
  recent: { fontFamily:'Inter, sans-serif', fontSize:13, color:'#C9C5BB', textDecoration:'none', display:'flex', alignItems:'center', gap:8, padding:'4px 0' },
  dot: { width:6, height:6, borderRadius:'50%', background:'#5A8E5A' },
};

window.WebSidebar = Sidebar;
