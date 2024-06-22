export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const objectToFormData = (
  obj,
  form = new FormData(),
  namespace = ""
) => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      let formKey;
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        // Handle arrays
        if (Array.isArray(obj[property])) {
          obj[property].forEach((item, index) => {
            if (typeof item === "object" && !(item instanceof File)) {
              objectToFormData(item, form, `${formKey}[${index}]`);
            } else {
              form.append(`${formKey}[${index}]`, item);
            }
          });
        } else {
          // Recurse into nested objects
          objectToFormData(obj[property], form, formKey);
        }
      } else {
        // Append non-object types directly
        form.append(formKey, obj[property]);
      }
    }
  }

  return form;
};
