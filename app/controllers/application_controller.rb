class ApplicationController < ActionController::Base
  # if Rails.env != 'test'; include Authentication end
  include Authentication

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
