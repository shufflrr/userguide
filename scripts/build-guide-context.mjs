#!/usr/bin/env node
/**
 * Builds one static guide-context.js for Ask AI (same CONTEXT every request).
 *
 * Run after the book HTML exists (mdBook **0.4.52** only — see README):
 *   ./scripts/mdbook build && node scripts/build-guide-context.mjs && ./scripts/mdbook build
 *
 * (First build generates docs/*.html; script reads those and writes guide-context.js
 *  next to book.toml; second build copies guide-context.js into docs/.)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, "..");
const DOCS = path.join(REPO, "docs");
const OUT = path.join(REPO, "guide-context.js");

/** [title, filename] — keep in sync with ai-chatbot.js PAGES + any extra guide HTML. */
const PAGES = [
  ["What is Shufflrr Blob?", "blob-overview.html"],
  ["Blob: Getting Started", "blob-getting-started.html"],
  ["Blob: Workspace", "blob-workspace.html"],
  ["Blob: Content Sources", "blob-content-sources.html"],
  ["Blob: Agents", "blob-agents.html"],
  ["Blob: Agent Selection", "blob-agent-selection.html"],
  ["Blob: Analytics", "blob-analytics.html"],
  ["Blob: Live Broadcast", "blob-live-broadcast.html"],
  ["Blob: Theme Switching", "blob-theme-switching.html"],
  ["Add-in: Sign In", "powerpoint-addin-sign-in.html"],
  ["Add-in: Create & Edit", "powerpoint-addin-create-edit.html"],
  ["Add-in: Shufflrr AI", "powerpoint-addin-ai.html"],
  ["Add-in: Insert Slides & Images", "powerpoint-addin-find-insert-slides.html"],
  ["Getting Started in Shufflrr", "shufflrr.html"],
  ["Search", "shufflrr-search.html"],
  ["Slide Tray", "shufflrr-slide-tray.html"],
  ["Top Navigation", "shufflrr-account-nav.html"],
  ["Access and Login Troubleshooting", "shufflrr-access-login.html"],
  ["Integrations and APIs", "shufflrr-integrations-api.html"],
  ["Security and Content Control", "shufflrr-security.html"],
  ["Presentations Overview", "presentations.html"],
  ["Folders", "presentations-folders.html"],
  ["Permissions", "presentations-permissions.html"],
  ["Editing Presentations", "presentations-editing.html"],
  ["Slide Updating", "presentations-slide-updating.html"],
  ["Parent-Child Relationships", "presentations-slide-inheritance.html"],
  ["Building Child Presentations", "presentations-building.html"],
  ["Parent-Child Updating", "presentations-version-control.html"],
  ["File Sharing", "presentations-file-sharing.html"],
  ["Downloading Files and Slides", "presentations-downloads.html"],
  ["File History", "presentations-file-history.html"],
  ["Files-Slides Toggle", "presentations-files-slides-toggle.html"],
  ["PresentLive™", "presentations-present-live.html"],
  ["Using Workflows", "presentations-workflows.html"],
  ["Slide Linking", "presentations-linking.html"],
  ["Slide Locking", "presentations-locking.html"],
  ["Best Practices", "presentations-best-practices.html"],
  ["Troubleshooting", "presentations-troubleshooting.html"],
  ["Browse", "browse.html"],
  ["Uploading", "presentations-uploading.html"],
  ["Builder", "builder.html"],
  ["Reports Overview", "reports.html"],
  ["Reports: Dashboard", "reports-dashboard.html"],
  ["Reports: File", "reports-file.html"],
  ["Reports: Slide", "reports-slide.html"],
  ["Reports: User", "reports-user.html"],
  ["Reports: Activity", "reports-activity.html"],
  ["Reports: Likes", "reports-likes.html"],
  ["Reports: Comments", "reports-comments.html"],
  ["Reports: Shares", "reports-shares.html"],
  ["Reports: PresentLive™ Sessions", "reports-present-live.html"],
  ["Admin: Users", "admin-users.html"],
  ["Admin: Groups", "admin-groups.html"],
  ["Admin: Tags", "admin-tags.html"],
  ["Admin: Workflows", "admin-workflow.html"],
  ["Admin: Builders", "admin-builders.html"],
  ["Admin: Brand Central", "admin-brand-central.html"],
  ["Admin: Settings", "admin-settings.html"],
  ["Admin: Billing", "admin-billing.html"],
  ["Advanced Search", "shufflrr-advanced-search.html"],
  ["Dictionary", "dictionary.html"],
  ["Contact Us", "contact.html"],
];

function extractMainText(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let block = m ? m[1] : html;
  block = block
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  return block
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const parts = [];
for (const [title, file] of PAGES) {
  const fp = path.join(DOCS, file);
  if (!fs.existsSync(fp)) {
    console.warn("skip (missing):", file);
    continue;
  }
  const html = fs.readFileSync(fp, "utf8");
  const text = extractMainText(html);
  if (text) parts.push(`### ${title}\n${text}`);
}

const blob = parts.join("\n\n");
if (!blob.length) {
  console.error("No guide text extracted. Run mdbook build first so docs/*.html exists.");
  process.exit(1);
}

const line = "window.__SHUFFLRR_GUIDE_CONTEXT__=" + JSON.stringify(blob) + ";\n";
fs.writeFileSync(OUT, line, "utf8");
console.log("Wrote", OUT, "(" + blob.length + " chars from " + parts.length + " pages)");
