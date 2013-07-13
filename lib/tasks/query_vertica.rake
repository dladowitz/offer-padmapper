require 'geolocation'

task :get_conversions do
   puts "Starting query"
   Geolocation.obtain_location
   puts "Finished Query"
end
