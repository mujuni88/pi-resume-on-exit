# pi-resume-on-exit

A Pi package that prints a copyable resume command when an interactive Pi session exits via quit.

## Behavior

- Listens for Pi `session_shutdown` events.
- Prints only for quit shutdowns, including Ctrl+C/Ctrl+D/SIGTERM exits handled by Pi.
- Prefers the active session id when available.
- Falls back to the session file path and shell-quotes it safely.
- Never blocks or throws during shutdown.

Example output:

```text
Resume this Pi session:
  pi --session abc123
```

## Install

```bash
pi install git:github.com/mujuni88/pi-resume-on-exit
```

## Development

```bash
npm install
npm run check
```
