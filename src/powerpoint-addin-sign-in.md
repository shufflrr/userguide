# Sign in to the Shufflrr Add-in

The Shufflrr Add-in gives you direct access to your company's Shufflrr presentation library inside PowerPoint. You can search, drag, and insert branded slides, edit presentations, and upload updates — all without leaving PowerPoint.

This add-in works with **Office 365 PowerPoint** (web). You sign in once to see your Shufflrr Library and My Presentations folders in the task pane.

## Steps

1. In PowerPoint, open the **Shufflrr Add-in** panel (e.g., from the Home ribbon or Add-ins).
2. Click **Sign in with Microsoft**.
3. Authenticate through **OneDrive** first.
4. Then connect to **Shufflrr** with your username and password (or SSO, if your organization has it enabled).
5. Once signed in, you'll see your **Shufflrr Library** and **My Presentations** folders in the task pane.

## Troubleshooting sign-in

| Issue | Cause | Fix |
|-------|--------|-----|
| "Not Connected" error | Missing callback URL in Azure | Add the correct Redirect URI under Web + SPA in your app registration. |
| Login fails | Wrong client secret value | Update with the actual secret in the Shufflrr admin portal. |
| Add-in doesn't load | Using desktop PowerPoint | Use the **Office 365 web version** of PowerPoint; the add-in is built for that. |

> **Tip:** Allow browser pop-ups from Shufflrr so sign-in and authentication windows can open.
