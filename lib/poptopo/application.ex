defmodule Poptopo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      PoptopoWeb.Telemetry,
      Poptopo.Repo,
      {DNSCluster, query: Application.get_env(:poptopo, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Poptopo.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Poptopo.Finch},
      # Start a worker by calling: Poptopo.Worker.start_link(arg)
      # {Poptopo.Worker, arg},
      # Start to serve requests, typically the last entry
      PoptopoWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Poptopo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PoptopoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
