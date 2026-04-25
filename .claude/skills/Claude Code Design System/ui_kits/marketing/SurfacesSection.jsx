const { useState } = React;

function SurfacesSection() {
  const [tab, setTab] = useState('terminal');
  const tabs = [
    { id:'terminal', label:'Terminal' },
    { id:'vscode',   label:'VS Code' },
    { id:'desktop',  label:'Desktop' },
    { id:'web',      label:'Web' },
    { id:'jetbrains',label:'JetBrains' },
  ];

  const content = {
    terminal: {
      h: 'Run claude in any project directory.',
      b: 'The full-featured CLI for working with Claude Code directly in your terminal. Edit files, run commands, and manage your entire project from the command line.',
      lines: [
        '<span style="color:#C15F3C;font-weight:700">&gt;_</span> cd your-project',
        '<span style="color:#C15F3C;font-weight:700">&gt;_</span> claude',
        '<span style="color:#8A8780">─────────────────────────────────────</span>',
        '<span style="color:#ECEAE3">  Welcome to Claude Code · v2.1.120</span>',
        '<span style="color:#8A8780">  Model: Sonnet 4.5 · Press ? for help</span>',
        '<span style="color:#8A8780">─────────────────────────────────────</span>',
        '<span style="color:#C15F3C;font-weight:700">&gt;_</span> <span style="color:#8A8780">_</span>',
      ],
    },
    vscode: {
      h: 'See changes in real-time as inline diffs.',
      b: 'The VS Code extension provides inline diffs, @-mentions, plan review, and conversation history directly in your editor.',
      lines: [
        '<span style="color:#8A8780">// src/auth.ts</span>',
        '<span style="color:#5A8E5A">+ try {</span>',
        '<span style="color:#5A8E5A">+   return await api.get(`/users/${id}`);</span>',
        '<span style="color:#5A8E5A">+ } catch (err) {</span>',
        '<span style="color:#5A8E5A">+   logger.error(err);</span>',
        '<span style="color:#5A8E5A">+   throw err;</span>',
        '<span style="color:#5A8E5A">+ }</span>',
        '<span style="color:#8A8780">[Accept all] [Reject] [Open diff]</span>',
      ],
    },
    desktop: {
      h: 'Multiple parallel sessions, visual diffs.',
      b: 'A standalone app for running Claude Code outside your IDE or terminal. Review diffs visually, run multiple sessions side by side, schedule recurring tasks.',
      lines: [
        '<span style="color:#8A8780">SESSIONS</span>',
        '<span style="color:#3F7CAC">●</span> my-app · Refactor auth      <span style="color:#8A8780">running</span>',
        '<span style="color:#5A8E5A">✓</span> marketing-site · Hero copy  <span style="color:#8A8780">done</span>',
        '<span style="color:#C99B2C">⏵</span> docs · Add MCP guide        <span style="color:#8A8780">awaiting</span>',
        '',
        '<span style="color:#8A8780">SCHEDULED</span>',
        '<span style="color:#8A8780">●</span> Morning PR review           <span style="color:#8A8780">9:00 daily</span>',
      ],
    },
    web: {
      h: 'Run Claude Code in your browser.',
      b: 'No local setup. Kick off long-running tasks and check back when they\u2019re done, work on repos you don\u2019t have locally, or run multiple tasks in parallel.',
      lines: [
        '<span style="color:#8A8780">claude.ai/code</span>',
        '<span style="color:#C15F3C;font-weight:700">&gt;_</span> Add dark mode to the dashboard',
        '<span style="color:#3F7CAC">●</span> Cloning anthropic/example-app…',
        '<span style="color:#3F7CAC">●</span> Reading 142 files',
        '<span style="color:#5A8E5A">✓</span> Opened PR #248 · <span style="color:#4F9A99">github.com/…/pull/248</span>',
      ],
    },
    jetbrains: {
      h: 'Native plugin for IntelliJ-family IDEs.',
      b: 'A plugin for IntelliJ IDEA, PyCharm, WebStorm, and other JetBrains IDEs with interactive diff viewing and selection context sharing.',
      lines: [
        '<span style="color:#8A8780">// Selection: HomeController.java:42</span>',
        '<span style="color:#C15F3C;font-weight:700">&gt;_</span> /explain',
        '<span style="color:#ECEAE3">This handler maps GET /home to renderHome(),</span>',
        '<span style="color:#ECEAE3">which fetches the current user from the session</span>',
        '<span style="color:#ECEAE3">and passes it to the template…</span>',
      ],
    },
  };

  const c = content[tab];
  return (
    <section data-mk-section style={ssStyles.wrap}>
      <div style={ssStyles.inner}>
        <div style={ssStyles.head}>
          <div style={ssStyles.eyebrow}>USE CLAUDE CODE EVERYWHERE</div>
          <h2 data-mk-display style={ssStyles.h2}>One agent, every surface.</h2>
        </div>
        <div data-mk-tabs style={ssStyles.tabs}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} {...(tab===t.id ? {'data-mk-tab-active': true} : {})} style={{...ssStyles.tab, ...(tab===t.id ? ssStyles.tabActive : {})}}>{t.label}</button>
          ))}
        </div>
        <div style={ssStyles.body}>
          <div style={ssStyles.demo}>
            <window.MkTerminal title={`claude · ${tab}`} lines={c.lines} />
          </div>
          <div style={ssStyles.copy}>
            <h3 data-mk-display style={ssStyles.h3}>{c.h}</h3>
            <p data-mk-body style={ssStyles.b}>{c.b}</p>
            <a href="#" style={ssStyles.link}>Get started with {tabs.find(t => t.id===tab).label} →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const ssStyles = {
  wrap: { padding:'80px 24px' },
  inner: { maxWidth:1200, margin:'0 auto' },
  head: { marginBottom:24 },
  eyebrow: { fontFamily:'JetBrains Mono, monospace', fontSize:12, letterSpacing:'0.08em', color:'#9F4C2D', fontWeight:500, marginBottom:12 },
  h2: { fontFamily:'Fraunces, serif', fontSize:44, fontWeight:400, lineHeight:1.05, letterSpacing:'-0.02em', margin:0, color:'#1F1E1B' },
  tabs: { display:'flex', gap:4, padding:4, background:'#EDEBE3', border:'1px solid #DCD9CF', borderRadius:8, width:'fit-content', marginBottom:24 },
  tab: { fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:500, padding:'8px 16px', borderRadius:5, border:'none', background:'transparent', color:'#3D3D3A', cursor:'pointer' },
  tabActive: { background:'#FAF9F5', color:'#1F1E1B', boxShadow:'0 1px 2px rgba(31,30,27,0.05)' },
  body: { display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:48, alignItems:'center' },
  demo: {},
  copy: { display:'flex', flexDirection:'column', gap:14 },
  h3: { fontFamily:'Fraunces, serif', fontSize:32, fontWeight:400, lineHeight:1.1, letterSpacing:'-0.015em', margin:0, color:'#1F1E1B' },
  b: { fontFamily:'Inter, sans-serif', fontSize:16, lineHeight:1.6, color:'#3D3D3A', margin:0, textWrap:'pretty' },
  link: { fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, color:'#C15F3C', textDecoration:'none', marginTop:6 },
};

window.MkSurfaces = SurfacesSection;
