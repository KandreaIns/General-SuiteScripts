/** Kandrea OppToProj Convert
User Event Script called on AfterSubmit event of Create-Opportunity record

This script should send an email to a shared mailbox for processing via Microsoft Flow.
**/

//var NSContext = "sandbox"; //sandbox value
//if(nlapiGetContext().getEnvironment() == 'PRODUCTION') {NSContext = "na1";} //production value

//Get Email Variables for Error Notification
var EmailAuthor = 11; //Need User Id - hardcoded to Matt Rudy
//var EmailRecipient = 11; //First send address - hardcoded to Matt Rudy
var EmailRecipient = 'estimating@kandrea.ca';
var EmailSubject = 'ERR IN NSPROJ - Subject Not Populated';
var EmailBody = 'This is an automated email from NetSuite sent when a new Project record is created.\n'
				+'The subject line contains the Project information in the following format:\n\n'
				+'NSNEWOPP-[Project.Number]-[Project.ProjectName]';

function NewProjectAlert() {
	//var ProjectNameCharLimit = 60;
	//Get Record Details
	var ProjID = nlapiGetRecordId();
	var ProjNum = String(nlapiLookupField('job',ProjID,'entitynumber'));
	var tempName = String(nlapiLookupField('job',ProjID,'custentity_projectshortname')).substring(0,30); //Field is limited to 30 characters by NetSuite
	var ProjectName = tempName.replace(/\//g, "-");
	
	//Update Email Body and Send Email
	EmailSubject = 'NSNEWPROJ-'+ProjID+'-'+ProjectName;
	nlapiSendEmail(EmailAuthor,EmailRecipient,EmailSubject,EmailBody);
}