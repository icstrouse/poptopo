defmodule Poptopo.Maps.Track do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tracks" do
    field :name, :string
    field :user_id, :integer
    field :tag_id, :integer
    field :data, :map

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(track, attrs) do
    track
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
