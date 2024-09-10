defmodule Poptopo.Repo.Migrations.AddTopics do
  use Ecto.Migration

  def change do
    create table (:users) do
      add :firstname, :string
      add :lastname, :string
    end
  end
end
