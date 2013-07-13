require 'vertica_query'

class Geolocation
  class << self
    def publish_message(message)
      Pusher['long_lat_stream'].trigger('new_location', message)
    end

    def obtain_location
      results = VerticaQuery.get_conversion_attempts
      results.each do |query|
        geoloc = Geocoder.search(query[:ip_address])
        loc = { :latitude => geoloc[0].latitude, :longitude => geoloc[0].longitude, :address => geoloc[0].address } if geoloc && geoloc[0]
        if loc
          publish_message(loc.merge(query))
        else
          sleep 3
        end
      end
    end
  end
end
