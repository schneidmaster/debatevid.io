module Features
  module SessionHelpers
    def log_in(user = create!(:user))
      page.set_rack_session(current_user: user.id)
    end
  end
end