OfferPadmapper::Application.routes.draw do
  if (app = Rails.application).config.assets.compile
    mount app.assets => app.config.assets.prefix
  end

  root :to => 'home#index'
end
