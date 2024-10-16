defmodule PoptopoWeb.Router do
  use PoptopoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {PoptopoWeb.Layouts, :root}
    # plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PoptopoWeb do
    pipe_through :browser

    get "/", PageController, :home

    get "/map", MapController, :index
    get "/map/tags/:id", MapController, :show_tag

    resources "/tags", TagController

    resources "/tracks", TrackController

    # Create API route for adding a tag
  end

  # Other scopes may use custom stacks.
  scope "/api", PoptopoWeb do
    pipe_through :api

    # get "/map/tags", MapController, :tag_test
    # post "/map/tags", MapController, :create_tag

    resources "/tags", TagApiController, except: [:new, :edit]
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:poptopo, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: PoptopoWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
