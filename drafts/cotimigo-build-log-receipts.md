# Cotimigo Build-Log — Source Material / Receipts

Raw material for the build-log blog series. Everything below happened on
**July 2, 2026** (one working session) unless noted. Written so any model — or
Alex himself — can draft posts without the original conversation. Numbers and
quotes are real; links were live as of July 2026.

**The frame (important):** this is NOT a success story. It's a pre-registered
experiment: the kill criteria were written down *before* launch, and the series
promises readers the verdict either way. That's the noBSAI differentiator —
receipts over hype, including the mortality odds stated up front.

---

## Part 1 material: The Idea Graveyard

Started with: "what could make a valuable app people would pay for? Be brutal."
Three ideas researched with real web searches BEFORE writing any code. Two died.

### Idea A: Conference networking memory (voice-dump people you meet)
- Origin: pivot from Namewise (Alex's voice-dictation relationship-memory app)
- The appeal: "valuable 4x a year" — event-based beats daily-habit retention death
- **Killed by:** the paying persona is already served. Exhibitor lead-capture is a
  mature industry: [Cvent LeadCapture](https://www.cvent.com/en/event-marketing-management/lead-capture),
  [Mobly](https://www.getmobly.com/platform/event-lead-capture) (literally "voice
  memos of on-the-go conversations"), [BoothIQ](https://getboothiq.com/blog/best-lead-retrieval-apps)
  (badge scan + voice-to-text + follow-up emails)
- Key insight worth quoting: **"the persona willing to pay (exhibitors) is already
  served, and the persona that's unserved (attendees) is unserved precisely
  because they don't pay."**
- Also debunked: "people photograph badges" — they don't; the real handshake is
  the LinkedIn QR scan. Alex's skeptical question killed a fake design premise.

### Idea B: Wedding speech coach (write + rehearse)
- The appeal: one-time high-emotion purchase, $25, no retention needed
- **Killed by:** a dozen generators already exist — [ToastPal](https://www.toastpal.com/bestman)
  ($39.99/4 speeches), [The Better Best Man](https://thebetterbestman.com/) ($10–40),
  [Pix Wedding](https://www.pix.wedding/ai-wedding-speech-generator) (free),
  [bestmanspeechai.com](https://www.bestmanspeechai.com/) (free, "trained on real
  speeches" = marketing). Coaching side owned by [Yoodli](https://yoodli.ai/)
  (~$8/mo). Combo already emerging (WedSpeak iOS "Speech Practice Mode").
- Structural problems: ChatGPT voice mode is the real competitor; buyers arrive
  via one Google search = SEO knife-fight; one-shot $30 revenue on a churn treadmill.
- Fun tangent that survived: how do you make rehearsal *actually stressful*?
  Research: VR public speaking sims ([Ovation](https://www.ovationvr.com/),
  [VirtualSpeech](https://virtualspeech.com/blog/using-vr-to-improve-public-speaking-skills)
  — coughing, phones ringing, hostile audiences) genuinely work:
  [VR speech = real-audience-level physiological arousal, transfers to real life](https://pmc.ncbi.nlm.nih.gov/articles/PMC12244110/).
  Lab stress (Trier Social Stress Test) comes from *neutral evaluation +
  no-redo*, not crowd size → phone apps can induce stress via one-take-sends,
  deadpan evaluator avatars, random interruptions. Good future-post material.

### Idea C (winner): Spanish voice note → English quote PDF for solo contractors
Thesis: solo Spanish-speaking contractors lose jobs because writing a
professional English estimate is a higher bar than speaking working English.
They quote via bare-number text messages, at night, exhausted.

**The evidence stack (all real, all searchable):**
1. **Speed wins jobs:** Thumbtack leads cost [$20–60 avg, up to $150+](https://pipelineon.com/blog/how-much-does-thumbtack-charge-per-lead/);
   each lead shared with 4–5 pros; [**78% of homeowners hire the first contractor to respond**](https://pipelineon.com/blog/is-thumbtack-worth-it/).
   Positioning line: "You paid $60 for that lead. The first quote wins it 78% of
   the time. This makes yours first — for a dollar."
2. **The demographic pays for digital services via WhatsApp:** [Félix Pago](https://www.felixpago.com/en)
   — remittances *inside WhatsApp*, initiated by voice note, 400K+ users,
   [$3B payment volume](https://stripe.com/customers/felix), [$75M raise](https://www.finextra.com/newsarticle/45791/flix-raises-75-million-for-whatsapp-based-stablecoin-remittance-platform).
3. **The exact workflow already sells in Spain (same language, no barrier):**
   [BRIZU](https://brizu.org/) ("De nota de voz a presupuesto PDF, en WhatsApp"),
   [PresupuestAPP](https://presupuesta.eu/) (€9.99/mo), [Motor de Presupuestos](https://motordepresupuestos.com/alternativa/menfis)
   (€39/mo), plus a growing "Presu" cluster ([Presu.app](https://presu.app/),
   [Dame Presu](https://www.damepresu.com/)). Spain proves the workflow;
   nobody does **Spanish-in → English-out for the US**.
4. **The demographic premise:** [62% of Hispanic immigrant construction workers report limited English](https://www.engr.psu.edu/ae/thesis/portfolios/2008/cam459/SPRING/Posting/Mowery_Casey_9-Analysis%201_Consequences%20of%20the%20English-Spanish%20Language%20Barrier.pdf);
   crews in some regions run [70–80% Hispanic](https://gocontractor.com/blog/construction-language-barrier/).
5. English-side US voice-estimators already exist ([QuoteIQ](https://myquoteiq.com/),
   [Handoff](https://www.handoff.ai/handyman) — VC-funded) → concept validated,
   cross-language square unclaimed.

Deep value framing: the app doesn't just save time — **it removes a
professionalism penalty unrelated to work quality.** The market currently
rewards paperwork fluency over craftsmanship.

---

## Part 2 material: The One-Day Build

### Product decisions (each is a mini-lesson)
- **The product is a phone number.** No app, no login. WhatsApp voice note in →
  Spanish confirmation → English PDF out. Rationale: WhatsApp voice notes about
  money are an existing habit (Félix precedent); zero install friction.
- **Confirmation echoes every dollar amount in Spanish before the PDF exists.**
  A mistranslated price is the one unforgivable error. Code also recomputes
  total = materials + labor rather than trusting LLM arithmetic.
- **Pricing: 3 free quotes → $10 per 10-pack** (credits, not subscription —
  prepaid-culture fit; ~99% margin; each quote costs ~half a cent to serve).
- **Deliberately NOT forked from Namewise** despite similar stack — 95% of the
  old code was irrelevant; "starting with an archaeology project" vs. clean repo.
  Knowledge transfers free; code drags.
- **Name: Cotimigo** (cotización + conmigo/amigo). Coined = ownable; avoids
  Spain's crowded "Presu-" namespace; passes the say-it-out-loud test
  ("mándale un audio a Cotimigo"). Domain checked via RDAP, $10.
- **Trust design for an immigration-wary audience:** never ask legal name,
  address, or papers; only a business name. Landing copy literally: "No pedimos
  papeles, ni tu nombre legal, ni tu dirección" + "Tu nota de voz se borra en
  cuanto la convertimos" (true: audio is never stored, only the transcript).
  License field optional; never print "Licensed & Insured" unprompted (CA
  requires a license for jobs >$500).

### Stack
Next.js (landing + webhook in one Vercel deploy), Twilio WhatsApp API, Groq
(Whisper large-v3 Spanish + Llama 3.3 extraction), Supabase (2 tables + public
PDF bucket), @react-pdf/renderer. Built: Spanish landing page, full webhook
state machine (onboard → quote → confirm → PDF → paywall), mock mode that runs
the entire pipeline with zero API keys, a conversation simulator, PDF template.

### Real-AI test results (synthesized Mexican-Spanish TTS voice notes)
- Whisper misheard "drywall" as **"drywag"** — the LLM silently corrected it in
  extraction. "Sink" transcribed as "zinc" (genuinely how it's said) →
  translated correctly as "Connect plumbing."
- **The nightmare case passed:** "Materiales dos mil doscientos... no espérate,
  dos mil cuatrocientos" → extracted $2,400. Mid-sentence price corrections work.
- No-price voice note → app refuses to invent a number, asks for the price.
- Latency: ~400ms transcription + ~700ms extraction. Cost: ~$0.005/quote.

### Bugs worth telling (the honest "AI coding isn't magic" section)
1. **React error #31:** Next.js vendors its own React for route handlers;
   react-pdf's reconciler rejects its elements. Fix: load react + react-pdf
   from disk via createRequire, no JSX in the PDF template.
2. **Vercel MODULE_NOT_FOUND:** dynamic requires are invisible to Vercel's file
   tracing → react-pdf never shipped to the lambda. Fix: serverExternalPackages
   + a static import. (Worked locally, failed deployed — classic.)
3. **The missing trailing newline:** appending an env var to .env.local glued it
   onto the auth token line, corrupting credentials. One `\n` of humility.
4. Node 20 + supabase-js needs the `ws` package (no native WebSocket).

### The live moment
Twilio sandbox + cloudflared tunnel → Alex sent a real Spanish voice note from
his phone → received a professional English PDF estimate: **$4,100 deck job,
client "Karen," materials/labor itemized, 30-day validity.** Database showed:
credits 3→2, quote status "sent."

**First user bug, minutes later:** his business name saved as **"Javier pints
do"** (garbled) — and there was no way to fix it. The "cambiar nombre" command
was designed, tested (added to the simulator's regression run), and deployed to
production the same evening. First user → first bug → first fix, in hours.

Then: deployed to Vercel (cotimigo.vercel.app), webhook rejects unsigned
requests (verified with a forged POST → 403), tunnel retired, bot now 24/7.

### Total spend
**$10** (domain). AI costs for the entire build + testing: cents.

---

## Part 3 material: The Paperwork Nobody Tells You About
(Highly searchable evergreen content — can stand alone.)

- **The California LLC trap:** $70 filing + $20 SOI + **$800/year franchise tax
  even at $0 revenue** ([first-year exemption expired](https://www.llcuniversity.com/california-llc/annual-llc-tax-exemption-ab-85/)).
  Abandoned LLCs keep accruing $800 + penalties until formally dissolved.
  [Short-form cancellation (LLC-4/8)](https://www.ftb.ca.gov/forms/misc/3556.html)
  escapes the first-year $800 only if the LLC **never conducted business**.
- **The right-sized alternative:** sole proprietorship + DBA (~$100–150 with
  newspaper publication) + free EIN (15 min at irs.gov; also useful for any
  1099 work — one EIN covers all your sole-prop activities for life; put it on
  W-9s instead of your SSN). If the project dies: DBA expires harmlessly,
  nothing to dissolve.
- **The Meta/WhatsApp myth:** you do NOT need an LLC (or any verification) to
  launch. [User-initiated conversations are unlimited and free regardless of verification](https://www.bot.space/blog/is-facebook-business-manager-verification-required-for-whatsapp-business-api);
  the 250/day unverified cap only limits *business-initiated* messages.
  Verification (later, optional) accepts sole-prop DBA + EIN docs.
- **City business license:** owed when you're actually soliciting customers,
  not while prototyping. ~$100/yr, file when the ads go up.
- **Privacy note:** the DBA filing itself is public record (name + address in a
  newspaper). Get a private mailbox (UPS Store street address, ~$20/mo) BEFORE
  filing anything; use it everywhere. Own-name operation = *less* privacy, not
  more (your legal name on every receipt).

---

## Part 4 material: The Demand Test (planned, not yet run)
- Stage 0: Fruitvale flyers (QR → wa.me deep link, per-location attribution
  codes, bulletin boards with shopkeeper permission ~$50) + Meta
  click-to-WhatsApp ads (~$150, Bay Area Spanish-speaking trades).
- No fake doors: ads only turned on after the bot worked (trust-first audience,
  no second chances in the cousin network).
- Numbers to report when run: cost per WhatsApp conversation, voice-note rate,
  flyer vs. ad CAC.

## Part 5 material: The Verdict (future)
**Pre-registered kill gates (in the repo README, committed before launch):**
- Stage 0: kill if a conversation costs >$20 in ad spend, or nobody sends a voice note
- Stage 1: kill if users try it once and never send a second quote
- Stage 2: kill if 0 of 20 free users pay
**Honest odds, stated 2026-07-02:** ~60–70% dies at Stage 0/1 (distribution),
~20–25% modest side business ($500–2K MRR), low single digits big outcome.
Biggest named risk: founder-market fit — distribution requires community
trust-building the founder is least excited to do. Most bullish possible
signal: one tester's cousin showing up unprompted.

---

## Killer quotes / moments (verbatim or near)
- Alex: "what do you overall think could make this a very valuable app that
  people might pay for? **Be brutal here plz**"
- Alex: "is every app market crowded? lol"
- Alex: "do people actually take pics of one another's badges? :/" (they don't)
- Alex: "am I actually running a business in my city?" (not yet — saved $100)
- Alex: "should I even feel good about taking money from people to teach them
  how to build an app now?" (the ethics post writes itself)
- "Whisper heard 'drywag.' The LLM quietly fixed it."
- "Javier pints do" — first live user, first bug, name printed on a real estimate
- "The product is a phone number."
- "Inventory, not assets" — ten AI-built apps without distribution
- "Anyone can go to the gym. You're not paying for access to the weights."

## Series meta
- Suggested titles: "I built a business in one day with AI — here's everything,
  including the odds it dies" / "The Idea Graveyard" / "The $800 Mistake I
  Almost Made" / "Flyers in Fruitvale" / "The Verdict"
- Cross-links: workshop landing page (this series is the workshop's proof),
  Idea Autopsy series (same method, reader ideas)
- Tone: first person, receipts inline, odds stated, no income promises.
