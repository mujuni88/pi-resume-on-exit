import { describe, expect, it } from "vitest";

import { buildResumeCommand, shellQuote } from "../extensions/resume-on-exit.js";

describe("shellQuote", () => {
	it("single-quotes plain values", () => {
		expect(shellQuote("/tmp/pi session.jsonl")).toBe("'/tmp/pi session.jsonl'");
	});

	it("escapes embedded single quotes", () => {
		expect(shellQuote("/tmp/joe's session.jsonl")).toBe("'/tmp/joe'\\''s session.jsonl'");
	});
});

describe("buildResumeCommand", () => {
	it("prefers the session id when available", () => {
		expect(buildResumeCommand("abc123", "/tmp/session.jsonl")).toBe("pi --session abc123");
	});

	it("falls back to a shell-quoted session file", () => {
		expect(buildResumeCommand(undefined, "/tmp/pi session.jsonl")).toBe(
			"pi --session '/tmp/pi session.jsonl'",
		);
	});

	it("returns undefined when no resume target is available", () => {
		expect(buildResumeCommand(undefined, undefined)).toBeUndefined();
		expect(buildResumeCommand("", "")).toBeUndefined();
	});
});
