defmodule Poptopo.MapsTest do
  use Poptopo.DataCase

  alias Poptopo.Maps

  describe "tags" do
    alias Poptopo.Maps.Tag

    import Poptopo.MapsFixtures

    @invalid_attrs %{name: nil, user_id: nil, lat: nil, lng: nil}

    test "list_tags/0 returns all tags" do
      tag = tag_fixture()
      assert Maps.list_tags() == [tag]
    end

    test "get_tag!/1 returns the tag with given id" do
      tag = tag_fixture()
      assert Maps.get_tag!(tag.id) == tag
    end

    test "create_tag/1 with valid data creates a tag" do
      valid_attrs = %{name: "some name", user_id: 42, lat: 120.5, lng: 120.5}

      assert {:ok, %Tag{} = tag} = Maps.create_tag(valid_attrs)
      assert tag.name == "some name"
      assert tag.user_id == 42
      assert tag.lat == 120.5
      assert tag.lng == 120.5
    end

    test "create_tag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Maps.create_tag(@invalid_attrs)
    end

    test "update_tag/2 with valid data updates the tag" do
      tag = tag_fixture()
      update_attrs = %{name: "some updated name", user_id: 43, lat: 456.7, lng: 456.7}

      assert {:ok, %Tag{} = tag} = Maps.update_tag(tag, update_attrs)
      assert tag.name == "some updated name"
      assert tag.user_id == 43
      assert tag.lat == 456.7
      assert tag.lng == 456.7
    end

    test "update_tag/2 with invalid data returns error changeset" do
      tag = tag_fixture()
      assert {:error, %Ecto.Changeset{}} = Maps.update_tag(tag, @invalid_attrs)
      assert tag == Maps.get_tag!(tag.id)
    end

    test "delete_tag/1 deletes the tag" do
      tag = tag_fixture()
      assert {:ok, %Tag{}} = Maps.delete_tag(tag)
      assert_raise Ecto.NoResultsError, fn -> Maps.get_tag!(tag.id) end
    end

    test "change_tag/1 returns a tag changeset" do
      tag = tag_fixture()
      assert %Ecto.Changeset{} = Maps.change_tag(tag)
    end
  end

  describe "tracks" do
    alias Poptopo.Maps.Track

    import Poptopo.MapsFixtures

    @invalid_attrs %{name: nil, user_id: nil}

    test "list_tracks/0 returns all tracks" do
      track = track_fixture()
      assert Maps.list_tracks() == [track]
    end

    test "get_track!/1 returns the track with given id" do
      track = track_fixture()
      assert Maps.get_track!(track.id) == track
    end

    test "create_track/1 with valid data creates a track" do
      valid_attrs = %{name: "some name", user_id: 42}

      assert {:ok, %Track{} = track} = Maps.create_track(valid_attrs)
      assert track.name == "some name"
      assert track.user_id == 42
    end

    test "create_track/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Maps.create_track(@invalid_attrs)
    end

    test "update_track/2 with valid data updates the track" do
      track = track_fixture()
      update_attrs = %{name: "some updated name", user_id: 43}

      assert {:ok, %Track{} = track} = Maps.update_track(track, update_attrs)
      assert track.name == "some updated name"
      assert track.user_id == 43
    end

    test "update_track/2 with invalid data returns error changeset" do
      track = track_fixture()
      assert {:error, %Ecto.Changeset{}} = Maps.update_track(track, @invalid_attrs)
      assert track == Maps.get_track!(track.id)
    end

    test "delete_track/1 deletes the track" do
      track = track_fixture()
      assert {:ok, %Track{}} = Maps.delete_track(track)
      assert_raise Ecto.NoResultsError, fn -> Maps.get_track!(track.id) end
    end

    test "change_track/1 returns a track changeset" do
      track = track_fixture()
      assert %Ecto.Changeset{} = Maps.change_track(track)
    end
  end
end
