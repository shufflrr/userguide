// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Shufflrr Blob</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="blob-overview.html"><strong aria-hidden="true">1.1.</strong> What is Shufflrr Blob?</a></li><li class="chapter-item expanded "><a href="blob-getting-started.html"><strong aria-hidden="true">1.2.</strong> Getting Started</a></li><li class="chapter-item expanded "><a href="blob-workspace.html"><strong aria-hidden="true">1.3.</strong> Workspace</a></li><li class="chapter-item expanded "><a href="blob-content-sources.html"><strong aria-hidden="true">1.4.</strong> Content Sources</a></li><li class="chapter-item expanded "><a href="blob-agents.html"><strong aria-hidden="true">1.5.</strong> Agents</a></li><li class="chapter-item expanded "><a href="blob-agent-selection.html"><strong aria-hidden="true">1.6.</strong> Agent Selection</a></li><li class="chapter-item expanded "><a href="blob-analytics.html"><strong aria-hidden="true">1.7.</strong> Analytics</a></li><li class="chapter-item expanded "><a href="blob-live-broadcast.html"><strong aria-hidden="true">1.8.</strong> Live Broadcast</a></li><li class="chapter-item expanded "><a href="blob-theme-switching.html"><strong aria-hidden="true">1.9.</strong> Theme Switching</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Shufflrr Add-in</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="powerpoint-addin-sign-in.html"><strong aria-hidden="true">2.1.</strong> Sign in to the Shufflrr Add-in</a></li><li class="chapter-item expanded "><a href="powerpoint-addin-create-edit.html"><strong aria-hidden="true">2.2.</strong> Create and edit presentations</a></li><li class="chapter-item expanded "><a href="powerpoint-addin-ai.html"><strong aria-hidden="true">2.3.</strong> Shufflrr AI</a></li><li class="chapter-item expanded "><a href="powerpoint-addin-find-insert-slides.html"><strong aria-hidden="true">2.4.</strong> Insert slides and images</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Shufflrr Cloud</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="shufflrr.html"><strong aria-hidden="true">3.1.</strong> Getting Started in Shufflrr</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> General</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="shufflrr-search.html"><strong aria-hidden="true">3.2.1.</strong> Search</a></li><li class="chapter-item expanded "><a href="shufflrr-slide-tray.html"><strong aria-hidden="true">3.2.2.</strong> Slide Tray</a></li><li class="chapter-item expanded "><a href="shufflrr-account-nav.html"><strong aria-hidden="true">3.2.3.</strong> Top Navigation</a></li></ol></li><li class="chapter-item expanded "><a href="presentations.html"><strong aria-hidden="true">3.3.</strong> Presentations</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="presentations-folders.html"><strong aria-hidden="true">3.3.1.</strong> Folders</a></li><li class="chapter-item expanded "><a href="presentations-permissions.html"><strong aria-hidden="true">3.3.2.</strong> Permissions</a></li><li class="chapter-item expanded "><a href="presentations-editing.html"><strong aria-hidden="true">3.3.3.</strong> Editing</a></li><li class="chapter-item expanded "><a href="presentations-slide-updating.html"><strong aria-hidden="true">3.3.4.</strong> Slide Updating</a></li><li class="chapter-item expanded "><a href="presentations-slide-inheritance.html"><strong aria-hidden="true">3.3.5.</strong> Parent-Child Relationships</a></li><li class="chapter-item expanded "><a href="presentations-building.html"><strong aria-hidden="true">3.3.6.</strong> Building Child Presentations</a></li><li class="chapter-item expanded "><a href="presentations-version-control.html"><strong aria-hidden="true">3.3.7.</strong> Parent-Child Updating</a></li><li class="chapter-item expanded "><a href="presentations-file-sharing.html"><strong aria-hidden="true">3.3.8.</strong> File Sharing</a></li><li class="chapter-item expanded "><a href="presentations-file-history.html"><strong aria-hidden="true">3.3.9.</strong> File History</a></li><li class="chapter-item expanded "><a href="presentations-files-slides-toggle.html"><strong aria-hidden="true">3.3.10.</strong> Files-Slides Toggle</a></li><li class="chapter-item expanded "><a href="presentations-present-live.html"><strong aria-hidden="true">3.3.11.</strong> PresentLive™</a></li><li class="chapter-item expanded "><a href="presentations-workflows.html"><strong aria-hidden="true">3.3.12.</strong> Using Workflows</a></li><li class="chapter-item expanded "><a href="presentations-linking.html"><strong aria-hidden="true">3.3.13.</strong> Slide Linking</a></li><li class="chapter-item expanded "><a href="presentations-locking.html"><strong aria-hidden="true">3.3.14.</strong> Slide Locking</a></li><li class="chapter-item expanded "><a href="presentations-best-practices.html"><strong aria-hidden="true">3.3.15.</strong> Best Practices</a></li><li class="chapter-item expanded "><a href="presentations-troubleshooting.html"><strong aria-hidden="true">3.3.16.</strong> Troubleshooting</a></li></ol></li><li class="chapter-item expanded "><a href="browse.html"><strong aria-hidden="true">3.4.</strong> Browse</a></li><li class="chapter-item expanded "><a href="presentations-uploading.html"><strong aria-hidden="true">3.5.</strong> Upload</a></li><li class="chapter-item expanded "><a href="builder.html"><strong aria-hidden="true">3.6.</strong> Builder</a></li><li class="chapter-item expanded "><a href="reports.html"><strong aria-hidden="true">3.7.</strong> Reports</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="reports-dashboard.html"><strong aria-hidden="true">3.7.1.</strong> Dashboard</a></li><li class="chapter-item expanded "><a href="reports-file.html"><strong aria-hidden="true">3.7.2.</strong> File</a></li><li class="chapter-item expanded "><a href="reports-slide.html"><strong aria-hidden="true">3.7.3.</strong> Slide</a></li><li class="chapter-item expanded "><a href="reports-user.html"><strong aria-hidden="true">3.7.4.</strong> User</a></li><li class="chapter-item expanded "><a href="reports-activity.html"><strong aria-hidden="true">3.7.5.</strong> Activity</a></li><li class="chapter-item expanded "><a href="reports-likes.html"><strong aria-hidden="true">3.7.6.</strong> Likes</a></li><li class="chapter-item expanded "><a href="reports-comments.html"><strong aria-hidden="true">3.7.7.</strong> Comments</a></li><li class="chapter-item expanded "><a href="reports-shares.html"><strong aria-hidden="true">3.7.8.</strong> Shares</a></li><li class="chapter-item expanded "><a href="reports-present-live.html"><strong aria-hidden="true">3.7.9.</strong> PresentLive™ Sessions</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.8.</strong> Admin</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="admin-users.html"><strong aria-hidden="true">3.8.1.</strong> Users</a></li><li class="chapter-item expanded "><a href="admin-groups.html"><strong aria-hidden="true">3.8.2.</strong> Groups</a></li><li class="chapter-item expanded "><a href="admin-tags.html"><strong aria-hidden="true">3.8.3.</strong> Tags</a></li><li class="chapter-item expanded "><a href="admin-workflow.html"><strong aria-hidden="true">3.8.4.</strong> Workflows</a></li><li class="chapter-item expanded "><a href="admin-builders.html"><strong aria-hidden="true">3.8.5.</strong> Builders</a></li><li class="chapter-item expanded "><a href="admin-brand-central.html"><strong aria-hidden="true">3.8.6.</strong> Brand Central</a></li><li class="chapter-item expanded "><a href="admin-settings.html"><strong aria-hidden="true">3.8.7.</strong> Settings</a></li><li class="chapter-item expanded "><a href="admin-billing.html"><strong aria-hidden="true">3.8.8.</strong> Billing</a></li></ol></li><li class="chapter-item expanded "><a href="test-section.html"><strong aria-hidden="true">3.9.</strong> Test Section</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="test-sub-page.html"><strong aria-hidden="true">3.9.1.</strong> Test Sub-page</a></li></ol></li><li class="chapter-item expanded "><a href="dictionary.html"><strong aria-hidden="true">3.10.</strong> Dictionary</a></li><li class="chapter-item expanded "><a href="contact.html"><strong aria-hidden="true">3.11.</strong> Contact Us</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
