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

  // ASCII art banner
  const BANNER = `
[[b;#3fb950;]   _____ _                               _               ]
[[b;#3fb950;]  / ____| |                             | |              ]
[[b;#3fb950;] | |    | |__   ___ _ __ ___   __ _  ___| | __ _ ___ ___ ]
[[b;#3fb950;] | |    | '_ \\ / _ \\ '_ \` _ \\ / _\` |/ __| |/ _\` / __/ __|]
[[b;#3fb950;] | |____| | | |  __/ | | | | | (_| | (__| | (_| \\__ \\__ \\]
[[b;#3fb950;]  \\_____|_| |_|\\___|_| |_| |_|\\__,_|\\___|_|\\__,_|___/___/]

[[;#6e7681;]Welcome to the terminal interface of chemaclass.com]
[[;#6e7681;]Type 'help' for available commands or 'ls' to explore.]
`;

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

  [[b;#3fb950;]Info:]
    whoami         About this site
    thanks         Support my work
    history        Show command history
    clear          Clear the screen
    help           Show this help

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

    whoami: function() {
      const aboutFile = fs['about.txt'];
      if (aboutFile) {
        return aboutFile.content;
      }
      return `Jose Maria Valera Reales (Chemaclass)
Software Developer | Tech Lead | Speaker
https://chemaclass.com`;
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
      greetings: BANNER,
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
