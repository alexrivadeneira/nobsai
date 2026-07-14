import { ImageResponse } from 'next/og';
try {
  const img = new ImageResponse(
    { type: 'div', props: { style: { width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f0e8', fontSize:80, fontWeight:900, color:'#1a1a1a' }, children: 'Working Knowledge AI test' } },
    { width: 1200, height: 630 }
  );
  const buf = Buffer.from(await img.arrayBuffer());
  const fs = await import('node:fs');
  fs.writeFileSync('/tmp/ogout.png', buf);
  console.log('OK bytes=', buf.length);
} catch (e) { console.error('ERR', e.message); }
