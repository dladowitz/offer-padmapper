# require 'rake'

task :get_conversions => :environment do
   puts "Starting query"
   Geolocation.obtain_location
   puts "Finished Query"
end
