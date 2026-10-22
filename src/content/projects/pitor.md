---
title: 'LLM pipeline for kidney-transplant patient research'
summary: 'A local LLM pipeline for thematic analysis of patient free-text responses, plus benchmarking LLMs against expert pathologists on rejection diagnosis.'
status: card
statusLabel: 'Confidential'
period: 'August 2026 – present'
role: 'Research Intern (part-time alongside degree)'
team: 'Paris Institute for Transplantation & Organ Regeneration (PITOR)'
tags: [Python, local LLMs, embeddings, clustering]
thumbnail: /thumbs/pitor.webp
order: 6
---

## Problem

Kidney-transplant research produces thousands of free-text patient responses that need consistent thematic analysis, and rejection diagnosis from biopsy lesion scores that is normally judged by expert pathologists.

## What I built

A local LLM pipeline automating the thematic analysis of 6,000+ free-text responses from kidney-transplant patients, combining structured coding, embedding-based clustering and source-verified quotations. Separately, I benchmarked frontier LLMs against expert pathologists on Banff rejection diagnosis from lesion scores in 240 biopsies. A first-author manuscript is in preparation.

## How it works

The pipeline runs locally, in outline:

<div class="pitor-flow">
  <span class="pitor-box">free text</span>
  <span class="pitor-box">structured coding</span>
  <span class="pitor-box">embeddings</span>
  <span class="pitor-box">clustering</span>
  <span class="pitor-box">source-verified quotes</span>
</div>

<style>
  .pitor-flow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin: 0.75rem 0 1rem;
  }
  .pitor-box {
    border: 1px solid var(--color-neutral-300);
    border-radius: 0.5rem;
    background: var(--color-neutral-50);
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--color-neutral-800);
  }
  .pitor-box:not(:last-child)::after {
    content: ' →';
    color: var(--color-accent);
    font-weight: 600;
  }
</style>

## What this does and does not show

The topic is confidential — no code, data or demo until the manuscript allows. The schematic above is all that is shown here.
