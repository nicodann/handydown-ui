export default function validateField(field: string, value: string): string {
  switch(field) {
    case 'username':
      if (value.length < 3) {
        return "Username must be at least 3 characters long";
      }
      if (value.length > 20) {
        return "Username must be less than 20 characters long";
      }
      return '';
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
      return '';
    case 'password':
      if (value.length < 6) {
        return "Password must be at least 6 characters long";
      }
      if (value.length > 100) {
        return "Password must be less than 100 characters long";
      }
      return '';
    case 'location':
      if (value.length < 2) {
        return "Location must be at least 2 characters long";
      }
      if (value.length > 100) {
        return "Location must be less than 100 characters long";
      }
      return '';
    default:
      return '';
  }
};