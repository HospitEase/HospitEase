import twilio from "twilio";

const sendNotification = async (to: string, message: string) => {
  const accountSid = "ACc4201677df835c9781d9817aab20ad1a";
  const authToken = "32b5acb774792ade2d4ebc9a547d30f5";
  const twilioPhoneNumber = "+14243757732";
  const mynumber = "+917543933647";

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error("Twilio environment variables are not set.");
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const headers = new Headers({
    Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  const body = new URLSearchParams({
    From: twilioPhoneNumber,
    To: mynumber,
    Body: message,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result: any = await response.json();
    console.log("Message sent:", result.sid);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

export default sendNotification;
