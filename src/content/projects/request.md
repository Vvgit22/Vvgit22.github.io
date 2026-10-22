---
title: 'ReQuest: gamified physiotherapy'
summary: 'Two wearable wristbands and a resistance band turn prescribed exercises into a 2D pixel-dungeon RPG, with adherence synced to a clinician dashboard.'
status: live
statusLabel: 'Live demo'
period: 'October 2025 – June 2026'
role: 'Project Manager and sole software developer'
team: '8-member Imperial group project (BME Group 12)'
tags: [Python, FastAPI, Bluetooth LE, pygame, HTML/JS]
links:
  repo: https://github.com/Vvgit22/ReQuest-Physiotherapy
thumbnail: /thumbs/request.svg
order: 1
---

## Problem

Physiotherapy only works if patients actually do their prescribed exercises between appointments, and adherence is hard to keep up — both for the patient doing the exercises and for the physiotherapist tracking progress.

## What I built

ReQuest turns a clinician's prescribed exercises into a 2D pixel-dungeon RPG: each exercise is an enemy encounter and each rep is damage. Two wearable wristbands plus a resistance band calibrate to each patient's range of motion and count reps. Progress and adherence sync to the physiotherapist's dashboard.

The browser prototype includes a patient app — Mission Control, Journey, Feed, the dungeon game with band calibration, check-ins, and exercise tutorials — and a clinician dashboard covering caseload, prescriptions, adjusting reps and frequency, messaging, and consistency and clinical-alert views, behind a demo login.

## How it works

The software is a Bluetooth-driven game built in pygame, plus a patient app and clinician dashboard on a FastAPI backend. I was the sole developer of the software on an 8-member Imperial group project; the team won the Year 2 Biomedical Engineering Prize for Best Group Project.

## What this does and does not show

The prototype runs on in-memory demo data that resets on refresh. The hardware is not in the browser — the wristbands and resistance band were built by the team. This was a group project: the hardware and bands were built by the team, and the software was built by me.
