---
title: 'Battery quality control from microscope images'
summary: 'Does a new batch of battery-electrode material match the approved one? A pipeline that answers from SEM images alone, before any cells are built.'
status: live
statusLabel: 'Live demo'
period: 'October 2026 (48-hour hackathon)'
role: 'Pipeline, segmentation, marker dictionary, result interpretation, DFN link'
team: 'London AI × Science Hackathon (Iterate), Polaron & Cognition track — one of 150 participants selected from 1,000+ applicants'
tags: [Python, scikit-image, multi-Otsu, statistics, PyBaMM DFN]
links:
  repo: https://github.com/Vvgit22/Polaron-SEM-Prediction-Algorithm
  demo: /polaron/
  video: /polaron/#pitch
thumbnail: /thumbs/polaron.webp
order: 2
---

## Problem

Before cells are built, determine whether a new batch of electrode material differs from the approved one, judged only from SEM/BSE cross-section images.

## What I built

With our team at the London AI × Science Hackathon, I built a pipeline that runs from image alignment to multi-Otsu segmentation, object classification, and measurement of pores, silicon and contacts, then compares batches statistically and feeds an exploratory Doyle–Fuller–Newman model. Candidate markers came from a literature-based list; those that differed significantly between batches after multiple-testing correction were retained and linked to the DFN model.

## How it works

Aligned cross-sections are segmented with multi-Otsu thresholding; classified objects are measured and per-batch distributions compared statistically. All three batches hold about 10–11% pore space and about 6% candidate silicon. Because imaging sessions coincide with batches, the pipeline separates acquisition signature (frame size, noise, contrast) from measured structure and reports both, so a difference is attributed to the material only when it survives that comparison.

## Blind evaluation

Predictions for six unseen images were hash-locked before labels were released. Against the organiser's labels, 4 of the 6 images were assigned to the correct batch. Three of the six came from imaging sessions unique to a single batch and were flagged as session-confounded before prediction.
