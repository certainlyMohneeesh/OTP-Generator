export const isValidPhone = (phone: string): boolean => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };
  
  export const isValidOTP = (otp: string): boolean => {
    const re = /^\d{6}$/;
    return re.test(otp);
  };
  