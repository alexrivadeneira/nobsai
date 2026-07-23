# Lesson 3: Meet Your First Agent — Outline

Working title: "The Function Gets Hands"
Path step 3 · promise: "understand what an AI agent actually is, watch one work in the wild, and learn the one skill that matters: knowing when to let it act and when to say no"

## 1. Hook

Lesson 2 ended with a cheat: real automation means the computer pushes send. But even your scheduled digest just produced *text*. Somebody (you) still had to read it and do something. Today the function stops handing you text and starts pushing buttons itself. Your job changes too: you're not the typist anymore, and you're not the wrapper. You're the supervisor.

## 2. The big idea: an agent is a function in a loop, with permission to act

No new magic. Same frozen function from Lesson 1, same wrapper from Lesson 2, plus two additions:

- The job description now includes a list of buttons the model is allowed to ask for (search the web, read a file, send an email). Honest name: a tool is a button, and "tool use" is the model writing "please press button X" in its output.
- The wrapper runs in a loop. Model asks for a button, wrapper presses it, pastes the result back into the bundle, runs the function again. Repeat until the job is done. The loop is the agent. There is no little robot: it's copy-paste with a to-do list.

Callback: in the Round Trip, the conversation grew every turn as YOU replied. In an agent, it grows the same way, except the "replies" are button results. Context is still a copy-paste job.

## 3. Experiment: "You Be the Supervisor" widget (not built)

Three boxes, learner in the new seat. Left: the world (a fake inbox, a calendar, a file). Middle: the loop, showing the growing bundle and the button the model wants to press next. Right: you, with Approve and Reject buttons on every proposed action.

Task for the agent: something mundane with stakes, e.g. "clear my morning: reschedule my 9am and email attendees." Engineered failures, friction as the teacher:

- Autopilot trap: approve everything fast and the agent confidently emails the wrong person or cancels the wrong meeting. It never doubted itself. Likely is not true, now with a send button.
- Missing button: the agent hits a step it has no button for and either stalls or improvises badly. Payoff: an agent can only do what its buttons allow. This tees up Lesson 4.
- Recovery: reject an action and watch the rejection get pasted into the bundle, and the model route around it. Supervision is part of the conversation.

Payoff line: the skill isn't prompting anymore, it's knowing which button presses deserve a second look.

## 4. Meet a real one (the deliverable)

- You've already met an agent without noticing: when ChatGPT or Gemini says "Searching the web...", that's the loop. Function asked for a button, wrapper pressed it, result got pasted back in. Expand the disclosure and read the steps: that's the bundle growing in public.
- Main activity: run a Deep Research task (free tier on Gemini; equivalents elsewhere) on an errand you actually care about, and audit it. Watch the plan, watch each button press, then fact-check two claims from the report. Deliverable: your own one-line verdict on what you'd trust it with and what you wouldn't.
- Honest framing: today's agent only has safe buttons (search, read). Nothing it did today could touch your email or your files. That's on purpose, and it's Lesson 4's whole subject.

## 5. When should the function get a button?

The trust framework, plain: cheap to undo and easy to check → let it act. Expensive to undo (send, delete, pay) → the model can draft, a human presses send. "Human in the loop" is the industry's honest name for the Approve button you just spent ten minutes clicking.

## 6. Catch it in the wild

Customer service bots that can actually issue refunds vs. ones that just talk. "Agentic" browsers and assistants. Every demo where an AI "books a flight": count the buttons it was given, and notice who's liable when it presses the wrong one.

## 7. Decode the buzzwords

Agent · agentic · tool use / function calling · autonomous · human in the loop · MCP ("a standard wall socket for buttons")

## 8. Wrap-up

Video review · Go deeper links · Lesson 4 tease: today's agent had toy buttons. Next time you hand it real ones (your files, your calendar), and that's where the power and the risk both live.
