export const fetchUser = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${id}`,
  })
}

export const followUser = (follow) => {
  return $.ajax({
    method: "POST",
    url: `/api/follows`,
    data: { follow }
  })
}

export const unfollowUser = follow => {
  return $.ajax({
    method: "DELETE",
    url: `/api/follows/${0}`,
    data: { follow }
  })
}
