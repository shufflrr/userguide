# Settings

## Why use settings? 

The settings tab allows the administrator to customize the company's Shufflrr site so that users get a corporate-branded experience with all of Shufflrr's capabilities configured to create exactly the site configuration that is appropriate for your needs. 

## Steps

There are quite a few sections to the settings tab. Click the "Admin" icon and the "Settings" tab to begin exploring. *Be sure to click "Save" at the very bottom of the page to preserve your work in this tab!* 

### Your company in Shufflrr

To set up your Shufflrr site to reflect your company's branding, set up the site with your company's logo and "favicon" (the little icon that appears in the browser tab for the site).

![Your company's branding in Shufflrr](img/admin-sitesettings-logos.png)

### Customize User Experience

The next section allows you to set what users see on logging in ("Home Page") and also, in the "Site Message" section, to customize the text / images that appear at the top of the "Presentations" page (the default homepage). 

> **Pro tip!**
> 
> Many companies use the "Site Message" space to provide information on internal resources to help users with Shufflrr, such as training materials and contact people - as in the example below.  

![Customizing the home page](img/admin-sitesettings-homepage.png)

### Customizing sharing

The next toggle indicates whether new users can request access. 

The following two options relate to sharing. (More info about sharing is [here](presentations-file-sharing.md)). First, indicate whether EXTERNAL shares are allowed. Second, create a default message to be used in Shares. 

>**Pro tip!**
> 
> This message can still be changed by the user. To incorporate a message that cannot be changed, use the ["Email Templates" functionality in the "Brand Central" tab](admin-brand-central.md#email-templates), specifically the ""FileShared" template.

![Presentation settings](img/admin-sitesettings-defaultmessage.png)

### Authentication

The authentication section includes different ways to authenticate. 

* Many companies will use Shufflrr authentication, but, some desire a seamless interface where users who are already logged in to company software can move into Shufflrr without logging in again. 
* Salesforce integration is the easiest: the user need only find their *Salesforce Organization ID*, which can be found in Salesforce → Setup → Company Profile → Company Information. 
* SAML Single Sign-On is the most complex. Documentation can be found here: 
	* [ADFS (Microsoft Active Directory) documentation](https://shufflrr.com/assets/saml-adfs3.html)
	* [Okta documentation](https://shufflrr.com/assets/saml-okta.html)
* Last is OpenId. That documentation is [here](https://shufflrr.com/assets/openid-okta.html). 