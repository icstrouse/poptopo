defmodule PoptopoWeb.MapController do
  use PoptopoWeb, :controller

  alias Poptopo.Maps
  alias Poptopo.Maps.Tag
  alias Poptopo.Maps.Track

  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _params) do
    {:ok, tags} = Jason.encode(for(tag <- Maps.list_tags(), do: parseTag(tag)))

    render(conn, :index, tags: tags, tracks: [])
  end

  def tag_test(conn, _) do
    render(conn, :index)
  end

  def create_tag(conn, params) do
    IO.puts("Conn: ")
    IO.inspect(conn)
    IO.puts("Params: ")
    IO.inspect(params)

    render(conn)
  end

  def show_tag(conn, %{"id" => id}) do
    {:ok, tags} = Jason.encode([parseTag(Maps.get_tag!(id))])
    {:ok, tracks} = Jason.encode(for(track <- Maps.get_tracks_by_tag(id), do: parseTrack(track)))

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
      tag_id: track.tag_id,
      data: track.data
    }
  end
end
