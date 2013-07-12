class VerticaQuery
  def self.get_conversion_attempts
    @@connection = Vertica.connect({:host => ENV["host"], :user => ENV["user"], :password => ENV["password"], :port => ENV["port"].to_i, :database => ENV["database"], :ssl => true})
    @@connection.query("select offer_id, currency_id, ip_address, advertiser_amount*-0.01 as revenue, time, source, device_type, type as offer_type from analytics.conversion_attempt where resolution = 'converted' and geoip_country = 'US' order by time desc limit 240;").rows
  end
end
