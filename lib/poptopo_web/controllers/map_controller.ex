defmodule PoptopoWeb.MapController do
  use PoptopoWeb, :controller

  alias Poptopo.Maps
  alias Poptopo.Maps.Tag

  def index(conn, _params) do
    {:ok, tags} = Jason.encode(for(tag <- Maps.list_tags(), do: data(tag)))
    render(conn, :index, tags: tags )
  end

  defp data(%Tag{} = tag) do
    %{
      name: tag.name,
      user_id: tag.user_id,
      lat: tag.lat,
      lng: tag.lng
    }
  end
end
