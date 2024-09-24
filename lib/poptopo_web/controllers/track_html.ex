defmodule PoptopoWeb.TrackHTML do
  use PoptopoWeb, :html

  embed_templates "track_html/*"

  @doc """
  Renders a track form.
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true

  def track_form(assigns)
end
