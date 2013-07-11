class Geolocation
  @@firehose = Firehose::Client::Producer::Http.new('//127.0.0.1:7474')

  class << self do
    def publish_message(message)
      @@firehose.publish(message).to("/my/messages/path")
    end

    def vertica_query
      @vertica_query ||= Vertica.get_shit
    end

    def obtain_location
      vertica_query.each do |query|
        geoloc = Geocoder.search(query.ip_address)
        loc = { latitude: geoloc[0].latitude, longitude: geoloc[0].longitude, address: geoloc[0].address }.to_json if geoloc && geoloc[0]
        publish_message(loc)
      end
    end
  end
end
