defmodule PoptopoWeb.MapController do
  use PoptopoWeb, :controller

  alias Poptopo.Maps
  alias Poptopo.Maps.Tag
  alias Poptopo.Maps.Track

  def index(conn, _params) do
    {:ok, tags} = Jason.encode(for(tag <- Maps.list_tags(), do: parseTag(tag)))
    {:ok, tracks} = Jason.encode(for(track <- Maps.list_tracks(), do: parseTrack(track)))

    render(conn, :index, tags: tags, tracks: tracks)
  end

  defp parseTag(%Tag{} = tag) do
    %{
      name: tag.name,
      user_id: tag.user_id,
      lat: tag.lat,
      lng: tag.lng
    }
  end

  defp parseTrack(%Track{} = track) do
    %{
      name: track.name,
      user_id: track.user_id,
      data: track.data
    }
  end
end
