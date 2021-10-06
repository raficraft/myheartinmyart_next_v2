export const validInput = (input) => {
  console.error("Validation de saisie utilisateur");

  const thisItem = input.current.input;

  const thisInput = {
    item: thisItem,
    name: thisItem.getAttribute("name"),
    format: thisItem.getAttribute("data-format"),
    type: thisItem.getAttribute("type")
      ? thisItem.getAttribute("type")
      : "select",
    value: thisItem.value ? thisItem.value : thisItem.textContent,
    error: null,
  };

  console.log(thisInput.format);

  switch (thisInput.format) {
    case "alphabetical":
      thisInput.error =
        thisInput.value.length < 3 ? "Chaîne de caractère trop courte" : "";

      thisInput.error = !thisInput.value.match(
        /^[a-zA-Z\-_'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]+$/
      )
        ? "Caratère alpabétique seulement"
        : "";

      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "alphanumeric":
      thisInput.error =
        thisInput.value.length < 3 ? "Chaîne de caractère trop courte" : "";

      thisInput.error = !thisInput.value.match(
        /^[\w\-\sàáâãäåçèéêëìíîïðòóôõöùúûüýÿ' ]+$/i
      )
        ? "Caratère alpabétique et numérique seulement"
        : "";

      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "date":
      thisInput.error = thisInput.value.match(
        /^(0?[1-9]|[12][0-9]|3[01])[\\-](0?[1-9]|1[012])[\\-]\d{4}$/
      )
        ? "format invalide"
        : thisInput.error;
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "numeric":
      thisInput.error = thisInput.value.match(/[0-9]+:[0-9]+/)
        ? "format invalide"
        : thisInput.error;
      thisInput.error =
        thisInput.value.length === 0 ? "Champs obligatoire" : thisInput.error;

      break;

    case "select":
      if (thisInput.name === "state") {
        thisInput.error = !states.filter(
          (state) => state.name === thisInput.value
        )
          ? "l'état choisies n'est pas valide"
          : thisInput.error;
      }

      if (thisInput.name === "department") {
        thisInput.error = !departement.includes(thisInput.value)
          ? "le departement choisies n'est pas valide"
          : thisInput.error;
      }

      break;

    default:
      return thisInput.error;
  }

  return thisInput.error;
};
