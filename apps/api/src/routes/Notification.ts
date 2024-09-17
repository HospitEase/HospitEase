import twilio from "twilio";

const sendNotification = async (to: string, message: string, env: any) => {
  const accountSid = env.TWILIO_ACCOUNT_SID;
  const authToken = env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = env.TWILIO_PHONE_NUMBER;

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
    To: to,
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
