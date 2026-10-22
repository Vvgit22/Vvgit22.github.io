---
title: 'Electrode batch QC from SEM images'
summary: 'A 48-hour pipeline that segments battery-electrode cross-sections and asks whether a new batch of material has changed from the approved one.'
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

Before battery cells are built, can you tell whether a new batch of electrode material has changed from the approved one, judged only from SEM/BSE cross-section images?

## What I built

With our team at the London AI × Science Hackathon, I built a pipeline that goes from image alignment to multi-Otsu segmentation to object classification to measurement of pores, silicon and contacts, then compares batches and feeds an exploratory Doyle–Fuller–Newman model. The candidate markers were a literature-based list; only the ones that differed significantly between batches after multiple-testing correction were kept and linked to the DFN model.

## How it works

The segmentation uses multi-Otsu thresholding on aligned cross-sections; classified objects are measured and the per-batch distributions are compared statistically. All three batches hold about 10–11% pore space and about 6% candidate silicon. Imaging sessions line up with batches, so material differences cannot be separated from imaging conditions — the honest verdict is "can't tell yet". Blind predictions on new images were hash-locked before labels were released; they scored 0/2 on the confirmed labels, and both wrong calls matched the imaging session rather than the batch.

## What this does and does not show

This is a 48-hour result. The pipeline currently classifies the imaging session better than the material. The DFN outputs are what-if indicators, not measured cell performance. The repository is a fork of our team's shared repository.
