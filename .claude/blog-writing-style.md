# Blog Writing Style Guide

This document defines the writing style and tone for blog posts on chemaclass.com.

## Core Characteristics

### Tone
- **Direct and straightforward** - Get to the point without excessive preamble
- **Genuinely informal** - Friendly and accessible, but not performatively casual
- **Thoughtful and philosophical** - Shows depth of reflection without being pretentious
- **Personal and authentic** - Based on real experiences and honest self-reflection

### Writing Patterns

**DO:**
- Use block quotes (>) to emphasize key insights and important takeaways
- Ask concrete questions that provoke self-reflection
- Share personal anecdotes and real experiences
- Use simple, clear language
- Structure content with clear headers and logical flow
- Reference related blog posts naturally within the content context
- Be concise - remove filler words and unnecessary phrases

**DON'T:**
- Use overly casual/performative phrases like:
  - "You know what's funny?"
  - "Here's the thing"
  - "Here's the kicker"
  - "And honestly?"
  - "Actually, it's more than fine"
- Be "cutesy" or try too hard to sound informal
- Use excessive emojis (only when explicitly requested)
- Write superlatives or over-the-top validation
- Use phrases that feel like they're performing informality rather than being natural

### Structure

Typical blog post structure:
1. **Introduction** - Direct statement of the topic or question (2-3 short paragraphs)
2. **<!-- more -->** marker for excerpt
3. **Main sections** with clear headers (##)
4. **Block quotes** for key insights
5. **Personal examples** and anecdotes
6. **Practical takeaways**
7. **Related section** at the end:
   - Use `## Related` as the parent header
   - Then use `### Related posts`, `### Related readings`, etc. as subsections
   - This groups all related content under one TOC entry

### Heading Best Practices

**For Clean Table of Contents:**

1. **Limit h2 headings to 5-7 per document**
   - If you have more, group them under broader categories with h3 subsections
   - Example: Instead of 9 separate h2s, use 3-4 h2s with h3 subsections

2. **Never skip heading levels**
   - Always use h3 after h2, h4 after h3
   - Never jump from h2 to h4 directly
   - This ensures proper semantic HTML and accessibility

3. **Use consistent hierarchy**
   ```markdown
   ## Main Topic          ← h2 (top level)
   ### Subtopic          ← h3 (sub-section)
   #### Detail           ← h4 (sub-sub-section)
   ```

4. **Group related content logically**
   - ❌ Bad: 9 separate h2 headings for different benefits
   - ✅ Good: `## Benefits` with `### For Companies` and `### For Individuals`

5. **Consider TOC readability**
   - Will someone scanning the TOC understand the structure?
   - Are related topics grouped together?
   - Is the progression logical?

6. **Standard patterns for common post types:**

   **Informative Blog Post:**
   ```markdown
   ## Introduction/Context
   ## Main Topic 1
   ### Subtopic 1A
   ### Subtopic 1B
   ## Main Topic 2
   ### Subtopic 2A
   ## Conclusion/Takeaways
   ## Related
   ### Related Posts
   ### Related Readings
   ```

   **Book Summary:**
   ```markdown
   ## Summary/Overview
   ## Key Concept 1
   ### Detail 1A
   ### Detail 1B
   ## Key Concept 2
   ## Takeaways
   ## Related
   ### Related Readings
   ```

   **Tutorial/Guide:**
   ```markdown
   ## Prerequisites
   ## Part 1: Setup
   ### Step 1
   ### Step 2
   ## Part 2: Configuration
   ## Troubleshooting
   ## Related
   ```

### Example Comparisons

❌ **Too performative:**
> "You know what's funny? For the longest time, I thought success was about hitting certain milestones."

✅ **Natural and direct:**
> "For the longest time, I thought success was about hitting certain milestones."

---

❌ **Too casual:**
> "And here's the kicker: when you focus on making others happier, you usually end up happier yourself."

✅ **Block quote for emphasis:**
> > When you focus on making others happier, you usually end up happier yourself. It's not zero-sum. It compounds.

---

❌ **Wordy:**
> "Your definition of success will probably be different from mine, and that's completely fine. Actually, it's more than fine—it's necessary."

✅ **Concise:**
> "Your definition of success will probably be different from mine, and that's not just okay—it's necessary."

## Reference Posts

Look at these posts for tone examples:
- `/content/blog/2023-03-16-have-you-always-been-like-this.md`
- `/content/blog/2022-08-22-understanding-people.md`
- `/content/blog/2020-09-08-the-process-itself-is-the-goal.md`

## Front Matter Template

```toml
+++
title = "The Title"
description = "Clear, compelling description that captures the main idea"
draft = false
[taxonomies]
tags = [ "tag1", "tag2", "tag3" ]
[extra]
subtitle = "A complementary subtitle"
static_thumbnail = "/images/blog/YYYY-MM-DD/cover.jpg"
+++
```

## Key Principles

1. **Authenticity over performance** - Write naturally, not like you're trying to sound casual
2. **Substance over style** - Focus on meaningful content, not clever phrasing
3. **Clarity over cleverness** - Simple, clear language is better than trying to be witty
4. **Reflection over prescription** - Share personal insights rather than telling people what to do
5. **Questions over answers** - Provoke thought rather than claiming to have all the solutions
