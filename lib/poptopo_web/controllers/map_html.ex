defmodule PoptopoWeb.MapHTML do
  @moduledoc """
  This module contains pages rendered by MapController.

  See the `map_html` directory for all templates available.
  """
  use PoptopoWeb, :html

  embed_templates "map_html/*"
end
