defmodule Poptopo.Repo.Migrations.CreateTags do
  use Ecto.Migration

  def change do
    create table(:tags) do
      add :user_id, :integer
      add :name, :string
      add :lat, :float
      add :lng, :float
      add :bearing, :integer

      timestamps(type: :utc_datetime)
    end
  end
end
