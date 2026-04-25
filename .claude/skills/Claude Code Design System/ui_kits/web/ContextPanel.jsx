const { useState } = React;

function ContextPanel() {
  return (
    <aside style={cpStyles.wrap}>
      <div style={cpStyles.section}>
        <div style={cpStyles.h}>FILES TOUCHED</div>
        <FileRow name="src/api/users.ts" diff="+12 -3" />
        <FileRow name="src/api/orders.ts" diff="+18 -4" />
        <FileRow name="src/api/auth.ts" diff="+9 -2" />
      </div>
      <div style={cpStyles.section}>
        <div style={cpStyles.h}>CHECKPOINTS</div>
        <CheckpointRow time="2m ago" label="After API edits" current />
        <CheckpointRow time="6m ago" label="Plan accepted" />
        <CheckpointRow time="9m ago" label="Initial state" />
      </div>
      <div style={cpStyles.section}>
        <div style={cpStyles.h}>CLAUDE.md</div>
        <pre style={cpStyles.md}>
{`# Conventions
- TypeScript strict mode
- Use \`logger.error\` for all caught errors
- Tests live in __tests__/ next to source
- Never commit without running \`npm test\``}
        </pre>
        <button style={cpStyles.editBtn}>Edit memory →</button>
      </div>
      <div style={cpStyles.section}>
        <div style={cpStyles.h}>TOOLS</div>
        <ToolRow icon="⌥" label="MCP · GitHub" status="connected"/>
        <ToolRow icon="⌥" label="MCP · Linear" status="connected"/>
        <ToolRow icon="⌥" label="MCP · Sentry" status="off"/>
      </div>
    </aside>
  );
}

function FileRow({ name, diff }) {
  return (
    <div style={cpStyles.fileRow}>
      <span style={cpStyles.fileGlyph}>⎘</span>
      <span style={cpStyles.fileName}>{name}</span>
      <span style={cpStyles.fileDiff}>{diff}</span>
    </div>
  );
}
function CheckpointRow({ time, label, current }) {
  return (
    <div style={{...cpStyles.cpRow, ...(current ? cpStyles.cpRowCurrent : {})}}>
      <span style={{...cpStyles.cpDot, background: current ? '#C15F3C' : '#B1ADA1'}}/>
      <div style={{display:'flex', flexDirection:'column'}}>
        <span style={cpStyles.cpLabel}>{label}</span>
        <span style={cpStyles.cpTime}>{time}</span>
      </div>
      {!current && <button style={cpStyles.cpRevert}>Rewind</button>}
    </div>
  );
}
function ToolRow({ icon, label, status }) {
  return (
    <div style={cpStyles.toolRow}>
      <span style={cpStyles.toolIcon}>{icon}</span>
      <span style={cpStyles.toolLabel}>{label}</span>
      <span style={{...cpStyles.toolStatus, color: status==='connected' ? '#5A8E5A' : '#B1ADA1'}}>{status==='connected' ? '● connected' : '○ off'}</span>
    </div>
  );
}

const cpStyles = {
  wrap: { width:300, background:'#EDEBE3', borderLeft:'1px solid #DCD9CF', overflow:'auto', padding:'16px 16px 24px', display:'flex', flexDirection:'column', gap:20 },
  section: { display:'flex', flexDirection:'column', gap:8 },
  h: { fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.08em', color:'#8C8A82', fontWeight:500, marginBottom:2 },
  fileRow: { display:'flex', alignItems:'center', gap:8, padding:'5px 8px', borderRadius:5, background:'#FAF9F5', border:'1px solid #DCD9CF' },
  fileGlyph: { fontFamily:'JetBrains Mono, monospace', color:'#B1ADA1' },
  fileName: { flex:1, fontFamily:'JetBrains Mono, monospace', fontSize:12.5, color:'#1F1E1B' },
  fileDiff: { fontFamily:'JetBrains Mono, monospace', fontSize:11.5, color:'#5A8E5A' },
  cpRow: { display:'flex', alignItems:'center', gap:10, padding:'6px 8px', borderRadius:5 },
  cpRowCurrent: { background:'rgba(193,95,60,0.08)' },
  cpDot: { width:8, height:8, borderRadius:'50%', flexShrink:0 },
  cpLabel: { fontFamily:'Inter, sans-serif', fontSize:13, color:'#1F1E1B' },
  cpTime: { fontFamily:'JetBrains Mono, monospace', fontSize:10.5, color:'#8C8A82' },
  cpRevert: { marginLeft:'auto', fontFamily:'JetBrains Mono, monospace', fontSize:11, padding:'2px 8px', borderRadius:4, border:'1px solid #DCD9CF', background:'#FAF9F5', color:'#3D3D3A', cursor:'pointer' },
  md: { fontFamily:'JetBrains Mono, monospace', fontSize:11.5, lineHeight:1.55, color:'#3D3D3A', background:'#FAF9F5', border:'1px solid #DCD9CF', borderRadius:6, padding:'10px 12px', margin:0, whiteSpace:'pre-wrap' },
  editBtn: { fontFamily:'Inter, sans-serif', fontSize:12.5, fontWeight:500, color:'#C15F3C', background:'transparent', border:'none', padding:'4px 0', cursor:'pointer', textAlign:'left' },
  toolRow: { display:'flex', alignItems:'center', gap:8, padding:'4px 8px' },
  toolIcon: { fontFamily:'JetBrains Mono, monospace', color:'#B1ADA1' },
  toolLabel: { flex:1, fontFamily:'Inter, sans-serif', fontSize:13, color:'#1F1E1B' },
  toolStatus: { fontFamily:'JetBrains Mono, monospace', fontSize:11 },
};

window.WebContextPanel = ContextPanel;
