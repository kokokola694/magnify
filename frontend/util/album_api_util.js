export const fetchAlbums = (ids) => {
  return $.ajax({
    method: "GET",
    url: "/api/albums",
    data: {ids}
  })
}

export const searchAlbums = (input) => {
  return $.ajax({
    method: "GET",
    url: "api/albums",
    data: {input}
  })
}

export const fetchAlbum = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/albums/${id}`
  })
}
