+++
title = "Team Topologies"
description = "Team Topologies focuses on how to set up dynamic team structures and interaction modes that can help teams adapt quickly to new conditions, and achieve fast and safe software delivery."
authors = [ "Matthew Skelton", "Manuel Pais" ]
[taxonomies]
tags = [ "team-management", "architecture", "devops", "agile" ]
[extra]
subtitle = "Organizing Business and Technology Teams for Fast Flow"
pages = "240"
author = "Matthew Skelton, Manuel Pais"
static_thumbnail = "https://m.media-amazon.com/images/I/81vdbXuZ0NL._AC_UL640_FMwebp_QL65_.jpg"
expand_preview = false
related_posts = [
  "blog/2022-04-02-dunbar-number.md",
]
+++

<!-- more -->

Team Topologies focuses on how to set up dynamic team structures and interaction modes that can help teams adapt quickly to new conditions, and achieve fast and safe software delivery.

## Team structure

- High cohesion: Group related things together.
- Loose coupling: There must be clear boundaries between the teams.
- Cognitive load: It's like the RAM of the team. The team can burn down if you load with more than the team can handle.

> In order to avoid bottleneck teams, you need to make sure their cognitive load is not very high.

## Conway's Law

- The organization structure will influence the architecture of the team.
- Conway’s Law says that organizations will design systems that copy their communication structure.
- In other words, there will be no focus on the optimal architecture for the project.
- First you need to define the architecture of the project, and then form the teams.

## Team-First Thinking

- Who is in the team matters less than the team dynamics.
- When measuring performance, teams matter more than individuals.
- Team = group of 5-9 who work towards a shared goals as a unit. 
  - Check [Dunbar number](/blog/dunbar-number/).
- Forming a team takes from 2 weeks to 3 months.
- Cognitive load is the total amount of mental effort being used in the working memory.
- 3 Types of cognitive load:
    - Intrinsic: Fundamentals of the problem space. Example: programming language.
    - Extraneous: Environment related. Example: how to deploy.
    - Germane: Special attention is required. Example: business domain.
- Heuristics:
    - 3 types of domain: Simple, complicated, complex.
    - If the domain is too big, split it into subdomains.
    - One team, either:
        - 2-3 simple domains.
        - 1 complex domain.
        - Avoid 2 complicated domains, better split the team.
- Define a Team API:
    - Code: endpoints, libraries, clients, ...
    - Versioning.
    - Documentation.
    - Practices and principles.
    - Communication tools.

## Team Topologies

> Instead of structuring teams according to know-how or activities, organize teams according to business domain areas.

- Success of topology depends both on team members and surrounding environment, teams and interactions.
- Split responsibilities to breakdown silos.
- Types of dependencies: Knowledge, task, and resource.
- Four types of teams:
    - Stream-aligned: deliver features, projects, products to the market asap.
    - Enabling: grow the capabilities for the Stream-aligned team(s).
    - Complicated-subsystem: reduce the cognitive load of the Stream-aligned team(s).
    - Platform: make the Stream-aligned team(s) autonomous.

## Team Interactions

- Collaboration. Work closely between teams with different skill sets.
- X-as-a-Service. Clear ownership, small cognitive load.
- Facilitation. Helping to clear impediments, focus on quality interactions between other teams.
