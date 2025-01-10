ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def sign_in(user)
      post session_url, params: { email_address: user.email_address, password: "password" }
    end

    def integration_sign_in(user)
      visit new_session_url

      # fill_in "email_address", with: user.email_address
      # fill_in "password", with: "password"
      click_on "Forgot password?"
    end
  end
end
