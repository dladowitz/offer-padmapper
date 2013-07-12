class VerticaQuery
  def self.get_conversion_attempts
    @@connection = Vertica.connect({:host => ENV["HOST"], :user => ENV["DB_USER"], :password => ENV["PASSWORD"], :port => ENV["PORT"].to_i, :database => ENV["DATABASE"], :ssl => true})
    @@connection.query("select offer_name, ip_address, advertiser_amount*-0.01 as revenue, source, device_type, type as offer_type from analytics.conversion_attempt ca join analytics.offers_partners op on op.offer_id = ca.offer_id where resolution = 'converted' and geoip_country = 'US' order by time desc limit 240;").rows
  end
end
