---
title: Blocking Nvidia Telemetry
tags: 'Nvidia, Telemetry, Privacy, "Corporate Nonsense"'
category: Privacy
date: 2019-05-03 09:26:25
---


Null-routing all the garbage packets a gpu shouldn't be sending out. Using their GEForce GUI also requires a sign-up now, sigh.

<!--more-->

Full list

```
0.0.0.0 telemetry.gfe.nvidia.com 
0.0.0.0 gfe.nvidia.com
0.0.0.0 services.gfe.nvidia.com
0.0.0.0 accounts.nvgs.nvidia.com
0.0.0.0 events.gfe.nvidia.com
0.0.0.0 images.nvidiagrid.net
0.0.0.0 rds-assets.nvidia.com
0.0.0.0 assets.nvidiagrid.net
```

Lite list that doesn't block updates or game optimisations
```
0.0.0.0 telemetry.gfe.nvidia.com
0.0.0.0 accounts.nvgs.nvidia.com
```

`Windows: C:\Windows\System32\drivers\etc\hosts`
`Linux: /etc/hosts`
