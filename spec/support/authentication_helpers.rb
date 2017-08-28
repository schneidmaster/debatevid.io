module Controllers
  module AuthenticationHelpers
    def login_as_user(user)
      session[:current_user] = user.id
    end
  end
end
