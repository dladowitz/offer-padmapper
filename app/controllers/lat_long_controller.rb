class LatLongController < FayeRails::Controller
  observe LatLong, :after_create do |loc|
    LatLongController.publish('/lat_long_stream', loc.attributes)
  end
end
