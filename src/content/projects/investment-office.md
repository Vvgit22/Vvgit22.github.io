---
title: 'Personal Investment Office'
summary: 'A private research-and-monitoring system with an append-only ledger and a verified calculation engine — it analyses and proposes but cannot place an order.'
status: live
statusLabel: 'Live demo'
period: 'August 2026 – present'
role: 'Sole author'
tags: [Python, SQLite, HTML, yfinance]
links:
  demo: /portfolio-office/
thumbnail: /thumbs/investment-office.webp
order: 6
---

## Problem

Keeping a disciplined personal investment record — holdings, decisions, reasoning — without handing the keys to a tool that can also trade on your behalf.

## What I built

A private research-and-monitoring system that analyses, documents and proposes. By design it cannot place, route or cancel an order — every transaction is executed manually by the investor at the broker. It produces a self-contained offline HTML dashboard for daily review.

## How it works

A 16-table SQLite database with an append-only ledger enforced at the database level; a calculation engine verified by 11 checks against a hand-worked ledger; a price and FX layer fed by yfinance; a self-contained offline HTML dashboard with no external resources and no tracking; and one-click .command launchers for the daily refresh. The demo dashboard runs on a fictional ledger.
