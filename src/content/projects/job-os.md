---
title: 'Job OS: a job-search engine that cannot invent a claim'
summary: 'A personal job-search system that scores postings deterministically and generates cover letters a provenance guard stops from inventing facts.'
status: video
statusLabel: 'Video'
period: '2026 – present'
role: 'Sole author'
tags: [TypeScript, Next.js 16, Drizzle ORM, Postgres/PGlite, Zod, Playwright]
thumbnail: /thumbs/job-os.svg
order: 3
---

## Problem

Searching for jobs means tracking postings scattered across many applicant-tracking systems, deciding which ones are worth the effort, and writing letters that stay truthful to your actual record.

## What I built

A personal single-user system. Source adapters for Greenhouse, Lever, Workday, BambooHR and others discover postings; a deterministic normaliser parses location, seniority, salary, degree, visa, languages, graduation window and skills; a relevance filter and dedupe (canonical URL → ATS id → structural key → fuzzy title) feed one write path. Postings get a score, and the system drafts cover letters from verified facts.

## How it works

The score is a weighted sum of five dimensions — eligibility 0.20, work criteria 0.15, interest 0.35, experience fit 0.10, technical fit 0.20. An unmeasurable dimension is dropped and the weights renormalise; a hard eligibility blocker caps the score. For cover letters, the model may select, reorder, compress and rephrase verified facts but never introduce one — enforced by a provenance guard with four checks (citation, numeric, lexical, company). A failing passage is rejected and replaced by approved text, never silently repaired. It runs on embedded Postgres (PGlite) with no server install, Zod at every boundary, and vitest plus Playwright tests.

## What this does and does not show

Job OS is private and single-user — there is no live instance, and the video runs on seeded data, not my real applications.
