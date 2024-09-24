defmodule Poptopo.Repo.Migrations.CreateTracks do
  use Ecto.Migration

  def change do
    create table(:tracks) do
      add :name, :string
      add :user_id, :integer
      add :user_id, Ecto.JSON

      timestamps(type: :utc_datetime)
    end
  end
end
