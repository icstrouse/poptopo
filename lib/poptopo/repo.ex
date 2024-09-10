defmodule Poptopo.Repo do
  use Ecto.Repo,
    otp_app: :poptopo,
    adapter: Ecto.Adapters.Postgres
end
