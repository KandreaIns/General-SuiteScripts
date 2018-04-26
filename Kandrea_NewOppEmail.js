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
var EmailSubject = 'ERR IN NSOPP - Subject Not Populated';
var EmailBody = 'This is an automated email from NetSuite sent when a new Opportunity record is created.\n'
				+'The subject line contains the Opportunity information in the following format:\n\n'
				+'NSNEWOPP-[Opportunity.Number]-[Opportunity.ProjectName]';

function NewOppAlert() {
	//var ProjectNameCharLimit = 60;
	//Get Record Details
	var OppID = nlapiGetRecordId();
	var OppNum = String(nlapiLookupField('opportunity',OppID,'tranid'));
	//var ProjectName = String(nlapiLookupField('opportunity',OppID,'title')).substring(0,ProjectNameCharLimit);
	var tempName = String(nlapiLookupField('opportunity',OppID,'custbody_oppshortname')).substring(0,30); //Field is limited to 30 characters by NetSuite
	var ProjectName = tempName.replace(/\//g, "-");
	
	//Update Email Body and Send Email
	EmailSubject = 'NSNEWOPP-'+OppNum+'-'+ProjectName;
	nlapiSendEmail(EmailAuthor,EmailRecipient,EmailSubject,EmailBody);
}