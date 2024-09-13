defmodule Poptopo.Maps.Tag do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tags" do
    field :name, :string
    field :user_id, :integer
    field :lat, :float
    field :lng, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(tag, attrs) do
    tag
    |> cast(attrs, [:user_id, :name, :lat, :lng])
    |> validate_required([:user_id, :name, :lat, :lng])
  end
end
