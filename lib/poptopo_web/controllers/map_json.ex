defmodule Poptopo.MapJSON do
  alias Poptopo.Maps.Tag

  @doc """
  Renders a list of urls.
  """
  def index(%{tags: tags}) do
    %{data: for(tag <- tags, do: data(tag))}
  end

  @doc """
  Renders a single url.
  """
  # def show(%{url: url}) do
  #   %{data: data(url)}
  # end

  defp data(%Tag{} = tag) do
    %{
      id: tag.id,
      name: tag.name,
      lat: tag.lat,
      lng: tag.lng
    }
  end
end
