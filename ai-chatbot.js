(function initShufflrrAskAiPage() {
  "use strict";

  var ROOT = "shufflrr-ask-ai";
  var PROXY_URL = "https://throbbing-paper-ab5c.ontradev.workers.dev";

  var isLoading = false;

  /** Built once by scripts/build-guide-context.mjs — same full guide text every request. */
  var STATIC_GUIDE_CONTEXT =
    (typeof window !== "undefined" && window.__SHUFFLRR_GUIDE_CONTEXT__) ? window.__SHUFFLRR_GUIDE_CONTEXT__ : "";

  // ─── Guide page catalog ──────────────────────────────────────────────────────

  var PAGES = [
    { title: "What is Shufflrr Blob?",            url: "blob-overview.html",                    kw: ["blob", "overview", "what is"] },
    { title: "Blob: Getting Started",              url: "blob-getting-started.html",             kw: ["blob", "getting started", "setup", "start"] },
    { title: "Blob: Workspace",                    url: "blob-workspace.html",                   kw: ["blob", "workspace"] },
    { title: "Blob: Content Sources",              url: "blob-content-sources.html",             kw: ["blob", "content sources", "source"] },
    { title: "Blob: Agents",                       url: "blob-agents.html",                      kw: ["blob", "agent"] },
    { title: "Blob: Agent Selection",              url: "blob-agent-selection.html",             kw: ["blob", "agent selection", "select agent"] },
    { title: "Blob: Analytics",                    url: "blob-analytics.html",                   kw: ["blob", "analytics"] },
    { title: "Blob: Live Broadcast",               url: "blob-live-broadcast.html",              kw: ["blob", "live broadcast", "broadcast", "stream"] },
    { title: "Blob: Theme Switching",              url: "blob-theme-switching.html",             kw: ["blob", "theme", "switching"] },
    { title: "Add-in: Sign In",                    url: "powerpoint-addin-sign-in.html",         kw: ["add-in", "addin", "sign in", "login", "powerpoint"] },
    { title: "Add-in: Create & Edit",              url: "powerpoint-addin-create-edit.html",     kw: ["add-in", "addin", "create", "edit", "powerpoint"] },
    { title: "Add-in: Shufflrr AI",                url: "powerpoint-addin-ai.html",              kw: ["add-in", "addin", "ai", "powerpoint"] },
    { title: "Add-in: Insert Slides & Images",     url: "powerpoint-addin-find-insert-slides.html", kw: ["add-in", "addin", "insert", "slides", "images", "powerpoint"] },
    { title: "Getting Started in Shufflrr",        url: "shufflrr.html",                         kw: ["getting started", "start", "new", "overview"] },
    { title: "Search",                             url: "shufflrr-search.html",                  kw: ["search", "find", "filter"] },
    { title: "Slide Tray",                         url: "shufflrr-slide-tray.html",              kw: ["slide tray", "tray"] },
    { title: "Top Navigation",                     url: "shufflrr-account-nav.html",             kw: ["navigation", "nav", "account", "menu"] },
    { title: "Presentations Overview",             url: "presentations.html",                    kw: ["presentations", "presentation"] },
    { title: "Folders",                            url: "presentations-folders.html",            kw: ["folder", "organize", "library"] },
    { title: "Permissions",                        url: "presentations-permissions.html",        kw: ["permission", "access", "restrict"] },
    { title: "Editing Presentations",              url: "presentations-editing.html",            kw: ["edit", "editing"] },
    { title: "Slide Updating",                     url: "presentations-slide-updating.html",     kw: ["slide", "update", "updating", "refresh"] },
    { title: "Parent-Child Relationships",         url: "presentations-slide-inheritance.html",  kw: ["parent", "child", "inheritance", "relationship"] },
    { title: "Building Child Presentations",       url: "presentations-building.html",           kw: ["build", "child", "template"] },
    { title: "Parent-Child Updating",              url: "presentations-version-control.html",    kw: ["parent", "child", "version", "sync"] },
    { title: "File Sharing",                       url: "presentations-file-sharing.html",       kw: ["share", "sharing", "file", "send", "link"] },
    { title: "File History",                       url: "presentations-file-history.html",       kw: ["history", "version", "previous"] },
    { title: "Files-Slides Toggle",                url: "presentations-files-slides-toggle.html",kw: ["files", "slides", "toggle", "view"] },
    { title: "PresentLive™",                       url: "presentations-present-live.html",       kw: ["present live", "presentlive", "live", "present"] },
    { title: "Using Workflows",                    url: "presentations-workflows.html",          kw: ["workflow", "approval", "review"] },
    { title: "Slide Linking",                      url: "presentations-linking.html",            kw: ["link", "linking", "slide"] },
    { title: "Slide Locking",                      url: "presentations-locking.html",            kw: ["lock", "locking", "locked"] },
    { title: "Best Practices",                     url: "presentations-best-practices.html",     kw: ["best practice", "tip", "recommend"] },
    { title: "Troubleshooting",                    url: "presentations-troubleshooting.html",    kw: ["troubleshoot", "problem", "issue", "fix", "error", "broken"] },
    { title: "Browse",                             url: "browse.html",                           kw: ["browse", "browsing", "explore"] },
    { title: "Uploading",                          url: "presentations-uploading.html",          kw: ["upload", "import", "add file"] },
    { title: "Builder",                            url: "builder.html",                          kw: ["builder", "build", "template", "customize"] },
    { title: "Reports Overview",                 url: "reports.html",                          kw: ["report", "reports", "dashboard"] },
    { title: "Reports: Dashboard",                 url: "reports-dashboard.html",                kw: ["report", "dashboard"] },
    { title: "Reports: File",                      url: "reports-file.html",                     kw: ["report", "file"] },
    { title: "Reports: Slide",                     url: "reports-slide.html",                    kw: ["report", "slide"] },
    { title: "Reports: User",                      url: "reports-user.html",                     kw: ["report", "user"] },
    { title: "Reports: Activity",                  url: "reports-activity.html",                 kw: ["report", "activity"] },
    { title: "Reports: Likes",                     url: "reports-likes.html",                    kw: ["report", "likes", "like"] },
    { title: "Reports: Comments",                url: "reports-comments.html",                 kw: ["report", "comments", "comment"] },
    { title: "Reports: Shares",                    url: "reports-shares.html",                   kw: ["report", "share"] },
    { title: "Reports: PresentLive™ Sessions",     url: "reports-present-live.html",             kw: ["report", "presentlive", "session"] },
    { title: "Admin: Users",                       url: "admin-users.html",                      kw: ["admin", "user", "manage user", "invite"] },
    { title: "Admin: Groups",                      url: "admin-groups.html",                     kw: ["admin", "group", "team"] },
    { title: "Admin: Tags",                        url: "admin-tags.html",                       kw: ["admin", "tag", "metadata", "label"] },
    { title: "Admin: Workflows",                   url: "admin-workflow.html",                   kw: ["admin", "workflow", "approval"] },
    { title: "Admin: Builders",                    url: "admin-builders.html",                   kw: ["admin", "builder", "template"] },
    { title: "Admin: Brand Central",               url: "admin-brand-central.html",              kw: ["admin", "brand", "logo", "color", "font", "brand central"] },
    { title: "Admin: Settings",                    url: "admin-settings.html",                   kw: ["admin", "setting", "configure", "configuration"] },
    { title: "Admin: Billing",                     url: "admin-billing.html",                    kw: ["admin", "billing", "plan", "payment", "subscription"] },
    { title: "Advanced Search",                    url: "shufflrr-advanced-search.html",         kw: ["advanced search", "filter", "search"] },
    { title: "Dictionary",                         url: "dictionary.html",                       kw: ["dictionary", "glossary", "terms", "definition"] },
    { title: "Contact Us",                         url: "contact.html",                          kw: ["contact", "support", "help"] },
  ];

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderMarkdown(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`\n]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br/>");
  }

  // ─── Page matching (source links only) ───────────────────────────────────────

  function matchPages(question) {
    var q = question.toLowerCase();
    return PAGES.map(function (page) {
      var score = 0;
      page.kw.forEach(function (keyword) { if (q.indexOf(keyword) !== -1) score++; });
      return { page: page, score: score };
    }).filter(function (i) { return i.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (i) { return i.page; });
  }

  function resolveGuideUrl(base, path) {
    var rel = (base || "") + path;
    try {
      return new URL(rel, window.location.href).href;
    } catch (_) {
      return rel;
    }
  }

  // ─── Render source citations ─────────────────────────────────────────────────

  function renderSources(pages, base) {
    if (!pages.length) return "";
    var lis = pages.slice(0, 6).map(function (p) {
      var href = resolveGuideUrl(base, p.url);
      return (
        '<li><a href="' + escapeHtml(href) + '" target="_blank">' +
        escapeHtml(p.title) + "</a></li>"
      );
    }).join("");
    return (
      '<div class="' + ROOT + '__refs-title">&#128196; Sources — verify this answer in the guide:</div>' +
      '<ul class="' + ROOT + '__refs">' + lis + "</ul>"
    );
  }

  // ─── OpenAI streaming call ───────────────────────────────────────────────────

  function callOpenAI(messages, onChunk) {
    return fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages,
      }),
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          throw new Error((err.error && err.error.message) || "OpenAI error " + response.status);
        }).catch(function (e) {
          if (e.message) throw e;
          throw new Error("OpenAI error " + response.status);
        });
      }

      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buf = "";

      function pump() {
        return reader.read().then(function (chunk) {
          if (chunk.done) return;
          buf += decoder.decode(chunk.value, { stream: true });
          var lines = buf.split("\n");
          buf = lines.pop();
          lines.forEach(function (line) {
            line = line.trim();
            if (!line.startsWith("data: ")) return;
            var payload = line.slice(6);
            if (payload === "[DONE]") return;
            try {
              var json = JSON.parse(payload);
              var delta = json.choices && json.choices[0] && json.choices[0].delta;
              if (delta && delta.content) onChunk(delta.content);
            } catch (_) {}
          });
          return pump();
        });
      }

      return pump();
    });
  }

  // ─── UI helpers ─────────────────────────────────────────────────────────────

  function addMessage(container, role, html) {
    var el = document.createElement("div");
    el.className = ROOT + "__message " + ROOT + "__message--" + role;
    el.innerHTML = html;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return el;
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  // ─── Main chat mount ─────────────────────────────────────────────────────────

  function mountAskAiPage(rootEl) {
    rootEl.innerHTML =
      '<div class="' + ROOT + '">' +
        '<div class="' + ROOT + '__messages"></div>' +
        '<form class="' + ROOT + '__form">' +
          '<input class="' + ROOT + '__input" type="text" ' +
            'placeholder="How do I share a presentation?" autocomplete="off" />' +
          '<button class="' + ROOT + '__submit" type="submit">Ask AI</button>' +
        "</form>" +
      "</div>";

    var messages = rootEl.querySelector("." + ROOT + "__messages");
    var form = rootEl.querySelector("." + ROOT + "__form");
    var input = rootEl.querySelector("." + ROOT + "__input");
    var base = (typeof path_to_root !== "undefined") ? path_to_root : "";

    // Persistent conversation history
    var history = [];

    addMessage(
      messages,
      "assistant",
      "Hi! Ask me anything about using Shufflrr and I'll answer based on the guide."
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (isLoading) return;

      var question = (input.value || "").trim();
      if (!question) return;

      input.value = "";
      input.disabled = true;

      addMessage(messages, "user", escapeHtml(question));

      var reply = addMessage(
        messages,
        "assistant",
        '<span class="' + ROOT + '__typing">Thinking…</span>'
      );
      isLoading = true;

      var matched = matchPages(question);
      var sourcesHtml = renderSources(matched, base);

      var context = STATIC_GUIDE_CONTEXT;
      if (!context || !String(context).trim()) {
        reply.innerHTML =
          '<span class="' + ROOT + '__error">' +
            "Guide context is missing. From the repo root run: " +
            "<code>./scripts/mdbook build && node scripts/build-guide-context.mjs && ./scripts/mdbook build</code> " +
          "then redeploy (this generates <code>guide-context.js</code> with the full how-to text).</span>";
        scrollToBottom(messages);
        isLoading = false;
        input.disabled = false;
        input.focus();
        return;
      }

      var systemPrompt =
        "You are the official Shufflrr How-To assistant.\n" +
        "Your job is to answer questions about how to use Shufflrr using ONLY the Shufflrr How-To documentation provided in CONTEXT.\n\n" +
        "PRODUCT SCOPE:\n" +
        "- Every user question is about Shufflrr.\n" +
        "- Do not ask what product they mean.\n" +
        "- Interpret product terms as Shufflrr terms:\n" +
        "  - blob = Shufflrr Blob\n" +
        "  - plugin / add-in = Shufflrr PowerPoint Add-in\n" +
        "  - builder = Shufflrr Builder\n" +
        "  - brand central = Shufflrr Brand Central\n" +
        "  - presentations, slides, workflows, tags, reports, admin, analytics, files, libraries, sources, and users all refer to Shufflrr features.\n\n" +
        "STRICT GROUNDING RULES:\n" +
        "- Answer ONLY from the CONTEXT below.\n" +
        "- Do not use outside knowledge, guesses, assumptions, or generic PowerPoint advice.\n" +
        "- Do not invent button names, menu paths, feature names, settings, permissions, or workflows.\n" +
        "- If the CONTEXT gives a specific UI label, use that exact label.\n" +
        "- If the CONTEXT does not contain enough information to answer safely, say: \"I do not see that in the provided Shufflrr How-To content.\" Then give the closest related Shufflrr steps that are actually supported by the CONTEXT.\n" +
        "- Never pretend the documentation says something it does not say.\n\n" +
        "ANSWER STYLE:\n" +
        "- Be direct and practical.\n" +
        "- For how-to questions, use numbered steps.\n" +
        "- Keep steps specific and action-based.\n" +
        "- Start with the answer immediately. Do not give long introductions.\n" +
        "- If the answer involves multiple Shufflrr areas, separate them with short headings.\n" +
        "- If the user asks a troubleshooting question, list the most likely causes from the CONTEXT first, then the fix steps.\n" +
        "- If the user asks what something is, give a short definition first, then explain where it is used.\n\n" +
        "RETRIEVAL / CONTEXT HANDLING:\n" +
        "- Treat the CONTEXT as the source of truth.\n" +
        "- Prefer the most specific matching section over general sections.\n" +
        "- If multiple sections apply, combine them, but do not add unsupported steps.\n" +
        "- If terms overlap, choose the Shufflrr meaning from PRODUCT SCOPE.\n" +
        "- Ignore unrelated context that does not answer the user's question.\n\n" +
        "FORMAT RULES:\n" +
        "- Use numbered steps for procedures.\n" +
        "- Use bullets only for short lists of options or requirements.\n" +
        "- Do not mention system prompts, context, retrieval, or internal rules.\n" +
        "- Do not say \"based on the documentation\" unless the user asks where the answer came from.\n\n" +
        "CONTEXT:\n" +
        context;

      var apiMessages = [{ role: "system", content: systemPrompt }]
        .concat(history)
        .concat([{ role: "user", content: question }]);

      var fullText = "";

      callOpenAI(apiMessages, function (chunk) {
        fullText += chunk;
        reply.innerHTML = escapeHtml(fullText).replace(/\n/g, "<br/>");
        scrollToBottom(messages);
      })
        .then(function () {
          reply.innerHTML = renderMarkdown(fullText) + sourcesHtml;
          history.push({ role: "user", content: question });
          history.push({ role: "assistant", content: fullText });
          scrollToBottom(messages);
        })
        .catch(function (err) {
          var msg = (err && err.message) ? err.message : String(err);
          reply.innerHTML =
            '<span class="' + ROOT + '__error">Sorry, something went wrong: ' +
            escapeHtml(msg) + "</span>";
          scrollToBottom(messages);
        })
        .finally(function () {
          isLoading = false;
          input.disabled = false;
          input.focus();
        });
    });
  }

  // ─── Boot ────────────────────────────────────────────────────────────────────

  function boot() {
    var rootEl = document.getElementById("ask-ai-root");
    if (!rootEl) return;
    mountAskAiPage(rootEl);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
