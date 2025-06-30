const axios = require('axios');

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post(process.env.TEXT_LK_API_URL, {
      user_id: process.env.TEXT_LK_USER_ID,
      api_key: process.env.TEXT_LK_API_KEY,
      sender_id: process.env.TEXT_LK_SENDER_ID,
      to: phoneNumber,
      message: message,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};

const formatTaskSMS = (task, site, date, time) => {
  return `Kamal Iron Works Task:
${task}
Site: ${site}
Date: ${date}
Time: ${time}`;
};

module.exports = { sendSMS, formatTaskSMS };
