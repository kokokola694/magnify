
// ids is an array
export const fetchSongs = (ids) => {
  return $.ajax({
    method: "GET",
    url: "/api/songs",
    data: {ids}
  })
}

export const fetchSong = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/songs/${id}`
  })
}
