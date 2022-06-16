class ApiController < ApplicationController

  # Intercept API authentication.
  # If we have already authenticated a user, return it.
  # Else, fall back to the original devise(_token_auth) authentication.
  def current_api_user
    @api_key ? @api_key.user : super
  end

end
