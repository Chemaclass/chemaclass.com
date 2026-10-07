# Spanish translation style (`.es.md`, colocated)

English is the main version. The `.es.md` file is translated from it. When they differ, update ES to match EN, never the reverse.

- **Informal `tú` everywhere.** Never `usted`. Commands use the `tú` form ("Commitea la carpeta. Compártela."). Use Spain Spanish words ("ordenador", "vale la pena", "a las tantas de la noche").
- **Keep in English** (often in italics as borrowed words): names of tools and ecosystem things, and code identifiers. `skill`/`skills` (English plural, "los skills"), `commit`, `PR`, `prompt`, `setup`, `output`, `issue` ("la issue"), `feature`, `test`, `hooks`, `settings`, `open source`, `trade-offs`, `clean code`, `naming`, `know-how`, `lock-in`, `hype`, `tooling`, `leverage`, `codebase`, `bug`, `loop`, `build`, `lint`, `auth`, `diff`, `rollback`, `feature flags`, `canary deploy`, `track record`, `autopilot`.
- **English verbs take Spanish endings**: "commitea", "promptear", "mergear", "testearlo", "onboardea".
- **Translate** general terms: `agente(s)` (the common noun), `rama` (branch), `ventana de contexto` (context window), `producción` (deploy/ship to prod), `capa`/`dominio`, `modelo`, `revisión`/`revisar` (review), `reglas` (rules; the general noun, not a config file name).
- **Titles, subtitles, descriptions are translated.** Keep Title Case and leave component names in English ("Skills por Encima de Agents"). Section headings in the body use normal Spanish sentence case.
- **Links:** translate the link text, except names of practices and proper nouns ("Ship, Show, Ask" stays). Root-relative `/blog/...` links get a `/es/` prefix. Absolute `https://chemaclass.com/blog/...` links stay unchanged. Slugs and `#anchors` to other posts stay in English. Anchors to the same page follow the translated heading.
- **Assets and metadata are identical to EN**: image paths, `static_thumbnail`, `related_posts`, `related_readings`, `tags`, `series`, `series_order`, `reading_time`. Two planned exceptions: a youtube id may be swapped for a Spanish-language video with the same content, and author names use their Spanish form ("Marcus Aurelius" becomes "Marco Aurelio").
- **Translate the meaning, not word by word.** "and hope it works" becomes "y rezas para que funcione". "at midnight" becomes "a las tantas de la noche". Change the person when it sounds more natural ("developers are loud" becomes "los desarrolladores hablamos alto").
- **Keep the same structure**: number of paragraphs, headings, pull-quotes, rhythm of short fragments.
- **Quotes and numbers:** quotes use `"..."`, never `«...»`. Numbers and dates follow Spanish conventions when the format could be read two ways, and English conventions in technical content.
