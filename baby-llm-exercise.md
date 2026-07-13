# Baby LLM Exercise

You're going to work with ChatGPT to build a "baby LLM."

Remember: an LLM is basically a function that takes text in, does something to it, and puts new text out. Today you'll build the simplest possible version of that — an ancestor of ChatGPT called a **Markov text generator** — and end up with a small app running on your own computer.

By the end you will have:

1. Learned what a Markov text generator is (by interviewing ChatGPT)
2. Simulated one inside ChatGPT using your own training text
3. Downloaded a working app you built without writing a line of code

---

## Part 1 — Discover a primitive (5–7 min)

Ask ChatGPT to explain what a **Markov text generator** is. Keep this part short — you just need the gist, not a lecture.

**Prompting tips (these work everywhere, not just today):**

- If the explanation runs long, ask for the TL;DR, or say "in 3 sentences."
- If part of the answer confuses you, copy that exact sentence, paste it into your next prompt, and ask it to go deeper on just that.
- The "explain it like I'm 5" trick is always available. No shame.

**Question to try:** "What's the difference between a first-order and second-order Markov text generator?" (This one matters — you'll see why when your app writes nonsense.)

Along the way, make sure you also ask what **training text** means. You're about to need some.

## Part 2 — Simulate it in the chat (10 min)

Now ask ChatGPT:

> "Can you act as a Markov text generator for me? What do you need from me to do that?"

- If it starts helping you write Python or wants you to code, redirect it: "I don't want to write code — can we just simulate it right here in the chat? What do you need?"
- It needs **training text**. Paste some in: your sent emails, a Wikipedia article, a news story — or grab a chapter from a free book at [Project Gutenberg](https://www.gutenberg.org/ebooks/search/?sort_order=downloads).
- Then play: ask it to generate 20 words, then 100. Try different training text. Notice how the output *sounds like* your source but doesn't quite *mean* anything. Hold onto that observation — it's the whole point of the lesson.

## Part 3 — Download it as a real app (10–15 min)

Time to take it out of the chat and onto your machine. Ask ChatGPT:

> "Build me a Markov text generator as a single HTML file using JavaScript — one complete file I can download, save, and open immediately. No external libraries."

1. Save the file somewhere you can find it (Desktop is fine).
2. Double-click it. Does it open in your browser? Does it work as expected?
3. **If something's broken, don't fix it yourself** — copy the error or describe what happened, paste it back to ChatGPT, and ask for a fix. This is how people actually work with AI.
4. Ask for refinements. Did it give you a way to choose the output length? If not, request one.
5. Make it yours: change the background color, the fonts, the title. You're now revising software by asking for what you want.

---

## What you just did

You built and customized a working app without writing code, and your app demonstrates the core idea behind ChatGPT itself: **predict the next word**. Your generator does it with a simple lookup table; ChatGPT does it with a giant neural network. Notice your app's output flows nicely but says nothing true — when ChatGPT confidently makes something up, you're seeing the polished version of exactly that.
