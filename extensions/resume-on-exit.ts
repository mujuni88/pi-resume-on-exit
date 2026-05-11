import { styleText } from "node:util";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export function shellQuote(value: string): string {
	return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function buildResumeCommand(
	sessionId: string | undefined,
	sessionFile: string | undefined,
): string | undefined {
	if (sessionId && sessionId.trim()) {
		return `pi --session ${sessionId}`;
	}
	if (sessionFile && sessionFile.trim()) {
		return `pi --session ${shellQuote(sessionFile)}`;
	}
	return undefined;
}

export default function (pi: ExtensionAPI): void {
	pi.on("session_shutdown", async (event, ctx) => {
		if (event.reason !== "quit") return;

		try {
			const command = buildResumeCommand(
				ctx.sessionManager.getSessionId(),
				ctx.sessionManager.getSessionFile(),
			);
			if (!command) return;

			process.stdout.write(
				`\n${styleText("dim", `Resume this Pi session:\n${command}`)}\n\n`,
			);
		} catch {
			// Do not interfere with Pi shutdown.
		}
	});
}
