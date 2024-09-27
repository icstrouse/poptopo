defmodule Poptopo.Repo.Migrations.CreateTracks do
  use Ecto.Migration

  def change do
    create table(:tracks) do
      add :name, :string
      add :user_id, :integer
      add :data, :map

      timestamps(type: :utc_datetime)
    end
  end
end
