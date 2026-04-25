function FeatureGrid() {
  const features = [
    { glyph:'⚡', eyebrow:'Automate the work', title:'Stop putting off the tedious tasks.', body:'Writing tests for untested code, fixing lint errors across a project, resolving merge conflicts, updating dependencies — Claude Code handles them.' },
    { glyph:'⎇',  eyebrow:'Git native', title:'Commits and PRs, written for you.', body:'Claude works directly with git. It stages changes, writes commit messages, creates branches, and opens pull requests with descriptive context.' },
    { glyph:'⌖', eyebrow:'Composable', title:'Pipe, script, and chain.', body:'Follows the Unix philosophy. Pipe logs into it, run it in CI, or chain it with the rest of your toolchain. tail -200 app.log | claude -p "…"' },
    { glyph:'⎘', eyebrow:'Checkpoints', title:'Rewind anything you don\u2019t like.', body:'Claude saves your code state before each change. Tap Esc twice or run /rewind to instantly restore the code, the conversation, or both.' },
    { glyph:'☰', eyebrow:'CLAUDE.md memory', title:'Persistent context, no repetition.', body:'Add a CLAUDE.md to your project root. Claude reads it at the start of every session — coding standards, architecture decisions, preferred libraries.' },
    { glyph:'⌥', eyebrow:'MCP', title:'Connect your tools.', body:'Read design docs in Google Drive, update Jira tickets, pull data from Slack, or use your own custom tooling — through the Model Context Protocol.' },
  ];
  return (
    <section data-mk-section data-alt="true" style={fgStyles.wrap}>
      <div style={fgStyles.inner}>
        <div style={fgStyles.head}>
          <div style={fgStyles.eyebrow}>WHAT YOU CAN DO</div>
          <h2 data-mk-display style={fgStyles.h2}>The terminal is where real work happens.</h2>
          <p data-mk-body style={fgStyles.sub}>Claude Code excels at routine development tasks like bug fixes and testing, as well as transformative work like refactors and feature implementation that require deep codebase understanding.</p>
        </div>
        <div data-mk-grid style={fgStyles.grid}>
          {features.map((f, i) => (
            <article key={i} data-mk-card style={fgStyles.card}>
              <div style={fgStyles.glyph}>{f.glyph}</div>
              <div style={fgStyles.cardEye}>{f.eyebrow}</div>
              <h3 data-mk-display style={fgStyles.cardH}>{f.title}</h3>
              <p data-mk-body style={fgStyles.cardB}>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const fgStyles = {
  wrap: { padding:'80px 24px', background:'#EDEBE3' },
  inner: { maxWidth:1200, margin:'0 auto' },
  head: { maxWidth:720, marginBottom:40 },
  eyebrow: { fontFamily:'JetBrains Mono, monospace', fontSize:12, letterSpacing:'0.08em', color:'#9F4C2D', fontWeight:500, marginBottom:14 },
  h2: { fontFamily:'Fraunces, serif', fontSize:48, fontWeight:400, lineHeight:1.05, letterSpacing:'-0.02em', margin:'0 0 16px', color:'#1F1E1B' },
  sub: { fontFamily:'Inter, sans-serif', fontSize:17, lineHeight:1.55, color:'#3D3D3A', margin:0, textWrap:'pretty' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 },
  card: { background:'#FAF9F5', border:'1px solid #DCD9CF', borderRadius:10, padding:24, display:'flex', flexDirection:'column', gap:8 },
  glyph: { width:32, height:32, borderRadius:6, background:'#1F1E1B', color:'#C15F3C', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'JetBrains Mono, monospace', fontWeight:700, fontSize:16, marginBottom:8 },
  cardEye: { fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.06em', color:'#8C8A82', textTransform:'uppercase' },
  cardH: { fontFamily:'Inter, sans-serif', fontSize:18, fontWeight:600, lineHeight:1.3, color:'#1F1E1B', margin:0 },
  cardB: { fontFamily:'Inter, sans-serif', fontSize:14.5, lineHeight:1.55, color:'#3D3D3A', margin:0, textWrap:'pretty' },
};

window.MkFeatureGrid = FeatureGrid;
