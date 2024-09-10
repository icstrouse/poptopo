defmodule PoptopoWeb.MapController do
  use PoptopoWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end
end
