module UserImpersonate
  class Engine < Rails::Engine
    # Devise user model
    config.user_class = 'User'

    # User model lookup method
    config.user_finder = 'find'

    # Staff user model lookup method
    config.staff_finder = 'find'

    # User model primary key attribute
    config.user_id_column = 'id'

    # User model name attribute used for search
    # Usage: User.where('#{user_name_column} like ?', '%#{params[:search]}%')
    config.user_name_column = 'name'

    # User model staff attribute
    config.user_is_staff_method = 'staff?'

    # Redirect to this path when entering impersonate mode
    config.redirect_on_impersonate = '/'

    # Redirect to this path when leaving impersonate mode
    config.redirect_on_revert = '/manage/users'

    # Devise method used to sign user in
    config.sign_in_user_method = 'sign_in'

    # For Active Admin "AdminUser" model, use 'AdminUser'
    config.staff_class = 'AdminUser'

    # For Active Admin "AdminUser" model, use 'authenticate_admin_user!'
    config.authenticate_user_method = 'authenticate_admin_user!'

    # For Active Admin "AdminUser" model, use 'current_admin_user'
    config.current_staff = 'current_admin_user'
  end

  ImpersonateController.class_eval do
    # Ignore user authentication and Pundit authorization
    skip_before_filter :authenticate_user!
    skip_after_filter :verify_authorized
  end
end
