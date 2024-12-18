require "test_helper"

class TracksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @track = tracks(:one)
  end

  test "should get index" do
    skip
    get tracks_url
    assert_response :success
  end

  test "should get new" do
    skip
    get new_track_url
    assert_response :success
  end

  test "should create track" do
    skip
    assert_difference("Track.count") do
      post tracks_url, params: { track: { data: @track.data, name: @track.name, tag_id: @track.tag_id, user_id: @track.user_id } }
    end

    assert_redirected_to track_url(Track.last)
  end

  test "should show track" do
    skip
    get track_url(@track)
    assert_response :success
  end

  test "should get edit" do
    skip
    get edit_track_url(@track)
    assert_response :success
  end

  test "should update track" do
    skip
    patch track_url(@track), params: { track: { data: @track.data, name: @track.name, tag_id: @track.tag_id, user_id: @track.user_id } }
    assert_redirected_to track_url(@track)
  end

  test "should destroy track" do
    skip
    assert_difference("Track.count", -1) do
      delete track_url(@track)
    end

    assert_redirected_to tracks_url
  end
end
