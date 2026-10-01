# 🌻 SUN SAKHI

### Voice-First AI Digital Companion for First-Time Smartphone Users

**SUN SAKHI** is a voice-first AI assistant designed to help rural women and first-time smartphone users interact with digital services **without depending on reading, typing, or prior smartphone knowledge**.

Instead of assuming that users already know how to use a smartphone, SUN SAKHI first **teaches the basics of smartphone interaction** and then guides the user through an important digital task using **voice, visual demonstrations, and simple step-by-step instructions**.

---

## 💡 The Problem

Many digital services are technically available to everyone, but accessibility is still a major challenge.

A first-time smartphone user may not know:

* Where to tap
* How to swipe
* How to use a microphone
* How to go back
* How to type
* Which button to press
* What technical terms mean
* How to navigate a complicated government website

For an illiterate or low-literacy user, a screen filled with text, menus, forms, and icons can become a major barrier.

**SUN SAKHI addresses the problem from the user's perspective — instead of asking the user to learn technology, the technology learns how to communicate with the user.**

---

# 🌻 Our Solution

SUN SAKHI follows a simple interaction model:

> **Teach → Listen → Understand → Show → User Acts → Confirm → Next Step**

The system combines:

* 🎙️ Voice interaction
* 🤖 AI-powered natural-language understanding
* 👆 Visual interaction guidance
* 🧑‍🏫 Digital familiarization
* 🗣️ Speech recognition
* 🔊 Text-to-speech
* 🧭 Guided step-by-step workflows
* 🛡️ Controlled information responses
* 🌐 Multilingual architecture

The goal is to make the experience feel less like using an application and more like **having a patient person guide you through the task**.

---

# ✨ Key Features

## 1. 🎙️ Voice-First Interaction

The user does not need to type.

The user can:

1. Tap the large microphone button.
2. Speak naturally.
3. SUN SAKHI understands the request.
4. The response is spoken back to the user.

The interface uses the browser's speech capabilities for speech recognition and speech synthesis.

---

## 2. 👩‍🏫 Digital Familiarization / Learn Mode

SUN SAKHI does not assume that the user already knows how to use a smartphone.

The first interaction can teach basic actions such as:

### Lesson 1 — Touch

SUN SAKHI visually demonstrates where to touch.

The user performs the action and receives confirmation.

### Lesson 2 — Microphone

SUN SAKHI demonstrates how to interact with the microphone.

### Lesson 3 — Listening & Speaking

The user experiences a simple two-way conversation with SUN SAKHI.

This creates familiarity before asking the user to perform a more important task.

---

## 3. 🌐 Natural Language Detection

SUN SAKHI is designed to support multilingual interaction.

The architecture can work with languages such as:

* English
* Hindi
* Tamil
* Telugu
* Kannada
* Bengali
* Marathi

Instead of forcing the user to select a language from a text-heavy menu, the system can identify the language from the user's speech and ask for confirmation.

### Example

**SUN SAKHI:**

> "Please speak to me."

**User:**

> Speaks naturally in their language.

SUN SAKHI detects the likely language and confirms it before continuing.

---

## 4. 🤖 Gemini-Powered Understanding

Gemini is used as an AI understanding layer.

The user can speak naturally instead of using predefined commands.

For example, the user might say:

> "I want to know about my pension."

The system interprets the user's intent and provides an appropriately simplified response.

Gemini is **not allowed to control the entire application flow**.

The application controls:

* Current step
* Available actions
* Workflow
* Confirmation
* Validation
* Error handling

Gemini focuses on:

* Understanding natural language
* Rephrasing explanations
* Answering controlled questions
* Adapting language
* Handling imperfect user speech
* Simplifying explanations

---

# 🧭 Guided Mode

SUN SAKHI uses a **one-action-at-a-time** interaction model.

Instead of saying:

> "Open the website, select the service, enter your details, verify your information and submit the form."

SUN SAKHI gives one instruction.

### Example

**Step 1**

> "Touch this button."

The user performs the action.

### Step 2

> "Good. Now touch here."

The user performs the next action.

### Step 3

> "Now speak to me."

This reduces cognitive overload and makes the process easier for first-time users.

---

# 🆘 "I Don't Understand" Support

The user can say things like:

* "I don't understand."
* "I don't know."
* "Help me."
* "Show me again."

SUN SAKHI does **not** simply move forward.

Instead, it:

1. Detects confusion.
2. Repeats the current instruction.
3. Simplifies the explanation.
4. Shows the visual demonstration again.
5. Gives the user another opportunity to perform the action.

Example:

> "That's okay. Let's try again."

> "I will show you."

