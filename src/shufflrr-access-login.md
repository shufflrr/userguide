# Access and Login Troubleshooting

If you cannot log in or cannot access Shufflrr, first identify which Shufflrr app you are trying to use:

* Shufflrr Cloud
* Shufflrr Add-in for Office 365 PowerPoint
* Shufflrr AI Presentation Blob

## Shufflrr Cloud

1. Confirm that you are using the correct site URL. It is usually `https://yourcompanyname.shufflrr.com`.
2. Ask your Shufflrr site administrator whether you are a user on the site.
3. If needed, ask the administrator to give you access or add you to the correct groups.

## Shufflrr Add-in

Most companies require permission from IT to use the Add-in.

1. Open the Shufflrr Add-in in Office 365 PowerPoint.
2. In the Shufflrr pane, open the **Files** tab.
3. Use **Connect** for OneDrive, Shufflrr, or SharePoint as needed.
4. When prompted, complete Microsoft sign-in by choosing your account or using another account.
5. Allow browser pop-ups from Shufflrr and Microsoft so sign-in windows can open.

Troubleshooting:

* **Not Connected** can be caused by a missing callback URL in Azure. Add the correct Redirect URI under Web + SPA in the app registration.
* **Login fails** can be caused by the wrong client secret value. Update the client secret in the Shufflrr admin portal.
* **Add-in does not load** can mean the PowerPoint environment is not supported. Use Office 365 PowerPoint.

## Shufflrr AI Presentation Blob

1. Confirm that you are using the correct Blob URL. It is usually `https://yourblobname.shufflrr.com`, with your organization's blob host name in place of `yourblobname`.
2. Confirm that your organization has given you access.
3. If you can open Blob but do not see the content you expect, check that the correct agents are active and that the right content sources are connected.
