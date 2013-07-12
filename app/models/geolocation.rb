class Geolocation
  class << self
    def publish_message(message)
      Pusher['long_lat_stream'].trigger('new_location', {
        message: message
      })
    end

    #def vertica_query
      #@vertica_query ||= Vertica.get_shit
    #end

    def obtain_location
      #vertica_query['']
      #vertica_query.each do |query|
        geoloc = Geocoder.search("10.10.18.171")
        loc = { latitude: geoloc[0].latitude, longitude: geoloc[0].longitude, address: geoloc[0].address }.to_json if geoloc && geoloc[0]
        publish_message(loc)
      #end
    end
  end
end
