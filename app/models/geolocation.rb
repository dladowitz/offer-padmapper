require 'vertica_query'

class Geolocation
  class << self
    ICON_HASH_SALT = "Gi97taauc9VFnb1vDbxWE1ID8Jjv06Il0EehMIKQ"
    TAPJOY_ICON = "https://d21x2jbj16e06e.cloudfront.net/icons/src/785c4bc38e882d28c7f756b2192e39d5e5b307a67bcd7c90300562e0a9342ea7.jpg"
    def publish_message(message)
      Pusher['long_lat_stream'].trigger('new_location', message)
    end

    def obtain_location
puts "calling vertica"
      results = VerticaQuery.get_conversion_attempts
puts "finished vertical query"
puts "results: #{results.length}"
      conversions = []
      batch = 0

      results.each do |query|
        icon_url = "https://d21x2jbj16e06e.cloudfront.net/icons/src/" + (Digest::SHA2.hexdigest(ICON_HASH_SALT + query[:offer_id])) + ".jpg"

        # Tests for valid icon_url
        http_response = HTTParty.get(icon_url)
        query[:icon_url] = (http_response.code == 403 ? TAPJOY_ICON : icon_url )

        #looks up location cooridinates by ip address
        geoloc = Geocoder.search(query[:ip_address])
        loc = { :latitude => geoloc[0].latitude, :longitude => geoloc[0].longitude, :address => geoloc[0].address } if geoloc && geoloc[0]

        #because we don't want to send the data publicly
        keys_to_delete = [:offer_id, :ip_address, :source, :offer_type, :revenue]
        keys_to_delete.each { |key| query.delete(key)}

        if loc
          conversions << loc.merge(query)
        end

        # The timing of dropping offers on the map is controlled by three factors
        # 1 Number of conversions sent to pusher
        # 2 sleep timeout
        # 3 setTimeout length in application.js
        # Optimalally  (conversion.length * setTimeout length) should be slightly less than sleep timeout
        if conversions.length >= 10

          #publishes conversions to pusher service
          publish_message(conversions)

          #slows down the stream to pusher
          sleep 28

          # resets after 10 conversions are sent
          conversions = []
          batch = 0
        end

      end

    end
  end
end
