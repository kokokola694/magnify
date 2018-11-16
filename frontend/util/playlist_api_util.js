export const fetchPlaylists = (ids) => {
  return $.ajax({
    method: "GET",
    url: "/api/playlists",
    data: {ids}
  })
}

export const fetchPlaylist = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/playlists/${id}`
  })
}

export const createPlaylist = (playlist) => {
  return $.ajax({
    method: "POST",
    url: '/api/playlists',
    data: {playlist}
  })
}

export const deletePlaylist = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/playlists/${id}`
  })
}
