@genres.each do |genre|
  json.set! genre.id do
    json.extract! genre, :id, :name
    json.photoUrl url_for(genre.photo)
  end
end
