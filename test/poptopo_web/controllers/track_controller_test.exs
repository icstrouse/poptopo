defmodule PoptopoWeb.TrackControllerTest do
  use PoptopoWeb.ConnCase

  import Poptopo.MapsFixtures

  @create_attrs %{name: "some name", user_id: 42}
  @update_attrs %{name: "some updated name", user_id: 43}
  @invalid_attrs %{name: nil, user_id: nil}

  describe "index" do
    test "lists all tracks", %{conn: conn} do
      conn = get(conn, ~p"/tracks")
      assert html_response(conn, 200) =~ "Listing Tracks"
    end
  end

  describe "new track" do
    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/tracks/new")
      assert html_response(conn, 200) =~ "New Track"
    end
  end

  describe "create track" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/tracks", track: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/tracks/#{id}"

      conn = get(conn, ~p"/tracks/#{id}")
      assert html_response(conn, 200) =~ "Track #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/tracks", track: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Track"
    end
  end

  describe "edit track" do
    setup [:create_track]

    test "renders form for editing chosen track", %{conn: conn, track: track} do
      conn = get(conn, ~p"/tracks/#{track}/edit")
      assert html_response(conn, 200) =~ "Edit Track"
    end
  end

  describe "update track" do
    setup [:create_track]

    test "redirects when data is valid", %{conn: conn, track: track} do
      conn = put(conn, ~p"/tracks/#{track}", track: @update_attrs)
      assert redirected_to(conn) == ~p"/tracks/#{track}"

      conn = get(conn, ~p"/tracks/#{track}")
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, track: track} do
      conn = put(conn, ~p"/tracks/#{track}", track: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Track"
    end
  end

  describe "delete track" do
    setup [:create_track]

    test "deletes chosen track", %{conn: conn, track: track} do
      conn = delete(conn, ~p"/tracks/#{track}")
      assert redirected_to(conn) == ~p"/tracks"

      assert_error_sent 404, fn ->
        get(conn, ~p"/tracks/#{track}")
      end
    end
  end

  defp create_track(_) do
    track = track_fixture()
    %{track: track}
  end
end
