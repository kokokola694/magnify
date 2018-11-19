export const createSave = (save) => {
  return $.ajax({
    method: "POST",
    url: "api/saves",
    data: {save}
  })
}

export const deleteSave = (save) => {
  return $.ajax({
    method: "DELETE",
    url: `api/saves/${0}`,
    data: {save}
  })
}
