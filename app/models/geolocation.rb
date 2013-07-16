require 'vertica_query'

class Geolocation
  class << self
    ICON_HASH_SALT = "Gi97taauc9VFnb1vDbxWE1ID8Jjv06Il0EehMIKQ"
    TAPJOY_ICON = "https://d21x2jbj16e06e.cloudfront.net/icons/src/785c4bc38e882d28c7f756b2192e39d5e5b307a67bcd7c90300562e0a9342ea7.jpg"
    def publish_message(message)
      Pusher['long_lat_stream'].trigger('new_location', message)
    end

    def obtain_location
      results = VerticaQuery.get_conversion_attempts
      results.each do |query|
        icon_url = "https://d21x2jbj16e06e.cloudfront.net/icons/src/" + (Digest::SHA2.hexdigest(ICON_HASH_SALT + query[:offer_id])) + ".jpg"

        # Tests for valid icon_url
        http_response = HTTParty.get(icon_url)
        query[:icon_url] = (http_response.code == 403 ? TAPJOY_ICON : icon_url )

        #looks up location cooridinates by ip address
        geoloc = Geocoder.search(query[:ip_address])
        loc = { :latitude => geoloc[0].latitude, :longitude => geoloc[0].longitude, :address => geoloc[0].address } if geoloc && geoloc[0]

        #because we don't want to send the data publicly
        keys_to_delete = [:offer_id, :ip_address, :source, :offer_type]
        keys_to_delete.each { |key| query.delete(key)}

        if loc
          #publishes message to pusher service
          publish_message(loc.merge(query))

          #slows down the stream to pusher so there is a slow constant stream for new users.
          #rake task still only runs every 10 min.
          sleep 7
        else
          sleep 7
        end
      end
    end
  end
end
