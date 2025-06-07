export function buildEmployeeFormData(formDataObj: any): FormData {
  const data = new FormData();

  for (const [key, value] of Object.entries(formDataObj)) {
    if (value === null || value === undefined || value === "") continue;

    if (key === "Achievements" && Array.isArray(value)) {
      value.forEach((file: File, index: number) => {
        if (file && file.size > 0) {
          data.append(`Achievements[${index}][file]`, file);
        }
      });
      continue;
    }

    if (value instanceof Date) {
      data.append(key, value.toISOString().split("T")[0]);
    } else if (value instanceof File) {
      if (value.size > 0) {
        data.append(key, value);
      }
    } else if (typeof value === "number" || typeof value === "boolean") {
      data.append(key, String(value));
    } else {
      data.append(key, String(value));
    }
  }

  return data;
}
