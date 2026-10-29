import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Film, Scissors, SlidersHorizontal, Volume2, Layers, Maximize2, Check, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { process, processWorkspace } from '../data/content';
import { Picture } from './Media';
import './ProcessStudio.css';

export default function ProcessStudio() {
  const scene = useRef(null);
  const rig = useRef(null);
  const clock = useRef(null);
  const cursor = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(query.matches); if (query.matches) setPlaying(false); };
    update(); query.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: 0.18});
    observer.observe(scene.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { query.removeEventListener('change', update); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  const paint = (value) => {
    cursor.current = value;
    rig.current?.style.setProperty('--playhead', `${value * 100}%`);
    if (clock.current) {
      const frames = Math.floor(value * 24 * 24);
      clock.current.textContent = `00:00:${String(Math.floor(frames / 24)).padStart(2, '0')}:${String(frames % 24).padStart(2, '0')}`;
    }
    const next = Math.min(4, Math.floor(value * 5));
    if (activeRef.current !== next) { activeRef.current = next; setActive(next); }
  };

  useEffect(() => {
    if (!playing || !visible || !pageVisible || reduced) return;
    const resume = cursor.current;
    const progress = {value: 0};
    const tween = gsap.fromTo(progress, {value: 0}, {
      value: 1, duration: 24, repeat: -1, ease: 'none',
      onUpdate: () => paint(progress.value),
    });
    tween.progress(resume);
    return () => tween.kill();
  }, [playing, visible, pageVisible, reduced]);

  function selectStep(index) {
    setPlaying(false);
    paint((index + 0.35) / 5);
  }
  function tilt(event) {
    if (event.pointerType !== 'mouse' || reduced || !window.matchMedia('(min-width: 801px)').matches) return;
    const bounds = scene.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rig.current.style.setProperty('--rx', `${4 - y * 7}deg`);
    rig.current.style.setProperty('--ry', `${x * 9}deg`);
  }
  function resetTilt() {
    rig.current?.style.setProperty('--rx', '5deg');
    rig.current?.style.setProperty('--ry', '-3deg');
  }
  const media = processWorkspace[active];
  return <div className="process-studio">
    <div className="editor-scene" ref={scene} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <div className={`editor-rig ${playing && visible && pageVisible && !reduced ? 'is-playing' : ''}`} ref={rig}>
        <div className="editor-titlebar"><div className="editor-app-title"><Film size={15}/><span>DTE <b>STUDIO</b></span><span className="editor-divider"/><span className="editor-project-name">YOUR_STORY.prproj</span></div><span className="editor-draft">CREATIVE PROCESS / DEMO</span><div className="editor-window-dots" aria-hidden="true"><i/><i/><i/></div></div>
        <div className="editor-body">
          <aside className="editor-bin" aria-label="Creative process assets"><div className="panel-label"><Layers size={12}/>PROJECT MEDIA <span>05</span></div><div className="editor-bin-items">{processWorkspace.map((item, i) => <button key={item.label} onClick={() => selectStep(i)} className={active === i ? 'selected' : ''} aria-label={`Preview ${process[i].name}`} aria-pressed={active === i}><Picture src={item.image} alt=""/><span>{item.label}<small>{process[i].tag}</small></span></button>)}</div><div className="editor-bin-footer"><span>5 assets</span><span>STOCK PREVIEW</span></div></aside>
          <div className="editor-monitor"><div className="panel-label"><span>PROGRAM MONITOR</span><span>FIT / 50%</span></div><div className="editor-picture"><Picture key={active} src={media.image} alt={media.alt}/><div className="monitor-safe-frame" aria-hidden="true"/><div className="monitor-stage-label"><span>0{active + 1} / {process[active].tag}</span><strong>{process[active].name}</strong></div><span className="monitor-demo">STOCK FOOTAGE</span></div><div className="editor-transport"><span className="editor-time" ref={clock}>00:00:00:00</span><div><button aria-label="Previous process stage" onClick={() => selectStep((active + 4) % 5)}><SkipBack size={14}/></button><button className="transport-play" aria-label={reduced ? 'Advance process stage without animation' : playing ? 'Pause process animation' : 'Play process animation'} onClick={() => {if(reduced)selectStep((active + 1) % 5);else setPlaying(v => !v);}} title={reduced ? 'Advance to next stage (reduced motion)' : undefined}>{playing && !reduced ? <Pause size={15}/> : <Play size={15} fill="currentColor"/>}</button><button aria-label="Next process stage" onClick={() => selectStep((active + 1) % 5)}><SkipForward size={14}/></button></div><span className="monitor-quality">24 FPS <Maximize2 size={12}/></span></div></div>
          <aside className="editor-inspector" aria-label="Post-production details"><div className="panel-label"><SlidersHorizontal size={12}/>THE FINISH</div><div className="editor-color-wheels" aria-hidden="true"><i/><i/><i/></div><div className="color-labels"><span>LIFT</span><span>GAMMA</span><span>GAIN</span></div>{['Exposure','Contrast','Saturation'].map((name, i) => <div className="editor-property" key={name}><span>{name}<b>{['+0.4','+18','112'][i]}</b></span><div><i style={{left:`${[58,68,77][i]}%`}}/></div></div>)}<div className="editor-levels" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{'--bar':`${20+(i*37)%76}%`,'--delay':`${i*-.13}s`}}/>)}</div><div className="editor-ready"><Check size={12}/>Ready for your audience</div></aside>
        </div>
        <div className="editor-sequence"><div className="sequence-toolbar"><span><Scissors size={13}/> THE STORY / SEQUENCE 01</span><span><MousePointer2 size={12}/>SELECT A CLIP TO EXPLORE</span></div><div className="sequence-scroll"><div className="sequence-grid"><div className="track-heading">TRACK</div><div className="sequence-ruler">{['00:00','00:05','00:10','00:15','00:20'].map(t=><span key={t}>{t}</span>)}</div><div className="track-name">V2<small>TITLES</small></div><div className="title-track">{process.map((step,i)=><span key={step.name} className={active===i?'current':''}>{step.name.toUpperCase()}</span>)}</div><div className="track-name">V1<small>STORY</small></div><div className="story-track">{process.map((step,i)=><button key={step.name} className={`sequence-clip ${active===i?'current':''}`} onClick={()=>selectStep(i)} aria-pressed={active===i} aria-label={`Select ${step.name} stage`}><Picture src={processWorkspace[i].image} alt=""/><span>0{i+1}<b>{step.tag}</b></span></button>)}</div><div className="track-name audio"><Volume2 size={12}/><small>A1</small></div><div className="sequence-audio"><span>SOUND / THE FEELING</span><div aria-hidden="true">{Array.from({length:72},(_,i)=><i key={i} style={{height:`${18+(i*31)%82}%`}}/>)}</div></div><div className="playhead-zone" aria-hidden="true"><div className="editor-playhead"><span/></div></div></div></div><div className="sequence-status"><span><i/> {playing && !reduced ? 'PLAYING THE PROCESS' : 'FRAME BY FRAME'}</span><span>01 IDEA · 05 STEPS · ONE DREAM TEAM</span></div></div>
      </div>
    </div>
    <div className="process-stage-details"><div className="process-stage-nav" aria-label="Production stages">{process.map((step,i)=><button key={step.name} onClick={()=>selectStep(i)} aria-pressed={active===i}><span>0{i+1}</span>{step.name}</button>)}</div><div className="process-stage-copy"><span className="stage-large-number" aria-hidden="true">0{active+1}</span><div><span className="eyebrow">{process[active].tag}</span><h3>{process[active].name}</h3><p>{process[active].text}</p></div><span className="process-hint">YOUR VISION.<br/>OUR TIMELINE.</span></div></div>
  </div>;
}
