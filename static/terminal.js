/**
 * Terminal interface for chemaclass.com
 * Interactive Unix-like shell for navigating blog content
 */

(function() {
  'use strict';

  // Virtual filesystem
  let fs = {};
  let cwd = '/';
  let commandHistory = [];
  let term = null;
  let currentTheme = 'default';

  // Color themes
  const themes = {
    default: {
      bg: '#0d1117', fg: '#c9d1d9', green: '#3fb950', blue: '#58a6ff',
      yellow: '#d29922', red: '#f85149', cyan: '#39c5cf', purple: '#a371f7'
    },
    matrix: {
      bg: '#000000', fg: '#00ff00', green: '#00ff00', blue: '#00aa00',
      yellow: '#00dd00', red: '#00ff00', cyan: '#00ee00', purple: '#00cc00'
    },
    dracula: {
      bg: '#282a36', fg: '#f8f8f2', green: '#50fa7b', blue: '#8be9fd',
      yellow: '#f1fa8c', red: '#ff5555', cyan: '#8be9fd', purple: '#bd93f9'
    },
    solarized: {
      bg: '#002b36', fg: '#839496', green: '#859900', blue: '#268bd2',
      yellow: '#b58900', red: '#dc322f', cyan: '#2aa198', purple: '#6c71c4'
    },
    amber: {
      bg: '#1a1200', fg: '#ffb000', green: '#ffb000', blue: '#ffc000',
      yellow: '#ffd000', red: '#ff8000', cyan: '#ffb000', purple: '#ffa000'
    }
  };

  // ASCII art banners (full and mobile)
  const BANNER_FULL = `
[[b;#3fb950;]   _____ _                               _               ]
[[b;#3fb950;]  / ____| |                             | |              ]
[[b;#3fb950;] | |    | |__   ___ _ __ ___   __ _  ___| | __ _ ___ ___ ]
[[b;#3fb950;] | |    | '_ \\ / _ \\ '_ \` _ \\ / _\` |/ __| |/ _\` / __/ __|]
[[b;#3fb950;] | |____| | | |  __/ | | | | | (_| | (__| | (_| \\__ \\__ \\]
[[b;#3fb950;]  \\_____|_| |_|\\___|_| |_| |_|\\__,_|\\___|_|\\__,_|___/___/]

[[;#6e7681;]Welcome to the terminal interface of chemaclass.com]
[[;#6e7681;]Type 'help' for available commands or 'ls' to explore.]
`;

  const BANNER_MOBILE = `
[[b;#3fb950;]> Chemaclass]

[[;#6e7681;]Welcome to chemaclass.com]
[[;#6e7681;]Type 'help' for commands.]
`;

  function getBanner() {
    return window.innerWidth < 500 ? BANNER_MOBILE : BANNER_FULL;
  }

  // Command implementations
  const commands = {
    help: function() {
      return `
[[b;#58a6ff;]Available Commands:]

  [[b;#3fb950;]Navigation:]
    ls [path]      List directory contents
    cd <path>      Change directory
    pwd            Print working directory
    tree           Show directory structure

  [[b;#3fb950;]Reading:]
    cat <file>     Read a post (inline output)
    less <file>    Read a post (with pager)
    head <file>    Show first 20 lines
    grep <pattern> Search content
    search <term>  Search posts by relevance

  [[b;#3fb950;]Info:]
    whoami [-v]    About me (use -v for detailed info)
    thanks         Support my work
    history        Show command history
    clear          Clear the screen
    help           Show this help

  [[b;#3fb950;]Discovery:]
    tags           List all tags with post counts
    top-tags [n]   Show top N tags (default 10)
    recent [n]     Show n most recent posts (default 5)
    random [section]  Open random post (blog/readings/talks/services)
    related <file> Show related posts and readings
    timeline [year]  Show post frequency over time
    find <tag>     Find all posts with a given tag
    diff <f1> <f2> Compare two posts side by side

  [[b;#3fb950;]Customize:]
    theme [name]   Change color scheme

  [[b;#3fb950;]Fun:]
    matrix         Enter the Matrix

  [[b;#3fb950;]Pager controls (less):]
    Space/PgDn     Next page
    b/PgUp         Previous page
    j/↓            Scroll down
    k/↑            Scroll up
    q              Quit pager

  [[b;#3fb950;]Tips:]
    - Use Tab for autocomplete
    - Paths work like Unix: cd blog, cd .., cd /
    - Files don't need .md extension
`;
    },

    pwd: function() {
      return cwd;
    },

    whoami: function(args) {
      const verbose = args.includes('--verbose') || args.includes('-v');

      if (!verbose) {
        const aboutFile = fs['about.txt'];
        if (aboutFile) {
          return aboutFile.content;
        }
        return `Jose Maria Valera Reales (Chemaclass)
Software Developer | Tech Lead | Speaker
https://chemaclass.com`;
      }

      // Verbose mode with ASCII portrait
      const portrait = `[[;#58a6ff;]        .---.        ]
[[;#58a6ff;]       /     \\       ]
[[;#58a6ff;]      | () () |      ]
[[;#58a6ff;]       \\  ^  /       ]
[[;#58a6ff;]        |||||        ]
[[;#58a6ff;]        |||||        ]`;

      return `
${portrait}

[[b;#3fb950;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]
[[b;#ffffff;]Jose Maria Valera Reales (Chemaclass)]
[[;#6e7681;]Software Developer | Tech Lead | Speaker]
[[b;#3fb950;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]

[[b;#58a6ff;]Location:]   [[;#c9d1d9;]Berlin, Germany]
[[b;#58a6ff;]Focus:]      [[;#c9d1d9;]PHP, TypeScript, Clojure, Rust]
[[b;#58a6ff;]Website:]    [[;#39c5cf;]https://chemaclass.com]
[[b;#58a6ff;]GitHub:]     [[;#39c5cf;]https://github.com/Chemaclass]
[[b;#58a6ff;]LinkedIn:]   [[;#39c5cf;]https://linkedin.com/in/chemaclass]

[[b;#a371f7;]Open Source Projects:]
  [[;#3fb950;]→] bashunit   [[;#6e7681;]- Testing framework for Bash]
  [[;#3fb950;]→] phel-lang  [[;#6e7681;]- Lisp dialect that compiles to PHP]

[[;#6e7681;]Type 'thanks' to see how you can support my work.]
`;
    },

    ls: function(args) {
      const path = args[0] || '';
      const target = resolvePath(path);

      if (!target) {
        return `[[;#f85149;]ls: cannot access '${path}': No such file or directory]`;
      }

      if (target.type === 'file') {
        return formatFile(path, target);
      }

      // It's a directory
      const entries = target.children || target;
      const items = [];

      for (const [name, entry] of Object.entries(entries)) {
        if (entry.type === 'dir') {
          items.push({ name: name + '/', isDir: true, entry });
        } else {
          items.push({ name, isDir: false, entry });
        }
      }

      // Sort: directories first, then files by date (oldest first)
      items.sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (!a.isDir && b.isDir) return 1;
        if (!a.isDir && !b.isDir) {
          const dateA = a.entry.date || '';
          const dateB = b.entry.date || '';
          return dateA.localeCompare(dateB);
        }
        return a.name.localeCompare(b.name);
      });

      let output = '';
      for (const item of items) {
        if (item.isDir) {
          output += `[[b;#58a6ff;]${item.name}]\n`;
        } else {
          const date = item.entry.date ? `[[;#d29922;]${item.entry.date}]  ` : '';
          const title = item.entry.title || item.name;
          output += `${date}${item.name}\n`;
          if (item.entry.description) {
            output += `[[;#6e7681;]  ${truncate(item.entry.description, 70)}]\n`;
          }
        }
      }

      return output.trim();
    },

    cd: function(args) {
      if (!args[0] || args[0] === '~' || args[0] === '/') {
        cwd = '/';
        return '';
      }

      const newPath = normalizePath(args[0]);
      const target = resolvePath(newPath);

      if (!target) {
        return `[[;#f85149;]cd: ${args[0]}: No such file or directory]`;
      }

      if (target.type === 'file') {
        return `[[;#f85149;]cd: ${args[0]}: Not a directory]`;
      }

      cwd = newPath;
      return '';
    },

    cat: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]cat: missing file operand]`;
      }

      const target = resolvePath(args[0]);

      if (!target) {
        return `[[;#f85149;]cat: ${args[0]}: No such file or directory]`;
      }

      if (target.type === 'dir') {
        return `[[;#f85149;]cat: ${args[0]}: Is a directory]`;
      }

      return formatPost(target);
    },

    less: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]less: missing file operand]`;
      }

      const target = resolvePath(args[0]);

      if (!target) {
        return `[[;#f85149;]less: ${args[0]}: No such file or directory]`;
      }

      if (target.type === 'dir') {
        return `[[;#f85149;]less: ${args[0]}: Is a directory]`;
      }

      const content = formatPost(target);
      term.less(content, {
        onExit: function() {
          term.set_command('');
        }
      });
      return '';
    },

    head: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]head: missing file operand]`;
      }

      const target = resolvePath(args[0]);

      if (!target) {
        return `[[;#f85149;]head: ${args[0]}: No such file or directory]`;
      }

      if (target.type === 'dir') {
        return `[[;#f85149;]head: ${args[0]}: Is a directory]`;
      }

      const lines = target.content.split('\n').slice(0, 20);
      return formatPostHeader(target) + '\n\n' + lines.join('\n') + '\n\n[[;#6e7681;]... (use cat to see full content)]';
    },

    tree: function(args) {
      const path = args[0] || '';
      const target = path ? resolvePath(path) : fs;

      if (!target) {
        return `[[;#f85149;]tree: ${path}: No such file or directory]`;
      }

      function buildTree(obj, prefix = '') {
        let output = '';
        const entries = obj.children || obj;
        const keys = Object.keys(entries);

        keys.forEach((key, i) => {
          const isLast = i === keys.length - 1;
          const entry = entries[key];
          const connector = isLast ? '└── ' : '├── ';
          const newPrefix = prefix + (isLast ? '    ' : '│   ');

          if (entry.type === 'dir') {
            output += prefix + connector + `[[b;#58a6ff;]${key}/]\n`;
            output += buildTree(entry, newPrefix);
          } else {
            output += prefix + connector + key + '\n';
          }
        });

        return output;
      }

      const startName = path || '/';
      return `[[b;#58a6ff;]${startName}]\n` + buildTree(target);
    },

    grep: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]grep: missing pattern]`;
      }

      const pattern = args[0].toLowerCase();
      const results = [];

      function searchDir(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            searchDir(entry, path + name + '/');
          } else {
            const searchText = [
              entry.title || '',
              entry.description || '',
              entry.content || '',
              (entry.tags || []).join(' ')
            ].join(' ').toLowerCase();

            if (searchText.includes(pattern)) {
              results.push({
                path: path + name,
                title: entry.title,
                description: entry.description
              });
            }
          }
        }
      }

      searchDir(fs, '/');

      if (results.length === 0) {
        return `[[;#6e7681;]No matches found for '${pattern}']`;
      }

      let output = `[[;#3fb950;]Found ${results.length} match${results.length > 1 ? 'es' : ''}:]\n\n`;
      for (const r of results) {
        output += `[[b;#58a6ff;]${r.path}]\n`;
        if (r.title) output += `  ${r.title}\n`;
        if (r.description) output += `[[;#6e7681;]  ${truncate(r.description, 65)}]\n`;
        output += '\n';
      }

      return output.trim();
    },

    search: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]search: missing search term]`;
      }

      const query = args.join(' ').toLowerCase();
      const results = [];

      function countMatches(text, term) {
        const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        return (text.match(regex) || []).length;
      }

      function highlight(text, term) {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        return text.replace(regex, '[[b;#d29922;]$1]');
      }

      function searchDir(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            searchDir(entry, path + name + '/');
          } else {
            const title = entry.title || '';
            const description = entry.description || '';
            const content = entry.content || '';
            const tags = (entry.tags || []).join(' ');

            // Weight: title matches are worth more
            const titleMatches = countMatches(title, query) * 10;
            const descMatches = countMatches(description, query) * 5;
            const tagMatches = countMatches(tags, query) * 3;
            const contentMatches = countMatches(content, query);

            const score = titleMatches + descMatches + tagMatches + contentMatches;

            if (score > 0) {
              results.push({
                path: path + name,
                title: title,
                description: description,
                content: content,
                date: entry.date,
                score: score
              });
            }
          }
        }
      }

      searchDir(fs, '/');

      if (results.length === 0) {
        return `[[;#6e7681;]No results found for '${query}']`;
      }

      // Sort by score descending
      results.sort((a, b) => b.score - a.score);

      // Extract snippet around match
      function getSnippet(text, term, length = 120) {
        const lower = text.toLowerCase();
        const idx = lower.indexOf(term.toLowerCase());
        if (idx === -1) return null;

        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + term.length + length - 40);
        let snippet = text.substring(start, end).replace(/\s+/g, ' ').trim();

        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';

        return snippet;
      }

      let output = `[[;#3fb950;]Found ${results.length} result${results.length > 1 ? 's' : ''} for '${query}':]\n\n`;
      for (const r of results) {
        const date = r.date ? `[[;#d29922;]${r.date}]  ` : '';
        output += `${date}[[b;#58a6ff;]${r.path}]\n`;
        if (r.title) output += `  ${highlight(r.title, query)}\n`;
        if (r.description) output += `[[;#6e7681;]  ${highlight(truncate(r.description, 100), query)}]\n`;

        // Show content snippet if match is in content
        const snippet = getSnippet(r.content, query);
        if (snippet) {
          output += `[[;#39c5cf;]  "${highlight(snippet, query)}"]\n`;
        }

        output += '\n';
      }

      return output.trim();
    },

    history: function() {
      if (commandHistory.length === 0) {
        return '[[;#6e7681;]No commands in history]';
      }
      return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
    },

    clear: function() {
      term.clear();
      return '';
    },

    // Easter eggs
    vim: function() {
      return `[[;#f85149;]Error: vim is not installed. Try 'cat' instead :)]`;
    },

    nano: function() {
      return `[[;#f85149;]Error: nano is not installed. This is a read-only terminal.]`;
    },

    rm: function() {
      return `[[;#f85149;]Nice try! This is a read-only filesystem.]`;
    },

    sudo: function() {
      return `[[;#f85149;]${term.get_prompt().replace(/\$\s*$/, '')} is not in the sudoers file. This incident will be reported.]`;
    },

    exit: function() {
      window.location.href = '/';
      return '[[;#6e7681;]Redirecting to homepage...]';
    },

    thanks: function() {
      return `
[[b;#f7931a;]  _____ _                 _        __]
[[b;#f7931a;] |_   _| |__   __ _ _ __ | | _____ \\ \\]
[[b;#f7931a;]   | | | '_ \\ / _\` | '_ \\| |/ / __|  > >]
[[b;#f7931a;]   | | | | | | (_| | | | |   <\\__ \\ / /]
[[b;#f7931a;]   |_| |_| |_|\\__,_|_| |_|_|\\_\\___//_/]

[[;#c9d1d9;]If you find my work useful, consider supporting it!]

[[b;#3fb950;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]

  [[b;#0070ba;]⦿ PayPal][[;#6e7681;] ─────────────────────────────────────]
    [[;#58a6ff;]https://paypal.me/chemaclass]

  [[b;#f7931a;]⚡ Lightning Network (Bitcoin)][[;#6e7681;] ───────────────]
    [[;#58a6ff;]https://getalby.com/p/chemaclass]
    [[;#6e7681;]Lightning Address:] [[;#f7931a;]chemaclass@getalby.com]

[[b;#3fb950;]━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]

[[;#6e7681;]Your support helps me maintain open source projects like:]
  [[;#a371f7;]→] bashunit  [[;#6e7681;]https://bashunit.typeddevs.com]
  [[;#a371f7;]→] phel      [[;#6e7681;]https://phel-lang.org]
  [[;#a371f7;]→] gacela    [[;#6e7681;]https://gacela-project.com]

[[;#d29922;]Thank you for being awesome! 🙏]
`;
    },

    sponsor: function() {
      return commands.thanks();
    },

    donate: function() {
      return commands.thanks();
    },

    open: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]open: missing file operand]`;
      }

      const target = resolvePath(args[0]);
      if (!target || target.type === 'dir') {
        return `[[;#f85149;]open: ${args[0]}: Cannot open]`;
      }

      // Determine the URL path
      let urlPath = '';
      const currentPath = cwd === '/' ? '' : cwd;
      const filePath = args[0].startsWith('/') ? args[0] : currentPath + '/' + args[0];
      const parts = filePath.split('/').filter(Boolean);

      if (parts.length >= 2) {
        urlPath = '/' + parts.join('/') + '/';
      }

      if (urlPath) {
        window.open(urlPath, '_blank');
        return `[[;#3fb950;]Opening ${urlPath} in new tab...]`;
      }

      return `[[;#f85149;]open: cannot determine URL for ${args[0]}]`;
    },

    theme: function(args) {
      const themeName = args[0]?.toLowerCase();

      if (!themeName) {
        let output = `[[b;#58a6ff;]Available themes:]\n\n`;
        for (const name of Object.keys(themes)) {
          const marker = name === currentTheme ? ' [[;#3fb950;](active)]' : '';
          output += `  ${name}${marker}\n`;
        }
        output += `\n[[;#6e7681;]Usage: theme <name>]`;
        return output;
      }

      if (!themes[themeName]) {
        return `[[;#f85149;]Unknown theme: ${themeName}. Type 'theme' for available themes.]`;
      }

      const t = themes[themeName];
      const root = document.documentElement;
      root.style.setProperty('--term-bg', t.bg);
      root.style.setProperty('--term-fg', t.fg);
      root.style.setProperty('--term-green', t.green);
      root.style.setProperty('--term-blue', t.blue);
      root.style.setProperty('--term-yellow', t.yellow);
      root.style.setProperty('--term-red', t.red);
      root.style.setProperty('--term-cyan', t.cyan);
      root.style.setProperty('--term-purple', t.purple);

      // Update terminal background
      document.body.style.background = t.bg;
      document.querySelector('.terminal').style.background = t.bg;

      currentTheme = themeName;
      return `[[;#3fb950;]Theme changed to ${themeName}]`;
    },

    tags: function() {
      const tagCounts = {};

      function collectTags(dir) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectTags(entry);
          } else if (entry.tags) {
            entry.tags.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        }
      }
      collectTags(fs);

      const sorted = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1]);

      if (sorted.length === 0) {
        return `[[;#6e7681;]No tags found]`;
      }

      let output = `[[b;#58a6ff;]Tags (${sorted.length} total):]\n\n`;
      for (const [tag, count] of sorted) {
        const bar = '█'.repeat(Math.min(count, 20));
        output += `[[;#a371f7;]${tag.padEnd(20)}] [[;#3fb950;]${bar}] ${count}\n`;
      }

      return output.trim();
    },

    recent: function(args) {
      const count = parseInt(args[0]) || 5;
      const posts = [];

      function collectPosts(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectPosts(entry, path + name + '/');
          } else if (entry.date) {
            posts.push({ name, path: path + name, entry });
          }
        }
      }
      collectPosts(fs, '/');

      // Sort by date descending
      posts.sort((a, b) => (b.entry.date || '').localeCompare(a.entry.date || ''));

      const recent = posts.slice(0, count);

      if (recent.length === 0) {
        return `[[;#6e7681;]No posts found]`;
      }

      let output = `[[b;#58a6ff;]Recent posts:]\n\n`;
      for (const post of recent) {
        output += `[[;#d29922;]${post.entry.date}]  [[b;#ffffff;]${post.entry.title || post.name}]\n`;
        output += `[[;#6e7681;]  ${post.path}]\n`;
      }

      return output.trim();
    },

    random: function(args) {
      const validSections = ['blog', 'readings', 'services', 'talks'];
      let section = args[0]?.replace(/\/$/, '');

      // Alias: "post" -> "blog"
      if (section === 'post') section = 'blog';

      if (section && !validSections.includes(section)) {
        return `[[;#f85149;]Invalid section: ${section}]\n[[;#6e7681;]Valid sections: ${validSections.join(', ')}, post]`;
      }

      // Collect posts from specified section or all
      const posts = [];
      const startDir = section ? (fs[section] || {}) : fs;
      const startPath = section ? '/' + section + '/' : '/';

      function collectPosts(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectPosts(entry, path + name + '/');
          } else {
            posts.push({ name, path: path + name, entry });
          }
        }
      }
      collectPosts(startDir, startPath);

      if (posts.length === 0) {
        return `[[;#f85149;]No posts found${section ? ' in ' + section : ''}]`;
      }

      const post = posts[Math.floor(Math.random() * posts.length)];
      const urlPath = post.path.replace(/^\//, '/').replace(/\/?$/, '/');

      window.open(urlPath, '_blank');
      return `[[;#3fb950;]Opening random post:] ${post.entry.title || post.name}`;
    },

    related: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]related: missing file operand]\n[[;#6e7681;]Usage: related <file>]`;
      }

      const target = resolvePath(args[0]);
      if (!target) {
        return `[[;#f85149;]related: ${args[0]}: No such file or directory]`;
      }
      if (target.type === 'dir') {
        return `[[;#f85149;]related: ${args[0]}: Is a directory]`;
      }

      const relatedPosts = target.related_posts || [];
      const relatedReadings = target.related_readings || [];

      if (relatedPosts.length === 0 && relatedReadings.length === 0) {
        return `[[;#6e7681;]No related items found for ${args[0]}]`;
      }

      function resolveRelated(refPath) {
        // refPath is like "blog/2021-08-01-test-driven-development.md"
        const parts = refPath.replace(/\.md$/, '').split('/');
        if (parts.length < 2) return null;
        const section = parts[0];
        const filename = parts.slice(1).join('/');
        // Extract slug from filename (remove date prefix)
        const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
        const dir = fs[section];
        if (!dir || !dir.children) return null;
        const entry = dir.children[slug];
        if (!entry) return null;
        return { path: '/' + section + '/' + slug, entry };
      }

      let output = `[[b;#58a6ff;]Related items for] [[b;#ffffff;]${target.title || args[0]}]\n\n`;

      if (relatedPosts.length > 0) {
        output += `[[b;#3fb950;]Related Posts:]\n`;
        for (const ref of relatedPosts) {
          const resolved = resolveRelated(ref);
          if (resolved) {
            const date = resolved.entry.date ? `[[;#d29922;]${resolved.entry.date}]  ` : '';
            output += `  ${date}[[;#58a6ff;]${resolved.path}]\n`;
            output += `    ${resolved.entry.title}\n`;
          } else {
            output += `  [[;#6e7681;]${ref} (not found)]\n`;
          }
        }
        output += '\n';
      }

      if (relatedReadings.length > 0) {
        output += `[[b;#3fb950;]Related Readings:]\n`;
        for (const ref of relatedReadings) {
          const resolved = resolveRelated(ref);
          if (resolved) {
            const date = resolved.entry.date ? `[[;#d29922;]${resolved.entry.date}]  ` : '';
            output += `  ${date}[[;#58a6ff;]${resolved.path}]\n`;
            output += `    ${resolved.entry.title}\n`;
          } else {
            output += `  [[;#6e7681;]${ref} (not found)]\n`;
          }
        }
      }

      return output.trim();
    },

    timeline: function(args) {
      const yearFilter = args[0] ? parseInt(args[0]) : null;
      const posts = [];

      function collectPosts(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectPosts(entry, path + name + '/');
          } else if (entry.date) {
            posts.push({ name, path: path + name, entry });
          }
        }
      }
      collectPosts(fs, '/');

      if (posts.length === 0) {
        return `[[;#6e7681;]No posts found]`;
      }

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if (yearFilter) {
        // Show month-by-month for a specific year
        const monthCounts = {};
        for (let i = 0; i < 12; i++) monthCounts[i] = 0;

        let total = 0;
        for (const post of posts) {
          const date = post.entry.date;
          const year = parseInt(date.substring(0, 4));
          if (year === yearFilter) {
            const month = parseInt(date.substring(5, 7)) - 1;
            monthCounts[month]++;
            total++;
          }
        }

        if (total === 0) {
          return `[[;#6e7681;]No posts found for ${yearFilter}]`;
        }

        const maxCount = Math.max(...Object.values(monthCounts));
        const maxBar = 30;

        let output = `[[b;#58a6ff;]Timeline for ${yearFilter}] [[;#6e7681;](${total} posts)]\n\n`;
        for (let i = 0; i < 12; i++) {
          const count = monthCounts[i];
          const barLen = maxCount > 0 ? Math.round((count / maxCount) * maxBar) : 0;
          const bar = '█'.repeat(barLen);
          const label = months[i];
          output += `  [[;#d29922;]${label}]  [[;#3fb950;]${bar}] ${count}\n`;
        }
        return output.trim();
      }

      // Show year-by-year overview
      const yearCounts = {};
      for (const post of posts) {
        const year = post.entry.date.substring(0, 4);
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }

      const years = Object.keys(yearCounts).sort();
      const maxCount = Math.max(...Object.values(yearCounts));
      const maxBar = 30;

      let output = `[[b;#58a6ff;]Timeline] [[;#6e7681;](${posts.length} posts, ${years[0]}-${years[years.length - 1]})]\n\n`;
      for (const year of years) {
        const count = yearCounts[year];
        const barLen = maxCount > 0 ? Math.round((count / maxCount) * maxBar) : 0;
        const bar = '█'.repeat(barLen);
        output += `  [[;#d29922;]${year}]  [[;#3fb950;]${bar}] ${count}\n`;
      }

      return output.trim();
    },

    'top-tags': function(args) {
      const n = parseInt(args[0]) || 10;
      const tagCounts = {};

      function collectTags(dir) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectTags(entry);
          } else if (entry.tags) {
            entry.tags.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        }
      }
      collectTags(fs);

      const sorted = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);

      if (sorted.length === 0) {
        return `[[;#6e7681;]No tags found]`;
      }

      let output = `[[b;#58a6ff;]Top ${sorted.length} tags:]\n\n`;
      for (const [tag, count] of sorted) {
        const bar = '█'.repeat(Math.min(count, 20));
        output += `[[;#a371f7;]${tag.padEnd(20)}] [[;#3fb950;]${bar}] ${count}\n`;
      }

      return output.trim();
    },

    find: function(args) {
      if (!args[0]) {
        return `[[;#f85149;]find: missing tag argument]\n[[;#6e7681;]Usage: find <tag>]`;
      }

      const searchTag = args.join(' ').toLowerCase();
      const results = [];

      function collectPosts(dir, path) {
        const entries = dir.children || dir;
        for (const [name, entry] of Object.entries(entries)) {
          if (entry.type === 'dir') {
            collectPosts(entry, path + name + '/');
          } else if (entry.tags) {
            const hasTag = entry.tags.some(t => t.toLowerCase() === searchTag);
            if (hasTag) {
              results.push({ name, path: path + name, entry });
            }
          }
        }
      }
      collectPosts(fs, '/');

      if (results.length === 0) {
        return `[[;#6e7681;]No posts found with tag '${searchTag}']`;
      }

      // Sort by date descending
      results.sort((a, b) => (b.entry.date || '').localeCompare(a.entry.date || ''));

      let output = `[[b;#58a6ff;]Posts tagged '${searchTag}'] [[;#6e7681;](${results.length} found)]\n\n`;
      for (const r of results) {
        const date = r.entry.date ? `[[;#d29922;]${r.entry.date}]  ` : '';
        output += `${date}[[;#58a6ff;]${r.path}]\n`;
        output += `  ${r.entry.title || r.name}\n`;
      }

      return output.trim();
    },

    diff: function(args) {
      if (!args[0] || !args[1]) {
        return `[[;#f85149;]diff: requires two files]\n[[;#6e7681;]Usage: diff <file1> <file2>]`;
      }

      const target1 = resolvePath(args[0]);
      const target2 = resolvePath(args[1]);

      if (!target1) return `[[;#f85149;]diff: ${args[0]}: No such file or directory]`;
      if (!target2) return `[[;#f85149;]diff: ${args[1]}: No such file or directory]`;
      if (target1.type === 'dir') return `[[;#f85149;]diff: ${args[0]}: Is a directory]`;
      if (target2.type === 'dir') return `[[;#f85149;]diff: ${args[1]}: Is a directory]`;

      const tags1 = new Set(target1.tags || []);
      const tags2 = new Set(target2.tags || []);
      const commonTags = [...tags1].filter(t => tags2.has(t));
      const onlyIn1 = [...tags1].filter(t => !tags2.has(t));
      const onlyIn2 = [...tags2].filter(t => !tags1.has(t));

      const w = 35; // column width
      const divider = '  │  ';

      function pad(str, len) {
        if (str.length > len) return str.substring(0, len - 3) + '...';
        return str + ' '.repeat(len - str.length);
      }

      let output = `[[b;#58a6ff;]Comparing two posts:]\n`;
      output += '[[;#6e7681;]' + '─'.repeat(w) + '──┬──' + '─'.repeat(w) + ']\n';

      // Titles
      const t1 = target1.title || args[0];
      const t2 = target2.title || args[1];
      output += `[[b;#ffffff;]${pad(t1, w)}]${divider}[[b;#ffffff;]${pad(t2, w)}]\n`;

      // Dates
      const d1 = target1.date || 'N/A';
      const d2 = target2.date || 'N/A';
      output += `[[;#d29922;]${pad(d1, w)}]${divider}[[;#d29922;]${pad(d2, w)}]\n`;

      output += '[[;#6e7681;]' + '─'.repeat(w) + '──┼──' + '─'.repeat(w) + ']\n';

      // Descriptions
      const desc1 = truncate(target1.description || 'N/A', w);
      const desc2 = truncate(target2.description || 'N/A', w);
      output += `${pad(desc1, w)}${divider}${pad(desc2, w)}\n`;

      output += '[[;#6e7681;]' + '─'.repeat(w) + '──┼──' + '─'.repeat(w) + ']\n';

      // Tags comparison
      output += `[[b;#a371f7;]Tags:]\n`;
      if (commonTags.length > 0) {
        output += `  [[;#3fb950;]Common:] ${commonTags.join(', ')}\n`;
      }
      if (onlyIn1.length > 0) {
        output += `  [[;#d29922;]Only in ${truncate(t1, 20)}:] ${onlyIn1.join(', ')}\n`;
      }
      if (onlyIn2.length > 0) {
        output += `  [[;#d29922;]Only in ${truncate(t2, 20)}:] ${onlyIn2.join(', ')}\n`;
      }
      if (commonTags.length === 0 && onlyIn1.length === 0 && onlyIn2.length === 0) {
        output += `  [[;#6e7681;]No tags on either post]\n`;
      }

      output += '[[;#6e7681;]' + '─'.repeat(w) + '──┴──' + '─'.repeat(w) + ']';

      return output;
    },

    matrix: function() {
      // Create canvas overlay for matrix effect
      const canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:#000;';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      const interval = setInterval(draw, 33);

      // Exit instructions
      const exitMsg = document.createElement('div');
      exitMsg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);color:#0f0;font-family:monospace;z-index:10000;';
      exitMsg.textContent = 'Press ESC or Q to exit';
      document.body.appendChild(exitMsg);

      function cleanup(e) {
        if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') {
          clearInterval(interval);
          canvas.remove();
          exitMsg.remove();
          document.removeEventListener('keydown', cleanup);
          term.focus();
        }
      }
      document.addEventListener('keydown', cleanup);

      return '[[;#3fb950;]Entering the Matrix...]';
    }
  };

  // Path utilities
  function normalizePath(path) {
    if (path.startsWith('/')) {
      return path;
    }

    // Handle relative paths
    let parts = cwd === '/' ? [] : cwd.split('/').filter(Boolean);

    for (const segment of path.split('/')) {
      if (segment === '..') {
        parts.pop();
      } else if (segment && segment !== '.') {
        parts.push(segment);
      }
    }

    return '/' + parts.join('/');
  }

  function resolvePath(path) {
    const normalized = normalizePath(path || '');
    const parts = normalized.split('/').filter(Boolean);

    if (parts.length === 0) {
      return fs;
    }

    let current = fs;
    for (const part of parts) {
      if (!current) return null;

      // Handle both direct entries and children
      if (current.children) {
        current = current.children[part];
      } else {
        current = current[part];
      }
    }

    return current;
  }

  // Formatting utilities
  function truncate(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len - 3) + '...';
  }

  function formatFile(name, file) {
    let output = `[[b;#ffffff;]${file.title || name}]`;
    if (file.date) output += `  [[;#d29922;]${file.date}]`;
    if (file.description) output += `\n[[;#6e7681;]${file.description}]`;
    return output;
  }

  function formatPostHeader(post) {
    let header = '[[;#6e7681;]' + '='.repeat(72) + ']\n';
    header += `[[b;#ffffff;]${post.title || 'Untitled'}]\n`;
    header += '[[;#6e7681;]' + '='.repeat(72) + ']\n';

    if (post.date) header += `[[;#d29922;]Date: ${post.date}]\n`;
    if (post.tags && post.tags.length) {
      header += `[[;#a371f7;]Tags: ${post.tags.join(', ')}]\n`;
    }
    if (post.description) {
      header += `[[;#6e7681;]${post.description}]\n`;
    }
    header += '[[;#6e7681;]' + '-'.repeat(72) + ']';

    return header;
  }

  function formatPost(post) {
    let output = formatPostHeader(post);
    output += '\n\n';

    // Clean up markdown for terminal display
    let content = post.content || '';

    // Remove images
    content = content.replace(/!\[.*?\]\(.*?\)/g, '[[;#6e7681;][image]]');

    // Convert links to readable format
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ([[;#58a6ff;]$2])');

    // Convert headers
    content = content.replace(/^#{1,6}\s+(.+)$/gm, '\n[[b;#ffffff;]$1]\n');

    // Convert bold
    content = content.replace(/\*\*([^*]+)\*\*/g, '[[b;#ffffff;]$1]');

    // Convert italic
    content = content.replace(/\*([^*]+)\*/g, '[[i;#c9d1d9;]$1]');

    // Convert blockquotes
    content = content.replace(/^>\s*(.+)$/gm, '[[;#39c5cf;]│ $1]');

    // Convert code blocks (simple)
    content = content.replace(/```[\s\S]*?```/g, function(match) {
      const code = match.replace(/```\w*\n?/g, '').trim();
      return '\n[[;#6e7681;]' + code.split('\n').map(l => '  ' + l).join('\n') + ']\n';
    });

    // Convert inline code
    content = content.replace(/`([^`]+)`/g, '[[;#f0883e;]$1]');

    // Clean up extra whitespace
    content = content.replace(/\n{3,}/g, '\n\n');

    output += content.trim();
    output += '\n\n[[;#6e7681;]' + '='.repeat(72) + ']';

    return output;
  }

  // Get all completions for current context
  function getCompletions(input) {
    // Check if input looks like a path (contains /)
    const hasSlash = input.includes('/');

    if (hasSlash) {
      // Path completion
      const lastSlash = input.lastIndexOf('/');
      const prefix = input.substring(0, lastSlash + 1);
      const searchTerm = input.substring(lastSlash + 1);
      const dirPath = input.substring(0, lastSlash) || '/';
      const searchDir = resolvePath(dirPath);

      if (!searchDir) return [];

      const entries = searchDir.children || searchDir;
      return Object.keys(entries)
        .filter(name => name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .map(name => {
          const entry = entries[name];
          return prefix + name + (entry.type === 'dir' ? '/' : '');
        });
    }

    // Command + file completion (no slash)
    const cmdNames = Object.keys(commands);
    const dir = resolvePath(cwd);
    const entries = dir ? (dir.children || dir) : {};
    const fileNames = Object.keys(entries).map(name => {
      const entry = entries[name];
      return name + (entry.type === 'dir' ? '/' : '');
    });
    return [...cmdNames, ...fileNames];
  }

  // Initialize terminal
  async function init() {
    // Load filesystem
    try {
      const response = await fetch('/terminal-fs.json');
      fs = await response.json();
    } catch (e) {
      console.error('Failed to load filesystem:', e);
      fs = {
        'error.txt': {
          type: 'file',
          title: 'Error',
          content: 'Failed to load filesystem. Please refresh the page.'
        }
      };
    }

    // Create terminal
    term = $('#terminal').terminal(function(command) {
      if (!command.trim()) return;

      commandHistory.push(command);

      const parts = command.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (commands[cmd]) {
        const result = commands[cmd](args);
        if (result) this.echo(result);
      } else {
        this.echo(`[[;#f85149;]${cmd}: command not found. Type 'help' for available commands.]`);
      }
    }, {
      greetings: getBanner(),
      prompt: function() {
        const path = cwd === '/' ? '~' : '~' + cwd;
        return `[[;#3fb950;]chemaclass]:[[;#58a6ff;]${path}]$ `;
      },
      completion: function(string, callback) {
        callback(getCompletions(string));
      },
      checkArity: false,
      processArguments: false,
      historySize: 100,
      mobileDelete: true,
      wrap: true
    });
  }

  // Keyboard shortcuts
  $(document).on('keydown', function(e) {
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux) to clear
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (term) {
        term.clear();
      }
    }
  });

  // Start when DOM is ready
  $(document).ready(init);
})();
