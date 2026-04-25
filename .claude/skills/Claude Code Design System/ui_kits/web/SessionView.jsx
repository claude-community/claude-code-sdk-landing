const { useState } = React;

function SessionView() {
  const messages = [
    { from:'user', text:'Add error handling to all API calls in src/api/' },
    { from:'plan', items:['Read src/api/*.ts (4 files)', 'Wrap each fetch call in try/catch', 'Log errors via existing logger', 'Update tests to assert error path'] },
    { from:'tool', cmd:'read', target:'src/api/users.ts', meta:'82 lines' },
    { from:'tool', cmd:'read', target:'src/api/orders.ts', meta:'141 lines' },
    { from:'tool', cmd:'edit', target:'src/api/users.ts', diff:'+12 -3', state:'applied' },
    { from:'tool', cmd:'edit', target:'src/api/orders.ts', diff:'+18 -4', state:'applied' },
    { from:'tool', cmd:'edit', target:'src/api/auth.ts', diff:'+9 -2', state:'applied' },
    { from:'tool', cmd:'bash', target:'npm test', meta:'28 passed in 4.2s', state:'ok' },
    { from:'assistant', text:'Wrapped each call in `src/api/users.ts`, `orders.ts`, and `auth.ts` with try/catch and routed errors through `logger.error`. Tests pass — 28/28. Ready to commit?' },
  ];

  return (
    <div style={svStyles.wrap}>
      <div style={svStyles.head}>
        <div style={svStyles.crumbs}>
          <span style={svStyles.crumbDim}>anthropic/example-app</span>
          <span style={svStyles.crumbDim}>·</span>
          <span style={svStyles.crumb}>Add error handling to API calls</span>
        </div>
        <div style={svStyles.headRight}>
          <span style={svStyles.statusPill}><span style={svStyles.statusDot}/>Ready to commit</span>
          <button style={svStyles.headBtn}>/rewind</button>
          <button style={svStyles.headBtn}>Open diff</button>
          <button style={svStyles.headBtnPrimary}>Commit & PR</button>
        </div>
      </div>

      <div style={svStyles.scroll}>
        {messages.map((m, i) => <Message key={i} m={m} />)}
      </div>

      <div style={svStyles.composer}>
        <div style={svStyles.composerInner}>
          <span style={svStyles.prompt}>&gt;_</span>
          <input style={svStyles.input} placeholder="Reply, or /command" defaultValue="" />
          <button style={svStyles.sendBtn}>Send →</button>
        </div>
        <div style={svStyles.composerHints}>
          <span style={svStyles.hint}><kbd style={svStyles.kbd}>⌘</kbd><kbd style={svStyles.kbd}>K</kbd> commands</span>
          <span style={svStyles.hint}><kbd style={svStyles.kbd}>Esc</kbd><kbd style={svStyles.kbd}>Esc</kbd> rewind</span>
          <span style={svStyles.hint}>Sonnet 4.5 · 142k context</span>
        </div>
      </div>
    </div>
  );
}

