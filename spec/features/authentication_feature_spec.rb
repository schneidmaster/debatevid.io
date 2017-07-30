feature 'Authentication', :needs_assets do
  context 'using facebook' do
    context 'when authentication succeeds' do
      before { mock_fb }

      scenario 'logs in the user' do
        visit '/auth/facebook'
        expect(page).to have_content('Logged in!')
        expect(User.where(name: 'Joe Bloggs').count).to eq(1)
      end
    end

    context 'when authentication fails' do
      before { mock_fb_failure }

      scenario 'does not log in the user' do
        visit '/auth/facebook'
        expect(page).to have_content('Login failed. Please try again.')
        expect(User.where(name: 'Joe Bloggs').count).to eq(0)
      end
    end
  end

  context 'using twitter' do
    context 'when authentication succeeds' do
      before { mock_twitter }

      scenario 'logs in the user' do
        visit '/auth/twitter'
        expect(page).to have_content('Logged in!')
        expect(User.where(name: 'John Public').count).to eq(1)
      end
    end

    context 'when authentication fails' do
      before { mock_twitter_failure }

      scenario 'does not log in the user' do
        visit '/auth/twitter'
        expect(page).to have_content('Login failed. Please try again.')
        expect(User.where(name: 'John Public').count).to eq(0)
      end
    end
  end

  context 'using google' do
    context 'when authentication succeeds' do
      before { mock_google }

      scenario 'logs in the user' do
        visit '/auth/google_oauth2'
        expect(page).to have_content('Logged in!')
        expect(User.where(name: 'John Doe').count).to eq(1)
      end
    end

    context 'when authentication fails' do
      before { mock_google_failure }

      scenario 'does not log in the user' do
        visit '/auth/google_oauth2'
        expect(page).to have_content('Login failed. Please try again.')
        expect(User.where(name: 'John Doe').count).to eq(0)
      end
    end
  end

  context 'when user is logged in' do
    before do
      mock_fb
      visit '/auth/facebook'
    end

    scenario 'logs out the user' do
      within '.navbar-right' do
        click_on 'Logout'
      end
      expect(page).to have_content('Logged out!')
    end
  end
end
