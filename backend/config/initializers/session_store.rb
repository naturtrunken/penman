Rails.application.config.middleware.use ActionDispatch::Cookies
Rails.application.config.middleware.use ActionDispatch::Session::CookieStore
Rails.application.config.middleware.insert_after(ActionDispatch::Cookies, ActionDispatch::Session::CookieStore)