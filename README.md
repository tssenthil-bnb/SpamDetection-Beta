SpamDetection - Enhancement & PR for hacktoberfest
=============

This plugin is in BETA stage , package will be refactored and improved in future releases.<br>
Its a basic Manual Spam detection Plugin that detects presence of Spam contents, based on <br>
some predefined(most can be set by users) rules and norms . This plugin has got plenty of <br>
settings according to various needs of users.

<b>Configuration / Settings<b>

<b> spamWordsInUri :</b>  Spam words in URI that needs to restricted.<br>
<b> bannedWords    :</b>  Vulgar or Profane words that needs to restricted.<br>
<b> alertText      :</b> The warning text. <br>
<b> onlyReturnStatus    :</b> Default (false),If enabled it will disable all other warning display, 
                                 	and will only return (TRUE for spam presence, False for no spams). 
                                 	Useful when want to include this with other validator options.
<b> spamLevel      :</b> The max level on which content can be considered as spam.(recommended 2).<br>

<b> checkOnType      :</b> default(true) on keypress even shows the message if spam.<br>
<b> displayWarning      :</b> default(true), Turn off warning message or not. <br>
<b> maxUrlAllowed      :</b> The number of URLs allowed in content. <br>
<b> formObj      :</b> Can be given 'ID' or 'Class' or 'form' if to check on submit form validation , else leave empty to 						disable . <br>

<b> errorTextContainer      :</b>Error div Id( can be class also). <br>
<b> limitTextContainer      :</b> Limit div Id can be class also). <br>
<b> warningStyle      :</b> Style of warning Text.<br>
<b> limitStyle      :</b>Style of Limit Text..<br>
