// TODO: Función que parsea los errores de validación
// TODO: para que sean más fáciles leer y entender.

// ? Se utilizan en el middleware de validación "applyValidations.js"

export function errorParser(errorObject) {
  const errors = errorObject.errors;

  const groupedErrors = errors.reduce((acc, error) => {
    const location = error.location;
    const field = error.path;

    if (!acc[location]) {
      acc[location] = {};
    }

    if (!acc[location][field]) {
      acc[location][field] = [];
    }

    acc[location][field].push(error.msg);

    return acc;
  }, {});

  return groupedErrors;
}
