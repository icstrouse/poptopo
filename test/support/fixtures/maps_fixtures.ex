defmodule Poptopo.MapsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Poptopo.Maps` context.
  """

  @doc """
  Generate a tag.
  """
  def tag_fixture(attrs \\ %{}) do
    {:ok, tag} =
      attrs
      |> Enum.into(%{
        lat: 120.5,
        lng: 120.5,
        name: "some name",
        user_id: 42
      })
      |> Poptopo.Maps.create_tag()

    tag
  end

  @doc """
  Generate a track.
  """
  def track_fixture(attrs \\ %{}) do
    {:ok, track} =
      attrs
      |> Enum.into(%{
        name: "some name",
        user_id: 42
      })
      |> Poptopo.Maps.create_track()

    track
  end
end