function Message({ m }) {
  if (m.from === 'user') return (
    <div style={msgStyles.row}>
      <div style={msgStyles.avatarUser}>You</div>
      <div style={{...msgStyles.bubble, ...msgStyles.bubbleUser}}>{m.text}</div>
    </div>
  );
  if (m.from === 'assistant') return (
    <div style={msgStyles.row}>
      <div style={msgStyles.avatar}>&gt;_</div>
      <div style={msgStyles.bubble}>{m.text}</div>
    </div>
  );
  if (m.from === 'plan') return (
    <div style={msgStyles.row}>
      <div style={msgStyles.avatar}>&gt;_</div>
      <div style={msgStyles.plan}>
        <div style={msgStyles.planH}>PLAN · 4 STEPS</div>
        <ol style={msgStyles.planList}>
          {m.items.map((s, i) => <li key={i} style={msgStyles.planItem}><span style={msgStyles.planIdx}>{(i+1).toString().padStart(2,'0')}</span>{s}</li>)}
        </ol>
        <div style={msgStyles.planActions}>
          <button style={msgStyles.planAccept}>Accept plan</button>
          <button style={msgStyles.planEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
  // tool
  return (
    <div style={msgStyles.row}>
      <div style={msgStyles.avatarTool}>·</div>
      <div style={msgStyles.tool}>
        <span style={msgStyles.toolCmd}>{m.cmd}</span>
        <span style={msgStyles.toolTarget}>{m.target}</span>
        {m.diff && <span style={msgStyles.toolDiff}>{m.diff}</span>}
        {m.meta && <span style={msgStyles.toolMeta}>{m.meta}</span>}
        {(m.state==='applied' || m.state==='ok') && <span style={msgStyles.toolOk}>✓</span>}
      </div>
    </div>
  );
}

const svStyles = {
  wrap: { flex:1, display:'flex', flexDirection:'column', background:'#F4F3EE', minWidth:0 },
  head: { padding:'12px 24px', borderBottom:'1px solid #DCD9CF', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(244,243,238,0.92)', backdropFilter:'blur(8px)' },
  crumbs: { display:'flex', alignItems:'center', gap:8, fontFamily:'JetBrains Mono, monospace', fontSize:12.5 },
  crumbDim: { color:'#8C8A82' },
  crumb: { color:'#1F1E1B' },
  headRight: { display:'flex', alignItems:'center', gap:8 },
  statusPill: { fontFamily:'JetBrains Mono, monospace', fontSize:11.5, letterSpacing:'0.04em', padding:'4px 10px 4px 8px', borderRadius:999, background:'rgba(90,142,90,0.12)', color:'#3F6F3F', display:'inline-flex', alignItems:'center', gap:6 },
  statusDot: { width:6, height:6, borderRadius:'50%', background:'#5A8E5A' },
  headBtn: { fontFamily:'JetBrains Mono, monospace', fontSize:12.5, padding:'6px 10px', borderRadius:5, border:'1px solid #DCD9CF', background:'#FAF9F5', color:'#1F1E1B', cursor:'pointer' },
  headBtnPrimary: { fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, padding:'7px 14px', borderRadius:5, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer' },
  scroll: { flex:1, overflow:'auto', padding:'24px 24px 16px', display:'flex', flexDirection:'column', gap:16 },
  composer: { padding:'12px 24px 18px', borderTop:'1px solid #DCD9CF', background:'#FAF9F5' },
  composerInner: { display:'flex', alignItems:'center', gap:10, padding:'10px 12px', border:'1px solid #DCD9CF', borderRadius:8, background:'#fff' },
  prompt: { fontFamily:'JetBrains Mono, monospace', fontWeight:700, color:'#C15F3C' },
  input: { flex:1, border:'none', outline:'none', fontFamily:'Inter, sans-serif', fontSize:14.5, color:'#1F1E1B', background:'transparent' },
  sendBtn: { fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, padding:'7px 12px', borderRadius:5, border:'1px solid #1F1E1B', background:'#1F1E1B', color:'#fff', cursor:'pointer' },
  composerHints: { display:'flex', gap:18, marginTop:8, fontFamily:'Inter, sans-serif', fontSize:12, color:'#8C8A82' },
  hint: { display:'inline-flex', alignItems:'center', gap:5 },
  kbd: { fontFamily:'JetBrains Mono, monospace', fontSize:10.5, padding:'1px 5px', border:'1px solid #DCD9CF', borderRadius:3, background:'#FAF9F5', color:'#3D3D3A' },
};

const msgStyles = {
  row: { display:'flex', gap:12, alignItems:'flex-start', maxWidth:780 },
  avatar: { width:28, height:28, borderRadius:6, background:'#1F1E1B', color:'#C15F3C', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:13, flexShrink:0 },
  avatarUser: { width:28, height:28, borderRadius:6, background:'#EDEBE3', color:'#3D3D3A', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:11, flexShrink:0 },
  avatarTool: { width:28, height:28, borderRadius:6, background:'transparent', color:'#B1ADA1', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:18, flexShrink:0 },
  bubble: { fontFamily:'Inter, sans-serif', fontSize:15, lineHeight:1.55, color:'#1F1E1B', padding:'10px 14px', background:'#FAF9F5', border:'1px solid #DCD9CF', borderRadius:8, textWrap:'pretty' },
  bubbleUser: { background:'#FFF', borderColor:'#DCD9CF' },
  plan: { background:'#FAF9F5', border:'1px solid #DCD9CF', borderRadius:8, padding:'14px 16px', minWidth:380 },
  planH: { fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.08em', color:'#9F4C2D', fontWeight:500, marginBottom:10 },
  planList: { listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:6 },
  planItem: { fontFamily:'Inter, sans-serif', fontSize:14, color:'#1F1E1B', display:'flex', alignItems:'baseline', gap:10 },
  planIdx: { fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'#B1ADA1' },
  planActions: { display:'flex', gap:8, marginTop:12 },
  planAccept: { fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, padding:'6px 12px', borderRadius:5, border:'1px solid #C15F3C', background:'#C15F3C', color:'#fff', cursor:'pointer' },
  planEdit: { fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, padding:'6px 12px', borderRadius:5, border:'1px solid #DCD9CF', background:'#fff', color:'#1F1E1B', cursor:'pointer' },
  tool: { fontFamily:'JetBrains Mono, monospace', fontSize:12.5, color:'#3D3D3A', display:'flex', alignItems:'center', gap:10, padding:'4px 0' },
  toolCmd: { color:'#9F4C2D', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.04em' },
  toolTarget: { color:'#1F1E1B' },
  toolDiff: { color:'#5A8E5A' },
  toolMeta: { color:'#8C8A82' },
  toolOk: { color:'#5A8E5A' },
};

window.WebSession = SessionView;
