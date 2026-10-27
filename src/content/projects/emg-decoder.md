---
title: 'EMG gesture decoder: 17 hand gestures from muscle signals'
summary: 'A small convolutional network trained on the open GrabMyo dataset (43 people) and tested three ways: same session, next day, and a person it has never seen. Runs live in the browser on held-out recordings.'
status: live
statusLabel: 'Live demo'
period: 'October 2026'
role: 'Solo project'
tags: [Python, PyTorch, scikit-learn, ONNX, signal processing, EMG]
thumbnail: /thumbs/emg-decoder.webp
order: 4
links:
  demo: /emg/
  repo: https://github.com/Vvgit22/emg-gesture-decoder
---

## Problem

A wristband that reads electrical activity from forearm muscles can steer a
cursor, a prosthesis or a drone — but only if the decoder still works when
conditions change: a new day, a new placement of the electrodes, or a person
it has never met. Most published numbers answer the easy version of the
question, scored on windows drawn from the same recording the model trained
on.

## What I built

A complete, reproducible gesture-recognition pipeline on the open GrabMyo
dataset: download and checksum verification of every recording, signal
conditioning, a windowed dataset, three leak-tested ways to split training
from testing, a classical feature-plus-LDA baseline and a small convolutional
network, exported to ONNX so the models run in the browser on held-out
recordings.

## How it works

Three split designs ask three different questions — same session, a different
day, and a person the model has never seen — and the grouping is asserted
programmatically before every fit so a near-duplicate window can never slip
into the test side. The network is deliberately small and its normalisation
statistics live inside the exported graph, so the browser receives a single
self-contained model. Every number on the demo page is generated from the
pipeline's own results file, not typed in.
