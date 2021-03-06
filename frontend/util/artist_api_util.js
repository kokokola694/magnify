export const fetchArtists = (ids) => {
  return $.ajax({
    method: "GET",
    url: "/api/artists",
    data: {ids}
  })
}

export const fetchArtist = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/artists/${id}`
  })
}
