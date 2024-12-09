# Stride - E-commerce Frontend

A modern e-commerce frontend built with Next.js 14, TypeScript, and Tailwind
CSS. This project was created as part of a technical assessment demonstrating
frontend development capabilities.

## Live App

- **Vercel:** https://test-frontend-engineer-psi.vercel.app/

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **API Integration:** Axios with TypeScript types
- **Deployment:** Vercel
- **Functional Library:** Ramda
- **Data Fetching Library:** TanStack Query
- **Mock Data:** Fake Store API

- ## Thought Process and Decisions
- Due to the speed in which I wanted to create this project, I decided to use most of the tools that I have been taught to use by my mentors. This mostly includes TanStack Query, Ramda, and Zustand - all of which are high performant options.
- My thought process around creating something like this is to map out everything that is required, then once I have a clear high level overview of how I want to do it, I start with project setup and then tackle one feature at a time, making adjustments and cleaning up code as needed.

- ## Problem-solving
- The way I approach solving problems can vary, however most of the time I will have documentation open for any tools or projects I am using to ensure I have a good understanding of their API. If I come across issues where the docs don't seem to help, I will check Google (mostly finding solutions on StackOverflow and Github), and finally I also use Claude as my AI tool. The important AI things to note, are to not use it to solve your problem and use its answer, however, to instead use it to ask the right questions to, which bring you to a deeper understanding to solve it in my own way (this ensures I am not mindlessly copying code from AI and instead have my own understanding).
- One main issue for me was actually ensuring I pushed my initial commit to my own fork. I don't usually work by forking repos (usually branching with my co-founder), but in this instance I had not set the default upstream to my own forked repo, I used the default provided repo by Git (which was the playa3ull repo). It wasn't much of a problem but it was definitely a nice thing to learn while doing this assignment.
- Finally, coding is simply a repeat learning loop, and I believe the most important skills are problem solving, and willingness to learn - both of which I pride myself on to push my knowledge further and challenge myself to become the best developer I can be. 

## Installation

1. Clone the repository:

```bash
git clone https://github.com/natecalc/test-frontend-engineer.git
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

4. Start the development server:

```bash
bun dev
```

## Future Improvements

Given more time, I would add:

- User authentication
- Wishlist functionality
- Product reviews
- Advanced filtering options
- Checkout and pay via Stripe

## Created By

- GitHub: [@natecalc](https://github.com/natecalc)
