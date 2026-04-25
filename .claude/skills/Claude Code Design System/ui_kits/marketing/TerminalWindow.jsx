const { useEffect, useState } = React;

function TerminalWindow({ title='claude · ~/projects/my-app', children, height, animate=false, lines=[] }) {
  const [shown, setShown] = useState(animate ? 0 : (lines.length || 99));
  useEffect(() => {
    if (!animate) return;
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(s => s + 1), 320);
    return () => clearTimeout(t);
  }, [shown, animate, lines.length]);

  return (
    <div style={{...twStyles.wrap, height}}>
      <div style={twStyles.titlebar}>
        <span style={{...twStyles.dot, background:'#E36256'}}></span>
        <span style={{...twStyles.dot, background:'#E2BD46'}}></span>
        <span style={{...twStyles.dot, background:'#58C745'}}></span>
        <span style={twStyles.title}>{title}</span>
        <span style={{width:46}}/>
      </div>
      <div style={twStyles.body}>
        {lines.length > 0 ? lines.slice(0, shown).map((ln, i) => (
          <div key={i} dangerouslySetInnerHTML={{__html: ln}}/>
        )) : children}
        {animate && shown < lines.length && <span style={twStyles.cursor}>▌</span>}
      </div>
    </div>
  );
}

const twStyles = {
  wrap: { background:'#161513', borderRadius:12, boxShadow:'0 24px 60px -12px rgba(31,30,27,0.25), 0 1px 0 rgba(255,255,255,0.06) inset', overflow:'hidden', border:'1px solid rgba(255,255,255,0.04)' },
  titlebar: { background:'#1F1D1A', padding:'10px 14px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #2E2C28' },
  dot: { width:11, height:11, borderRadius:'50%' },
  title: { fontFamily:'JetBrains Mono, monospace', fontSize:11.5, color:'#8A8780', margin:'0 auto' },
  body: { fontFamily:'JetBrains Mono, monospace', fontSize:13, lineHeight:1.6, color:'#ECEAE3', padding:'18px 20px' },
  cursor: { color:'#C15F3C', animation:'blink 1s steps(2) infinite' },
};

window.MkTerminal = TerminalWindow;
