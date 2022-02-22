---
layout: plugin

id: openmiko
title: OctoPrint-OpenMiko
description: Control OpenMiko Day/Night Mode
authors:
- Tom Mount
license: MIT

# TODO
date: 2022-02-22

homepage: https://github.com/tmountjr/OctoPrint-OpenMiko
source: https://github.com/tmountjr/OctoPrint-OpenMiko
archive: https://github.com/tmountjr/OctoPrint-OpenMiko/archive/main.zip

# TODO
tags:
- webcam
- openmiko
- timelapse

# TODO
# When registering a plugin on plugins.octoprint.org, all screenshots should be uploaded not linked from external sites.
screenshots:
- url: /screenshot.png
  alt: Control page of OctoPrint with OpenMiko plugin enabled
  caption: Day Mode and Night Mode buttons

# TODO
featuredimage: /screenshot.png

compatibility:
  octoprint:
  - 1.4.0
  os:
  - linux
  - windows
  - macos
  - freebsd
  python: ">=3,<4"

---

This is a simple plugin that allows you to set the IR LED and IR cutoff filter values for [OpenMiko](https://github.com/openmiko/openmiko)-enabled webcams.

This plugin assumes that an OpenMiko-enabled camera has already been set up in OctoPrint as a webcam and will use the URL provided under the **Webcam & Timelapse** configuration within OctoPrint. If a webcam is not enabled, this plugin will not show any controls.