This creates a more patient and forgiving interaction.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       USER          │
                    │  Speaks Naturally   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Speech Recognition  │
                    │   Web Speech API    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Intent / Language │
                    │     Detection       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Gemini AI Layer  │
                    │ Natural Language     │
                    │ Understanding       │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌─────────────────────────────────┐
              │       Application Workflow      │
              │                                 │
              │  Current Step → Action →        │
              │  Validation → Confirmation      │
              └───────────────┬─────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   Visual Guidance   │
                    │  + Voice Response   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        USER         │
                    │ Performs the Action │
                    └─────────────────────┘
```

---

# 🔄 Core Interaction Flow

```text
START
  │
  ▼
WELCOME
  │
  ▼
DIGITAL FAMILIARIZATION
  │
  ├── Learn Touch
  │
  ├── Learn Microphone
  │
  └── Learn Conversation
  │
  ▼
LANGUAGE DETECTION
  │
  ▼
LANGUAGE CONFIRMATION
  │
  ▼
VOICE REQUEST
  │
  ▼
SPEECH RECOGNITION
  │
  ▼
INTENT UNDERSTANDING
  │
  ▼
GUIDED WORKFLOW
  │
  ├── Give ONE instruction
  │
  ├── Show visual cue
  │
  ├── User performs action
  │
  ├── Confirm action
  │
  └── Continue
  │
  ▼
TASK COMPLETED
```

---

# 🧠 Why SUN SAKHI Is Different

Most digital assistants assume:

> **The user already knows how to use the device.**

SUN SAKHI starts from a different assumption:

> **The user may be using a smartphone for the first time.**

Therefore, the system doesn't immediately throw the user into a complicated application.

It first teaches:

**"How do I touch?"**

**"How do I speak?"**

**"How do I interact with this device?"**

Only after that does it guide the user through the intended service.

This makes **digital literacy itself part of the solution**.

---

# 🎨 Design Principles

SUN SAKHI follows these principles:

### 🗣️ Voice over Text

Important instructions should be spoken instead of requiring reading.

### 👆 Demonstrate Instead of Explain

Use animations, visual cues, and demonstrations whenever possible.

### 1️⃣ One Action at a Time

Never overwhelm the user with multiple instructions.

### ❤️ Patient Interaction

The system should allow mistakes and provide another attempt.

### 👀 Visual Simplicity

Large buttons, clear visual hierarchy, minimal unnecessary text.

### 🧠 AI Assists — Application Controls

AI understands the user, while deterministic application logic controls the workflow.

---

# 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### AI

* Google Gemini API

### Voice

* Web Speech API
* Speech Recognition
* Speech Synthesis

### Browser

Modern Chromium-based browsers with speech API support.

---

# 📁 Project Structure

```text
SUN-SAKHI/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   ├── hooks/
│   └── services/
│
├── public/
│
├── server/
│   └── Gemini API proxy
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

The exact structure may evolve as the project develops.

---

# 🔐 Security

The Gemini API key should **not** be exposed in the frontend.

Use a backend/API proxy with an environment variable:

```env
GEMINI_API_KEY=your_api_key_here
```

Do **not** use:

```env
VITE_GEMINI_API_KEY=...
```

The `.env` file should also be excluded from Git:

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/nivii0610/SUN-SAKHI.git
cd SUN-SAKHI
```

If your repository uses a different name, replace the URL accordingly.

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Never commit the real API key.

## 4. Start the development server

```bash
npm run dev
```

Open the local development URL shown by Vite.

---

# 🧪 Testing Philosophy

SUN SAKHI should be tested from the perspective of the actual target user.

### Test Scenario

Imagine a woman who:

* Has never used a smartphone.
* Cannot read.
* Does not know English.
* Does not understand technical terminology.
* Does not know what a microphone button does.
* Has never used a chatbot.

Then ask:

> Can she understand what SUN SAKHI is saying?

> Can she perform the requested action?

> Can she recover when she makes a mistake?

> Can she ask for help without typing?

> Can she complete the intended task?

If the answer is no, the interface needs to become simpler.

---

# 🌍 Future Scope

SUN SAKHI can be extended with:

* More Indian languages
* Offline/low-connectivity support
* More government-service workflows
* Regional voice models
* More visual demonstrations
* Accessibility-focused personalization
* Local service information
* Voice-based form assistance
* More robust language detection
* Human escalation when AI cannot safely answer
* Integration with verified government APIs

---

# ⚠️ Prototype Disclaimer

SUN SAKHI is a hackathon/prototype project.

Government-service information should be connected only to **verified and controlled sources**.

The AI should never invent:

* Government schemes
* Eligibility requirements
* Application procedures
* Benefits
* Deadlines
* Official contact information

When verified information is unavailable, the system should clearly communicate that it does not have the required information.

---

# 👥 Team

**SUN SAKHI — Hackathon Project**

Built with the goal of making digital services more accessible to people who are often excluded by technology interfaces.

---

# 🌻 Our Vision

> **Technology should not expect everyone to understand it.
> Technology should learn to understand everyone.**

**SUN SAKHI** aims to make digital access simpler, more human, and more inclusive — one spoken instruction at a time.
