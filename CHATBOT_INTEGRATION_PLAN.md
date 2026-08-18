# Custom AI Chatbot Integration Plan
## K2 Pest Control Website & Admin CMS

This document outlines the architecture, features, workflows, and implementation steps for integrating a 24/7 AI Pest Control Assistant into the website and Admin CMS.

---

## 1. Executive Summary & Value Proposition

* **24/7 Instant Response**: Answers questions on pest identification, prevention, safety around children/pets, and service preparation in real time.
* **100% Free AI Engine**: Powered by Google Gemini (`gemini-1.5-flash` / `gemini-2.0-flash`) with 1,500 free requests per day and no credit card requirements.
* **Zero-Maintenance Pricing Sync**: Automatically reflects any pricing, warranty, or service changes made in the Admin CMS with zero code changes.
* **Admin-Controlled System Prompt**: Change the chatbot's personality, special discounts, and business rules directly from the Admin Settings interface.
* **Automated Lead Generation**: Converts chatting visitors into paying customers by capturing their Name, Phone Number, City, and Pest Issue and automatically saving them into the Admin Leads database.

---

## 2. System Architecture

```
                                +-----------------------------------+
                                |          Website Visitor          |
                                +-----------------+-----------------+
                                                  |
                                                  v
                                +-----------------------------------+
                                |      Floating Chat Widget UI      |
                                |     (components/ui/ChatWidget)    |
                                +-----------------+-----------------+
                                                  |
                                            POST /api/chat
                                                  |
                                                  v
                                +-----------------------------------+
                                |         Next.js Chat API          |
                                |        (app/api/chat/route)       |
                                +-----------------+-----------------+
                                                  |
                     +----------------------------+----------------------------+
                     |                                                         |
                     v                                                         v
    +----------------------------------+                     +----------------------------------+
    |         Prisma Database          |                     |     Google Gemini Flash API      |
    |----------------------------------|                     |----------------------------------|
    | 1. Live Services & Pricing ($)   |                     | 1. Evaluates User Question       |
    | 2. Company Details & Phone       |                     | 2. Uses Context & Admin Rules    |
    | 3. Custom Admin System Prompt    |                     | 3. Calls Tool: captureLead()     |
    +----------------------------------+                     +-----------------+----------------+
                     ^                                                         |
                     |                       Save New Lead                     |
                     +---------------------------------------------------------+
```

---

## 3. Core Features & Capabilities

### A. Intelligent Pest Consultation
* Trained on all Ontario pests: Carpenter Ants, Mice & Norway Rats, German Cockroaches, Bed Bugs, Wasps & Hornets, Spiders, Wildlife, Termites, and Commercial IPM.
* Provides safe preparation instructions (e.g. *"What should I do before roach treatment?"*, *"Are your treatments safe for cats and dogs?"*).

### B. Dynamic CMS Data Synchronization
* When an admin edits a service price in `/admin/services` (e.g., changes Ant Control from $189 to $199), the chatbot immediately uses the new price.
* Emergency phone numbers (`(647) 905-7378`), license information, and GTA service cities are automatically loaded from the database.

### C. Admin Panel Control (`/admin/settings`)
* **Enable / Disable Toggle**: Easily turn the chat widget on or off sitewide.
* **Bot Persona Customization**: Set custom bot name (e.g., *"K2 Pest Assistant"*) and initial greeting.
* **Custom Instructions Box (Prompt)**: Multi-line text field in the CMS for temporary promotions or custom guidelines:
  > *Example*: *"We are offering 10% off for all wasp nest removals this week. Always suggest callers dial our emergency line for urgent rat infestations."*
* **API Key Management**: Set or update the Gemini API key in the admin panel or `.env`.

### D. Automatic Lead Capture
* If a customer asks for a callback, inspection, or quote and shares their contact details, the AI calls an internal function (`captureLead`) to automatically insert the lead into the `ContactSubmission` database table.
* The lead immediately appears in the **Admin Leads** dashboard for staff follow-up.

---

## 4. UI/UX Design Specifications

* **Floating Widget**: Located in the bottom-right corner with a pulse indicator and unread badge.
* **Design Language**: Matches K2 brand palette (Deep Charcoal `#1C1917`, Action Yellow `#F59E0B`, Brand Red `#BE2320`, clean Stone `#FAFAF9` backgrounds).
* **Suggested Quick Prompts**: One-click prompt bubbles (e.g. *"How much for ant removal?"*, *"Do you offer same-day emergency service?"*, *"Book a home inspection"*).
* **Emergency Quick-Call Button**: Phone shortcut button in the chat header for immediate 1-click calling on mobile.
* **Responsive Layout**: Smoothly adjusts for mobile screens, tablets, and desktop displays.

---

## 5. Technical Implementation Steps

| Step | Component | Description |
|---|---|---|
| **1** | **Database Schema** | Update Prisma schema with chatbot configuration fields (`chatbotEnabled`, `chatbotName`, `chatbotGreeting`, `chatbotSystemPrompt`, `chatbotApiKey`). |
| **2** | **Admin Settings UI** | Add an **AI Chatbot Configuration** card to `/admin/settings` with live prompt editing and toggle controls. |
| **3** | **Chat API Route** | Create `/api/chat` with Google Gemini SDK, dynamic context compiler, and structured lead capture tool. |
| **4** | **Chat UI Component** | Build `components/ui/ChatWidget.tsx` with streaming responses, suggested chips, and lead confirmation badges. |
| **5** | **Sitewide Integration** | Mount `ChatWidget` in `components/layout/PublicLayoutWrapper.tsx` across public pages (hidden in `/admin`). |

---

## 6. Cost & Rate Limits

* **Provider**: Google AI Studio (Gemini 1.5 Flash / Gemini 2.0 Flash)
* **API Cost**: **$0.00 / month** (100% Free Tier)
* **Limits**: 15 requests per minute, 1,500 requests per day (more than sufficient for typical website traffic).
* **Requirements**: Free API Key from [aistudio.google.com](https://aistudio.google.com) (no credit card required).

---

*Document prepared for K2 Pest Control. Ready for execution upon client approval.*
