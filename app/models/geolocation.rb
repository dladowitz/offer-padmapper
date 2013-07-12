class Geolocation
  class << self
    def publish_message(message)
      Pusher['long_lat_stream'].trigger('new_location', message)
    end

    #def vertica_query
      #@vertica_query ||= Vertica.get_shit
    #end

    def obtain_location
      #vertica_query['']
      #vertica_query.each do |query|
        # geoloc = Geocoder.search("10.10.18.171")
      location = [
        {:name => "Battle Cats Video", reward_amount: 10, currency: "Stars", dollar_value: 50, latitude: 37.850033, longitude: -120.4183},
        {name: "Dorritos Commercial ", reward_amount: 20, currency: "Gold", dollar_value: 10, latitude: 40.850033, longitude: -90.4183},
        {name: "American Express", reward_amount: 5, currency: "Diamonds", dollar_value: 450, latitude: 35.850033, longitude: -85.4183},
        {name: "Ford Focus", reward_amount: 30, currency: "Start", dollar_value: 150, latitude: 42.850033, longitude: -71.4183},
        {name: "CitiCard", reward_amount: 8, currency: "Cat Food", dollar_value: 250, latitude: 31.850033, longitude: -110.4183},
        {name: "Clash of the clans", reward_amount: 10, currency: "Suns", dollar_value: 90, latitude: 40.850033, longitude: -110.4183},
        {name: "Ninja Warroirs", reward_amount: 9, currency: "Silver", dollar_value: 10, latitude: 37.850033, longitude: -100.4183},
        {name: "Candy Crush Video", reward_amount: 10, currency: "Cat Food", dollar_value: 20, latitude: 33.850033, longitude: -80.4183},
        {name: "Virgin Atlantic", reward_amount: 30, currency: "Rings", dollar_value: 350, latitude: 34.850033, longitude: -90.4183},
        {name: "Battle Cats Video 2", reward_amount: 10, currency: "Mice", dollar_value: 540, latitude: 32.850033, longitude: -100.4183},
        {name: "McDonald's", reward_amount: 40, currency: "Cat Food", dollar_value: 150, latitude: 31.850033, longitude: -85.4183},
        {name: "Hay Day Video", reward_amount: 9, currency: "Dollars", dollar_value: 220, latitude: 45.850033, longitude: -100.4183}
      ]

      location.each { |loc| publish_message(loc) }

        # loc = { :latitude => geoloc[0].latitude, :longitude => geoloc[0].longitude, :address => geoloc[0].address }.to_json if geoloc && geoloc[0]
        # publish_message(lo)
      #end
    end
  end
end
