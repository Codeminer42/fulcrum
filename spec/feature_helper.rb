require 'rails_helper'

RSpec.configure do |config|
  config.before(:suite) do
    %x[bundle exec rake assets:precompile]
    %x[bundle exec rake webpacker:compile]
  end

  config.include Warden::Test::Helpers
end
