export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};


export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules)
    return true;

  if (rules.required && rules.required !== undefined) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.emailRegExp) {
    let re = /\S+@\S+\.\S+/;
    isValid = re.test(String(value).toLowerCase()) && isValid;
  }

  return isValid;
}
