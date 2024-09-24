defmodule PoptopoWeb.TrackController do
  use PoptopoWeb, :controller

  alias Poptopo.Maps
  alias Poptopo.Maps.Track

  def index(conn, _params) do
    tracks = Maps.list_tracks()
    render(conn, :index, tracks: tracks)
  end

  def new(conn, _params) do
    changeset = Maps.change_track(%Track{})
    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"track" => track_params}) do
    case Maps.create_track(track_params) do
      {:ok, track} ->
        conn
        |> put_flash(:info, "Track created successfully.")
        |> redirect(to: ~p"/tracks/#{track}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    track = Maps.get_track!(id)
    render(conn, :show, track: track)
  end

  def edit(conn, %{"id" => id}) do
    track = Maps.get_track!(id)
    changeset = Maps.change_track(track)
    render(conn, :edit, track: track, changeset: changeset)
  end

  def update(conn, %{"id" => id, "track" => track_params}) do
    track = Maps.get_track!(id)

    case Maps.update_track(track, track_params) do
      {:ok, track} ->
        conn
        |> put_flash(:info, "Track updated successfully.")
        |> redirect(to: ~p"/tracks/#{track}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :edit, track: track, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    track = Maps.get_track!(id)
    {:ok, _track} = Maps.delete_track(track)

    conn
    |> put_flash(:info, "Track deleted successfully.")
    |> redirect(to: ~p"/tracks")
  end
end
